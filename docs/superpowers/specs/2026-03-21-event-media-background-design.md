# Event Media Background — Design Spec

**Date:** 2026-03-21
**Status:** Approved
**Scope:** Feed cards only

---

## Summary

Add full-bleed image and video backgrounds to each event card in the vertical snap-scroll feed. The existing ambient color overlay and bottom gradient fade are preserved on top of the media, keeping the brand aesthetic intact.

---

## What Changes

### 1. `next.config.mjs` — Allow external images

Add Picsum to the image remote patterns allowlist:

```ts
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos' },
    ],
  },
};
```

Note: `heroImage` paths are currently local (`/images/events/...`) and do not need a remotePatterns entry. If they ever become remote URLs, add those hostnames then.

---

### 2. Data Model — `FrameEvent.media`

Add an optional `videoUrl` field to the existing `media` object in `lib/data/events.ts`:

```ts
media: {
  heroImage: string;
  teaserImages: string[];
  videoUrl?: string;   // NEW — teaser clip URL
  ambientColor: string;
}
```

All existing events have `videoUrl: undefined`. The field is wired up and ready for real clips later.

---

### 3. New Component — `EventMediaBackground`

**File:** `components/event/EventMediaBackground.tsx`

**Props:**
```ts
interface EventMediaBackgroundProps {
  picsumSeed: string;    // used as the seed for picsum.photos URL
  imageUrl?: string;     // event.media.heroImage (local path)
  videoUrl?: string;     // event.media.videoUrl
  ambientColor: string;  // event.media.ambientColor
  isActive: boolean;     // controls video play/pause
}
```

**Layer stack (bottom → top) — all `absolute inset-0`, all `object-cover`:**

| # | Layer | Renders | Element | Notes |
|---|-------|---------|---------|-------|
| 1 | Picsum placeholder | Always | `<img>` (plain, not next/image) | `https://picsum.photos/seed/{encodeURIComponent(picsumSeed)}/600/1000`. Ken-burns animation applied **only** when no video is playing. |
| 2 | heroImage | If `imageUrl` is set | `next/image` with `fill` + `sizes="100vw"` | Renders over picsum. `alt=""` (decorative, content conveyed by text overlay). Not rendered at all if `imageUrl` is falsy. |
| 3 | Video teaser | If `videoUrl` is set | `<video>` | `muted loop playsInline` (no `autoPlay` — imperative `video.play()` in `useEffect` is authoritative). Controlled by `isActive` via ref. |
| 4 | Ambient color overlay | Always | `<div>` | Semi-transparent radial gradients using `ambientColor`. Keeps brand mood over real media. |

**Note:** Layer 5 (bottom gradient fade) and Layer 6 (frame border + content) remain in `FeedCard` exactly where they are today. `EventMediaBackground` owns only Layers 1–4.

**Z-index:** All layers within `EventMediaBackground` rely on DOM order within a single stacking context — no explicit z-index needed inside the component. The component itself is `absolute inset-0` with no z-index, sitting below the existing `FeedCard` elements that already have `z-10` and `z-20`.

**Video play/pause — handle async safely:**

```ts
useEffect(() => {
  const video = videoRef.current;
  if (!video) return;
  if (isActive) {
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => { /* interrupted by fast scroll — safe to ignore */ });
    }
  } else {
    video.pause();
  }
}, [isActive]);
```

**Ken-burns on placeholder:**
- Applied to Layer 1 (Picsum `<img>`) via `animate-ken-burns` class
- Suppressed when `videoUrl` is set and `isActive` is true — the video motion replaces it

---

### 4. FeedCard Update

**File:** `components/feed/FeedCard.tsx`

Replace the existing ambient gradient `<div>` (the block starting at line 28 with `absolute inset-0 ${isActive ? 'animate-ken-burns' : ''}`) with `<EventMediaBackground>`:

```tsx
<EventMediaBackground
  picsumSeed={event.slug}
  imageUrl={event.media.heroImage}
  videoUrl={event.media.videoUrl}
  ambientColor={event.media.ambientColor}
  isActive={isActive}
/>
```

Everything else in `FeedCard` — frame border (`z-20`), bottom gradient fade, content (`z-10`), right-side actions, full card link — stays exactly as-is.

---

## What Does NOT Change

- `EventHero` — no media background added (out of scope)
- `VideoBackground` shared component — untouched
- `GradientOverlay` shared component — untouched
- All overlay intensities — unchanged from current values
- All content, layout, animations — unchanged
- Bottom gradient fade in `FeedCard` — stays in `FeedCard`, not moved

---

## Constraints & Notes

- Picsum requires network access — dev environment must be online for placeholders to appear
- When real `heroImage` paths exist at `/images/events/...`, they automatically render over picsum (Layer 2 over Layer 1)
- When real `videoUrl` values are added to event data, video automatically plays over the image (Layer 3 over Layer 2)
- `alt=""` on heroImage is intentional — it is a decorative background; the event title in the text overlay is the accessible label
