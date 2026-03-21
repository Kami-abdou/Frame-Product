'use client';

import { useFeed } from '@/lib/context/FeedContext';
import { categories } from '@/lib/data/categories';
import Logo from '@/components/shared/Logo';
import Chip from '@/components/ui/Chip';

export default function CategoryBar() {
  const { activeCategory, setActiveCategory } = useFeed();

  return (
    <div className="fixed top-0 left-0 right-0 z-30">
      {/* Logo row */}
      <div className="flex items-center justify-between px-4 pt-3 pb-1 [filter:drop-shadow(0_1px_6px_rgba(0,0,0,0.95))]">
        <Logo size="sm" className="text-frame-white" />
        <span className="text-label-xs uppercase tracking-luxury text-frame-smoke/50">
          {activeCategory === 'all' ? 'All Scenes' : activeCategory}
        </span>
      </div>

      {/* Categories */}
      <div className="flex items-center gap-0 px-2 pb-2 overflow-x-auto hide-scrollbar [filter:drop-shadow(0_1px_6px_rgba(0,0,0,0.95))]">
        <Chip
          label="All"
          active={activeCategory === 'all'}
          onClick={() => setActiveCategory('all')}
        />
        {categories.map((cat) => (
          <Chip
            key={cat.id}
            label={cat.label}
            active={activeCategory === cat.id}
            onClick={() => setActiveCategory(cat.id as typeof activeCategory)}
          />
        ))}
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
    </div>
  );
}
