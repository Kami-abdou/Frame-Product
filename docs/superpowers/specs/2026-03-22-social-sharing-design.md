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
    ├── "Share"          → navigator.share({ title, url }) → native OS sheet
    └── "Copy Link"      → navigator.clipboard.writeText(url)

/api/og/[slug]  (new API route)
    → @vercel/og generates 1200×630 OG image per event
    → referenced in <head> via generateMetadata on /events/[slug]
```

- No database changes
- No authentication required
- Fully edge-compatible

---

## Components

### `ShareSheet`
**Location:** `components/shared/ShareSheet.tsx`

A bottom sheet that slides up from the bottom of the screen when the share button is tapped.

**Props:**
```ts
interface ShareSheetProps {
  event: Event;
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
- "Share" falls back to copy-to-clipboard if `navigator.share` is unavailable (desktop)

**Styling:** Matches Frame's dark aesthetic — `bg-frame-black/95`, `backdrop-blur-xl`, existing border and typography tokens.

---

### `StoryCard`
**Location:** `components/shared/StoryCard.tsx`

A 9:16 (1080×1920) card rendered as a hidden DOM element, captured by html2canvas.

**Props:**
```ts
interface StoryCardProps {
  event: Event;
}
```

**Visual layout (top → bottom):**
- Full-bleed event cover image with dark overlay (`rgba(0,0,0,0.55)`)
- Ambient color radial glow at bottom (event's `media.ambientColor`)
- Top-left: "FRAME" wordmark in small tracking-luxury style
- Lower section: event name (large display font), date + city (smoke color), subtle CTA pill ("Get Tickets →"), event URL below CTA

**Capture:** Rendered off-screen via `position: fixed; left: -9999px`. `html2canvas` captures it and triggers a PNG download named `{event.slug}-frame.png`.

---

## API Route — `/api/og/[slug]`

**Location:** `app/api/og/[slug]/route.tsx`

Uses `@vercel/og` (`ImageResponse`) to generate a 1200×630 OG image server-side per event.

**Visual layout:**
- Left 60%: event cover image
- Right 40%: dark panel with Frame wordmark, event name, date + city, starting price
- Ambient color accent line or glow using `event.media.ambientColor`

**Response:** `ImageResponse` with `Cache-Control: public, max-age=31536000, immutable`

---

## Meta Tags — `generateMetadata`

**Location:** `app/(main)/events/[slug]/page.tsx`

Add `generateMetadata` export to the event page:

```ts
export async function generateMetadata({ params }): Promise<Metadata> {
  const event = getEventBySlug(params.slug);
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

---

## Wiring the Share Button

In `app/(main)/events/[slug]/page.tsx`, the existing share button in `TopBar`'s `rightAction` prop gets an `onClick` handler that sets `isShareSheetOpen = true`. `ShareSheet` is rendered at the bottom of the page tree.

---

## Dependencies

| Package | Purpose |
|---|---|
| `html2canvas` | Client-side DOM → PNG capture |
| `@vercel/og` | Server-side OG image generation |

Both are new additions to `package.json`.

---

## Out of Scope

- Referral tracking / "invited by" attribution
- Native app deep links (not a native app)
- Analytics on share events
- Story posting via Instagram/TikTok APIs (requires app review; download-and-post is sufficient)
