'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';
import { fadeUp, stagger } from '@/lib/utils/constants';
import { categories } from '@/lib/data/categories';
import { currentUser } from '@/lib/data/users';
import TopBar from '@/components/layout/TopBar';
import Button from '@/components/ui/Button';
import Chip from '@/components/ui/Chip';

const cities = [
  'Tunis',
  'La Marsa',
  'Gammarth',
  'Carthage',
  'Sidi Bou Said',
  'Hammamet',
  'Sousse',
  'Djerba',
];

export default function PreferencesPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    currentUser.preferences.favoriteCategories
  );
  const [selectedCities, setSelectedCities] = useState<string[]>([
    currentUser.city,
  ]);

  function toggleCategory(catId: string) {
    setSelectedCategories((prev) =>
      prev.includes(catId)
        ? prev.filter((c) => c !== catId)
        : [...prev, catId]
    );
  }

  function toggleCity(city: string) {
    setSelectedCities((prev) =>
      prev.includes(city)
        ? prev.filter((c) => c !== city)
        : [...prev, city]
    );
  }

  function handleSave() {
    alert('Preferences saved!');
  }

  return (
    <div className="min-h-screen bg-frame-black pb-24">
      <TopBar title="Preferences" showBack />

      <div className="pt-16 px-4">
        {/* Your Interests */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <motion.h2
            variants={fadeUp}
            className="font-display text-sm uppercase tracking-luxury text-frame-white mb-4"
          >
            Your Interests
          </motion.h2>

          <div className="grid grid-cols-2 gap-3">
            {categories.map((cat) => {
              const isSelected = selectedCategories.includes(cat.id);

              return (
                <motion.button
                  key={cat.id}
                  variants={fadeUp}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => toggleCategory(cat.id)}
                  className={cn(
                    'rounded-card p-4 text-left transition-all duration-200',
                    isSelected
                      ? 'border border-accent-gold bg-accent-gold/10'
                      : 'glass border border-transparent'
                  )}
                >
                  <span className="text-2xl block mb-2">{cat.icon}</span>
                  <h3 className="font-display text-sm text-frame-white uppercase tracking-wide">
                    {cat.label}
                  </h3>
                  <p className="text-frame-smoke text-xs mt-1 line-clamp-2">
                    {cat.description}
                  </p>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Preferred Cities */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="mb-10"
        >
          <motion.h2
            variants={fadeUp}
            className="font-display text-sm uppercase tracking-luxury text-frame-white mb-4"
          >
            Preferred Cities
          </motion.h2>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
            {cities.map((city) => {
              const isSelected = selectedCities.includes(city);

              return (
                <Chip
                  key={city}
                  label={city}
                  active={isSelected}
                  onClick={() => toggleCity(city)}
                />
              );
            })}
          </motion.div>
        </motion.div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button variant="gold" fullWidth onClick={handleSave}>
            Save Preferences
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
