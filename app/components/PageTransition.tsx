'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { usePathname } from 'next/navigation';

export default function PageTransition() {
  const overlay = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const el = overlay.current;

    const tl = gsap.timeline();

    tl.set(el, { y: '100%' })
      .to(el, {
        y: '0%',
        duration: 0.6,
        ease: 'expo.inOut',
      })
      .to(el, {
        y: '-100%',
        duration: 0.6,
        ease: 'expo.inOut',
        delay: 0.1,
      });
  }, [pathname]);

  return <div ref={overlay} className="page-transition" />;
}