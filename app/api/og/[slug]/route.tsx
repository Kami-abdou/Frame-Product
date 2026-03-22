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
  const picsumUrl = `https://picsum.photos/seed/${event.slug}/1200/2000`;

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
          src={picsumUrl}
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
