'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Loading() {
  const [showSkeleton, setShowSkeleton] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowSkeleton(true), 900);
    return () => clearTimeout(t);
  }, []);

  if (showSkeleton) return <Skeleton />;

  return <AnimatedLoader />;
}

function AnimatedLoader() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1 });

      tl.fromTo(
        '.char',
        { y: '120%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          stagger: 0.05,
          duration: 0.8,
          ease: 'expo.out',
        }
      )
        .to('.char', {
          y: '-120%',
          opacity: 0,
          stagger: 0.04,
          duration: 0.6,
          ease: 'expo.in',
          delay: 0.4,
        });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const text = 'Loading';

  return (
    <div ref={rootRef} className="loader">
      <div className="mask">
        {text.split('').map((c, i) => (
          <span key={i} className="char">
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="skeleton">
      <div className="bar large" />
      <div className="bar" />
      <div className="bar" />
    </div>
  );
}