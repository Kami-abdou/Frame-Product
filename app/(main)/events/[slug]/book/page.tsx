'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { getEventBySlug } from '@/lib/data/events';
import { useBooking } from '@/lib/context/BookingContext';
import TopBar from '@/components/layout/TopBar';
import TierSelector from '@/components/booking/TierSelector';
import QuantityPicker from '@/components/booking/QuantityPicker';
import CheckoutSummary from '@/components/booking/CheckoutSummary';
import BookingConfirmation from '@/components/booking/BookingConfirmation';
import Button from '@/components/ui/Button';

const stepLabels: Record<string, string> = {
  tier: 'Select Tier',
  quantity: 'Quantity',
  checkout: 'Checkout',
  confirmed: 'Confirmed',
};

const stepNumbers: Record<string, number> = {
  tier: 1,
  quantity: 2,
  checkout: 3,
  confirmed: 3,
};

export default function BookingPage() {
  const params = useParams();
  const slug = params.slug as string;
  const event = getEventBySlug(slug);

  const booking = useBooking();
  const { startBooking, event: bookingEvent } = booking;

  useEffect(() => {
    if (event && bookingEvent?.slug !== event.slug) {
      startBooking(event);
    }
  }, [event, bookingEvent?.slug, startBooking]);

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

  const isConfirmed = booking.step === 'confirmed';

  return (
    <div className="min-h-screen bg-frame-black">
      <TopBar
        title={isConfirmed ? undefined : `Step ${stepNumbers[booking.step]} of 3`}
        showBack={!isConfirmed}
        rightAction={
          !isConfirmed ? (
            <span className="text-label-xs uppercase tracking-luxury text-frame-smoke/50">
              {stepLabels[booking.step]}
            </span>
          ) : undefined
        }
      />

      {/* Progress bar */}
      {!isConfirmed && (
        <div className="fixed top-12 left-0 right-0 z-40 h-px bg-frame-steel">
          <motion.div
            className="h-full bg-accent-gold"
            initial={false}
            animate={{ width: `${(stepNumbers[booking.step] / 3) * 100}%` }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      )}

      <div className="pt-14 px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={booking.step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {booking.step === 'tier' && (
              <TierSelector
                tiers={event.tiers}
                selectedTier={booking.selectedTier}
                onSelect={booking.selectTier}
                onContinue={booking.nextStep}
              />
            )}
            {booking.step === 'quantity' && booking.selectedTier && (
              <QuantityPicker
                tier={booking.selectedTier}
                quantity={booking.quantity}
                onQuantityChange={booking.setQuantity}
                onContinue={booking.nextStep}
                onBack={booking.prevStep}
              />
            )}
            {booking.step === 'checkout' && booking.selectedTier && (
              <CheckoutSummary
                event={event}
                tier={booking.selectedTier}
                quantity={booking.quantity}
                totalPrice={booking.totalPrice}
                serviceFee={booking.serviceFee}
                grandTotal={booking.grandTotal}
                onConfirm={booking.confirmBooking}
                onBack={booking.prevStep}
              />
            )}
            {booking.step === 'confirmed' && booking.ticketCode && booking.selectedTier && (
              <BookingConfirmation
                event={event}
                ticketCode={booking.ticketCode}
                quantity={booking.quantity}
                tierLabel={booking.selectedTier.label}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
