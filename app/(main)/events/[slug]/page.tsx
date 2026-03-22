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
