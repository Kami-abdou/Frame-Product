'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';
import { fadeUp, stagger } from '@/lib/utils/constants';
import { categories } from '@/lib/data/categories';
import TopBar from '@/components/layout/TopBar';
import Button from '@/components/ui/Button';

interface PricingTier {
  name: string;
  price: string;
  capacity: string;
}

const inputClasses =
  'w-full glass rounded-xl px-4 py-3 text-frame-white placeholder-frame-smoke border border-frame-steel focus:border-accent-gold focus:outline-none transition-colors text-sm';

const labelClasses = 'block text-frame-smoke text-xs uppercase tracking-wide mb-1.5';

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

export default function NewEventPage() {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [venueName, setVenueName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [secretLocation, setSecretLocation] = useState(false);
  const [waitlistEnabled, setWaitlistEnabled] = useState(false);
  const [tiers, setTiers] = useState<PricingTier[]>([
    { name: '', price: '', capacity: '' },
  ]);

  function addTier() {
    setTiers((prev) => [...prev, { name: '', price: '', capacity: '' }]);
  }

  function removeTier(index: number) {
    setTiers((prev) => prev.filter((_, i) => i !== index));
  }

  function updateTier(index: number, field: keyof PricingTier, value: string) {
    setTiers((prev) =>
      prev.map((tier, i) => (i === index ? { ...tier, [field]: value } : tier))
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert('Event created!');
  }

  return (
    <div className="min-h-screen bg-frame-black">
      <TopBar title="Create Event" showBack />

      <form onSubmit={handleSubmit} className="pt-16 px-4 lg:px-8 pb-12 max-w-2xl mx-auto">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Basic Info */}
          <motion.section variants={fadeUp}>
            <h2 className="font-display text-sm uppercase tracking-luxury text-frame-white mb-4">
              Basic Info
            </h2>
            <div className="space-y-4">
              <div>
                <label className={labelClasses}>Title</label>
                <input
                  type="text"
                  placeholder="Event title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={inputClasses}
                />
              </div>
              <div>
                <label className={labelClasses}>Subtitle</label>
                <input
                  type="text"
                  placeholder="A short tagline"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className={inputClasses}
                />
              </div>
              <div>
                <label className={labelClasses}>Description</label>
                <textarea
                  placeholder="Describe the event..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className={cn(inputClasses, 'resize-none')}
                />
              </div>
              <div>
                <label className={labelClasses}>Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={cn(inputClasses, 'appearance-none')}
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.icon} {cat.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.section>

          {/* Date & Time */}
          <motion.section variants={fadeUp}>
            <h2 className="font-display text-sm uppercase tracking-luxury text-frame-white mb-4">
              Date & Time
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>Start</label>
                <input
                  type="datetime-local"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className={inputClasses}
                />
              </div>
              <div>
                <label className={labelClasses}>End</label>
                <input
                  type="datetime-local"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className={inputClasses}
                />
              </div>
            </div>
          </motion.section>

          {/* Location */}
          <motion.section variants={fadeUp}>
            <h2 className="font-display text-sm uppercase tracking-luxury text-frame-white mb-4">
              Location
            </h2>
            <div className="space-y-4">
              <div>
                <label className={labelClasses}>Venue Name</label>
                <input
                  type="text"
                  placeholder="e.g. Villa Les Oliviers"
                  value={venueName}
                  onChange={(e) => setVenueName(e.target.value)}
                  className={inputClasses}
                />
              </div>
              <div>
                <label className={labelClasses}>Address</label>
                <input
                  type="text"
                  placeholder="Street address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={inputClasses}
                />
              </div>
              <div>
                <label className={labelClasses}>City</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className={cn(inputClasses, 'appearance-none')}
                >
                  <option value="" disabled>
                    Select a city
                  </option>
                  {cities.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Secret Location toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-frame-white text-sm">Secret Location</p>
                  <p className="text-frame-smoke text-xs">
                    Address revealed before the event
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSecretLocation(!secretLocation)}
                  className={cn(
                    'relative w-11 h-6 rounded-full transition-colors duration-200',
                    secretLocation ? 'bg-accent-gold' : 'bg-frame-steel'
                  )}
                >
                  <span
                    className={cn(
                      'absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-200',
                      secretLocation && 'translate-x-5'
                    )}
                  />
                </button>
              </div>
            </div>
          </motion.section>

          {/* Pricing Tiers */}
          <motion.section variants={fadeUp}>
            <h2 className="font-display text-sm uppercase tracking-luxury text-frame-white mb-4">
              Pricing Tiers
            </h2>
            <div className="space-y-4">
              {tiers.map((tier, index) => (
                <div
                  key={index}
                  className="glass rounded-xl p-4 border border-frame-steel"
                >
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-frame-smoke text-xs uppercase tracking-wide">
                      Tier {index + 1}
                    </p>
                    {tiers.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeTier(index)}
                        className="text-accent-coral text-xs hover:text-accent-coral/80 transition-colors"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className={labelClasses}>Name</label>
                      <input
                        type="text"
                        placeholder="e.g. VIP"
                        value={tier.name}
                        onChange={(e) =>
                          updateTier(index, 'name', e.target.value)
                        }
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <label className={labelClasses}>Price (TND)</label>
                      <input
                        type="number"
                        placeholder="0"
                        value={tier.price}
                        onChange={(e) =>
                          updateTier(index, 'price', e.target.value)
                        }
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <label className={labelClasses}>Capacity</label>
                      <input
                        type="number"
                        placeholder="0"
                        value={tier.capacity}
                        onChange={(e) =>
                          updateTier(index, 'capacity', e.target.value)
                        }
                        className={inputClasses}
                      />
                    </div>
                  </div>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                fullWidth
                onClick={addTier}
              >
                + Add Tier
              </Button>
            </div>
          </motion.section>

          {/* Settings */}
          <motion.section variants={fadeUp}>
            <h2 className="font-display text-sm uppercase tracking-luxury text-frame-white mb-4">
              Settings
            </h2>
            <div className="space-y-4">
              {/* Waitlist toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-frame-white text-sm">Enable Waitlist</p>
                  <p className="text-frame-smoke text-xs">
                    Allow users to join a waitlist when sold out
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setWaitlistEnabled(!waitlistEnabled)}
                  className={cn(
                    'relative w-11 h-6 rounded-full transition-colors duration-200',
                    waitlistEnabled ? 'bg-accent-gold' : 'bg-frame-steel'
                  )}
                >
                  <span
                    className={cn(
                      'absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-200',
                      waitlistEnabled && 'translate-x-5'
                    )}
                  />
                </button>
              </div>

              {/* FRAME Original (disabled) */}
              <div className="flex items-center justify-between opacity-50">
                <div>
                  <p className="text-frame-white text-sm">FRAME Original</p>
                  <p className="text-frame-smoke text-xs">
                    Contact FRAME team
                  </p>
                </div>
                <button
                  type="button"
                  disabled
                  className="relative w-11 h-6 rounded-full bg-frame-steel cursor-not-allowed"
                >
                  <span className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white/60" />
                </button>
              </div>
            </div>
          </motion.section>

          {/* Submit */}
          <motion.div variants={fadeUp}>
            <Button type="submit" variant="gold" fullWidth size="lg">
              Publish Event
            </Button>
          </motion.div>
        </motion.div>
      </form>
    </div>
  );
}
