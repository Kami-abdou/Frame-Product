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
    <>
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
    </>
  );
}
