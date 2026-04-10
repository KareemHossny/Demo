"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLayoutEffect, useRef } from "react";

import { initGSAP, reducedMotion } from "@/lib/animations";

const closingSignals = [
  "Narrative-first motion",
  "Editorial interface rhythm",
  "Faster client buy-in"
];

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
          y: 42,
          scale: 0.985,
          filter: "blur(16px)"
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%"
          }
        }
      );

      gsap.fromTo(
        "[data-cta-line]",
        {
          scaleX: 0,
          transformOrigin: "left center"
        },
        {
          scaleX: 1,
          duration: 1.14,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%"
          }
        }
      );

      gsap.fromTo(
        "[data-cta-shell]",
        { yPercent: 8, scale: 0.986 },
        {
          yPercent: -4,
          scale: 1.012,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2
          }
        }
      );

      gsap.fromTo(
        "[data-cta-sheen]",
        { xPercent: -18, autoAlpha: 0 },
        {
          xPercent: 16,
          autoAlpha: 0.42,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2
          }
        }
      );

      gsap.to("[data-cta-pulse]", {
        scale: 1.1,
        opacity: 0.74,
        duration: 3.1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="cta" className="section-shell py-24 md:py-36">
      <div
        data-cta-shell
        className="relative overflow-hidden rounded-[2.8rem] border border-white/[0.08] bg-white px-6 py-14 text-black shadow-[0_35px_120px_rgba(255,255,255,0.09)] will-change-transform md:px-12 md:py-20"
      >
        <div
          data-cta-pulse
          className="absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/[0.06] blur-[50px]"
        />
        <div
          data-cta-sheen
          className="sheen-overlay absolute inset-y-[10%] left-[-10%] w-[34%] opacity-0 blur-2xl"
        />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/[0.3] to-transparent" />
        <div className="absolute inset-[5%] rounded-[2.2rem] border border-black/[0.05]" />

        <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p
              data-cta-item
              className="text-sm uppercase tracking-[0.32em] text-black/[0.46]"
            >
              Closing Scene
            </p>
            <h2
              data-cta-item
              className="mt-6 max-w-4xl text-balance text-4xl font-semibold leading-[0.96] text-black sm:text-5xl md:text-6xl"
            >
              Make the landing page feel like the best part of the product demo.
            </h2>
            <p
              data-cta-item
              className="mt-6 max-w-2xl text-pretty text-base leading-8 text-black/[0.64] sm:text-lg"
            >
              Stronger pacing, better hierarchy, and restrained motion change how
              quickly a client feels the quality of the product. The message lands
              faster because the experience carries it there.
            </p>

            <div
              data-cta-line
              className="mt-8 h-px w-40 bg-gradient-to-r from-black via-black/[0.35] to-transparent"
            />

            <div
              data-cta-item
              className="mt-8 flex flex-wrap gap-3 text-[0.68rem] uppercase tracking-[0.24em] text-black/[0.46]"
            >
              {closingSignals.map((signal) => (
                <span
                  key={signal}
                  className="rounded-full border border-black/[0.08] px-4 py-2"
                >
                  {signal}
                </span>
              ))}
            </div>

            <p
              data-cta-item
              className="mt-8 max-w-xl text-sm leading-7 text-black/[0.52]"
            >
              The goal is not more animation. It is a more confident experience,
              designed to make the product feel sharper within the first few
              seconds.
            </p>
          </div>

          <div
            data-cta-item
            className="flex flex-col gap-4 sm:flex-row lg:flex-col lg:items-stretch"
          >
            <motion.div whileHover={{ y: -5, scale: 1.012 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="#top"
                className="inline-flex min-w-[14rem] items-center justify-center rounded-full bg-black px-8 py-3.5 text-sm font-medium text-white shadow-[0_20px_50px_rgba(0,0,0,0.18)] transition-all duration-300 hover:bg-black/[0.92] hover:shadow-[0_26px_70px_rgba(0,0,0,0.24)]"
              >
                Replay the Experience
              </Link>
            </motion.div>

            <motion.div whileHover={{ y: -5, scale: 1.012 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="mailto:hello@luma-atelier.dev"
                className="inline-flex min-w-[14rem] items-center justify-center rounded-full border border-black/[0.1] bg-transparent px-8 py-3.5 text-sm font-medium text-black transition-all duration-300 hover:bg-black/[0.04] hover:shadow-[0_18px_40px_rgba(0,0,0,0.08)]"
              >
                Start the Upgrade
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
