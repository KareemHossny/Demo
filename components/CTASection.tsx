"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLayoutEffect, useRef } from "react";

import { initGSAP, reducedMotion } from "@/lib/animations";

const closingSignals = [
  "Premium rhythm",
  "Sharper conversion",
  "Client-ready finish"
];

const closingMetrics = [
  {
    label: "What changes first",
    value: "Perception",
    detail: "The product feels more polished before the user has even read the whole page."
  },
  {
    label: "What stays consistent",
    value: "Clarity",
    detail: "The final CTA closes on contrast and hierarchy instead of more visual noise."
  }
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
        gsap.set(
          [
            "[data-cta-item]",
            "[data-cta-card]",
            "[data-cta-chip]",
            "[data-cta-line]",
            "[data-cta-shell]"
          ],
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)"
          }
        );

        gsap.set(["[data-cta-ring]", "[data-cta-orb]"], {
          autoAlpha: 1,
          scale: 1,
          x: 0,
          y: 0
        });

        return;
      }

      gsap.fromTo(
        "[data-cta-item]",
        {
          autoAlpha: 0,
          y: 46,
          scale: 0.986,
          filter: "blur(16px)"
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.02,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%"
          }
        }
      );

      gsap.fromTo(
        "[data-cta-card]",
        {
          autoAlpha: 0,
          y: 34,
          scale: 0.985,
          filter: "blur(14px)"
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.94,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 82%"
          }
        }
      );

      gsap.fromTo(
        "[data-cta-chip]",
        {
          autoAlpha: 0,
          y: 18,
          scale: 0.98
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.72,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 82%"
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
          duration: 1.08,
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
          yPercent: -5,
          scale: 1.014,
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
          xPercent: 22,
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

      gsap.fromTo(
        "[data-cta-ring]",
        {
          autoAlpha: 0.18,
          scale: 0.92,
          rotate: -6
        },
        {
          autoAlpha: 0.48,
          scale: 1.06,
          rotate: 8,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.16
          }
        }
      );

      gsap.fromTo(
        "[data-cta-orb]",
        {
          x: -10,
          y: 8,
          scale: 0.88
        },
        {
          x: 16,
          y: -12,
          scale: 1.06,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.12
          }
        }
      );

      gsap.to("[data-cta-pulse]", {
        scale: 1.14,
        opacity: 0.72,
        duration: 3.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="cta" className="section-shell -mt-2 py-24 md:-mt-6 md:py-32">
      <div
        data-cta-shell
        className="relative overflow-hidden rounded-[2.9rem] border border-white/[0.08] bg-[#f5f2eb] px-6 py-14 text-black shadow-[0_35px_120px_rgba(255,255,255,0.09)] will-change-transform md:px-12 md:py-20"
      >
        <div
          data-cta-pulse
          className="absolute left-1/2 top-0 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/[0.06] blur-[54px]"
        />
        <div
          data-cta-ring
          className="absolute right-[14%] top-[18%] h-24 w-24 rounded-full border border-black/[0.08] will-change-transform md:h-32 md:w-32"
        />
        <div
          data-cta-orb
          className="absolute right-[19%] top-[23%] h-3 w-3 rounded-full bg-black/70 shadow-[0_0_18px_rgba(0,0,0,0.18)] will-change-transform"
        />
        <div
          data-cta-sheen
          className="sheen-overlay absolute inset-y-[10%] left-[-10%] w-[34%] opacity-0 blur-2xl"
        />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/[0.3] to-transparent" />
        <div className="absolute inset-[5%] rounded-[2.2rem] border border-black/[0.05]" />

        <div className="relative grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          <div>
            <p
              data-cta-item
              className="text-sm uppercase tracking-[0.32em] text-black/[0.46]"
            >
              Final CTA
            </p>
            <h2
              data-cta-item
              className="mt-6 max-w-4xl text-balance text-4xl font-semibold leading-[0.96] text-black sm:text-5xl md:text-6xl"
            >
              Make the landing page feel like part of the product, not just the intro to it.
            </h2>
            <p
              data-cta-item
              className="mt-6 max-w-2xl text-pretty text-base leading-8 text-black/[0.66] sm:text-lg"
            >
              Stronger pacing, better section continuity, and restrained motion
              change how quickly a client feels quality. The close works because
              the entire scroll has been building toward it.
            </p>

            <div
              data-cta-line
              className="mt-8 h-px w-44 bg-gradient-to-r from-black via-black/[0.35] to-transparent"
            />

            <div className="mt-8 flex flex-wrap gap-3 text-[0.68rem] uppercase tracking-[0.24em] text-black/[0.46]">
              {closingSignals.map((signal) => (
                <span
                  key={signal}
                  data-cta-chip
                  className="interactive-pill rounded-full border border-black/[0.08] px-4 py-2"
                >
                  {signal}
                </span>
              ))}
            </div>

            <p
              data-cta-item
              className="mt-8 max-w-xl text-sm leading-7 text-black/[0.54]"
            >
              The goal is not more animation. It is a more confident, more
              memorable first impression that helps the product sell itself faster.
            </p>
          </div>

          <div className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
              {closingMetrics.map((metric) => (
                <div
                  key={metric.label}
                  data-cta-card
                  className="rounded-[1.6rem] border border-black/[0.08] bg-white/[0.46] p-5 backdrop-blur"
                >
                  <p className="text-[0.68rem] uppercase tracking-[0.28em] text-black/[0.44]">
                    {metric.label}
                  </p>
                  <p className="mt-4 text-2xl font-semibold text-black">{metric.value}</p>
                  <p className="mt-3 text-sm leading-6 text-black/[0.6]">{metric.detail}</p>
                </div>
              ))}
            </div>

            <div
              data-cta-item
              className="mt-2 flex flex-col gap-4 sm:flex-row lg:mt-4 lg:flex-col"
            >
              <motion.div whileHover={{ y: -4, scale: 1.01 }} whileTap={{ scale: 0.985 }}>
                <Link
                  href="#top"
                  className="group inline-flex min-w-[14rem] items-center justify-center gap-3 rounded-full bg-black px-8 py-3.5 text-sm font-medium text-white shadow-[0_20px_50px_rgba(0,0,0,0.18)] transition-all duration-300 hover:bg-black/[0.92] hover:shadow-[0_26px_70px_rgba(0,0,0,0.24)]"
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-white/80 transition-transform duration-300 group-hover:scale-125" />
                  <span>Replay the experience</span>
                </Link>
              </motion.div>

              <motion.div whileHover={{ y: -4, scale: 1.01 }} whileTap={{ scale: 0.985 }}>
                <Link
                  href="mailto:hello@luma-atelier.dev"
                  className="group inline-flex min-w-[14rem] items-center justify-center gap-3 rounded-full border border-black/[0.1] bg-transparent px-8 py-3.5 text-sm font-medium text-black transition-all duration-300 hover:bg-black/[0.04] hover:shadow-[0_18px_40px_rgba(0,0,0,0.08)]"
                >
                  <span>Start the upgrade</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    /
                  </span>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
