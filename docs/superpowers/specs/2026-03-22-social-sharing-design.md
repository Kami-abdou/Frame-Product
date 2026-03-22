# Social Sharing — Design Spec
**Date:** 2026-03-22
**Status:** Approved

---

## Overview

Enable Frame users to share events to TikTok and Instagram (and any platform) via two mechanisms:

1. **A shareable link** — any event URL works as a deep link; link unfurls richly everywhere
2. **A downloadable story card** — a 9:16 branded PNG users post directly to Instagram/TikTok stories

The share button already exists on the event detail page (`/events/[slug]`) but is not wired up. This feature wires it up end-to-end.

---

## Architecture

Three independent pieces, no backend changes required:

```
Share Button (existing, unwired)
    ↓ tap
ShareSheet component (new)
    ├── "Download Card"  → renders StoryCard div → html2canvas → PNG download
    ├── "Share"          → navigator.share({ title, text, url }) → native OS sheet
    └── "Copy Link"      → navigator.clipboard.writeText(url)

/api/og/[slug]  (new API route)
    → @vercel/og generates 1200×630 OG image per event
    → referenced in <head> via generateMetadata on /events/[slug]
```

- No database changes
- No authentication required
- Edge-compatible with current static data source (see trade-offs below)

---

## Server / Client Page Split

The event page (`app/(main)/events/[slug]/page.tsx`) is currently a `'use client'` component, but `generateMetadata` requires a Server Component. The page must be split:

**`app/(main)/events/[slug]/page.tsx` — Server Component (new)**
- Calls `getEventBySlug(params.slug)` to resolve the event
- Exports `generateMetadata`
- Renders `<EventDetailClient event={event} />`
- Handles the `event === undefined` case (renders 404 or passes `null`)

**`components/event/EventDetailClient.tsx` — Client Component (new, extracted)**
- Contains all current content of `page.tsx` (hooks, state, motion, JSX)
- Receives `event: FrameEvent` as a prop instead of calling `useParams` + `getEventBySlug`
- Manages `isShareSheetOpen` state
- Passes `event` to `<ShareSheet>`

---

## Components

### `ShareSheet`
**Location:** `components/shared/ShareSheet.tsx`

**Props:**
```ts
interface ShareSheetProps {
  event: FrameEvent;
  isOpen: boolean;
  onClose: () => void;
}
```

**Layout:**
- Drag handle at top
- Small 2:3 preview thumbnail of the StoryCard, centered
- Primary action: "Download Card" button (full width)
- Secondary row: "Share" + "Copy Link" side by side
- Cancel button at bottom
- Backdrop blur behind sheet; closes on backdrop tap or Cancel
- "Download Card" shows loading state while html2canvas captures (~1s)
- "Share" uses `navigator.share({ title: event.title, text: 'Check out this event on Frame', url })` and falls back to copy-to-clipboard if `navigator.share` is unavailable (desktop)

**Styling:** Matches Frame's dark aesthetic — `bg-frame-black/95`, `backdrop-blur-xl`, existing border and typography tokens.

---

### `StoryCard`
**Location:** `components/shared/StoryCard.tsx`

**Props:**
```ts
interface StoryCardProps {
  event: FrameEvent;
}
```

**Pixel dimensions:** The card element renders at **1080×1920 CSS pixels** off-screen. The preview thumbnail shown inside ShareSheet is a `transform: scale(0.25)` visual replica (no capture). `html2canvas` captures the full-size element directly, producing a 1080×1920 PNG suitable for Instagram Stories and TikTok.

**Off-screen rendering:** The element is positioned using `position: absolute; visibility: hidden` inside a zero-overflow container — **not** `position: fixed; left: -9999px`, which is unreliable on iOS Safari (scroll offset applied, clipping risk).

**Visual layout (top → bottom):**
- Full-bleed event cover image with dark overlay (`rgba(0,0,0,0.55)`)
- Ambient color radial glow at bottom (`event.media.ambientColor`)
- Top-left: "FRAME" wordmark, small, tracking-luxury
- Lower section: event name (large display font), date + city (smoke color), subtle CTA pill ("Get Tickets →"), event URL below CTA

**html2canvas options:**
```ts
html2canvas(element, {
  useCORS: true,   // required — cover images are cross-origin
  scale: 1,        // element already at full 1080×1920, no upscaling needed
  logging: false,
})
```

`useCORS: true` is required because cover images are served from an external domain. If the image host does not return `Access-Control-Allow-Origin: *`, the capture will produce a blank image. Current image source (`picsum.photos`) supports CORS.

**Download:** Triggers a PNG download named `{event.slug}-frame.png`.

---

## API Route — `/api/og/[slug]`

**Location:** `app/api/og/[slug]/route.tsx`

Uses `@vercel/og` (`ImageResponse`) to generate a 1200×630 OG image server-side per event.

**Visual layout:**
- Left 60%: event cover image
- Right 40%: dark panel with Frame wordmark, event name, date + city, starting price
- Ambient color accent line using `event.media.ambientColor`

**Response headers:**
```
Cache-Control: public, max-age=31536000, immutable
```

**Trade-off:** With static/in-memory data this is safe. If event data is later moved to a real database, the immutable cache will serve stale OG images until the URL changes. At that point, cache-busting via a query param or a shorter `max-age` should be reconsidered.

---

## Meta Tags — `generateMetadata`

**Location:** `app/(main)/events/[slug]/page.tsx` (Server Component)

```ts
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const event = getEventBySlug(params.slug);
  if (!event) {
    return { title: 'Frame — Curated Events' };
  }
  return {
    title: event.name,
    description: event.description,
    openGraph: {
      title: event.name,
      description: event.description,
      images: [`/api/og/${params.slug}`],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      images: [`/api/og/${params.slug}`],
    },
  };
}
```

Fallback for unknown slugs returns a safe default title rather than throwing.

---

## Wiring the Share Button

In `EventDetailClient.tsx`, add `isShareSheetOpen` state. The share button in `TopBar`'s `rightAction` prop sets `isShareSheetOpen = true` on tap. `<ShareSheet>` is rendered at the bottom of the component tree with `isOpen` and `onClose` props.

---

## Dependencies

| Package | Purpose |
|---|---|
| `html2canvas` | Client-side DOM → PNG capture |
| `@vercel/og` | Server-side OG image generation (already a Vercel/Next.js dep in most setups) |

---

## Out of Scope

- Referral tracking / "invited by" attribution
- Native app deep links (not a native app)
- Analytics on share events
- Story posting via Instagram/TikTok APIs (requires app review; download-and-post is sufficient)
