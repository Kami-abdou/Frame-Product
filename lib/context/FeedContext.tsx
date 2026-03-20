'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { type EventCategory } from '@/lib/data/events';

interface FeedContextType {
  activeCategory: EventCategory | 'all';
  setActiveCategory: (cat: EventCategory | 'all') => void;
  activeIndex: number;
  setActiveIndex: (idx: number) => void;
}

const FeedContext = createContext<FeedContextType | undefined>(undefined);

export function FeedProvider({ children }: { children: React.ReactNode }) {
  const [activeCategory, setActiveCategory] = useState<EventCategory | 'all'>('all');
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSetCategory = useCallback((cat: EventCategory | 'all') => {
    setActiveCategory(cat);
    setActiveIndex(0);
  }, []);

  return (
    <FeedContext.Provider
      value={{
        activeCategory,
        setActiveCategory: handleSetCategory,
        activeIndex,
        setActiveIndex,
      }}
    >
      {children}
    </FeedContext.Provider>
  );
}

export function useFeed() {
  const ctx = useContext(FeedContext);
  if (!ctx) throw new Error('useFeed must be used within FeedProvider');
  return ctx;
}
