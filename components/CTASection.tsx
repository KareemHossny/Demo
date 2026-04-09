"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLayoutEffect, useRef } from "react";

import { createReveal, initGSAP, reducedMotion } from "@/lib/animations";

export function CTASection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const { gsap } = initGSAP();

    const ctx = gsap.context(() => {
      if (reducedMotion()) {
        gsap.set("[data-cta-item]", { autoAlpha: 1, y: 0 });
        return;
      }

      createReveal("[data-cta-item]", section, {
        y: 46,
        duration: 0.95,
        stagger: 0.12
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="cta" className="section-shell py-28 md:py-36">
      <div className="panel-border panel-surface relative overflow-hidden rounded-[2.4rem] px-6 py-14 text-center shadow-glow md:px-12 md:py-20">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        <p
          data-cta-item
          className="text-sm uppercase tracking-[0.32em] text-white/40"
        >
          Final Frame
        </p>
        <h2
          data-cta-item
          className="mx-auto mt-6 max-w-4xl text-balance text-4xl font-semibold leading-[1] text-white sm:text-5xl md:text-6xl"
        >
          Turn your next launch into a story people feel before they understand.
        </h2>
        <p
          data-cta-item
          className="mx-auto mt-7 max-w-2xl text-pretty text-base leading-8 text-white/[0.64] sm:text-lg"
        >
          Built for premium products, bold founders, and teams that want more
          than a static hero and a stack of generic sections.
        </p>

        <div
          data-cta-item
          className="mt-10 flex flex-col justify-center gap-4 sm:flex-row"
        >
          <motion.div whileHover={{ y: -4 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="#top"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-medium text-black transition-colors duration-300 hover:bg-white/90"
            >
              Replay the Journey
            </Link>
          </motion.div>
          <motion.div whileHover={{ y: -4 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="mailto:hello@luma-atelier.dev"
              className="inline-flex items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.02] px-8 py-3.5 text-sm font-medium text-white/80 backdrop-blur transition-colors duration-300 hover:bg-white/[0.06]"
            >
              Book a Discovery Call
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
