# Social Sharing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wire up the share button on every event page to open a bottom sheet with a downloadable 9:16 story card, native OS share, and copy link — plus server-side OG images so links unfurl beautifully everywhere.

**Architecture:** Split the existing `'use client'` event page into a server wrapper (`page.tsx`) that exports `generateMetadata` and a client component (`EventDetailClient.tsx`) that handles UI. Add a `ShareSheet` component with an off-screen `StoryCard` captured by `html2canvas`. Add an `/api/og/[slug]` Edge route using `next/og`.

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS, Framer Motion, `html2canvas` (new), `next/og` (built-in)

> **Note:** This project has no test framework configured. All verification steps are manual (run `npm run dev`, open browser).

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Modify | `app/(main)/events/[slug]/page.tsx` | Server component wrapper + `generateMetadata` |
| Create | `components/event/EventDetailClient.tsx` | All client UI (extracted from page.tsx) |
| Create | `components/shared/StoryCard.tsx` | 1080×1920 branded PNG card |
| Create | `components/shared/ShareSheet.tsx` | Bottom sheet with 3 share actions |
| Create | `app/api/og/[slug]/route.tsx` | Edge OG image at 1200×630 |
| Modify | `package.json` | Add `html2canvas` |

---

## Task 1: Install html2canvas

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install the package**

```bash
cd "/Users/abdallahyaackoubi/Desktop/Project text/frame-app"
npm install html2canvas
```

Expected: `package.json` now has `"html2canvas": "^1.4.1"` (or latest) in `dependencies`.

- [ ] **Step 2: Verify TypeScript types are included**

```bash
ls node_modules/html2canvas/dist/types
```

