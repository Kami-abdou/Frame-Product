# Platform Media Backgrounds & Header Accessibility — Design Spec

**Date:** 2026-03-21
**Status:** Approved

---

## Summary

Extend the picsum image placeholder pattern (already live on feed cards) to every other event surface in the app. Add a top scrim on pages where a transparent TopBar floats over full-height images. Boost the frame border opacity on image surfaces for better visual contrast.

`EventMediaBackground` (feed cards, video-aware) is unchanged. A new, simpler `CardMediaBackground` handles all static surfaces.

---

## What Does NOT Change

- `components/event/EventMediaBackground.tsx` — untouched
- `components/feed/FeedCard.tsx` — untouched
- `components/layout/BottomNav.tsx` — already has `bg-frame-black/90 backdrop-blur-xl`, no change needed
- `next.config.mjs` — `picsum.photos` already whitelisted from previous feature

---

## 1. New Component — `CardMediaBackground`

**File:** `components/event/CardMediaBackground.tsx`

**Props:**
```ts
interface CardMediaBackgroundProps {
  picsumSeed: string;
  imageUrl?: string;
  /** Hex colour used for the ambient tint overlay. Expected format: `#RRGGBB` or `#RGB`. */
  ambientColor: string;
  /** Optional Tailwind classes applied to the inner image wrapper — used for hover scale animations (e.g. group-hover:scale-[1.03]). Does NOT go on the overflow-hidden outer container. */
  imageClassName?: string;
}
```

**Structure:**

```tsx
<div className="absolute inset-0 overflow-hidden">
  {/* Inner wrapper — receives scale/transform animations */}
  <div className={cn('absolute inset-0', imageClassName)}>
    {/* Layer 1: Picsum placeholder */}
    {/* Layer 2: heroImage (optional) */}
  </div>
  {/* Layer 3: Ambient overlay — sibling of inner wrapper, never scaled */}
</div>
```

**Why this structure:** `overflow-hidden` must stay on the outer container. If `imageClassName` (e.g. `group-hover:scale-[1.03]`) is applied to the `overflow-hidden` element, the scale transform clips the zoom and nothing is visible. The inner wrapper scales; the outer wrapper clips the overflow cleanly.

**Layer stack:**

| # | Layer | Element | Notes |
|---|-------|---------|-------|
| 1 | Picsum placeholder | `<img>` (plain, inside inner wrapper) | `https://picsum.photos/seed/{encodeURIComponent(picsumSeed)}/600/1000`. `alt=""`. No ken-burns. |
| 2 | heroImage | `next/image` with `fill` + `sizes="100vw"` + `alt=""` (inside inner wrapper) | Only rendered if `imageUrl` is set. |
| 3 | Ambient overlay | `<div>` (sibling of inner wrapper, outside it) | Three-stop canonical gradient — see below. Never scaled. |

