"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLayoutEffect, useRef } from "react";

import { initGSAP, reducedMotion } from "@/lib/animations";

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
        gsap.set("[data-cta-item]", {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)"
        });

        return;
      }

      gsap.fromTo(
        "[data-cta-item]",
        {
          autoAlpha: 0,
          y: 30,
          scale: 0.98,
          filter: "blur(16px)"
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.92,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 74%"
          }
        }
      );

      gsap.to("[data-cta-pulse]", {
        scale: 1.08,
        opacity: 0.72,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="cta" className="section-shell py-24 md:py-36">
      <div className="relative overflow-hidden rounded-[2.6rem] border border-white/[0.08] bg-white px-6 py-14 text-black shadow-[0_35px_120px_rgba(255,255,255,0.09)] md:px-12 md:py-20">
        <div
          data-cta-pulse
          className="absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/[0.06] blur-[50px]"
        />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/[0.3] to-transparent" />

        <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p
              data-cta-item
              className="text-sm uppercase tracking-[0.32em] text-black/[0.46]"
            >
              Final Call
            </p>
            <h2
              data-cta-item
              className="mt-6 max-w-4xl text-balance text-4xl font-semibold leading-[0.96] text-black sm:text-5xl md:text-6xl"
            >
              Turn the landing page into the part of the product people remember.
            </h2>
            <p
              data-cta-item
              className="mt-6 max-w-2xl text-pretty text-base leading-8 text-black/[0.64] sm:text-lg"
            >
              Premium motion, stronger pacing, and more confident layout can
              change how fast a client understands the value of the product.
            </p>

            <div
              data-cta-item
              className="mt-8 flex flex-wrap gap-3 text-xs uppercase tracking-[0.22em] text-black/[0.46]"
            >
              <span className="rounded-full border border-black/[0.08] px-4 py-2">
                Next.js App Router
              </span>
              <span className="rounded-full border border-black/[0.08] px-4 py-2">
                GSAP ScrollTrigger
              </span>
              <span className="rounded-full border border-black/[0.08] px-4 py-2">
                Framer Micro Motion
              </span>
            </div>
          </div>

          <div
            data-cta-item
            className="flex flex-col gap-4 sm:flex-row lg:flex-col lg:items-stretch"
          >
            <motion.div whileHover={{ y: -5, scale: 1.01 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="#top"
                className="inline-flex min-w-[14rem] items-center justify-center rounded-full bg-black px-8 py-3.5 text-sm font-medium text-white shadow-[0_20px_50px_rgba(0,0,0,0.18)] transition-all duration-300 hover:bg-black/[0.92]"
              >
                Replay the Experience
              </Link>
            </motion.div>

            <motion.div whileHover={{ y: -5, scale: 1.01 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="mailto:hello@luma-atelier.dev"
                className="inline-flex min-w-[14rem] items-center justify-center rounded-full border border-black/[0.1] bg-transparent px-8 py-3.5 text-sm font-medium text-black transition-all duration-300 hover:bg-black/[0.04]"
              >
                Book a Discovery Call
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
