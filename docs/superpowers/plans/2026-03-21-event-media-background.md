# Event Media Background Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add full-bleed image and video backgrounds to feed cards, with picsum placeholders, ambient color overlay, and TikTok-style autoplay when a card is active.

**Architecture:** A new `EventMediaBackground` component owns the 4-layer media stack (picsum → heroImage → video → ambient overlay). `FeedCard` swaps its existing ambient gradient div for this component and passes through props. The bottom gradient fade and all content layers in `FeedCard` are untouched.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, `next/image`, native `<video>` element, React `useRef` + `useEffect`

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Modify | `next.config.mjs` | Allow `picsum.photos` as external image domain |
| Modify | `lib/data/events.ts` | Add `videoUrl?: string` to `FrameEvent.media` type |
| **Create** | `components/event/EventMediaBackground.tsx` | All 4 media layers + video play/pause logic |
| Modify | `components/feed/FeedCard.tsx` | Swap ambient gradient div → `<EventMediaBackground>` |

---

## Task 1: Allow picsum.photos in next.config.mjs

**Files:**
- Modify: `next.config.mjs`

- [ ] **Step 1: Update next.config.mjs**

Replace the empty config with:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos' },
    ],
  },
};

export default nextConfig;
```

- [ ] **Step 2: Verify the dev server still starts**

```bash
npm run dev
```

Expected: server starts on `http://localhost:3000` with no config errors. Kill it after confirming.

- [ ] **Step 3: Commit**

```bash
git add next.config.mjs
git commit -m "config: allow picsum.photos for external image placeholders"
```

---

## Task 2: Add videoUrl to the FrameEvent data type

**Files:**
- Modify: `lib/data/events.ts` (line 59–63 — the `media` block inside `FrameEvent`)

- [ ] **Step 1: Add the optional field to the type**

Find the `media` block in `FrameEvent` (around line 59) and add `videoUrl`:

```ts
media: {
  heroImage: string;
  teaserImages: string[];
  videoUrl?: string;   // teaser clip — undefined until real clips are added
  ambientColor: string;
};
```

- [ ] **Step 2: Verify TypeScript is happy**

```bash
npx tsc --noEmit
```

Expected: no errors. All existing event objects omit `videoUrl` which is fine — it's optional.

- [ ] **Step 3: Commit**

```bash
git add lib/data/events.ts
git commit -m "feat(data): add optional videoUrl field to FrameEvent.media"
```

---

## Task 3: Create EventMediaBackground component

**Files:**
- Create: `components/event/EventMediaBackground.tsx`

This component renders 4 layers stacked inside an `absolute inset-0` container. DOM order = z-order (no explicit z-index needed — the component sits below FeedCard's existing `z-10`/`z-20` elements).

**Layer order (bottom → top):**
1. Picsum `<img>` — always present base layer, ken-burns when no video is active
2. `next/image` heroImage — conditionally rendered over picsum when `imageUrl` is set
3. `<video>` teaser — conditionally rendered, play/pause driven by `isActive`
4. Ambient color overlay `<div>` — always present, semi-transparent radial gradients

- [ ] **Step 1: Create the component file**

```tsx
'use client';

import Image from 'next/image';
import { useRef, useEffect } from 'react';

interface EventMediaBackgroundProps {
  picsumSeed: string;
  imageUrl?: string;
  videoUrl?: string;
  ambientColor: string;
  isActive: boolean;
}

export default function EventMediaBackground({
  picsumSeed,
  imageUrl,
  videoUrl,
  ambientColor,
  isActive,
}: EventMediaBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isActive) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // interrupted by fast scroll — safe to ignore
        });
      }
    } else {
      video.pause();
    }
  }, [isActive]);

  const showKenBurns = !(videoUrl && isActive);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Layer 1: Picsum placeholder — always the base */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://picsum.photos/seed/${encodeURIComponent(picsumSeed)}/600/1000`}
        alt=""
        className={`absolute inset-0 w-full h-full object-cover${showKenBurns ? ' animate-ken-burns' : ''}`}
      />

      {/* Layer 2: Real hero image — renders over picsum when available */}
      {imageUrl && (
        <Image
          src={imageUrl}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      )}

      {/* Layer 3: Video teaser — renders over image when available */}
      {videoUrl && (
        <video
          ref={videoRef}
          src={videoUrl}
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Layer 4: Ambient color overlay — always on top of media */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 30% 15%, ${ambientColor}35 0%, transparent 50%),
                       radial-gradient(ellipse at 70% 50%, ${ambientColor}10 0%, transparent 40%),
                       linear-gradient(180deg, #0A0A0A00 0%, #050505 100%)`,
        }}
      />
    </div>
  );
}
```

- [ ] **Step 2: Check TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/event/EventMediaBackground.tsx
git commit -m "feat: add EventMediaBackground component with picsum/image/video layers"
```

---

## Task 4: Wire EventMediaBackground into FeedCard

**Files:**
- Modify: `components/feed/FeedCard.tsx`

Replace the ambient gradient `<div>` (lines 28–36) with `<EventMediaBackground>`. Everything else — the frame border, bottom gradient, content, right-side actions, full card link — stays exactly as-is.

- [ ] **Step 1: Add the import**

At the top of `FeedCard.tsx`, after the existing imports, add:

```tsx
import EventMediaBackground from '@/components/event/EventMediaBackground';
```

- [ ] **Step 2: Replace the ambient gradient div**

Remove this block (lines 28–36):

```tsx
{/* Ambient gradient background */}
<div
  className={`absolute inset-0 ${isActive ? 'animate-ken-burns' : ''}`}
  style={{
    background: `radial-gradient(ellipse at 30% 15%, ${event.media.ambientColor}35 0%, transparent 50%),
                 radial-gradient(ellipse at 70% 50%, ${event.media.ambientColor}10 0%, transparent 40%),
                 linear-gradient(180deg, #0A0A0A 0%, #050505 100%)`,
  }}
/>
```

Replace with:

```tsx
{/* Media background — picsum → heroImage → video → ambient overlay */}
<EventMediaBackground
  picsumSeed={event.slug}
  imageUrl={event.media.heroImage}
  videoUrl={event.media.videoUrl}
  ambientColor={event.media.ambientColor}
  isActive={isActive}
/>
```

- [ ] **Step 3: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Smoke test in the browser**

```bash
npm run dev
```

Open `http://localhost:3000`. Verify:
- Feed cards show picsum photos as backgrounds
- Ambient color tint is visible over the photo
- Bottom gradient fade and all text/buttons render correctly
- Scrolling between cards: active card shows the media, inactive cards show it statically
- No console errors about image domains or video playback

- [ ] **Step 5: Commit**

```bash
git add components/feed/FeedCard.tsx
git commit -m "feat: wire EventMediaBackground into FeedCard"
```
