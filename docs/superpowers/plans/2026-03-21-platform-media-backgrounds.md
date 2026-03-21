# Platform Media Backgrounds Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add picsum image backgrounds to every event surface in the app (explore, event hero, originals, profile) and add a top scrim + boosted borders for header accessibility.

**Architecture:** A new `CardMediaBackground` component (static, no video) follows the same 3-layer pattern as `EventMediaBackground` but with an inner image wrapper that accepts a `imageClassName` prop for hover scale animations while keeping `overflow-hidden` on the outer container. Top scrim is an inline `<div>` added to full-height hero surfaces only. Feed cards are untouched.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, `next/image`, `cn()` from `@/lib/utils/cn`

---

## File Map

| Action | File | What changes |
|--------|------|-------------|
| **Create** | `components/event/CardMediaBackground.tsx` | New static media background component |
| Modify | `components/event/EventHero.tsx` | Swap gradient div → CardMediaBackground + scrim + border boost |
| Modify | `app/(main)/explore/page.tsx` | Swap gradient divs in OriginalCard + GridCard + border boost |
| Modify | `app/(main)/originals/page.tsx` | Swap gradient div → CardMediaBackground + scrim + border boost |
| Modify | `app/(main)/profile/page.tsx` | Swap inline style divs in upcoming + saved card sections |

---

## Task 1: Create CardMediaBackground component

**Files:**
- Create: `components/event/CardMediaBackground.tsx`

- [ ] **Step 1: Create the file**

```tsx
'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils/cn';

interface CardMediaBackgroundProps {
  picsumSeed: string;
  imageUrl?: string;
  /** Hex colour used for the ambient tint overlay. Expected format: `#RRGGBB` or `#RGB`. */
  ambientColor: string;
  /** Tailwind classes for the inner image wrapper — use for hover scale animations (e.g. group-hover:scale-[1.03]). Applied to the inner div only, NOT the overflow-hidden outer container. */
  imageClassName?: string;
}

export default function CardMediaBackground({
  picsumSeed,
  imageUrl,
  ambientColor,
  imageClassName,
}: CardMediaBackgroundProps) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Inner wrapper — receives scale/transform animations, not overflow-hidden */}
      <div className={cn('absolute inset-0', imageClassName)}>
        {/* Layer 1: Picsum placeholder — always the base */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://picsum.photos/seed/${encodeURIComponent(picsumSeed)}/600/1000`}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
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
      </div>

      {/* Layer 3: Ambient overlay — sibling of inner wrapper, never scaled */}
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

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd "/Users/abdallahyaackoubi/Desktop/Project text/frame-app" && npx tsc --noEmit
```

Expected: no output (zero errors).

- [ ] **Step 3: Commit**

```bash
git add components/event/CardMediaBackground.tsx
git commit -m "feat: add CardMediaBackground component for static event surfaces"
```

---

## Task 2: Update EventHero

**Files:**
- Modify: `components/event/EventHero.tsx`

Three changes: swap the gradient div, add top scrim, boost border opacity.

- [ ] **Step 1: Add the import**

Add `CardMediaBackground` import after the existing imports in `EventHero.tsx`:

```tsx
import CardMediaBackground from '@/components/event/CardMediaBackground';
```

- [ ] **Step 2: Replace the ambient gradient div**

Find and remove this block:
```tsx
      {/* Ambient gradient with Ken Burns */}
      <div
        className="absolute inset-0 animate-ken-burns"
        style={{
          background: `radial-gradient(ellipse at 40% 20%, ${event.media.ambientColor}50 0%, transparent 50%),
                       radial-gradient(ellipse at 60% 80%, ${event.media.ambientColor}25 0%, transparent 40%),
                       linear-gradient(180deg, #0A0A0A 0%, #050505 100%)`,
        }}
      />
```

Replace with:
```tsx
      {/* Media background */}
      <CardMediaBackground
        picsumSeed={event.slug}
        imageUrl={event.media.heroImage}
        ambientColor={event.media.ambientColor}
      />

      {/* Top scrim — keeps TopBar legible over bright images */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/75 to-transparent pointer-events-none" />
```

- [ ] **Step 3: Boost the frame border opacity**

Find: `border border-white/[0.04] pointer-events-none z-10`
Replace with: `border border-white/[0.12] pointer-events-none z-10`

- [ ] **Step 4: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add components/event/EventHero.tsx
git commit -m "feat: add CardMediaBackground + top scrim to EventHero"
```

---

## Task 3: Update Explore page — OriginalCard and GridCard

**Files:**
- Modify: `app/(main)/explore/page.tsx`

- [ ] **Step 1: Add the import**

Add after the last existing import:

```tsx
import CardMediaBackground from '@/components/event/CardMediaBackground';
```

- [ ] **Step 2: Replace OriginalCard gradient div**

Inside the `OriginalCard` function, find and remove:
```tsx
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 50% 30%, ${event.media.ambientColor}30 0%, transparent 60%),
                         linear-gradient(180deg, #0A0A0A 0%, #050505 100%)`,
          }}
        />
```

Replace with:
```tsx
        <CardMediaBackground
          picsumSeed={event.slug}
          imageUrl={event.media.heroImage}
          ambientColor={event.media.ambientColor}
        />
