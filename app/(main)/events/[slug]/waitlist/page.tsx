'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getEventBySlug } from '@/lib/data/events';
import {
  waitlistEntries,
  type WaitlistEntry,
} from '@/lib/data/waitlist';
import TopBar from '@/components/layout/TopBar';
import WaitlistForm from '@/components/waitlist/WaitlistForm';
import WaitlistPosition from '@/components/waitlist/WaitlistPosition';
import Button from '@/components/ui/Button';

// Mock current user ID (matches the waitlist data)
const MOCK_USER_ID = 'usr-001';

export default function WaitlistPage() {
  const params = useParams();
  const slug = params.slug as string;
  const event = getEventBySlug(slug);

  // Check if user already on waitlist for this event
  const existingEntry = waitlistEntries.find(
    (w) => w.userId === MOCK_USER_ID && w.eventSlug === slug
  );

  const [joined, setJoined] = useState<WaitlistEntry | null>(
    existingEntry ?? null
  );

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-frame-black">
        <div className="text-center p-6">
          <h1 className="font-display text-display-md font-bold text-frame-white mb-2">
            Event Not Found
          </h1>
          <p className="text-frame-smoke mb-6">
            This event does not exist or has been removed.
          </p>
          <Link href="/">
            <Button variant="outline">Back to Discover</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleJoinWaitlist = (tierId: string) => {
    const tier = event.tiers.find((t) => t.id === tierId);
    const newEntry: WaitlistEntry = {
      id: `wl-${Date.now()}`,
      userId: MOCK_USER_ID,
      eventId: event.id,
      eventSlug: event.slug,
      tierId,
      tierLabel: tier?.label ?? 'Unknown',
      position: Math.floor(Math.random() * 30) + 5,
      status: 'waiting',
      joinedAt: new Date().toISOString(),
    };
    setJoined(newEntry);
  };

  // Estimate total in queue for the tier
  const totalInQueue = joined ? joined.position + Math.floor(Math.random() * 10) + 5 : 30;

  return (
    <div className="min-h-screen bg-frame-black">
      <TopBar title={event.title} showBack />

      <div className="pt-16 px-6 pb-12">
        {!joined ? (
          <WaitlistForm event={event} onJoin={handleJoinWaitlist} />
        ) : (
          <WaitlistPosition
            position={joined.position}
            totalInQueue={totalInQueue}
            tierLabel={joined.tierLabel}
          />
        )}
      </div>
    </div>
  );
}
