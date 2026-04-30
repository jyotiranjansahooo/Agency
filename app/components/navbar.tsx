"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Home() {
  const navbarRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const ctaGlowTl = useRef<gsap.core.Timeline | null>(null);

  // ─── Entrance Animation ───────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(navbarRef.current, { y: -120, opacity: 0 });

      gsap.to(navbarRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.1,
        ease: "back.out(1.7)",
        delay: 0.3,
      });

      // Staggered children reveal after navbar drops in
      gsap.fromTo(
        [logoRef.current, ...(linksRef.current?.children ?? []), ctaRef.current],
        { opacity: 0, y: 8 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.07,
          ease: "power2.out",
          delay: 0.85,
        }
      );
    });

    return () => ctx.revert();
  }, []);

  // ─── CTA Glow Timeline ────────────────────────────────────────────────────
  useEffect(() => {
    if (!ctaRef.current) return;

    ctaGlowTl.current = gsap.timeline({ paused: true, repeat: -1, yoyo: true });
    ctaGlowTl.current.to(ctaRef.current, {
      boxShadow:
        "0 0 28px 6px #FDE04788, 0 0 60px 16px #FDE04733",
      duration: 0.8,
      ease: "sine.inOut",
    });

    return () => {
      ctaGlowTl.current?.kill();
    };
  }, []);

  const handleCtaEnter = () => ctaGlowTl.current?.play();
  const handleCtaLeave = () => {
    ctaGlowTl.current?.pause();
    gsap.to(ctaRef.current, {
      boxShadow: "0 0 0px 0px transparent",
      duration: 0.4,
    });
  };

  // ─── Magnetic Link Hover ──────────────────────────────────────────────────
  const handleLinkEnter = (index: number) => {
    const target = linkRefs.current[index];
    if (!target || !underlineRef.current) return;

    const parentRect = linksRef.current!.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const left = targetRect.left - parentRect.left;

    gsap.to(underlineRef.current, {
      x: left,
      width: targetRect.width,
      opacity: 1,
      duration: 0.35,
      ease: "power3.out",
    });

    // Magnetic lift
    gsap.to(target, { y: -3, color: "#F472B6", duration: 0.25, ease: "power2.out" });
    setActiveIndex(index);
  };

  const handleLinkLeave = (index: number) => {
    const target = linkRefs.current[index];
    if (!target) return;
    gsap.to(target, { y: 0, color: "#d4d4d8", duration: 0.3, ease: "power2.out" });
    setActiveIndex(null);
  };

  const handleLinksContainerLeave = () => {
    gsap.to(underlineRef.current, {
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
    });
  };

  // ─── Mobile Menu ──────────────────────────────────────────────────────────
  const toggleMobileMenu = () => {
    if (!mobileOpen) {
      setMobileOpen(true);
      gsap.set(mobileMenuRef.current, { display: "flex " });
      gsap.fromTo(
        mobileMenuRef.current,
        { clipPath: "inset(0 0 100% 0)", opacity: 0 },
        {
          clipPath: "inset(0 0 0% 0)",
          opacity: 1,
          duration: 0.55,
          ease: "power4.out",
        }
      );
      // Stagger mobile links
      gsap.fromTo(
        ".mobile-link",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.09, duration: 0.5, delay: 0.2, ease: "power3.out" }
      );
    } else {
      gsap.to(mobileMenuRef.current, {
        clipPath: "inset(0 0 100% 0)",
        opacity: 0,
        duration: 0.45,
        ease: "power4.in",
        onComplete: () => {
          gsap.set(mobileMenuRef.current, { display: "none" });
          setMobileOpen(false);
        },
      });
    }
  };

  return (
    <main
      className="min-h-screen overflow-hidden relative"
      style={{ background: "#171717", fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ── Google Fonts ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Syne:wght@700;800&display=swap');

        * { box-sizing: border-box; }

        .font-syne { font-family: 'Syne', sans-serif; }

        /* CTA Button */
        .cta-btn {
          background: linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%);
          transition: background 0.3s ease, transform 0.2s ease;
        }
        .cta-btn:hover {
          background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%);
          transform: scale(1.04);
        }
        .cta-btn:active { transform: scale(2); }

        /* Hamburger bars */
        .ham-bar {
          display: block;
          height: 2px;
          border-radius: 9999px;
          background: #e4e4e7;
          transition: transform 0.3s ease, opacity 0.3s ease;
        }

        /* Blobs */
        @keyframes floatBlob {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-18px) scale(1.04); }
        }
        .blob { animation: floatBlob 8s ease-in-out infinite; }
        .blob-2 { animation-duration: 11s; animation-delay: -4s; }
        .blob-3 { animation-duration: 9s; animation-delay: -7s; }
      `}</style>

      {/* ── Background Neon Blobs ── */}
      <div
        className="blob pointer-events-none absolute rounded-full opacity-20 blur-[120px]"
        style={{
          width: 520,
          height: 520,
          background: "radial-gradient(circle, #7C3AED 0%, transparent 70%)",
          top: -160,
          left: "10%",
        }}
      />
      <div
        className="blob blob-2 pointer-events-none absolute rounded-full opacity-15 blur-[140px]"
        style={{
          width: 420,
          height: 420,
          background: "radial-gradient(circle, #F472B6 0%, transparent 70%)",
          top: -80,
          right: "8%",
        }}
      />
      <div
        className="blob blob-3 pointer-events-none absolute rounded-full opacity-10 blur-[160px]"
        style={{
          width: 360,
          height: 360,
          background: "radial-gradient(circle, #FDE047 0%, transparent 70%)",
          top: 60,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />

      {/* ──────────────────────────────────────────────────────────────────── */}
      {/* NAVBAR */}
      {/* ──────────────────────────────────────────────────────────────────── */}
      <div
        ref={navbarRef}
        className="fixed top-5 left-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl -translate-x-1/2"
        style={{ opacity: 0 }}
      >
        <nav
          className="flex items-center justify-between px-5 py-3 rounded-2xl border"
          style={{
            background: "rgba(15, 23, 42, 0.72)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderColor: "rgba(124, 58, 237, 0.22)",
            boxShadow:
              "0 8px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          {/* ── Logo ── */}
          <div ref={logoRef} className="flex items-center gap-2 select-none cursor-pointer">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-syne font-bold text-sm"
              style={{ background: "linear-gradient(135deg,#7C3AED,#F472B6)", color: "#fff" }}
            >
              V
            </div>
            <span
              className="font-syne font-bold tracking-tight text-lg"
              style={{ color: "#f4f4f5", letterSpacing: "-0.02em" }}
            >
              ORIVO<span  style={{ color: "#7C3AED" }}>N</span>
            </span>
          </div>

          {/* ── Desktop Links ── */}
          <div
            ref={linksRef}
            className="hidden md:flex items-center gap-10 relative"
            onMouseLeave={handleLinksContainerLeave}
          >
            {/* Traveling underline */}
            <span
              ref={underlineRef}
              className="absolute bottom-0 h-0.5 rounded-full pointer-events-none"
              style={{
                background: "#F472B6",
                boxShadow: "0 0 10px #F472B688",
                opacity: 0,
                width: 0,
                left: 0,
              }}
            />

            {NAV_LINKS.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                ref={(el) => { linkRefs.current[i] = el; }}
                className="relative px-3 py-2 gap-4 text-sm font-medium rounded-lg transition-colors duration-200"
                style={{ color: "#a1a1aa", textDecoration: "none" }}
                onMouseEnter={() => handleLinkEnter(i)}
                onMouseLeave={() => handleLinkLeave(i)}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* ── CTA Button ── */}
          <button
            ref={ctaRef}
            className="cta-btn px-4! hidden md:flex items-center gap-2  py-2.5 rounded-xl text-sm font-semibold text-white tracking-wide"
            style={{ color: "#fff", border: "none", cursor: "pointer" }}
            onMouseEnter={handleCtaEnter}
            onMouseLeave={handleCtaLeave}
          >
            Start Project
            <svg width="16" height="30" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* ── Hamburger ── */}
          <button
            ref={hamburgerRef}
            className="md:hidden flex flex-col justify-center items-center gap-1.5 w-9 h-9 rounded-lg"
            style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)", cursor: "pointer" }}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span
              className="ham-bar w-5"
              style={mobileOpen ? { transform: "translateY(7px) rotate(45deg)" } : {}}
            />
            <span
              className="ham-bar w-4"
              style={mobileOpen ? { opacity: 0, transform: "scaleX(0)" } : {}}
            />
            <span
              className="ham-bar w-5"
              style={mobileOpen ? { transform: "translateY(-7px) rotate(-45deg)" } : {}}
            />
          </button>
        </nav>
      </div>

      {/* ──────────────────────────────────────────────────────────────────── */}
      {/* MOBILE OVERLAY */}
      {/* ──────────────────────────────────────────────────────────────────── */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 z-40 flex-col items-center justify-center gap-8 md:hidden"
        style={{
          display: "none",
          background: "rgba(9, 9, 11, 0.97)",
          backdropFilter: "blur(24px)",
          clipPath: "inset(0 0 100% 0)",
        }}
      >
        {/* Blobs inside overlay */}
        <div
          className="pointer-events-none absolute rounded-full opacity-25 blur-[100px]"
          style={{
            width: 350,
            height: 350,
            background: "radial-gradient(circle, #7C3AED 0%, transparent 70%)",
            top: "20%",
            left: "20%",
          }}
        />
        <div
          className="pointer-events-none absolute rounded-full opacity-15 blur-[120px]"
          style={{
            width: 280,
            height: 280,
            background: "radial-gradient(circle, #F472B6 0%, transparent 70%)",
            bottom: "20%",
            right: "15%",
          }}
        />

        <nav className="relative z-10 flex flex-col items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="mobile-link gap-4 font-syne font-bold text-5xl tracking-tight"
              style={{ color: "#f4f4f5", textDecoration: "none", lineHeight: 1.15 }}
              onClick={toggleMobileMenu}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          className="mobile-link cta-btn mt-4 flex items-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold text-white"
          style={{ border: "none", cursor: "pointer" }}
          onClick={toggleMobileMenu}
        >
          Start Project
          <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <p
          className="mobile-link absolute bottom-10 text-xs tracking-widest uppercase"
          style={{ color: "#52525b", letterSpacing: "0.18em" }}
        >
          © 2025 Velox Studio
        </p>
      </div>

      {/* ──────────────────────────────────────────────────────────────────── */}
      {/* HERO (Placeholder) */}
      {/* ──────────────────────────────────────────────────────────────────── */}
      <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <p
          className="text-xs font-medium uppercase tracking-[0.3em] mb-6"
          style={{ color: "#7C3AED" }}
        >
          Digital Product Studio
        </p>
        <h1
          className="font-syne font-bold leading-none"
          style={{
            fontSize: "clamp(3rem, 9vw, 7.5rem)",
            color: "#f4f4f5",
            letterSpacing: "-0.04em",
            lineHeight: 1.0,
          }}
        >
          We craft{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #7C3AED 0%, #F472B6 60%, #FDE047 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            digital
          </span>
          <br />experiences.
        </h1>
        <p
          className="mt-8 max-w-lg text-base leading-relaxed"
          style={{ color: "#71717a" }}
        >
          Strategy. Design. Code. We partner with ambitious brands to build products that move fast and look extraordinary.
        </p>
        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <button
            className="cta-btn px-4! py-2! rounded-xl text-sm font-semibold text-white"
            style={{ border: "none", cursor: "pointer" }}
          >
            See Our Work →
          </button>
          <button
            className="px-4! rounded-xl text-sm font-medium"
            style={{
              background: "transparent",
              border: "1px solid rgba(124,58,237,0.35)",
              color: "#a1a1aa",
              cursor: "pointer",
            }}
          >
            Learn More
          </button>
        </div>
      </div>
    </main>
  );
}