**Canonical ambient gradient** (standardised across all static surfaces, replacing all per-card variants):
```ts
background: `radial-gradient(ellipse at 30% 15%, ${ambientColor}35 0%, transparent 50%),
             radial-gradient(ellipse at 70% 50%, ${ambientColor}10 0%, transparent 40%),
             linear-gradient(180deg, #0A0A0A00 0%, #050505 100%)`
```

This replaces the various per-component gradient variants (which used different opacities like `25`, `30`, `35` and two-stop instead of three-stop). The three-stop version from `EventMediaBackground` is the canonical one going forward.

Use `cn()` from `@/lib/utils/cn` for conditional class composition.

---

## 2. Top Scrim

A plain `<div>` added inside relevant full-height hero sections. Not a component — just an inline element.

```tsx
{/* Top scrim — ensures TopBar stays legible over bright images */}
<div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/75 to-transparent pointer-events-none" />
```

**Insertion order matters:** Always insert the scrim **after** `CardMediaBackground` and **before** the frame border div, so the z-order reads correctly (background → scrim → frame border → content).

**Applied to:**
- `components/event/EventHero.tsx` — after `CardMediaBackground`, before the `z-10` frame border div
- `app/(main)/originals/page.tsx` — inside each full-height card, after `CardMediaBackground`, before the frame border div

**Not applied to:**
- Explore page — TopBar is not used here
- Profile page — small inline cards, TopBar not floating over them

---

## 3. Frame Border Opacity Boost

All image surfaces bump the inset border for better definition over real photos.

| File | Current value | New value |
|------|--------------|-----------|
| `components/event/EventHero.tsx` — frame border div | `border-white/[0.04]` | `border-white/[0.12]` |
| `app/(main)/originals/page.tsx` — frame border div inside each card | `border-accent-gold/[0.08]` | `border-accent-gold/[0.12]` |
| `app/(main)/explore/page.tsx` — `OriginalCard` inset border | `border-white/[0.03]` | `border-white/[0.12]` |

Match by content string, not line number, since surrounding edits shift lines.

---

## 4. Surface Changes

### `components/event/EventHero.tsx`

1. Import `CardMediaBackground`
2. Replace the ambient gradient div (the one with `animate-ken-burns`) with:
```tsx
<CardMediaBackground
  picsumSeed={event.slug}
  imageUrl={event.media.heroImage}
  ambientColor={event.media.ambientColor}
/>
```
3. Add top scrim immediately after `CardMediaBackground`, before the frame border div:
```tsx
<div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/75 to-transparent pointer-events-none" />
```
4. Bump frame border: `border-white/[0.04]` → `border-white/[0.12]`

---

### `app/(main)/explore/page.tsx` — OriginalCard

1. Import `CardMediaBackground`
2. Replace the ambient gradient div with:
```tsx
<CardMediaBackground
  picsumSeed={event.slug}
  imageUrl={event.media.heroImage}
  ambientColor={event.media.ambientColor}
/>
```
3. Bump inset border: `border-white/[0.03]` → `border-white/[0.12]`

---

### `app/(main)/explore/page.tsx` — GridCard

1. Replace the ambient gradient div (which currently carries `transition-transform duration-[8s] ease-out group-hover:scale-[1.03]`) with:
```tsx
<CardMediaBackground
  picsumSeed={event.slug}
  imageUrl={event.media.heroImage}
  ambientColor={event.media.ambientColor}
  imageClassName="transition-transform duration-[8s] ease-out group-hover:scale-[1.03]"
/>
```
The `imageClassName` moves the scale animation to the inner image wrapper, preserving the hover zoom while `overflow-hidden` on the outer container clips it correctly.

---

### `app/(main)/originals/page.tsx`

1. Import `CardMediaBackground`
2. Replace the ambient gradient div (which carries `transition-transform duration-[12s] ease-out group-hover:scale-[1.04]`) with:
```tsx
<CardMediaBackground
  picsumSeed={event.slug}
  imageUrl={event.media.heroImage}
  ambientColor={event.media.ambientColor}
  imageClassName="transition-transform duration-[12s] ease-out group-hover:scale-[1.04]"
/>
```
3. Add top scrim immediately after `CardMediaBackground`, before the frame border div:
```tsx
<div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/75 to-transparent pointer-events-none" />
```
4. Bump frame border: `border-accent-gold/[0.08]` → `border-accent-gold/[0.12]`

Note: The hero section at the top of originals page uses a hardcoded gold gradient (not ambientColor) and is NOT a card. Leave it unchanged.

---

### `app/(main)/profile/page.tsx` — Upcoming bookings (h-20 cards)

The event object is already in scope — the existing code calls `getEventById(booking.eventId)` and guards with `if (!event) return null`. No new imports or lookups needed.

Replace the inline style div:
```tsx
<div className="h-20" style={{ background: `radial-gradient(...)` }} />
```
With:
```tsx
<div className="h-20 relative overflow-hidden">
  <CardMediaBackground
    picsumSeed={booking.eventSlug}
    ambientColor={event.media.ambientColor}
  />
</div>
```

`imageUrl` is intentionally omitted — at h-20 the card is too small for a hero image to be meaningful. Picsum + ambient color is sufficient.

---

### `app/(main)/profile/page.tsx` — Saved events (h-24 cards)

`event` is already the saved event object in the render loop.

Replace the inline style div:
```tsx
<div className="h-24" style={{ background: `radial-gradient(...)` }} />
```
With:
```tsx
<div className="h-24 relative overflow-hidden">
  <CardMediaBackground
    picsumSeed={event.slug}
    ambientColor={event.media.ambientColor}
  />
</div>
```

`imageUrl` is intentionally omitted — same reasoning as upcoming cards.

---

## Constraints & Notes

- `picsum.photos` is already in `next.config.mjs` remotePatterns — no config changes needed
- `imageUrl` on profile cards is intentionally omitted (cards are too small for a hero image)
- The canonical ambient gradient replaces all per-component variants — this is a visual standardisation
- `animate-ken-burns` on the old `EventHero` gradient div is removed with the div — not re-added (static card, no animation needed on EventHero background with a real image underneath)
