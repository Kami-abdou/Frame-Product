import { forwardRef } from 'react';
import { FrameEvent } from '@/lib/data/events';
import { formatShortDate } from '@/lib/utils/formatters';

interface StoryCardProps {
  event: FrameEvent;
}

const StoryCard = forwardRef<HTMLDivElement, StoryCardProps>(({ event }, ref) => {
  const dateCity = `${formatShortDate(event.date)} · ${event.location.city}`;
  const picsumUrl = `https://picsum.photos/seed/${event.slug}/1200/2000`;
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
        src={picsumUrl}
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
