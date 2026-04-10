"use client";

import { useLayoutEffect, useRef } from "react";

import { initGSAP, reducedMotion } from "@/lib/animations";

const moments = [
  {
    label: "Moment 01",
    title: "First, the page earns attention with space, contrast, and calm.",
    copy: "Nothing moves without purpose. The layout opens slowly, and the user immediately feels that the page has craft."
  },
  {
    label: "Moment 02",
    title: "Then the motion begins to direct the eye instead of decorating the screen.",
    copy: "Pinned storytelling lets each sentence arrive on its own beat. The page stops behaving like content and starts behaving like a sequence."
  },
  {
    label: "Moment 03",
    title: "By the third reveal, the message feels inevitable rather than introduced.",
    copy: "That is the difference between a static landing page and a cinematic one. Timing carries the narrative."
  },
  {
    label: "Moment 04",
    title: "وأخيرًا تصل الفكرة بوضوح لأن الحركة كانت تخدم المعنى طوال الوقت",
    copy: "Arabic support, responsive pacing, and restrained animation keep the premium feel intact across screen sizes and language directions."
  }
];

type StoryMotionSettings = {
  shellY: number;
  shellScale: number;
  shellBlur: number;
  itemY: number;
  itemBlur: number;
  scrub: number;
  endFactor: number;
  spotlightStep: number;
  dotScale: number;
  revealDuration: number;
  fadeDuration: number;
  fadeAlpha: number;
  fadeY: number;
  fadeBlur: number;
};

