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

const heroSignals = [
  {
    value: "01",
    label: "Cinematic pacing",
    detail: "The first reveal opens softly, then hands the eye toward the next beat."
  },
  {
    value: "02",
    label: "Editorial contrast",
    detail: "Typography stays in charge while motion shapes the emotional rhythm."
  },
  {
    value: "03",
    label: "Premium restraint",
    detail: "Nothing moves for decoration. Every motion cue reinforces product perception."
  }
];

const stageNotes = [
  {
    label: "Lead",
    title: "Typography opens the scene before the interface starts to move."
  },
  {
    label: "Handoff",
    title: "Every block points toward the next reveal instead of ending the section."
  },
  {
    label: "Finish",
    title: "Glow, blur, and timing stay subtle enough to feel expensive."
  }
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

    const { gsap, ScrollTrigger } = initGSAP();

    const ctx = gsap.context(() => {
      if (reducedMotion()) {
        gsap.set(
          [
            "[data-hero-badge]",
            "[data-hero-word]",
            "[data-hero-copy]",
            "[data-hero-actions]",
            "[data-hero-meta]",
            "[data-hero-divider]",
            "[data-hero-stage]",
            "[data-hero-card]",
            "[data-hero-caption]"
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
          {
            autoAlpha: 0,
            y: 30,
            filter: "blur(10px)"
          },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.94
          }
        )
        .fromTo(
          "[data-hero-word]",
          {
            autoAlpha: 0,
            yPercent: 112,
            filter: "blur(18px)",
            scale: 0.958
          },
          {
            autoAlpha: 1,
            yPercent: 0,
            filter: "blur(0px)",
            scale: 1,
            duration: 1.28,
            stagger: 0.042
          },
          "-=0.28"
        )
        .fromTo(
          "[data-hero-copy]",
          {
            autoAlpha: 0,
            y: 38,
            filter: "blur(12px)"
          },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.02,
            stagger: 0.1
          },
          "-=0.82"
        )
        .fromTo(
          "[data-hero-divider]",
          {
            scaleX: 0,
            transformOrigin: "left center"
          },
          {
            scaleX: 1,
            duration: 1.08
          },
          "-=0.72"
        )
        .fromTo(
          "[data-hero-actions]",
          {
            autoAlpha: 0,
            y: 26
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.86
          },
          "-=0.82"
        )
        .fromTo(
          "[data-hero-meta]",
          {
            autoAlpha: 0,
            y: 24,
            filter: "blur(10px)"
          },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.9,
            stagger: 0.09
          },
          "-=0.74"
        )
        .fromTo(
          "[data-hero-stage]",
          {
            autoAlpha: 0,
            scale: 0.955,
            y: 48,
            filter: "blur(20px)"
          },
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.34
          },
          "-=1.08"
        )
        .fromTo(
          "[data-hero-caption]",
          {
            autoAlpha: 0,
            y: 18
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.82
          },
          "-=0.98"
        )
        .fromTo(
          "[data-hero-sheen]",
          {
            xPercent: -24,
            autoAlpha: 0
          },
          {
            xPercent: 0,
            autoAlpha: 1,
            duration: 1.18
          },
          "-=1.02"
        );

      gsap.to("[data-hero-stage-shell]", {
        yPercent: -1.8,
        scale: 1.008,
        duration: 6.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      ScrollTrigger.matchMedia({
        "(max-width: 767px)": () => {
          gsap.to("[data-hero-glow='one']", {
            x: 20,
            y: -16,
            duration: 8.4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });

          gsap.to("[data-hero-glow='two']", {
            x: -14,
            y: 20,
            duration: 9.6,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });

          gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom top",
              scrub: 1.04
            }
          })
            .to(
              "[data-hero-copy-block]",
              {
                yPercent: -5,
                autoAlpha: 0.94,
                ease: "none"
              },
              0
            )
            .to(
              "[data-hero-stage]",
              {
                yPercent: 8,
                scale: 0.98,
                autoAlpha: 0.72,
                ease: "none"
              },
              0
            )
            .to(
              "[data-hero-sheen]",
              {
                xPercent: 10,
                autoAlpha: 0.26,
                ease: "none"
              },
              0
            );
        },
        "(min-width: 768px)": () => {
          gsap.to("[data-hero-glow='one']", {
            x: 30,
            y: -24,
            duration: 8.2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });

          gsap.to("[data-hero-glow='two']", {
            x: -26,
            y: 30,
            duration: 9.4,
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

          gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom top",
              scrub: 1.24
            }
          })
            .to(
              "[data-hero-copy-block]",
              {
                yPercent: -10,
                autoAlpha: 0.92,
                ease: "none"
              },
              0
            )
            .to(
              "[data-hero-stage]",
              {
                yPercent: 12,
                scale: 0.962,
                autoAlpha: 0.44,
                ease: "none"
              },
              0
            )
            .to(
              "[data-hero-card='primary']",
              {
                yPercent: -12,
                rotateX: 5,
                rotateY: -4,
                ease: "none"
              },
              0
            )
            .to(
              "[data-hero-card='secondary']",
              {
                yPercent: 10,
                rotateX: -3,
                rotateY: 5,
                ease: "none"
              },
              0
            )
            .to(
              "[data-hero-card='tertiary']",
              {
                yPercent: 16,
                ease: "none"
              },
              0
            )
            .to(
              "[data-hero-grid]",
              {
                yPercent: 8,
                scale: 1.04,
                ease: "none"
              },
              0
            )
            .to(
              "[data-hero-glow='one']",
              {
                scale: 1.14,
                autoAlpha: 0.7,
                ease: "none"
              },
              0
            )
            .to(
              "[data-hero-glow='two']",
              {
                scale: 1.18,
                autoAlpha: 0.7,
                ease: "none"
              },
              0
            )
            .to(
              "[data-hero-sheen]",
              {
                xPercent: 18,
                autoAlpha: 0.4,
                ease: "none"
              },
              0
            );
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
      <div className="grid w-full items-center gap-16 lg:grid-cols-[1.04fr_0.96fr]">
        <div data-hero-copy-block className="relative z-10">
          <div
            data-hero-badge
            className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/[0.12] bg-white/[0.04] px-4 py-2 text-[0.72rem] uppercase tracking-[0.28em] text-white/[0.64] backdrop-blur"
          >
            <span className="h-2 w-2 rounded-full bg-white/[0.78]" />
            Motion-Led Product Storytelling
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
            layout introduces the message, motion controls the pacing, and the
            scroll turns the entire page into a guided product reveal.
          </p>
          <p
            data-hero-copy
            className="mt-5 max-w-xl text-sm leading-7 text-white/[0.48] sm:text-base"
          >
            The best experiences do not shout. They unfold with enough confidence
            that every next section feels inevitable.
          </p>

          <div
            data-hero-divider
            className="mt-9 h-px w-40 bg-gradient-to-r from-white via-white/[0.42] to-transparent"
          />

          <div
            data-hero-actions
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <motion.div whileHover={{ y: -5, scale: 1.01 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="#story-flow"
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-medium text-black shadow-[0_0_42px_rgba(255,255,255,0.24)] transition-all duration-300 hover:bg-white/[0.92] hover:shadow-[0_0_56px_rgba(255,255,255,0.28)]"
              >
                Enter the Story
              </Link>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="#sticky-story"
                className="inline-flex items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.03] px-7 py-3.5 text-sm font-medium text-white/[0.84] backdrop-blur transition-all duration-300 hover:border-white/[0.22] hover:bg-white/[0.06] hover:shadow-[0_18px_50px_rgba(255,255,255,0.08)]"
              >
                See the Pinned Sequence
              </Link>
            </motion.div>
          </div>

          <div className="mt-12 grid gap-3 md:grid-cols-3">
            {heroSignals.map((item) => (
              <div
                key={item.label}
                data-hero-meta
                className="rounded-[1.45rem] border border-white/[0.08] bg-white/[0.025] p-5 backdrop-blur"
              >
                <p className="text-sm uppercase tracking-[0.24em] text-white/[0.34]">
                  {item.value}
                </p>
                <p className="mt-3 text-base font-medium text-white">{item.label}</p>
                <p className="mt-3 text-sm leading-6 text-white/[0.54]">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div
          data-hero-stage
          className="relative min-h-[31rem] [perspective:1800px] lg:min-h-[42rem]"
        >
          <div
            data-hero-glow="one"
            className="absolute left-[4%] top-[6%] h-48 w-48 rounded-full bg-white/[0.10] blur-[100px] will-change-transform md:h-72 md:w-72"
          />
          <div
            data-hero-glow="two"
            className="absolute bottom-[8%] right-[2%] h-52 w-52 rounded-full bg-zinc-400/[0.12] blur-[110px] will-change-transform md:h-80 md:w-80"
          />

          <div
            data-hero-stage-shell
            className="absolute inset-0 will-change-transform"
          >
            <div
              data-hero-grid
              className="absolute inset-[6%] rounded-[2.5rem] border border-white/[0.08] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))]"
            />
            <div className="absolute inset-[12%] rounded-[2.5rem] border border-white/[0.08] shadow-glow" />
            <div className="absolute inset-[18%] rounded-[2.2rem] border border-white/[0.05]" />
            <div
              data-hero-sheen
              className="sheen-overlay absolute inset-y-[10%] left-[4%] w-[34%] rounded-full opacity-0 blur-2xl"
            />

            <div
              data-hero-card="primary"
              data-hero-float="one"
              className="panel-border panel-surface absolute left-[8%] top-[12%] w-[80%] rounded-[2rem] p-6 will-change-transform md:p-8"
            >
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/[0.38]">
                    Narrative System
                  </p>
                  <p className="mt-3 max-w-[16ch] text-2xl font-semibold leading-tight text-white">
                    Each section arrives like the next scene in the same product film.
                  </p>
                </div>
                <div className="rounded-full border border-white/[0.10] px-3 py-1.5 text-[0.7rem] uppercase tracking-[0.24em] text-white/[0.54]">
                  Scroll-Led
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {stageNotes.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[1.35rem] border border-white/[0.08] bg-black/[0.26] p-4 transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(0,0,0,0.22)]"
                  >
                    <p className="text-[0.68rem] uppercase tracking-[0.26em] text-white/[0.34]">
                      {item.label}
                    </p>
                    <p className="mt-4 text-base font-medium leading-6 text-white/[0.84]">
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div
              data-hero-float="two"
              data-hero-card="secondary"
              className="panel-border panel-surface absolute right-[4%] top-[12%] w-[15rem] rounded-[1.6rem] p-4 will-change-transform"
            >
              <p className="text-xs uppercase tracking-[0.26em] text-white/[0.36]">
                Motion cue
              </p>
              <div className="mt-4 h-px w-full bg-gradient-to-r from-white via-white/[0.45] to-transparent" />
              <p className="mt-4 text-3xl font-semibold text-white">4.8s</p>
              <p className="mt-2 text-sm leading-6 text-white/[0.58]">
                Average rhythm cycle across the page from intro to CTA.
              </p>
            </div>

            <div
              data-hero-float="three"
              data-hero-card="tertiary"
              className="absolute bottom-[10%] left-[6%] w-[16rem] rounded-[1.6rem] border border-white/[0.08] bg-black/[0.35] p-5 backdrop-blur will-change-transform"
            >
              <p className="text-xs uppercase tracking-[0.28em] text-white/[0.34]">
                Premium detail
              </p>
              <p className="mt-3 text-xl font-semibold text-white">
                Glow, blur, continuity, and just enough restraint.
              </p>
              <p className="mt-3 text-sm leading-6 text-white/[0.56]">
                The surface feels alive, but the product message always stays in front.
              </p>
            </div>
          </div>

          <div
            data-hero-caption
            className="absolute bottom-0 right-[8%] max-w-[18rem] text-right text-xs uppercase tracking-[0.24em] text-white/[0.34]"
          >
            Scroll-driven narrative with Arabic-ready typography and premium motion pacing.
          </div>
        </div>
      </div>
    </section>
  );
}