```

- [ ] **Step 3: Boost OriginalCard frame border**

Inside `OriginalCard`, find:
`border border-white/[0.03] pointer-events-none`

Replace with:
`border border-white/[0.12] pointer-events-none`

- [ ] **Step 4: Replace GridCard gradient div**

Inside the `GridCard` function, find and remove:
```tsx
        <div
          className="absolute inset-0 transition-transform duration-[8s] ease-out group-hover:scale-[1.03]"
          style={{
            background: `radial-gradient(ellipse at 50% 30%, ${event.media.ambientColor}25 0%, transparent 50%),
                         linear-gradient(180deg, #0A0A0A 0%, #050505 100%)`,
          }}
        />
```

Replace with:
```tsx
        <CardMediaBackground
          picsumSeed={event.slug}
          imageUrl={event.media.heroImage}
          ambientColor={event.media.ambientColor}
          imageClassName="transition-transform duration-[8s] ease-out group-hover:scale-[1.03]"
        />
```

Note: The `transition-transform duration-[8s] ease-out group-hover:scale-[1.03]` moves from the old outer div to `imageClassName` on the inner wrapper — this preserves the hover zoom while `overflow-hidden` on the outer container clips it correctly. GridCard has no inset frame border div — no border boost step is needed for it.

- [ ] **Step 5: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add "app/(main)/explore/page.tsx"
git commit -m "feat: add CardMediaBackground to Explore OriginalCard and GridCard"
```

---

## Task 4: Update Originals page

**Files:**
- Modify: `app/(main)/originals/page.tsx`

- [ ] **Step 1: Add the import**

Add after the last existing import:

```tsx
import CardMediaBackground from '@/components/event/CardMediaBackground';
```

- [ ] **Step 2: Replace the card gradient div**

Inside each card (inside the `originals.map(...)` loop), find and remove:
```tsx
                <div
                  className="absolute inset-0 transition-transform duration-[12s] ease-out group-hover:scale-[1.04]"
                  style={{
                    background: `radial-gradient(ellipse at 50% 30%, ${event.media.ambientColor}35 0%, transparent 50%),
                                 linear-gradient(180deg, #0A0A0A 0%, #050505 100%)`,
                  }}
                />
```

Replace with:
```tsx
                <CardMediaBackground
                  picsumSeed={event.slug}
                  imageUrl={event.media.heroImage}
                  ambientColor={event.media.ambientColor}
                  imageClassName="transition-transform duration-[12s] ease-out group-hover:scale-[1.04]"
                />
```

- [ ] **Step 3: Add top scrim**

After the `CardMediaBackground` line and before the frame border div (`absolute inset-4 border border-accent-gold/[0.08] pointer-events-none`), add:
```tsx
                {/* Top scrim — keeps TopBar legible over bright images */}
                <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/75 to-transparent pointer-events-none" />
```

- [ ] **Step 4: Boost the frame border**

Find: `border border-accent-gold/[0.08] pointer-events-none`
Replace with: `border border-accent-gold/[0.12] pointer-events-none`

- [ ] **Step 5: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add "app/(main)/originals/page.tsx"
git commit -m "feat: add CardMediaBackground + top scrim to Originals page"
```

---

## Task 5: Update Profile page — upcoming and saved cards

**Files:**
- Modify: `app/(main)/profile/page.tsx`

Note: The `event` variable is already in scope in both sections — resolved by `getEventById(booking.eventId)` (upcoming) and directly available as the loop variable (saved). No new imports needed for event data. `imageUrl` is intentionally omitted — at h-20/h-24 the cards are too small for a hero image.

- [ ] **Step 1: Add the import**

Add after the last existing import in `profile/page.tsx`:

```tsx
import CardMediaBackground from '@/components/event/CardMediaBackground';
```

- [ ] **Step 2: Replace the upcoming bookings card gradient**

Find and replace the inline style div inside the upcoming bookings render:
```tsx
                    <div className="h-20" style={{
                      background: `radial-gradient(ellipse at 50% 30%, ${event.media.ambientColor}30, transparent 60%), linear-gradient(180deg, #141414, #050505)`,
                    }} />
```

Replace with:
```tsx
                    <div className="h-20 relative overflow-hidden">
                      <CardMediaBackground
                        picsumSeed={booking.eventSlug}
                        ambientColor={event.media.ambientColor}
                      />
                    </div>
```

- [ ] **Step 3: Replace the saved events card gradient**

Find and replace the inline style div inside the saved events render:
```tsx
                    <div className="h-24" style={{
                      background: `radial-gradient(ellipse at 50% 30%, ${event.media.ambientColor}25, transparent 50%), linear-gradient(180deg, #141414, #050505)`,
                    }} />
```

Replace with:
```tsx
                    <div className="h-24 relative overflow-hidden">
                      <CardMediaBackground
                        picsumSeed={event.slug}
                        ambientColor={event.media.ambientColor}
                      />
                    </div>
```

- [ ] **Step 4: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Smoke test**

```bash
npm run dev
```

Open `http://localhost:3000` and navigate through:
- `/explore` — both Originals carousel cards and grid cards should show picsum photos
- `/events/sunset-acoustics` — hero should show a photo with a dark top scrim keeping the back button legible
- `/originals` — full-height cards should show photos with top scrim
- `/profile` — upcoming bookings and saved cards should show picsum photos

Expected: no console errors, all cards show photos, text remains readable, TopBar legible on hero surfaces.

Kill dev server after verifying.

- [ ] **Step 6: Commit**

```bash
git add "app/(main)/profile/page.tsx"
git commit -m "feat: add CardMediaBackground to Profile upcoming and saved cards"
```
