"use client";

import { useLayoutEffect, useRef } from "react";

import {
  createParallax,
  createSectionBlend,
  initGSAP,
  reducedMotion
} from "@/lib/animations";

type StoryBeat = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  detail: string;
  accent: string;
  direction: "left" | "right";
  metric: string;
  metricLabel: string;
};

type StoryFlowSectionProps = {
  beats: StoryBeat[];
};

const chapterNotes = [
  "Typography leads before animation speaks.",
  "Movement creates contrast instead of noise.",
  "The final story beat lands with editorial clarity."
];

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

export function StoryFlowSection({ beats }: StoryFlowSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const { gsap } = initGSAP();

    const ctx = gsap.context(() => {
      const chapters = gsap.utils.toArray<HTMLElement>("[data-beat]");

      if (reducedMotion()) {
        gsap.set(
          [
            "[data-flow-head]",
            "[data-beat-word]",
            "[data-beat-copy]",
            "[data-beat-chip]",
            "[data-beat-shell]",
            "[data-beat-panel]",
            "[data-beat-card]",
            "[data-beat-line]",
            "[data-beat-sheen]"
          ],
          {
            autoAlpha: 1,
            y: 0,
            x: 0,
            yPercent: 0,
            scaleX: 1,
            filter: "blur(0px)"
          }
        );

        return;
      }

      gsap.fromTo(
        "[data-flow-head]",
        { autoAlpha: 0, y: 34, filter: "blur(12px)" },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 76%"
          }
        }
      );

      chapters.forEach((chapter) => {
        const shell = chapter.querySelector("[data-beat-shell]");
        const words = chapter.querySelectorAll("[data-beat-word]");
        const copies = chapter.querySelectorAll("[data-beat-copy]");
        const chips = chapter.querySelectorAll("[data-beat-chip]");
        const panel = chapter.querySelector("[data-beat-panel]");
        const cards = chapter.querySelectorAll("[data-beat-card]");
        const line = chapter.querySelector("[data-beat-line]");
        const halo = chapter.querySelector("[data-beat-halo]");
        const sheen = chapter.querySelector("[data-beat-sheen]");
        const direction = chapter.dataset.direction === "right" ? -1 : 1;

        if (shell) {
          createSectionBlend(shell, chapter, {
            scrub: 1.2,
            yStart: 11,
            yEnd: -7,
            opacityStart: 0.4,
            opacityEnd: 0.6
          });
        }

        const revealTl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: chapter,
            start: "top 77%"
          }
        });

        revealTl.fromTo(
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
            duration: 1.12,
            stagger: 0.03,
          }
        );

        revealTl.fromTo(
          copies,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.82,
            stagger: 0.12,
            ease: "power3.out"
          }
        ,
          "-=0.74"
        );

        if (chips.length > 0) {
          revealTl.fromTo(
            chips,
            { autoAlpha: 0, y: 18, scale: 0.98 },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.65,
              stagger: 0.08
            },
            "-=0.58"
          );
        }

        if (panel) {
          revealTl.fromTo(
            panel,
            {
              autoAlpha: 0,
              x: 62 * direction,
              y: 18,
              scale: 0.985,
              filter: "blur(18px)"
            },
            {
              autoAlpha: 1,
              x: 0,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              duration: 1.08,
              ease: "power3.out"
            }
          ,
            "-=1.02"
          );
        }

        if (cards.length > 0) {
          gsap.fromTo(
          cards,
            { autoAlpha: 0, y: 26 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.9,
              stagger: 0.14,
              ease: "power3.out",
              scrollTrigger: {
                trigger: chapter,
                start: "top 66%"
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
              duration: 1.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: chapter,
                start: "top 74%"
              }
            }
          );
        }

        if (halo instanceof HTMLElement) {
          createParallax(halo, chapter, 44, 1.35);
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
              yPercent: -4 * direction,
              rotateY: -3 * direction,
              rotateX: 1.5,
              ease: "none",
              scrollTrigger: {
                trigger: chapter,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.25
              }
            }
          );
        }

        if (sheen) {
          gsap.fromTo(
            sheen,
            { xPercent: -18, autoAlpha: 0 },
            {
              xPercent: 18,
              autoAlpha: 0.42,
              ease: "none",
              scrollTrigger: {
                trigger: chapter,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.15
              }
            }
          );
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
          Each chapter enters with intention, hands motion to the next, and
          keeps the eye moving through the page without abrupt transitions.
        </p>
      </div>

      <div className="relative mt-20">
        <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/[0.08] to-transparent lg:block" />

        <div className="space-y-24 md:space-y-32">
          {beats.map((beat, index) => (
            <article
              key={beat.id}
              data-beat
              data-direction={beat.direction}
              className="relative"
            >
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
                    {["Fade reveal", "Directional motion", "Story continuity"].map(
                      (item) => (
                        <span
                          key={`${beat.id}-${item}`}
                          data-beat-chip
                          className="rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-xs uppercase tracking-[0.22em] text-white/[0.5]"
                        >
                          {item}
                        </span>
                      )
                    )}
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
                          className="rounded-[1.45rem] border border-white/[0.08] bg-black/[0.24] p-5"
                        >
                          <p className="text-sm uppercase tracking-[0.24em] text-white/[0.34]">
                            Sequence
                          </p>
                          <p className="mt-4 text-xl font-semibold text-white">
                            {chapterNotes[index]}
                          </p>
                        </div>
                        <div
                          data-beat-card
                          className="rounded-[1.45rem] border border-white/[0.08] bg-white/[0.03] p-5"
                        >
                          <p className="text-sm uppercase tracking-[0.24em] text-white/[0.34]">
                            Transition
                          </p>
                          <p className="mt-4 text-xl font-semibold text-white">
                            The next section arrives without a visual reset.
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
