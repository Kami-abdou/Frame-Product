'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useFeed } from '@/lib/context/FeedContext';
import { type FrameEvent } from '@/lib/data/events';
import FeedCard from '@/components/feed/FeedCard';

interface FeedContainerProps {
  events: FrameEvent[];
}

export default function FeedContainer({ events }: FeedContainerProps) {
  const { activeIndex, setActiveIndex } = useFeed();
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setItemRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      itemRefs.current[index] = el;
    },
    [],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = itemRefs.current.indexOf(
              entry.target as HTMLDivElement,
            );
            if (index !== -1) {
              setActiveIndex(index);
            }
          }
        }
      },
      {
        root: container,
        threshold: 0.6,
      },
    );

    itemRefs.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => observer.disconnect();
  }, [events, setActiveIndex]);

  return (
    <div ref={containerRef} className="snap-container hide-scrollbar" style={{ zIndex: 0 }}>
      {events.map((event, index) => (
        <div key={event.id} ref={setItemRef(index)} className="snap-item">
          <FeedCard event={event} isActive={index === activeIndex} />
        </div>
      ))}

      {/* Scroll progress dots */}
      <div className="fixed right-2 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-1.5">
        {events.map((_, index) => (
          <div
            key={index}
            className={`w-[3px] rounded-full transition-all duration-500 ${
              index === activeIndex ? 'h-5 bg-frame-white' : 'h-1.5 bg-frame-smoke/20'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