Expected: `html2canvas.d.ts` exists. No `@types/html2canvas` needed — types ship with the package.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install html2canvas for story card capture"
```

---

## Task 2: Server/client page split

**Files:**
- Create: `components/event/EventDetailClient.tsx`
- Modify: `app/(main)/events/[slug]/page.tsx`

The current `page.tsx` is a `'use client'` component that calls `useParams` internally. We need `generateMetadata` (Server Component only). The fix: extract all UI into `EventDetailClient.tsx` which receives `event` as a prop, then make `page.tsx` a Server Component.

- [ ] **Step 1: Create `components/event/EventDetailClient.tsx`**

This is the full contents of the current `page.tsx`, adapted to accept `event: FrameEvent | null` as a prop instead of calling `useParams`/`getEventBySlug`. The `[isShareSheetOpen, setIsShareSheetOpen]` state will be added here in Task 6; for now just extract the existing code.

```tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';
import { fadeUp } from '@/lib/utils/constants';
import {
  formatFullDate,
  formatTimeRange,
  formatPrice,
  getStartingPrice,
  formatCapacity,
} from '@/lib/utils/formatters';
import { FrameEvent } from '@/lib/data/events';
import TopBar from '@/components/layout/TopBar';
import EventHero from '@/components/event/EventHero';
import PricingTiers from '@/components/event/PricingTiers';
import SecretLocation from '@/components/event/SecretLocation';
import CapacityIndicator from '@/components/event/CapacityIndicator';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function EventDetailClient({ event }: { event: FrameEvent | null }) {
  const [descExpanded, setDescExpanded] = useState(false);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-frame-black">
        <div className="text-center p-8">
          <div className="w-16 h-16 border border-white/[0.06] flex items-center justify-center mx-auto mb-6">
            <span className="font-display text-frame-smoke text-xl">?</span>
          </div>
          <h1 className="font-display text-display-md text-frame-white mb-2">
            Event Not Found
          </h1>
          <p className="text-frame-smoke text-sm font-light mb-8">
            This event does not exist or has been removed.
          </p>
          <Link href="/">
            <Button variant="outline">Back to Discover</Button>
          </Link>
        </div>
      </div>
    );
  }

  const startingPrice = getStartingPrice(event.tiers);
  const startTime = new Date(event.date).getTime();
  const endTime = new Date(event.endDate).getTime();
  const durationHours = Math.round((endTime - startTime) / (1000 * 60 * 60));

  const infoPills = [
    { label: 'Date', value: formatFullDate(event.date), sub: formatTimeRange(event.date, event.endDate) },
    { label: 'Location', value: event.location.isSecret ? 'Secret Location' : event.location.name, sub: event.location.isSecret ? 'Revealed after purchase' : event.location.city },
    { label: 'Capacity', value: formatCapacity(event.capacity.sold, event.capacity.total), sub: `${event.capacity.total} total spots` },
    { label: 'Duration', value: `${durationHours}h`, sub: 'Approximate' },
  ];

  return (
    <div className="min-h-screen" style={{ background: `radial-gradient(ellipse at 20% 85%, ${event.media.ambientColor}18 0%, transparent 50%), #050505` }}>
      <TopBar
        transparent
        showBack
        rightAction={
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="w-8 h-8 flex items-center justify-center text-frame-smoke hover:text-frame-white transition-colors"
            aria-label="Share"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
          </motion.button>
        }
      />

      <EventHero event={event} />

      <div className="px-5 -mt-4 relative z-10">
        <div className="flex gap-3 overflow-x-auto pb-4 hide-scrollbar">
          {infoPills.map((pill, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <Card className="min-w-[130px] flex-shrink-0 !p-3">
                <p className="text-label-xs uppercase tracking-luxury text-frame-smoke/60 mb-1.5">{pill.label}</p>
                <p className="text-sm font-medium text-frame-white truncate">{pill.value}</p>
                <p className="text-xs text-frame-smoke/50 truncate">{pill.sub}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="px-6 pb-28 space-y-8">
        <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 className="font-display text-label-lg uppercase tracking-luxury text-frame-white mb-3">About</h2>
          <div className="relative">
            <p className={cn('text-frame-smoke text-sm font-light leading-relaxed', !descExpanded && 'line-clamp-3')}>
              {event.description}
            </p>
            {event.description.length > 150 && (
              <button onClick={() => setDescExpanded(!descExpanded)} className="text-frame-white text-sm font-medium mt-2 cursor-pointer">
                {descExpanded ? 'Show less' : 'Read more'}
              </button>
            )}
          </div>
        </motion.section>

        <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 className="font-display text-label-lg uppercase tracking-luxury text-frame-white mb-3">Availability</h2>
          <CapacityIndicator sold={event.capacity.sold} total={event.capacity.total} />
        </motion.section>

        <section>
          <h2 className="font-display text-label-lg uppercase tracking-luxury text-frame-white mb-3">Tickets</h2>
          <PricingTiers tiers={event.tiers} onSelectTier={() => {}} />
        </section>

        {event.location.isSecret && (
          <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <SecretLocation locationName={event.location.name} />
          </motion.section>
        )}

        <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 className="font-display text-label-lg uppercase tracking-luxury text-frame-white mb-3">Hosted by</h2>
          <Card className="flex items-center gap-4">
            <div
              className="w-10 h-10 flex items-center justify-center font-display font-semibold text-sm border border-white/[0.08]"
              style={{ color: event.media.ambientColor }}
            >
              {event.organizer.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-display font-medium text-frame-white text-sm truncate">{event.organizer.name}</span>
                {event.organizer.verified && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-accent-gold flex-shrink-0">
                    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                )}
              </div>
              <p className="text-frame-smoke/60 text-xs">Event Organizer</p>
            </div>
          </Card>
        </motion.section>

        {event.tags.length > 0 && (
          <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="font-display text-label-lg uppercase tracking-luxury text-frame-white mb-3">Tags</h2>
            <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
              {event.tags.map((tag) => (
                <span key={tag} className="flex-shrink-0 px-3 py-1.5 frame-border text-xs text-frame-smoke/60 font-light">
                  #{tag}
                </span>
              ))}
            </div>
          </motion.section>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40">
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <div className="bg-frame-black/90 backdrop-blur-xl">
          <div className="flex items-center justify-between px-6 py-4 max-w-lg mx-auto">
            <div>
              <p className="text-label-xs uppercase tracking-luxury text-frame-smoke/50">Starting from</p>
              <p className="font-display font-semibold text-frame-white text-lg">
                {startingPrice > 0 ? formatPrice(startingPrice) : 'Sold Out'}
              </p>
            </div>
            <Link href={`/events/${event.slug}/book`}>
              <Button variant="primary" size="lg" disabled={event.status === 'sold_out'}>
                {event.status === 'sold_out' ? 'Sold Out' : 'Book Now'}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Replace `app/(main)/events/[slug]/page.tsx` with a server component**

```tsx
import { Metadata } from 'next';
import { getEventBySlug } from '@/lib/data/events';
import { getStartingPrice, formatPrice, formatShortDate } from '@/lib/utils/formatters';
import EventDetailClient from '@/components/event/EventDetailClient';

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const event = getEventBySlug(params.slug);
  if (!event) return { title: 'Frame — Curated Events' };

  const price = getStartingPrice(event.tiers);
  const priceLabel = price > 0 ? formatPrice(price) : 'Free';
  const dateLabel = formatShortDate(event.date);

  return {
    title: event.title,
    description: event.description,
    openGraph: {
      title: event.title,
      description: `${dateLabel} · ${event.location.city} · ${priceLabel}`,
      images: [`/api/og/${params.slug}`],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      images: [`/api/og/${params.slug}`],
    },
  };
}

export default function EventDetailPage({ params }: { params: { slug: string } }) {
  const event = getEventBySlug(params.slug);
  return <EventDetailClient event={event ?? null} />;
}
```

- [ ] **Step 3: Verify the page still works**

```bash
npm run dev
```

Open `http://localhost:3000/events/[any-slug]`. The event page should render identically to before. Check that navigating back works, pricing is shown, Book Now still routes to `/events/slug/book`.

- [ ] **Step 4: Commit**

```bash
git add app/\(main\)/events/\[slug\]/page.tsx components/event/EventDetailClient.tsx
git commit -m "refactor: split event page into server wrapper + client component"
```

---

## Task 3: OG image API route

**Files:**
- Create: `app/api/og/[slug]/route.tsx`

`next/og` is built into Next.js 14 — no separate install needed. The route runs on the Edge Runtime and returns a 1200×630 image.

- [ ] **Step 1: Create `app/api/og/[slug]/route.tsx`**

```tsx
import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { getEventBySlug } from '@/lib/data/events';
import { getStartingPrice, formatPrice, formatShortDate } from '@/lib/utils/formatters';

export const runtime = 'edge';

export async function GET(
  _req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const event = getEventBySlug(params.slug);

  if (!event) {
    return new Response('Not found', { status: 404 });
  }

  const price = getStartingPrice(event.tiers);
  const priceLabel = price > 0 ? `From ${formatPrice(price)}` : 'Free';
  const dateLabel = formatShortDate(event.date);

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '1200px',
          height: '630px',
          background: '#050505',
        }}
      >
        {/* Left 60%: cover image */}
        <img
          src={event.media.heroImage}
          style={{ width: '720px', height: '630px', objectFit: 'cover' }}
          alt=""
        />
        {/* Right 40%: info panel */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '48px',
            flex: 1,
            background: '#050505',
            borderLeft: `3px solid ${event.media.ambientColor}`,
          }}
        >
          <div
            style={{
              color: '#FFFFFF',
              fontSize: '11px',
              letterSpacing: '6px',
              marginBottom: '28px',
              opacity: 0.35,
            }}
          >
            FRAME
          </div>
          <div
            style={{
              color: '#FFFFFF',
              fontSize: '30px',
              fontWeight: 700,
              lineHeight: 1.15,
              marginBottom: '16px',
            }}
          >
            {event.title}
          </div>
          <div style={{ color: '#888888', fontSize: '15px', marginBottom: '6px' }}>
            {dateLabel} · {event.location.city}
          </div>
          <div
            style={{
              color: event.media.ambientColor,
              fontSize: '17px',
              marginTop: '28px',
              fontWeight: 500,
            }}
          >
            {priceLabel}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    }
  );
}
```

- [ ] **Step 2: Verify the OG image renders**

Visit `http://localhost:3000/api/og/[any-valid-slug]` in the browser. You should see a 1200×630 image. Visit `http://localhost:3000/api/og/nonexistent` — should return 404.

- [ ] **Step 3: Commit**

```bash
git add app/api/og/
git commit -m "feat: add OG image API route for event link unfurls"
```

---

## Task 4: StoryCard component

**Files:**
- Create: `components/shared/StoryCard.tsx`

The card renders at 1080×1920 CSS pixels. It is a pure presentational component with a `forwardRef` so the parent (`ShareSheet`) can pass a ref for html2canvas capture.

- [ ] **Step 1: Create `components/shared/StoryCard.tsx`**

```tsx
import { forwardRef } from 'react';
import { FrameEvent } from '@/lib/data/events';
import { formatShortDate, getStartingPrice, formatPrice } from '@/lib/utils/formatters';

interface StoryCardProps {
  event: FrameEvent;
}

const StoryCard = forwardRef<HTMLDivElement, StoryCardProps>(({ event }, ref) => {
  const price = getStartingPrice(event.tiers);
  const priceLabel = price > 0 ? `From ${formatPrice(price)}` : 'Free';
  const dateCity = `${formatShortDate(event.date)} · ${event.location.city}`;
  const eventUrl = `frame.app/events/${event.slug}`;

  return (
    <div
      ref={ref}
      style={{
        width: '1080px',
        height: '1920px',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        background: '#050505',
        flexShrink: 0,
      }}
    >
      {/* Cover image */}
      <img
        src={event.media.heroImage}
        crossOrigin="anonymous"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
        alt=""
      />

      {/* Dark overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.55)',
        }}
      />

      {/* Ambient glow at bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '700px',
          background: `radial-gradient(ellipse at 50% 100%, ${event.media.ambientColor}35 0%, transparent 70%)`,
        }}
      />

      {/* FRAME wordmark — top left */}
      <div
        style={{
          position: 'absolute',
          top: '80px',
          left: '80px',
          color: '#FFFFFF',
          fontSize: '26px',
          letterSpacing: '14px',
          opacity: 0.45,
        }}
      >
        FRAME
      </div>

      {/* Bottom content block */}
      <div
        style={{
          position: 'absolute',
          bottom: '180px',
          left: '80px',
          right: '80px',
        }}
      >
        {/* Event title */}
        <div
          style={{
            color: '#FFFFFF',
            fontSize: '96px',
            fontWeight: 700,
            lineHeight: 1.05,
            marginBottom: '28px',
          }}
        >
          {event.title}
        </div>

        {/* Date + city */}
        <div
          style={{
            color: 'rgba(255, 255, 255, 0.55)',
            fontSize: '40px',
            fontWeight: 300,
            marginBottom: '72px',
          }}
        >
          {dateCity}
        </div>

        {/* CTA pill */}
        <div
          style={{
            display: 'inline-block',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            padding: '22px 52px',
            color: '#FFFFFF',
            fontSize: '30px',
            letterSpacing: '5px',
            marginBottom: '36px',
          }}
        >
          GET TICKETS →
        </div>

        {/* Event URL */}
        <div
          style={{
            display: 'block',
            color: 'rgba(255, 255, 255, 0.28)',
            fontSize: '26px',
            letterSpacing: '2px',
          }}
        >
          {eventUrl}
        </div>
      </div>
    </div>
  );
});

StoryCard.displayName = 'StoryCard';
export default StoryCard;
```

- [ ] **Step 2: Verify it renders (visual check)**

Temporarily add this to `EventDetailClient.tsx` (import at top, render inside the return div), run dev on any event page, confirm the card looks correct at full size, then remove both lines:

```tsx
import { events } from '@/lib/data/events'; // temp
<StoryCard event={events[0]} />              // temp — remove after checking
```

- [ ] **Step 3: Commit**

```bash
git add components/shared/StoryCard.tsx
git commit -m "feat: add StoryCard component for 1080x1920 story sharing"
```

---

## Task 5: ShareSheet component

**Files:**
- Create: `components/shared/ShareSheet.tsx`

The sheet slides up from the bottom. It shows a scaled preview of the story card, a download button (triggers html2canvas capture of the off-screen full-size card), a share button, and a copy link button.

- [ ] **Step 1: Create `components/shared/ShareSheet.tsx`**

```tsx
'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FrameEvent } from '@/lib/data/events';
import StoryCard from './StoryCard';
import Button from '@/components/ui/Button';

interface ShareSheetProps {
  event: FrameEvent;
  isOpen: boolean;
  onClose: () => void;
}

export default function ShareSheet({ event, isOpen, onClose }: ShareSheetProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [copied, setCopied] = useState(false);

  const eventUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/events/${event.slug}`
      : `/events/${event.slug}`;

  async function handleDownload() {
    if (!cardRef.current || isCapturing) return;
    setIsCapturing(true);
    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(cardRef.current, {
        useCORS: true,
        scale: 1,
        logging: false,
      });
      const link = document.createElement('a');
      link.download = `${event.slug}-frame.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } finally {
      setIsCapturing(false);
    }
  }

  async function handleShare() {
    try {
      if (navigator.share) {
        await navigator.share({
          title: event.title,
          text: 'Check out this event on Frame',
          url: eventUrl,
        });
      } else {
        await handleCopy();
      }
    } catch {
      // user cancelled share — ignore
    }
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(eventUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 max-w-lg mx-auto"
          >
            <div className="bg-frame-black/95 backdrop-blur-xl border-t border-white/[0.06] rounded-t-2xl px-6 pt-4 pb-10">
              {/* Drag handle */}
              <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-6" />

              {/* Story card preview — scaled display only, not the capture target */}
              <div className="flex justify-center mb-6">
                <div
                  style={{
                    width: '135px',
                    height: '240px',
                    overflow: 'hidden',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.08)',
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      transform: 'scale(0.125)',
                      transformOrigin: 'top left',
                      width: '1080px',
                      height: '1920px',
                    }}
                  >
                    <StoryCard event={event} />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Button
                  variant="primary"
                  fullWidth
                  onClick={handleDownload}
                  disabled={isCapturing}
                >
                  {isCapturing ? 'Generating…' : '↓  Download Story Card'}
                </Button>

                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" onClick={handleShare}>
                    Share
                  </Button>
                  <Button variant="outline" onClick={handleCopy}>
                    {copied ? 'Copied!' : 'Copy Link'}
                  </Button>
                </div>

                <Button variant="ghost" fullWidth onClick={onClose}>
                  Cancel
                </Button>
              </div>
            </div>
          </motion.div>

        </>
      )}
    </AnimatePresence>

    {/* Off-screen StoryCard — always in DOM, capture target for html2canvas.
        Uses position:absolute (NOT position:fixed) to avoid iOS Safari scroll-offset issues.
        top:-9999px places it above the document so it is never visible. */}
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: '-9999px',
        left: 0,
        pointerEvents: 'none',
      }}
    >
      <StoryCard ref={cardRef} event={event} />
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/shared/ShareSheet.tsx components/shared/StoryCard.tsx
git commit -m "feat: add ShareSheet bottom sheet with story card download and share actions"
```

---

## Task 6: Wire share button in EventDetailClient

**Files:**
- Modify: `components/event/EventDetailClient.tsx`

Three changes: add `isShareSheetOpen` state, wire the share button's `onClick`, render `<ShareSheet>` at the bottom.

- [ ] **Step 1: Add state + import at the top of `EventDetailClient.tsx`**

Add `isShareSheetOpen` to the existing `useState` imports:

```tsx
// Add this import at the top (after existing imports)
import ShareSheet from '@/components/shared/ShareSheet';
```

Change the state declarations:

```tsx
const [descExpanded, setDescExpanded] = useState(false);
const [isShareSheetOpen, setIsShareSheetOpen] = useState(false);
```

- [ ] **Step 2: Wire the share button's onClick**

Find the existing `motion.button` with `aria-label="Share"` in the `TopBar` `rightAction` prop. Add `onClick`:

```tsx
<motion.button
  whileTap={{ scale: 0.9 }}
  onClick={() => setIsShareSheetOpen(true)}
  className="w-8 h-8 flex items-center justify-center text-frame-smoke hover:text-frame-white transition-colors"
  aria-label="Share"
>
  <svg ...>...</svg>
</motion.button>
```

- [ ] **Step 3: Render ShareSheet at the bottom of the return, before closing `</div>`**

Add `<ShareSheet>` after the sticky bottom bar block (still inside the outermost `<div>`):

```tsx
      {/* Share Sheet */}
      <ShareSheet
        event={event}
        isOpen={isShareSheetOpen}
        onClose={() => setIsShareSheetOpen(false)}
      />
    </div>
  );
}
```

- [ ] **Step 4: End-to-end manual test**

```bash
npm run dev
```

Open any event page. Tap the share icon (top right):
- Share sheet should slide up
- Story card preview should be visible inside the sheet
- "Copy Link" → copies `localhost:3000/events/[slug]` (check clipboard)
- "Share" → opens native share sheet on mobile / falls back to copy on desktop
- "Download Story Card" → button shows "Generating…" for ~1s, then downloads `[slug]-frame.png`
- Open the PNG — should be a 1080×1920 branded card with the event image, title, date, CTA
- Tapping the backdrop or Cancel closes the sheet

Also verify OG meta tags: view source of any event page, confirm `<meta property="og:image" content="/api/og/[slug]">` is present.

- [ ] **Step 5: Commit**

```bash
git add components/event/EventDetailClient.tsx
git commit -m "feat: wire share button to open ShareSheet on event detail page"
```

---

## Done

All 6 tasks complete. The share button on every event page now opens a bottom sheet with:
- A 9:16 story card preview + download
- Native OS share (with link fallback)
- Copy link

Links shared anywhere (iMessage, Instagram DMs, TikTok bio) unfurl with a branded 1200×630 OG image.
