'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from('.nf-code', {
        y: 120,
        opacity: 0,
        duration: 1,
        ease: 'expo.out',
      })
        .from(
          '.nf-title',
          {
            y: 60,
            opacity: 0,
            duration: 0.8,
            ease: 'expo.out',
          },
          '-=0.6'
        )
        .from(
          '.nf-desc',
          {
            y: 40,
            opacity: 0,
            duration: 0.6,
            ease: 'expo.out',
          },
          '-=0.5'
        )
        .from(
          '.nf-btn',
          {
            y: 30,
            opacity: 0,
            duration: 0.5,
            ease: 'expo.out',
          },
          '-=0.4'
        );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={root}
      className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-neutral-950 text-white"
    >
      {/* subtle radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_60%)]" />

      <div className="relative z-10 text-center px-4 max-w-xl">
        {/* 404 */}
        <h1 className="nf-code text-[clamp(5rem,14vw,10rem)] font-bold tracking-[-0.04em]">
          404
        </h1>

        {/* Title */}
        <h2 className="nf-title mt-2 text-[clamp(1.5rem,3vw,2.2rem)] font-semibold">
          Page not found
        </h2>

        {/* Description */}
        <p className="nf-desc mt-2 text-sm opacity-70">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="nf-btn mt-6 inline-block"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-medium text-black transition hover:bg-neutral-200"
          >
            <ArrowLeft size={18} />
            Back to home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}