"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLayoutEffect, useRef } from "react";

import { initGSAP, reducedMotion } from "@/lib/animations";

const headlineLines = [
  "Launch stories that",
  "feel directed,",
  "not assembled."
];

const heroSignals = [
  {
    value: "01",
    label: "Narrative-first motion",
    detail: "The page opens with calm, then lets animation take control only when the message needs it."
  },
  {
    value: "02",
    label: "Premium depth",
    detail: "Glass surfaces, layered glow, and parallax cues create atmosphere without overwhelming the product."
  },
  {
    value: "03",
    label: "Client-ready polish",
    detail: "Every transition has a reason, which is what makes the final experience feel custom instead of prebuilt."
  }
];

const stageNotes = [
  {
    label: "Hero reveal",
    title: "Word-by-word typography sets the tone before the interface starts to move."
  },
  {
    label: "Pinned chapter",
    title: "A single scroll-controlled scene gives one message enough room to become memorable."
  },
  {
    label: "Conversion finish",
    title: "The CTA lands on contrast, clarity, and a quieter rhythm."
  }
];

function renderWords(text: string, prefix: string) {
  return (
    <span className="flex flex-wrap gap-x-3 gap-y-3">
      {text.split(" ").map((word, index) => (
        <span key={`${prefix}-${word}-${index}`} className="inline-flex overflow-hidden">
          <span
            data-hero-word
            className="inline-block will-change-[transform,opacity,filter]"
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
            "[data-hero-accent]",
            "[data-hero-copy]",
            "[data-hero-actions]",
            "[data-hero-divider]",
            "[data-hero-meta]",
            "[data-hero-stage]",
            "[data-hero-card]",
            "[data-hero-caption]",
            "[data-hero-cue]",
            "[data-hero-orbit]",
            "[data-hero-orbit-core]",
            "[data-hero-beam]"
          ],
          {
            autoAlpha: 1,
            x: 0,
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
            y: 24,
            scale: 0.98,
            filter: "blur(12px)"
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.9
          }
        )
        .fromTo(
          "[data-hero-word]",
          {
            autoAlpha: 0,
            yPercent: 112,
            scale: 0.964,
            filter: "blur(18px)"
          },
          {
            autoAlpha: 1,
            yPercent: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.2,
            stagger: 0.04
          },
          "-=0.3"
        )
        .fromTo(
          "[data-hero-accent]",
          {
            autoAlpha: 0,
            y: 22,
            filter: "blur(12px)"
          },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.82
          },
          "-=0.94"
        )
        .fromTo(
          "[data-hero-copy]",
          {
            autoAlpha: 0,
            y: 34,
            filter: "blur(12px)"
          },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.98,
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
            y: 24
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.84
          },
          "-=0.8"
        )
        .fromTo(
          "[data-hero-meta]",
          {
            autoAlpha: 0,
            y: 24,
            scale: 0.986,
            filter: "blur(10px)"
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.9,
            stagger: 0.08
          },
          "-=0.7"
        )
        .fromTo(
          "[data-hero-stage]",
          {
            autoAlpha: 0,
            y: 42,
            scale: 0.968,
            filter: "blur(20px)"
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.24
          },
          "-=1.08"
        )
        .fromTo(
          "[data-hero-card]",
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
            duration: 1.02,
            stagger: 0.12
          },
          "-=1.0"
        )
        .fromTo(
          "[data-hero-orbit]",
          {
            autoAlpha: 0,
            scale: 0.9
          },
          {
            autoAlpha: 0.5,
            scale: 1,
            duration: 1
          },
          "-=1.06"
        )
        .fromTo(
          "[data-hero-orbit-core]",
          {
            autoAlpha: 0,
            scale: 0.72,
            y: 10
          },
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: 0.86
          },
          "-=0.9"
        )
        .fromTo(
          "[data-hero-beam]",
          {
            autoAlpha: 0,
            xPercent: -20
          },
          {
            autoAlpha: 0.9,
            xPercent: 0,
            duration: 1.18
          },
          "-=1.02"
        )
        .fromTo(
          "[data-hero-caption], [data-hero-cue]",
          {
            autoAlpha: 0,
            y: 18
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.78,
            stagger: 0.06
          },
          "-=0.92"
        );

      gsap.to("[data-hero-stage-shell]", {
        yPercent: -2.2,
        duration: 7.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      gsap.to("[data-hero-orbit]", {
        rotate: 360,
        duration: 26,
        repeat: -1,
        ease: "none"
      });

      gsap.to("[data-hero-orbit-core]", {
        x: 16,
        y: -12,
        duration: 7.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      gsap.to("[data-hero-gradient='one']", {
        x: 28,
        y: -20,
        duration: 8.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      gsap.to("[data-hero-gradient='two']", {
        x: -22,
        y: 24,
        duration: 9.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      ScrollTrigger.matchMedia({
        "(max-width: 767px)": () => {
          gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom top",
              scrub: 1.02
            }
          })
            .to(
              "[data-hero-copy-block]",
              {
                yPercent: -7,
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
                autoAlpha: 0.78,
                ease: "none"
              },
              0
            )
            .to(
              "[data-hero-orbit]",
              {
                scale: 1.08,
                autoAlpha: 0.34,
                ease: "none"
              },
              0
            );
        },
        "(min-width: 768px)": () => {
          gsap.to("[data-hero-float='one']", {
            y: -16,
            x: 10,
            duration: 6.2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });

          gsap.to("[data-hero-float='two']", {
            y: 12,
            x: -14,
            duration: 6.8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });

          gsap.to("[data-hero-float='three']", {
            y: -12,
            duration: 5.6,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });

          gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom top",
              scrub: 1.18
            }
          })
            .to(
              "[data-hero-copy-block]",
              {
                yPercent: -12,
                autoAlpha: 0.9,
                ease: "none"
              },
              0
            )
            .to(
              "[data-hero-stage]",
              {
                yPercent: 13,
                scale: 0.958,
                autoAlpha: 0.46,
                ease: "none"
              },
              0
            )
            .to(
              "[data-hero-card='primary']",
              {
                yPercent: -10,
                rotateX: 4,
                rotateY: -4,
                ease: "none"
              },
              0
            )
            .to(
              "[data-hero-card='secondary']",
              {
                yPercent: 8,
                rotateX: -3,
                rotateY: 5,
                ease: "none"
              },
              0
            )
            .to(
              "[data-hero-card='tertiary']",
              {
                yPercent: 12,
                ease: "none"
              },
              0
            )
            .to(
              "[data-hero-orbit]",
              {
                scale: 1.14,
                autoAlpha: 0.28,
                rotate: 34,
                ease: "none"
              },
              0
            )
            .to(
              "[data-hero-orbit-core]",
              {
                xPercent: 24,
                yPercent: -36,
                autoAlpha: 0.5,
                ease: "none"
              },
              0
            )
            .to(
              "[data-hero-beam]",
              {
                xPercent: 18,
                autoAlpha: 0.44,
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
      className="section-shell flex min-h-screen items-center pb-16 pt-28 lg:pb-12 lg:pt-14"
    >
      <div className="grid w-full items-center gap-16 lg:grid-cols-[1.02fr_0.98fr]">
        <div data-hero-copy-block className="relative z-10 max-w-3xl">
          <div
            data-hero-badge
            className="interactive-pill mb-7 inline-flex items-center gap-3 rounded-full border border-white/[0.12] bg-white/[0.04] px-4 py-2 text-[0.72rem] uppercase tracking-[0.3em] text-white/[0.66] backdrop-blur"
          >
            <span className="soft-pulse h-2.5 w-2.5 rounded-full bg-white/[0.82]" />
            Premium Scroll-Led SaaS Demo
          </div>

          <h1 className="max-w-[12ch] text-[3.3rem] font-semibold leading-[0.88] text-white sm:text-[4.65rem] md:text-[6rem] lg:text-[6.8rem]">
            <span className="block">{renderWords(headlineLines[0], "line-1")}</span>
            <span className="mt-3 block text-shimmer">
              {renderWords(headlineLines[1], "line-2")}
            </span>
            <span className="mt-3 block text-white/[0.86]">
              {renderWords(headlineLines[2], "line-3")}
            </span>
          </h1>

          <p
            data-hero-accent
            className="mt-6 max-w-xl text-sm uppercase tracking-[0.28em] text-white/[0.42]"
            lang="ar"
            dir="rtl"
          >
            {"\u0648\u062a\u062d\u0643\u064a \u0627\u0644\u0642\u064a\u0645\u0629 \u0645\u0639 \u0643\u0644 \u062a\u0645\u0631\u064a\u0631\u0629"}
          </p>

          <p
            data-hero-copy
            className="mt-8 max-w-2xl text-pretty text-base leading-8 text-white/[0.68] sm:text-lg"
          >
            This project keeps the existing landing-page structure and upgrades
            the feel through pacing, continuity, and better motion hierarchy.
            The result is a cleaner, more cinematic SaaS experience within the
            first few seconds.
          </p>
          <p
            data-hero-copy
            className="mt-5 max-w-xl text-sm leading-7 text-white/[0.5] sm:text-base"
          >
            Nothing moves for decoration. Each reveal lowers friction, guides
            attention, and helps the product feel more considered before the
            user reaches the CTA.
          </p>

          <div
            data-hero-divider
            className="mt-9 h-px w-44 bg-gradient-to-r from-white via-white/[0.38] to-transparent"
          />

          <div
            data-hero-actions
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <motion.div whileHover={{ y: -4, scale: 1.01 }} whileTap={{ scale: 0.985 }}>
              <Link
                href="#story-flow"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-black shadow-[0_0_42px_rgba(255,255,255,0.24)] transition-all duration-300 hover:bg-white/[0.94] hover:shadow-[0_0_64px_rgba(255,255,255,0.28)]"
              >
                <span className="h-2.5 w-2.5 rounded-full bg-black/75 transition-transform duration-300 group-hover:scale-125" />
                <span>Enter the Story</span>
              </Link>
            </motion.div>

            <motion.div whileHover={{ y: -4 }} whileTap={{ scale: 0.985 }}>
              <Link
                href="#sticky-story"
                className="group inline-flex items-center justify-center gap-3 rounded-full border border-white/[0.12] bg-white/[0.03] px-7 py-3.5 text-sm font-medium text-white/[0.88] backdrop-blur transition-all duration-300 hover:border-white/[0.22] hover:bg-white/[0.06] hover:shadow-[0_18px_52px_rgba(255,255,255,0.08)]"
              >
                <span>See the WOW section</span>
                <span className="text-white/[0.48] transition-transform duration-300 group-hover:translate-x-1">
                  /
                </span>
              </Link>
            </motion.div>
          </div>

          <div className="mt-12 grid gap-3 md:grid-cols-3">
            {heroSignals.map((item) => (
              <div
                key={item.label}
                data-hero-meta
                className="interactive-card rounded-[1.55rem] border border-white/[0.08] bg-white/[0.025] p-5 backdrop-blur"
              >
                <p className="text-sm uppercase tracking-[0.24em] text-white/[0.34]">
                  {item.value}
                </p>
                <p className="mt-3 text-base font-medium text-white">{item.label}</p>
                <p className="mt-3 text-sm leading-6 text-white/[0.54]">{item.detail}</p>
              </div>
            ))}
          </div>

          <p
            data-hero-cue
            className="mt-10 text-[0.68rem] uppercase tracking-[0.28em] text-white/[0.32]"
          >
            Scroll to watch the story tighten
          </p>
        </div>

        <div
          data-hero-stage
          className="relative min-h-[32rem] [perspective:1800px] md:min-h-[40rem] lg:min-h-[43rem]"
        >
          <div
            data-hero-gradient="one"
            className="absolute left-[2%] top-[8%] h-48 w-48 rounded-full bg-white/[0.1] blur-[100px] will-change-transform md:h-72 md:w-72"
          />
          <div
            data-hero-gradient="two"
            className="absolute bottom-[6%] right-[0%] h-52 w-52 rounded-full bg-slate-300/[0.12] blur-[120px] will-change-transform md:h-80 md:w-80"
          />

          <div data-hero-stage-shell className="absolute inset-0 will-change-transform">
            <div className="absolute inset-[6%] overflow-hidden rounded-[2.8rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.015))]">
              <div className="hero-mesh absolute inset-0 opacity-[0.22]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_36%),radial-gradient(circle_at_80%_18%,rgba(255,255,255,0.06),transparent_24%)]" />
            </div>

            <div
              data-hero-orbit
              className="absolute right-[12%] top-[14%] h-28 w-28 rounded-full border border-white/[0.1] opacity-0 will-change-transform md:h-36 md:w-36"
            />
            <div
              data-hero-orbit-core
              className="absolute right-[18%] top-[21%] h-2.5 w-2.5 rounded-full bg-white/[0.82] opacity-0 shadow-[0_0_18px_rgba(255,255,255,0.45)] will-change-transform"
            />
            <div
              data-hero-beam
              className="sheen-overlay absolute inset-y-[10%] left-[4%] w-[36%] rounded-full opacity-0 blur-2xl"
            />

            <div
              data-hero-card="primary"
              data-hero-float="one"
              className="panel-border panel-surface absolute left-[7%] top-[11%] w-[82%] rounded-[2rem] p-6 md:p-8"
            >
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/[0.38]">
                    Experience Direction
                  </p>
                  <p className="mt-3 max-w-[15ch] text-2xl font-semibold leading-tight text-white">
                    The first screen behaves like a premium opening shot.
                  </p>
                </div>
                <div className="rounded-full border border-white/[0.1] px-3 py-1.5 text-[0.68rem] uppercase tracking-[0.24em] text-white/[0.54]">
                  GSAP-led
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {stageNotes.map((item) => (
                  <div
                    key={item.label}
                    className="interactive-card rounded-[1.35rem] border border-white/[0.08] bg-black/[0.24] p-4"
                  >
                    <p className="text-[0.68rem] uppercase tracking-[0.26em] text-white/[0.34]">
                      {item.label}
                    </p>
                    <p className="mt-4 text-base font-medium leading-6 text-white/[0.86]">
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div
              data-hero-card="secondary"
              data-hero-float="two"
              className="panel-border panel-surface absolute right-[4%] top-[15%] w-[15rem] rounded-[1.6rem] p-4"
            >
              <p className="text-xs uppercase tracking-[0.28em] text-white/[0.36]">
                First impression
              </p>
              <div className="mt-4 h-px w-full bg-gradient-to-r from-white via-white/[0.45] to-transparent" />
              <p className="mt-4 text-3xl font-semibold text-white">5 sec</p>
              <p className="mt-2 text-sm leading-6 text-white/[0.58]">
                Enough time to communicate polish before the user makes a judgment.
              </p>
            </div>

            <div
              data-hero-card="tertiary"
              data-hero-float="three"
              className="absolute bottom-[9%] left-[6%] w-[17rem] rounded-[1.6rem] border border-white/[0.08] bg-black/[0.34] p-5 backdrop-blur"
            >
              <p className="text-xs uppercase tracking-[0.28em] text-white/[0.34]">
                Motion system
              </p>
              <p className="mt-3 text-xl font-semibold text-white">
                Staggered text, pinned storytelling, elegant depth, and a sharper CTA close.
              </p>
              <p className="mt-3 text-sm leading-6 text-white/[0.56]">
                The structure stays familiar while the feeling becomes more cinematic.
              </p>
            </div>
          </div>

          <div
            data-hero-caption
            className="absolute bottom-0 right-[8%] max-w-[18rem] text-right text-[0.68rem] uppercase tracking-[0.26em] text-white/[0.32]"
          >
            Premium SaaS storytelling with scroll-timed motion and Arabic-ready type.
          </div>
        </div>
      </div>
    </section>
  );
}
