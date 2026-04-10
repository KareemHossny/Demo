"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLayoutEffect, useRef } from "react";

import { initGSAP, reducedMotion } from "@/lib/animations";

const headlineLines = [
  "Build launches that",
  "unfold like cinema",
  "واجهات تحكي فكرتها مع كل تمريرة"
];

const heroStats = [
  { value: "Scroll-led", label: "Narrative pacing" },
  { value: "Premium", label: "Editorial layout" },
  { value: "91%", label: "Attention retention" }
];

function renderWords(text: string, prefix: string, rtl = false) {
  return (
    <span
      className={`flex flex-wrap gap-x-3 gap-y-3 ${rtl ? "justify-start" : ""}`}
      dir={rtl ? "rtl" : undefined}
    >
      {text.split(" ").map((word, index) => (
        <span key={`${prefix}-${word}-${index}`} className="inline-flex overflow-hidden">
          <span
            data-hero-word
            className="inline-block will-change-transform will-change-opacity"
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}

export function HeroSection() {
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
            "[data-hero-badge]",
            "[data-hero-word]",
            "[data-hero-copy]",
            "[data-hero-actions]",
            "[data-hero-meta]",
            "[data-hero-stage]",
            "[data-hero-panel]"
          ],
          {
            autoAlpha: 1,
            y: 0,
            yPercent: 0,
            scale: 1,
            filter: "blur(0px)"
          }
        );

        return;
      }

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

      intro
        .fromTo(
          "[data-hero-badge]",
          { autoAlpha: 0, y: 22, filter: "blur(8px)" },
          { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.65 }
        )
        .fromTo(
          "[data-hero-word]",
          {
            autoAlpha: 0,
            yPercent: 110,
            filter: "blur(18px)",
            scale: 0.96
          },
          {
            autoAlpha: 1,
            yPercent: 0,
            filter: "blur(0px)",
            scale: 1,
            duration: 1.05,
            stagger: 0.045
          },
          "-=0.2"
        )
        .fromTo(
          "[data-hero-copy]",
          { autoAlpha: 0, y: 26, filter: "blur(10px)" },
          { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.8 },
          "-=0.55"
        )
        .fromTo(
          "[data-hero-actions]",
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.7 },
          "-=0.45"
        )
        .fromTo(
          "[data-hero-meta]",
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.08 },
          "-=0.45"
        )
        .fromTo(
          "[data-hero-stage]",
          { autoAlpha: 0, scale: 0.96, y: 32, filter: "blur(18px)" },
          { autoAlpha: 1, scale: 1, y: 0, filter: "blur(0px)", duration: 1.1 },
          "-=0.8"
        );

      gsap.to("[data-hero-glow='one']", {
        x: 28,
        y: -24,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      gsap.to("[data-hero-glow='two']", {
        x: -24,
        y: 32,
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      gsap.to("[data-hero-float='one']", {
        y: -16,
        x: 8,
        duration: 5.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      gsap.to("[data-hero-float='two']", {
        y: 14,
        x: -12,
        duration: 6.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      gsap.to("[data-hero-float='three']", {
        y: -12,
        duration: 5.1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      gsap.to("[data-hero-stage]", {
        yPercent: 12,
        scale: 0.96,
        autoAlpha: 0.55,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      gsap.to("[data-hero-copy-block]", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="section-shell flex min-h-screen items-center py-24 lg:py-14"
    >
      <div className="grid w-full items-center gap-16 lg:grid-cols-[1.08fr_0.92fr]">
        <div data-hero-copy-block className="relative z-10">
          <div
            data-hero-badge
            className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/[0.12] bg-white/[0.04] px-4 py-2 text-[0.72rem] uppercase tracking-[0.28em] text-white/[0.64] backdrop-blur"
          >
            <span className="h-2 w-2 rounded-full bg-white/[0.78]" />
            Experience Upgrade
          </div>

          <h1 className="max-w-5xl text-[3.35rem] font-semibold leading-[0.88] tracking-display text-white sm:text-[4.85rem] md:text-[6rem] lg:text-[6.8rem]">
            <span className="block">{renderWords(headlineLines[0], "line-1")}</span>
            <span className="mt-3 block text-white/[0.78]">
              {renderWords(headlineLines[1], "line-2")}
            </span>
            <span
              className="mt-5 block text-[1.3rem] font-medium leading-[1.25] tracking-[-0.04em] text-white/[0.56] sm:text-[1.7rem]"
              lang="ar"
              dir="rtl"
            >
              {renderWords(headlineLines[2], "line-3", true)}
            </span>
          </h1>

          <p
            data-hero-copy
            className="mt-8 max-w-2xl text-pretty text-base leading-8 text-white/[0.66] sm:text-lg"
          >
            A premium landing page should feel directed, not assembled. The
            layout introduces the message, the motion shapes the pace, and the
            scroll turns the whole page into a guided reveal.
          </p>

          <div
            data-hero-actions
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <motion.div whileHover={{ y: -5, scale: 1.01 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="#story-flow"
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-medium text-black shadow-[0_0_35px_rgba(255,255,255,0.2)] transition-all duration-300 hover:bg-white/[0.92]"
              >
                Enter the Story
              </Link>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="#sticky-story"
                className="inline-flex items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.03] px-7 py-3.5 text-sm font-medium text-white/[0.84] backdrop-blur transition-all duration-300 hover:border-white/[0.22] hover:bg-white/[0.06]"
              >
                Watch the Reveal
              </Link>
            </motion.div>
          </div>

          <div className="mt-12 grid gap-3 sm:grid-cols-3">
            {heroStats.map((item) => (
              <div
                key={item.label}
                data-hero-meta
                className="rounded-[1.35rem] border border-white/[0.08] bg-white/[0.025] p-4 backdrop-blur"
              >
                <p className="text-sm uppercase tracking-[0.2em] text-white/[0.38]">
                  {item.value}
                </p>
                <p className="mt-3 text-sm leading-6 text-white/[0.72]">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div data-hero-stage className="relative min-h-[30rem] lg:min-h-[42rem]">
          <div
            data-hero-glow="one"
            className="absolute left-[4%] top-[6%] h-48 w-48 rounded-full bg-white/[0.10] blur-[100px] will-change-transform md:h-72 md:w-72"
          />
          <div
            data-hero-glow="two"
            className="absolute bottom-[8%] right-[2%] h-52 w-52 rounded-full bg-zinc-400/[0.12] blur-[110px] will-change-transform md:h-80 md:w-80"
          />

          <div className="absolute inset-[6%] rounded-[2.5rem] border border-white/[0.08] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))]" />
          <div className="absolute inset-[12%] rounded-[2.5rem] border border-white/[0.08] shadow-glow" />

          <div
            data-hero-panel
            data-hero-float="one"
            className="panel-border panel-surface absolute left-[8%] top-[12%] w-[78%] rounded-[2rem] p-6 will-change-transform md:p-8"
          >
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/[0.38]">
                  Story Engine
                </p>
                <p className="mt-3 max-w-[14ch] text-2xl font-semibold leading-tight text-white">
                  Every section hands attention to the next.
                </p>
              </div>
              <div className="rounded-full border border-white/[0.10] px-3 py-1.5 text-[0.7rem] uppercase tracking-[0.24em] text-white/[0.54]">
                Scroll
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {["Reveal", "Depth", "Continuity"].map((item, index) => (
                <div
                  key={item}
                  className="rounded-[1.3rem] border border-white/[0.08] bg-black/[0.26] p-4"
                >
                  <p className="text-sm uppercase tracking-[0.24em] text-white/[0.34]">
                    0{index + 1}
                  </p>
                  <p className="mt-4 text-base font-medium text-white/[0.84]">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div
            data-hero-float="two"
            className="panel-border panel-surface absolute right-[4%] top-[12%] w-[14rem] rounded-[1.6rem] p-4 will-change-transform"
          >
            <p className="text-xs uppercase tracking-[0.26em] text-white/[0.36]">
              Motion cue
            </p>
            <div className="mt-4 h-px w-full bg-gradient-to-r from-white via-white/[0.45] to-transparent" />
            <p className="mt-4 text-3xl font-semibold text-white">4.8s</p>
            <p className="mt-2 text-sm leading-6 text-white/[0.58]">
              Average rhythm cycle across the page.
            </p>
          </div>

          <div
            data-hero-float="three"
            className="absolute bottom-[10%] left-[6%] w-[15rem] rounded-[1.6rem] border border-white/[0.08] bg-black/[0.35] p-5 backdrop-blur"
          >
            <p className="text-xs uppercase tracking-[0.28em] text-white/[0.34]">
              Premium touch
            </p>
            <p className="mt-3 text-xl font-semibold text-white">
              Blur, glow, timing, and restraint.
            </p>
            <p className="mt-3 text-sm leading-6 text-white/[0.56]">
              Micro-interactions stay tactile while the scroll remains the main
              storytelling engine.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
