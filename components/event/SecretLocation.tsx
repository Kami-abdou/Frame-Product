'use client';

import Card from '@/components/ui/Card';

interface SecretLocationProps {
  locationName: string;
}

export default function SecretLocation({ locationName }: SecretLocationProps) {
  return (
    <Card className="relative overflow-hidden">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 border border-accent-electric/20 flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent-electric">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
        </div>
        <div>
          <h3 className="font-display font-medium text-frame-white text-sm uppercase tracking-wide">
            Secret Location
          </h3>
          <p className="text-frame-smoke/60 text-xs font-light">{locationName}</p>
        </div>
      </div>

      <div className="frame-border p-3 mb-3">
        <p className="text-frame-smoke text-sm blur-sm select-none" aria-hidden="true">
          42 Rue de la M&eacute;dina, Tunis 1000
        </p>
      </div>

      <p className="text-label-xs uppercase tracking-luxury text-frame-smoke/40 text-center">
        Exact address revealed after purchase
      </p>
    </Card>
  );
}