export function StickyStorySection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;

    if (!section || !pin) {
      return;
    }

    const { gsap, ScrollTrigger } = initGSAP();

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-sticky-step]");
      const dots = gsap.utils.toArray<HTMLElement>("[data-sticky-dot]");
      const progress = section.querySelector<HTMLElement>("[data-sticky-progress]");
      const stage = section.querySelector<HTMLElement>("[data-sticky-stage]");
      const shell = section.querySelector<HTMLElement>("[data-sticky-shell]");
      const spotlight = section.querySelector<HTMLElement>("[data-sticky-spotlight]");

      if (reducedMotion()) {
        gsap.set(section, { height: "auto" });
        gsap.set(pin, { height: "auto" });

        if (stage) {
          gsap.set(stage, { display: "block" });
        }

        gsap.set(items, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          position: "relative",
          top: "auto",
          right: "auto",
          bottom: "auto",
          left: "auto",
          width: "100%",
          marginBottom: "3rem"
        });

        return;
      }

      const animateSequence = (settings: StoryMotionSettings) => {
        if (shell) {
          gsap.fromTo(
            shell,
            {
              autoAlpha: 0.7,
              scale: settings.shellScale,
              y: settings.shellY,
              filter: `blur(${settings.shellBlur}px)`
            },
            {
              autoAlpha: 1,
              scale: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 1.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 80%"
              }
            }
          );
        }

        gsap.set(items, {
          autoAlpha: 0,
          y: settings.itemY,
          scale: 0.988,
          filter: `blur(${settings.itemBlur}px)`
        });

        const timeline = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${Math.round(window.innerHeight * settings.endFactor)}`,
            pin,
            scrub: settings.scrub,
            anticipatePin: 1
          }
        });

        items.forEach((item, index) => {
          const dot = dots[index];
          const lines = item.querySelectorAll("[data-sticky-line]");

          if (dot) {
            timeline.to(
              dot,
              {
                backgroundColor: "rgba(255,255,255,0.96)",
                borderColor: "rgba(255,255,255,0.96)",
                scale: settings.dotScale,
                duration: 0.18
              },
              index
            );
          }

          if (progress) {
            timeline.to(
              progress,
              {
                height: `${((index + 1) / items.length) * 100}%`,
                duration: 0.42,
                ease: "none"
              },
              index
            );
          }

          if (spotlight) {
            timeline.to(
              spotlight,
              {
                yPercent: index * settings.spotlightStep,
                autoAlpha: 0.92 - index * 0.08,
                duration: 0.42,
                ease: "power2.inOut"
              },
              index
            );
          }

          timeline.to(
            item,
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              duration: settings.revealDuration
            },
            index + 0.06
          );

          if (lines.length > 0) {
            timeline.fromTo(
              lines,
              {
                autoAlpha: 0,
                y: 18,
                filter: "blur(10px)"
              },
              {
                autoAlpha: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 0.38,
                stagger: 0.06
              },
              index + 0.12
            );
          }

          if (index < items.length - 1) {
            timeline.to(
              item,
              {
                autoAlpha: settings.fadeAlpha,
                y: settings.fadeY,
                scale: 0.992,
                filter: `blur(${settings.fadeBlur}px)`,
                duration: settings.fadeDuration,
                ease: "power2.inOut"
              },
              index + 0.74
            );
          }
        });
      };

      ScrollTrigger.matchMedia({
        "(max-width: 767px)": () => {
          animateSequence({
            shellY: 20,
            shellScale: 0.992,
            shellBlur: 12,
            itemY: 24,
            itemBlur: 10,
            scrub: 1.04,
            endFactor: 2.2,
            spotlightStep: 17,
            dotScale: 1.12,
            revealDuration: 0.48,
            fadeDuration: 0.34,
            fadeAlpha: 0.08,
            fadeY: -14,
            fadeBlur: 8
          });
        },
        "(min-width: 768px)": () => {
          animateSequence({
            shellY: 24,
            shellScale: 0.984,
            shellBlur: 16,
            itemY: 40,
            itemBlur: 16,
            scrub: 1.22,
            endFactor: 3.1,
            spotlightStep: 26,
            dotScale: 1.18,
            revealDuration: 0.54,
            fadeDuration: 0.42,
            fadeAlpha: 0.12,
            fadeY: -24,
            fadeBlur: 10
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="sticky-story"
      className="section-shell relative h-[330vh] py-20 sm:h-[350vh] md:h-[410vh]"
    >
      <div
        ref={pinRef}
        data-sticky-shell
        className="panel-border panel-surface flex h-[100svh] overflow-hidden rounded-[2.4rem] will-change-transform md:h-screen"
      >
        <div
          data-sticky-spotlight
          className="absolute left-[18%] top-[12%] h-52 w-52 rounded-full bg-white/[0.14] blur-[95px] will-change-transform"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_42%)] opacity-80" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.24] to-transparent" />
        <div className="absolute inset-[6%] rounded-[2rem] border border-white/[0.06]" />

        <div className="relative grid h-full w-full gap-12 px-6 py-10 md:px-10 lg:grid-cols-[0.34fr_1fr] lg:px-14 lg:py-14">
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-white/[0.38]">
                Sticky Story
              </p>
              <h2 className="mt-5 max-w-sm text-4xl font-semibold leading-[0.96] text-white sm:text-5xl">
                The section that stops the scroll and turns it into a reveal.
              </h2>
              <p className="mt-6 max-w-sm text-sm leading-7 text-white/[0.56]">
                This is the sequence people remember. Each motion beat exists to
                sharpen the message, not distract from it.
              </p>
            </div>

            <div className="hidden items-start gap-4 lg:flex">
              <div className="relative h-48 w-px bg-white/[0.12]">
                <div
                  data-sticky-progress
                  className="absolute bottom-0 left-0 w-px bg-white"
                  style={{ height: "0%" }}
                />
              </div>
              <div className="grid gap-4">
                {moments.map((moment) => (
                  <div key={moment.label} className="flex items-center gap-3">
                    <span
                      data-sticky-dot
                      className="h-3 w-3 rounded-full border border-white/[0.2] bg-transparent transition-transform"
                    />
                    <span className="text-sm uppercase tracking-[0.24em] text-white/[0.38]">
                      {moment.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            data-sticky-stage
            className="relative flex items-center justify-center lg:min-h-[34rem]"
          >
            {moments.map((moment, index) => (
              <article
                key={moment.label}
                data-sticky-step
                className={`absolute inset-0 flex max-w-4xl flex-col justify-center will-change-transform ${
                  index === 0 ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="max-w-3xl">
                  <p
                    data-sticky-line
                    className="text-sm uppercase tracking-[0.32em] text-white/[0.38]"
                  >
                    {moment.label}
                  </p>
                  <h3
                    data-sticky-line
                    className="mt-6 text-balance text-4xl font-semibold leading-[0.98] text-white sm:text-5xl md:text-6xl"
                    lang={index === moments.length - 1 ? "ar" : undefined}
                    dir={index === moments.length - 1 ? "rtl" : undefined}
                  >
                    {moment.title}
                  </h3>
                  <div
                    data-sticky-line
                    className="mt-8 max-w-2xl rounded-[1.6rem] border border-white/[0.08] bg-black/[0.26] p-5 md:p-6"
                  >
                    <p className="text-sm leading-7 text-white/[0.62]">{moment.copy}</p>
                  </div>
                </div>
              </article>
            ))}

            <div className="absolute bottom-0 left-0 right-0 hidden justify-between text-[0.68rem] uppercase tracking-[0.24em] text-white/[0.28] lg:flex">
              <span>Scroll to reveal</span>
              <span>Timing carries the message</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
