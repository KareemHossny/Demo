"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLayoutEffect, useRef } from "react";

import { initGSAP, reducedMotion } from "@/lib/animations";

const heroStats = [
  { value: "01", label: "Narrative-led flow" },
  { value: "02", label: "Scroll-tuned motion" },
  { value: "03", label: "Premium dark aesthetic" }
];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || reducedMotion()) {
      return;
    }

    const { gsap } = initGSAP();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        "[data-hero-badge]",
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.7 }
      )
        .fromTo(
          "[data-hero-title]",
          { autoAlpha: 0, y: 40 },
          { autoAlpha: 1, y: 0, duration: 1 },
          "-=0.35"
        )
        .fromTo(
          "[data-hero-copy]",
          { autoAlpha: 0, y: 30 },
          { autoAlpha: 1, y: 0, duration: 0.8 },
          "-=0.55"
        )
        .fromTo(
          "[data-hero-actions]",
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.7 },
          "-=0.45"
        )
        .fromTo(
          "[data-hero-panel]",
          { autoAlpha: 0, y: 36, scale: 0.96 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 1 },
          "-=0.6"
        );

      gsap.to("[data-orb='a']", {
        x: 34,
        y: -28,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      gsap.to("[data-orb='b']", {
        x: -26,
        y: 38,
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      gsap.to("[data-hero-panel]", {
        y: -14,
        duration: 4.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-shell flex min-h-screen items-center py-24 lg:py-14"
      id="top"
    >
      <div className="grid w-full items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative z-10">
          <div
            data-hero-badge
            className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/[0.10] bg-white/[0.03] px-4 py-2 text-[0.72rem] uppercase tracking-[0.24em] text-white/60 backdrop-blur"
          >
            <span className="h-2 w-2 rounded-full bg-white/70" />
            Cinematic Landing Experience
          </div>

          <h1
            data-hero-title
            className="max-w-4xl text-balance text-[3.35rem] font-semibold leading-[0.92] tracking-display text-white sm:text-[4.6rem] md:text-[5.8rem] lg:text-[6.5rem]"
          >
            Design the scroll.
            <span className="mt-4 block text-white/[0.72]" lang="ar" dir="rtl">
              واجهات تُروى بالحركة قبل الكلمات
            </span>
          </h1>

          <p
            data-hero-copy
            className="mt-8 max-w-2xl text-pretty text-base leading-8 text-white/[0.68] sm:text-lg"
          >
            Crafted for founders, products, and brands that want a landing page
            to feel less like content and more like a guided reveal. Every
            section is paced, choreographed, and tuned for attention.
          </p>

          <div
            data-hero-actions
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <motion.div whileHover={{ y: -4 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="#cta"
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-medium text-black transition-colors duration-300 hover:bg-white/90"
              >
                Start the Story
              </Link>
            </motion.div>

            <motion.div whileHover={{ y: -4 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="#immersive"
                className="inline-flex items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.02] px-7 py-3.5 text-sm font-medium text-white/80 backdrop-blur transition-colors duration-300 hover:bg-white/[0.06]"
              >
                Explore the Motion
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="relative min-h-[26rem] lg:min-h-[36rem]">
          <div
            data-orb="a"
            className="absolute left-0 top-10 h-48 w-48 rounded-full bg-white/10 blur-[90px] will-change-transform md:h-72 md:w-72"
          />
          <div
            data-orb="b"
            className="absolute bottom-6 right-4 h-52 w-52 rounded-full bg-zinc-400/10 blur-[100px] will-change-transform md:h-72 md:w-72"
          />

          <div
            data-hero-panel
            className="panel-border panel-surface absolute inset-x-0 top-1/2 mx-auto grid max-w-xl -translate-y-1/2 gap-8 overflow-hidden rounded-[2rem] p-6 shadow-glow will-change-transform md:p-8"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-white/[0.45]">
                  Luma Atelier
                </p>
                <p className="mt-2 text-2xl font-semibold text-white">
                  A page that behaves like a film sequence
                </p>
              </div>
              <div className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/[0.55]">
                Live
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {heroStats.map((item) => (
                <div
                  key={item.value}
                  className="rounded-[1.4rem] border border-white/[0.08] bg-white/[0.03] p-4"
                >
                  <p className="text-sm uppercase tracking-[0.28em] text-white/[0.35]">
                    {item.value}
                  </p>
                  <p className="mt-5 max-w-[12ch] text-lg font-medium leading-6 text-white/[0.86]">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="overflow-hidden rounded-[1.5rem] border border-white/[0.08] bg-black/40 p-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm text-white/[0.45]">Story Intensity</span>
                <span className="text-sm text-white/[0.65]">91%</span>
              </div>
              <div className="h-2 rounded-full bg-white/10">
                <div className="h-2 w-[91%] rounded-full bg-gradient-to-r from-white to-white/[0.35]" />
              </div>
              <p className="mt-4 text-sm leading-6 text-white/[0.55]">
                Built to feel sleek on desktop, precise on tablet, and elegant
                on mobile without losing the pacing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
