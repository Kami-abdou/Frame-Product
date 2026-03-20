'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { type PricingTier, type FrameEvent } from '@/lib/data/events';

export type BookingStep = 'tier' | 'quantity' | 'checkout' | 'confirmed';

interface BookingState {
  event: FrameEvent | null;
  selectedTier: PricingTier | null;
  quantity: number;
  step: BookingStep;
  ticketCode: string | null;
}

interface BookingContextType extends BookingState {
  startBooking: (event: FrameEvent, tier?: PricingTier) => void;
  selectTier: (tier: PricingTier) => void;
  setQuantity: (qty: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  confirmBooking: () => void;
  resetBooking: () => void;
  totalPrice: number;
  serviceFee: number;
  grandTotal: number;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

function generateTicketCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const seg = () =>
    Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `FRAME-${seg()}-${seg()}`;
}

const stepOrder: BookingStep[] = ['tier', 'quantity', 'checkout', 'confirmed'];

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<BookingState>({
    event: null,
    selectedTier: null,
    quantity: 1,
    step: 'tier',
    ticketCode: null,
  });

  const startBooking = useCallback((event: FrameEvent, tier?: PricingTier) => {
    setState({
      event,
      selectedTier: tier || null,
      quantity: 1,
      step: tier ? 'quantity' : 'tier',
      ticketCode: null,
    });
  }, []);

  const selectTier = useCallback((tier: PricingTier) => {
    setState((prev) => ({ ...prev, selectedTier: tier }));
  }, []);

  const setQuantity = useCallback((qty: number) => {
    setState((prev) => ({ ...prev, quantity: Math.max(1, Math.min(6, qty)) }));
  }, []);

  const nextStep = useCallback(() => {
    setState((prev) => {
      const idx = stepOrder.indexOf(prev.step);
      if (idx < stepOrder.length - 1) {
        return { ...prev, step: stepOrder[idx + 1] };
      }
      return prev;
    });
  }, []);

  const prevStep = useCallback(() => {
    setState((prev) => {
      const idx = stepOrder.indexOf(prev.step);
      if (idx > 0) {
        return { ...prev, step: stepOrder[idx - 1] };
      }
      return prev;
    });
  }, []);

  const confirmBooking = useCallback(() => {
    setState((prev) => ({
      ...prev,
      step: 'confirmed',
      ticketCode: generateTicketCode(),
    }));
  }, []);

  const resetBooking = useCallback(() => {
    setState({
      event: null,
      selectedTier: null,
      quantity: 1,
      step: 'tier',
      ticketCode: null,
    });
  }, []);

  const totalPrice = (state.selectedTier?.price || 0) * state.quantity;
  const serviceFee = Math.round(totalPrice * 0.05);
  const grandTotal = totalPrice + serviceFee;

  return (
    <BookingContext.Provider
      value={{
        ...state,
        startBooking,
        selectTier,
        setQuantity,
        nextStep,
        prevStep,
        confirmBooking,
        resetBooking,
        totalPrice,
        serviceFee,
        grandTotal,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used within BookingProvider');
  return ctx;
}
