'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { fadeUp, stagger } from '@/lib/utils/constants';
import Button from '@/components/ui/Button';
import Logo from '@/components/shared/Logo';

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{
        background: 'radial-gradient(ellipse at 50% 30%, rgba(184,149,47,0.04) 0%, #050505 70%)',
      }}
    >
      {/* The Frame border */}
      <div className="absolute inset-8 border border-white/[0.03] pointer-events-none" />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="text-center relative z-10"
      >
        <motion.p
          variants={fadeUp}
          className="font-display text-[100px] leading-none font-bold text-frame-steel/50 select-none"
        >
          404
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="font-display text-display-md text-frame-white mt-4"
        >
          Lost in the night
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-frame-smoke text-sm font-light mt-2 max-w-xs mx-auto"
        >
          The experience you&apos;re looking for doesn&apos;t exist.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-8">
          <Link href="/">
            <Button variant="primary">Back to Discover</Button>
          </Link>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-14">
          <Logo size="sm" className="text-frame-smoke/20" />
        </motion.div>
      </motion.div>
    </div>
  );
}
