"use client";

import { useLayoutEffect, useRef } from "react";

import {
  createParallax,
  createSectionBlend,
  initGSAP,
  reducedMotion
} from "@/lib/animations";

export type ScrollRevealBeat = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  detail: string;
  accent: string;
  direction: "left" | "right";
  metric: string;
  metricLabel: string;
  signals: readonly [string, string, string];
  insight: string;
};

type ScrollRevealSectionProps = {
  beats: ScrollRevealBeat[];
};

function renderWords(text: string, prefix: string) {
  return (
    <span className="flex flex-wrap gap-x-3 gap-y-2">
      {text.split(" ").map((word, index) => (
        <span key={`${prefix}-${word}-${index}`} className="inline-flex overflow-hidden">
          <span data-beat-word className="inline-block will-change-transform">
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}

export function ScrollRevealSection({ beats }: ScrollRevealSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const { gsap, ScrollTrigger } = initGSAP();

    const ctx = gsap.context(() => {
      const chapters = gsap.utils.toArray<HTMLElement>("[data-beat]");

      if (reducedMotion()) {
        gsap.set(
          [
            "[data-flow-head]",
            "[data-flow-line]",
            "[data-beat-word]",
            "[data-beat-copy]",
            "[data-beat-chip]",
            "[data-beat-shell]",
            "[data-beat-panel]",
            "[data-beat-card]",
            "[data-beat-line]",
            "[data-beat-sheen]",
            "[data-beat-marker]"
          ],
          {
            autoAlpha: 1,
            y: 0,
            x: 0,
            yPercent: 0,
            scale: 1,
            scaleX: 1,
            filter: "blur(0px)"
          }
        );

        return;
      }

      gsap.fromTo(
        "[data-flow-head]",
        {
          autoAlpha: 0,
          y: 80,
          filter: "blur(14px)"
        },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.08,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%"
          }
        }
      );

      gsap.fromTo(
        "[data-flow-line]",
        {
          scaleX: 0,
          transformOrigin: "center center"
        },
        {
          scaleX: 1,
          duration: 1.18,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 78%"
          }
        }
      );

      ScrollTrigger.matchMedia({
        "(max-width: 767px)": () => {
          chapters.forEach((chapter) => {
            const shell = chapter.querySelector<HTMLElement>("[data-beat-shell]");
            const words = chapter.querySelectorAll("[data-beat-word]");
            const copies = chapter.querySelectorAll("[data-beat-copy]");
            const chips = chapter.querySelectorAll("[data-beat-chip]");
            const panel = chapter.querySelector<HTMLElement>("[data-beat-panel]");
            const cards = chapter.querySelectorAll("[data-beat-card]");
            const line = chapter.querySelector<HTMLElement>("[data-beat-line]");
            const marker = chapter.querySelector<HTMLElement>("[data-beat-marker]");

            if (shell) {
              createSectionBlend(shell, chapter, {
                scrub: 1.12,
                yStart: 8,
                yEnd: -4,
                opacityStart: 0.56,
                opacityEnd: 0.72,
                scaleStart: 0.992,
                scaleEnd: 0.996
              });
            }

            const revealTl = gsap.timeline({
              defaults: { ease: "power3.out" },
              scrollTrigger: {
                trigger: chapter,
                start: "top 80%"
              }
            });

            revealTl
              .fromTo(
                words,
                {
                  autoAlpha: 0,
                  yPercent: 110,
                  filter: "blur(16px)"
                },
                {
                  autoAlpha: 1,
                  yPercent: 0,
                  filter: "blur(0px)",
                  duration: 1.06,
                  stagger: 0.03
                }
              )
              .fromTo(
                copies,
                {
                  autoAlpha: 0,
                  y: 80,
                  filter: "blur(12px)"
                },
                {
                  autoAlpha: 1,
                  y: 0,
                  filter: "blur(0px)",
                  duration: 0.9,
                  stagger: 0.12
                },
                "-=0.78"
              )
              .fromTo(
                chips,
                {
                  autoAlpha: 0,
                  y: 22,
                  scale: 0.985
                },
                {
                  autoAlpha: 1,
                  y: 0,
                  scale: 1,
                  duration: 0.72,
                  stagger: 0.08
                },
                "-=0.58"
              );

            if (panel) {
              revealTl.fromTo(
                panel,
                {
                  autoAlpha: 0,
                  y: 80,
                  filter: "blur(18px)",
                  scale: 0.99
                },
                {
                  autoAlpha: 1,
                  y: 0,
                  filter: "blur(0px)",
                  scale: 1,
                  duration: 1.02
                },
                "-=0.98"
              );
            }

            if (cards.length > 0) {
              gsap.fromTo(
                cards,
                {
                  autoAlpha: 0,
                  y: 80,
                  filter: "blur(12px)"
                },
                {
                  autoAlpha: 1,
                  y: 0,
                  filter: "blur(0px)",
                  duration: 0.86,
                  stagger: 0.14,
                  ease: "power3.out",
                  scrollTrigger: {
                    trigger: chapter,
                    start: "top 80%"
                  }
                }
              );
            }

            if (line) {
              gsap.fromTo(
                line,
                { scaleX: 0, transformOrigin: "left center" },
                {
                  scaleX: 1,
                  duration: 1.02,
                  ease: "power3.out",
                  scrollTrigger: {
                    trigger: chapter,
                    start: "top 80%"
                  }
                }
              );
            }

            if (marker) {
              gsap.fromTo(
                marker,
                {
                  autoAlpha: 0,
                  scale: 0.72
                },
                {
                  autoAlpha: 1,
                  scale: 1,
                  duration: 0.72,
                  ease: "power3.out",
                  scrollTrigger: {
                    trigger: chapter,
                    start: "top 84%"
                  }
                }
              );
            }
          });
        },
        "(min-width: 768px)": () => {
          chapters.forEach((chapter) => {
            const shell = chapter.querySelector<HTMLElement>("[data-beat-shell]");
            const words = chapter.querySelectorAll("[data-beat-word]");
            const copies = chapter.querySelectorAll("[data-beat-copy]");
            const chips = chapter.querySelectorAll("[data-beat-chip]");
            const panel = chapter.querySelector<HTMLElement>("[data-beat-panel]");
            const cards = chapter.querySelectorAll("[data-beat-card]");
            const line = chapter.querySelector<HTMLElement>("[data-beat-line]");
            const halo = chapter.querySelector<HTMLElement>("[data-beat-halo]");
            const sheen = chapter.querySelector<HTMLElement>("[data-beat-sheen]");
            const marker = chapter.querySelector<HTMLElement>("[data-beat-marker]");
            const direction = chapter.dataset.direction === "right" ? -1 : 1;

            if (shell) {
              createSectionBlend(shell, chapter, {
                scrub: 1.28,
                yStart: 12,
                yEnd: -9,
                opacityStart: 0.38,
                opacityEnd: 0.54,
                scaleStart: 0.982,
                scaleEnd: 0.988
              });
            }

            const revealTl = gsap.timeline({
              defaults: { ease: "power3.out" },
              scrollTrigger: {
                trigger: chapter,
                start: "top 80%"
              }
            });

            revealTl
              .fromTo(
                words,
                {
                  autoAlpha: 0,
                  yPercent: 110,
                  filter: "blur(16px)"
                },
                {
                  autoAlpha: 1,
                  yPercent: 0,
                  filter: "blur(0px)",
                  duration: 1.18,
                  stagger: 0.034
                }
              )
              .fromTo(
                copies,
                {
                  autoAlpha: 0,
                  y: 80,
                  filter: "blur(12px)"
                },
                {
                  autoAlpha: 1,
                  y: 0,
                  filter: "blur(0px)",
                  duration: 0.94,
                  stagger: 0.12
                },
                "-=0.86"
              )
              .fromTo(
                chips,
                {
                  autoAlpha: 0,
                  y: 22,
                  scale: 0.985
                },
                {
                  autoAlpha: 1,
                  y: 0,
                  scale: 1,
                  duration: 0.76,
                  stagger: 0.08
                },
                "-=0.62"
              );

            if (panel) {
              revealTl.fromTo(
                panel,
                {
                  autoAlpha: 0,
                  x: 64 * direction,
                  y: 24,
                  scale: 0.982,
                  filter: "blur(18px)"
                },
                {
                  autoAlpha: 1,
                  x: 0,
                  y: 0,
                  scale: 1,
                  filter: "blur(0px)",
                  duration: 1.18
                },
                "-=1.12"
              );
            }

            if (cards.length > 0) {
              gsap.fromTo(
                cards,
                {
                  autoAlpha: 0,
                  y: 80,
                  filter: "blur(12px)"
                },
                {
                  autoAlpha: 1,
                  y: 0,
                  filter: "blur(0px)",
                  duration: 0.96,
                  stagger: 0.16,
                  ease: "power3.out",
                  scrollTrigger: {
                    trigger: chapter,
                    start: "top 80%"
                  }
                }
              );
            }

            if (line) {
              gsap.fromTo(
                line,
                { scaleX: 0, transformOrigin: "left center" },
                {
                  scaleX: 1,
                  duration: 1.18,
                  ease: "power3.out",
                  scrollTrigger: {
                    trigger: chapter,
                    start: "top 80%"
                  }
                }
              );
            }

            if (marker) {
              gsap.fromTo(
                marker,
                {
                  autoAlpha: 0,
                  scale: 0.68
                },
                {
                  autoAlpha: 1,
                  scale: 1,
                  duration: 0.84,
                  ease: "power3.out",
                  scrollTrigger: {
                    trigger: chapter,
                    start: "top 84%"
                  }
                }
              );
            }

            if (halo) {
              createParallax(halo, chapter, 52, 1.4);
            }

            if (panel) {
              gsap.fromTo(
                panel,
                {
                  yPercent: 6 * direction,
                  rotateY: 3 * direction,
                  rotateX: -1.5
                },
                {
                  yPercent: -5 * direction,
                  rotateY: -3.8 * direction,
                  rotateX: 1.8,
                  ease: "none",
                  scrollTrigger: {
                    trigger: chapter,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.35
                  }
                }
              );
            }

            if (sheen) {
              gsap.fromTo(
                sheen,
                {
                  xPercent: -18,
                  autoAlpha: 0
                },
                {
                  xPercent: 18,
                  autoAlpha: 0.42,
                  ease: "none",
                  scrollTrigger: {
                    trigger: chapter,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.18
                  }
                }
              );
            }
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [beats]);

  return (
    <section
      ref={sectionRef}
      id="story-flow"
      className="section-shell py-24 md:py-32"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p
          data-flow-head
          className="text-sm uppercase tracking-[0.32em] text-white/[0.38]"
        >
          Scroll Story Flow
        </p>
        <h2
          data-flow-head
          className="mt-5 text-balance text-4xl font-semibold leading-[0.95] text-white sm:text-5xl md:text-6xl"
        >
          One narrative arc. No hard breaks. No dead sections.
        </h2>
        <p
          data-flow-head
          className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-8 text-white/[0.62] sm:text-lg"
        >
          Each chapter enters with intention, hands motion to the next, and keeps
          the eye moving through the page without abrupt transitions.
        </p>
        <div
          data-flow-line
          className="mx-auto mt-10 h-px w-36 bg-gradient-to-r from-transparent via-white/[0.56] to-transparent"
        />
      </div>

      <div className="relative mt-20">
        <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/[0.08] to-transparent lg:block" />

        <div className="space-y-24 md:space-y-32">
          {beats.map((beat) => (
            <article
              key={beat.id}
              data-beat
              data-direction={beat.direction}
              className="relative"
            >
              <div className="absolute left-1/2 top-14 hidden -translate-x-1/2 lg:block">
                <div
                  data-beat-marker
                  className="h-3 w-3 rounded-full border border-white/[0.28] bg-white/[0.88] shadow-[0_0_26px_rgba(255,255,255,0.35)]"
                />
              </div>

              <div
                data-beat-shell
                className="grid items-center gap-12 will-change-transform lg:grid-cols-[0.96fr_1.04fr]"
              >
                <div className={beat.direction === "right" ? "lg:order-2" : ""}>
                  <div
                    data-beat-halo
                    className={`absolute top-0 -z-10 h-48 w-48 rounded-full blur-[90px] will-change-transform md:h-64 md:w-64 ${
                      beat.direction === "right"
                        ? "right-2 bg-zinc-200/[0.05]"
                        : "left-2 bg-white/[0.08]"
                    }`}
                  />

                  <p
                    data-beat-copy
                    className="text-sm uppercase tracking-[0.28em] text-white/[0.38]"
                  >
                    {beat.eyebrow}
                  </p>
                  <h3 className="mt-5 max-w-3xl text-[2.6rem] font-semibold leading-[0.96] text-white sm:text-[3.2rem] md:text-[4.2rem]">
                    {renderWords(beat.title, beat.id)}
                  </h3>
                  <p
                    data-beat-copy
                    className="mt-7 max-w-2xl text-pretty text-base leading-8 text-white/[0.64] sm:text-lg"
                  >
                    {beat.description}
                  </p>
                  <p
                    data-beat-copy
                    className="mt-6 max-w-xl border-l border-white/[0.12] pl-5 text-sm leading-7 text-white/[0.52]"
                  >
                    {beat.detail}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    {beat.signals.map((item) => (
                      <span
                        key={`${beat.id}-${item}`}
                        data-beat-chip
                        className="rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-[0.68rem] uppercase tracking-[0.24em] text-white/[0.52]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={beat.direction === "right" ? "lg:order-1" : ""}>
                  <div
                    data-beat-panel
                    className="panel-border panel-surface relative overflow-hidden rounded-[2rem] p-6 will-change-transform md:p-8"
                  >
                    <div
                      data-beat-sheen
                      className="sheen-overlay absolute inset-y-0 left-[-12%] w-[40%] opacity-0 blur-2xl"
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.1),transparent_42%)] opacity-80" />
                    <div className="relative">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs uppercase tracking-[0.3em] text-white/[0.35]">
                            {beat.accent}
                          </p>
                          <p className="mt-3 text-4xl font-semibold text-white">
                            {beat.metric}
                          </p>
                        </div>
                        <p className="max-w-[10ch] text-right text-sm leading-6 text-white/[0.54]">
                          {beat.metricLabel}
                        </p>
                      </div>

                      <div
                        data-beat-line
                        className="mt-7 h-px w-full bg-gradient-to-r from-white via-white/[0.4] to-transparent"
                      />

                      <div className="mt-7 grid gap-4 md:grid-cols-2">
                        <div
                          data-beat-card
                          className="rounded-[1.45rem] border border-white/[0.08] bg-black/[0.24] p-5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(0,0,0,0.24)]"
                        >
                          <p className="text-sm uppercase tracking-[0.24em] text-white/[0.34]">
                            Why It Lands
                          </p>
                          <p className="mt-4 text-xl font-semibold text-white">
                            {beat.insight}
                          </p>
                        </div>
                        <div
                          data-beat-card
                          className="rounded-[1.45rem] border border-white/[0.08] bg-white/[0.03] p-5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(0,0,0,0.18)]"
                        >
                          <p className="text-sm uppercase tracking-[0.24em] text-white/[0.34]">
                            What It Sets Up
                          </p>
                          <p className="mt-4 text-xl font-semibold text-white">
                            The next section arrives as a continuation, not a reset.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
