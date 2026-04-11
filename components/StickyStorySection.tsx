"use client";

import { useLayoutEffect, useRef } from "react";

import { initGSAP, reducedMotion } from "@/lib/animations";

const storyMoments = [
  {
    label: "Opening calm",
    title: "The first beat lowers the noise floor before the motion begins.",
    copy:
      "Spacing, contrast, and slower timing make the interface feel premium before the scroll starts asking for more attention.",
    chips: ["Restraint", "Clarity", "Premium tone"]
  },
  {
    label: "Attention shift",
    title: "Then the page takes control of the scroll one statement at a time.",
    copy:
      "Pinned storytelling lets each sentence take the lead for a beat, which is what makes the sequence feel cinematic instead of decorative.",
    chips: ["Pin", "Scrub", "Sequence"]
  },
  {
    label: "Narrative lock",
    title: "By the third reveal, the product message stops competing and starts landing.",
    copy:
      "Previous lines fade smoothly away, keeping the user with the current beat and making the entire chapter feel authored.",
    chips: ["Focus", "Continuity", "Memory"]
  },
  {
    label: "Meaning lands",
    title:
      "\u0648\u0647\u0646\u0627 \u062a\u0635\u0644 \u0627\u0644\u0641\u0643\u0631\u0629 \u0628\u0648\u0636\u0648\u062d \u0644\u0623\u0646 \u0627\u0644\u062d\u0631\u0643\u0629 \u062e\u062f\u0645\u062a \u0627\u0644\u0645\u0639\u0646\u0649",
    copy:
      "Arabic-ready typography, responsive pacing, and restrained animation keep the premium feel intact across direction changes and smaller screens.",
    chips: ["Arabic-ready", "Responsive", "Client-ready"],
    rtl: true
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
  dotScale: number;
  revealDuration: number;
  fadeDuration: number;
  fadeAlpha: number;
  fadeY: number;
  fadeBlur: number;
  stepSpacing: number;
  holdOffset: number;
  lineStagger: number;
  spotlightXStep: number;
  spotlightYStep: number;
  spotlightScale: number;
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
      const spotlight = section.querySelector<HTMLElement>("[data-sticky-spotlight]");
      const beam = section.querySelector<HTMLElement>("[data-sticky-beam]");

      if (reducedMotion()) {
        gsap.set(items, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          position: "relative",
          inset: "auto",
          marginBottom: "2.5rem"
        });

        gsap.set(
          [
            "[data-sticky-shell]",
            "[data-sticky-line]",
            "[data-sticky-chip]",
            "[data-sticky-count]"
          ],
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)"
          }
        );

        if (beam) {
          gsap.set(beam, { autoAlpha: 0.18, xPercent: 0 });
        }

        return;
      }

      const animateSequence = (settings: StoryMotionSettings) => {
        gsap.fromTo(
          "[data-sticky-shell]",
          {
            autoAlpha: 0.72,
            y: settings.shellY,
            scale: settings.shellScale,
            filter: `blur(${settings.shellBlur}px)`
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%"
            }
          }
        );

        gsap.set(items, {
          autoAlpha: 0,
          y: settings.itemY,
          scale: 0.986,
          filter: `blur(${settings.itemBlur}px)`
        });

        gsap.to("[data-sticky-glow='one']", {
          x: 20,
          y: -16,
          duration: 8.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });

        gsap.to("[data-sticky-glow='two']", {
          x: -18,
          y: 18,
          duration: 9.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });

        gsap.to("[data-sticky-ring]", {
          rotate: 360,
          duration: 36,
          repeat: -1,
          ease: "none"
        });

        const timeline = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: pin,
            start: "top top",
            end: () => `+=${Math.round(window.innerHeight * settings.endFactor)}`,
            pin: true,
            scrub: settings.scrub,
            anticipatePin: 1
          }
        });

        items.forEach((item, index) => {
          const position = index * settings.stepSpacing;
          const dot = dots[index];
          const lines = item.querySelectorAll("[data-sticky-line]");
          const chips = item.querySelectorAll("[data-sticky-chip]");

          if (dot) {
            timeline.to(
              dot,
              {
                backgroundColor: "rgba(255,255,255,0.96)",
                borderColor: "rgba(255,255,255,0.96)",
                scale: settings.dotScale,
                duration: 0.18
              },
              position
            );
          }

          if (progress) {
            timeline.to(
              progress,
              {
                height: `${((index + 1) / items.length) * 100}%`,
                duration: 0.38,
                ease: "none"
              },
              position
            );
          }

          if (spotlight) {
            timeline.to(
              spotlight,
              {
                xPercent: index * settings.spotlightXStep,
                yPercent: index * settings.spotlightYStep,
                scale: settings.spotlightScale + index * 0.05,
                autoAlpha: 0.88 - index * 0.08,
                duration: 0.44,
                ease: "power2.inOut"
              },
              position
            );
          }

          if (beam) {
            timeline.to(
              beam,
              {
                xPercent: index * 16,
                autoAlpha: 0.16 + index * 0.08,
                duration: settings.stepSpacing,
                ease: "power2.inOut"
              },
              position
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
            position + 0.08
          );

          timeline.fromTo(
            lines,
            {
              autoAlpha: 0,
              y: 24,
              filter: "blur(12px)"
            },
            {
              autoAlpha: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.4,
              stagger: settings.lineStagger
            },
            position + 0.16
          );

          timeline.fromTo(
            chips,
            {
              autoAlpha: 0,
              y: 18,
              scale: 0.98
            },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.3,
              stagger: 0.06
            },
            position + 0.26
          );

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
              position + settings.holdOffset
            );
          }
        });

        if (stage) {
          timeline.to(
            stage,
            {
              scale: 1.012,
              ease: "none",
              duration: items.length * settings.stepSpacing
            },
            0
          );
        }
      };

      ScrollTrigger.matchMedia({
        "(max-width: 767px)": () => {
          animateSequence({
            shellY: 20,
            shellScale: 0.992,
            shellBlur: 12,
            itemY: 26,
            itemBlur: 10,
            scrub: 1.04,
            endFactor: 2.6,
            dotScale: 1.1,
            revealDuration: 0.52,
            fadeDuration: 0.34,
            fadeAlpha: 0.08,
            fadeY: -14,
            fadeBlur: 8,
            stepSpacing: 1.02,
            holdOffset: 0.78,
            lineStagger: 0.06,
            spotlightXStep: 6,
            spotlightYStep: 14,
            spotlightScale: 1
          });
        },
        "(min-width: 768px)": () => {
          animateSequence({
            shellY: 24,
            shellScale: 0.984,
            shellBlur: 16,
            itemY: 42,
            itemBlur: 14,
            scrub: 1.18,
            endFactor: 3.2,
            dotScale: 1.18,
            revealDuration: 0.58,
            fadeDuration: 0.44,
            fadeAlpha: 0.12,
            fadeY: -24,
            fadeBlur: 10,
            stepSpacing: 1.08,
            holdOffset: 0.82,
            lineStagger: 0.08,
            spotlightXStep: 10,
            spotlightYStep: 22,
            spotlightScale: 1.02
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
      className="section-shell -mt-4 py-24 md:-mt-8 md:py-32"
    >
      <div
        ref={pinRef}
        data-sticky-shell
        className="panel-border panel-surface relative overflow-hidden rounded-[2.8rem]"
      >
        <div
          data-sticky-glow="one"
          className="absolute left-[10%] top-[12%] h-48 w-48 rounded-full bg-white/[0.11] blur-[110px] will-change-transform md:h-72 md:w-72"
        />
        <div
          data-sticky-glow="two"
          className="absolute bottom-[8%] right-[8%] h-52 w-52 rounded-full bg-slate-300/[0.1] blur-[120px] will-change-transform md:h-80 md:w-80"
        />
        <div
          data-sticky-spotlight
          className="absolute left-[16%] top-[16%] h-56 w-56 rounded-full bg-white/[0.14] blur-[105px] will-change-transform"
        />
        <div
          data-sticky-beam
          className="sheen-overlay absolute inset-y-[12%] left-[-10%] w-[34%] opacity-0 blur-2xl"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))]" />
        <div className="absolute inset-[4.5%] rounded-[2.4rem] border border-white/[0.06]" />
        <div className="absolute inset-[10%] hero-mesh opacity-[0.14]" />

        <div className="relative grid min-h-[100svh] gap-10 px-6 py-8 md:px-10 lg:min-h-screen lg:grid-cols-[0.34fr_0.66fr] lg:px-14 lg:py-14">
          <div className="flex h-full flex-col justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-white/[0.38]">
                Scroll-Controlled WOW Section
              </p>
              <h2 className="mt-5 max-w-sm text-balance text-4xl font-semibold leading-[0.96] text-white sm:text-5xl">
                The section that pauses the scroll and turns it into a sequence.
              </h2>
              <p className="mt-6 max-w-sm text-sm leading-7 text-white/[0.56]">
                This is the memorable chapter. The copy stays simple, but the
                pacing, pinning, and crossfades make it feel authored within
                seconds.
              </p>
            </div>

            <div className="grid gap-6">
              <div className="flex items-start gap-4">
                <div className="relative hidden h-52 w-px bg-white/[0.12] lg:block">
                  <div
                    data-sticky-progress
                    className="absolute bottom-0 left-0 w-px bg-white"
                    style={{ height: "0%" }}
                  />
                </div>

                <div className="grid gap-4">
                  {storyMoments.map((moment) => (
                    <div key={moment.label} className="flex items-center gap-3">
                      <span
                        data-sticky-dot
                        className="h-3 w-3 rounded-full border border-white/[0.2] bg-transparent"
                      />
                      <span className="text-sm uppercase tracking-[0.24em] text-white/[0.4]">
                        {moment.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="max-w-xs text-[0.68rem] uppercase tracking-[0.28em] text-white/[0.28]">
                Pinned with ScrollTrigger and scrubbed to reveal each beat with
                overlap instead of hard cuts.
              </p>
            </div>
          </div>

          <div
            data-sticky-stage
            className="relative flex min-h-[30rem] items-center overflow-hidden rounded-[2.2rem] border border-white/[0.08] bg-black/[0.26] p-6 will-change-transform md:min-h-[35rem] md:p-10"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_24%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.06),transparent_26%)]" />
            <div
              data-sticky-ring
              className="absolute right-[10%] top-[12%] h-28 w-28 rounded-full border border-white/[0.08] will-change-transform md:h-40 md:w-40"
            />
            <div className="absolute inset-[7%] rounded-[1.8rem] border border-white/[0.06]" />

            {storyMoments.map((moment, index) => (
              <article
                key={moment.label}
                data-sticky-step
                className="absolute inset-0 flex items-center p-6 will-change-transform md:p-10"
              >
                <div className="grid w-full gap-8 lg:grid-cols-[0.18fr_0.82fr] lg:items-start">
                  <p
                    data-sticky-count
                    className="text-[4.6rem] font-semibold leading-none text-white/[0.14] md:text-[6.5rem]"
                  >
                    0{index + 1}
                  </p>

                  <div className="max-w-3xl">
                    <p
                      data-sticky-line
                      className="text-sm uppercase tracking-[0.32em] text-white/[0.4]"
                    >
                      {moment.label}
                    </p>
                    <h3
                      data-sticky-line
                      className="mt-5 text-balance text-4xl font-semibold leading-[0.98] text-white sm:text-5xl md:text-6xl"
                      lang={moment.rtl ? "ar" : undefined}
                      dir={moment.rtl ? "rtl" : undefined}
                    >
                      {moment.title}
                    </h3>

                    <div
                      data-sticky-line
                      className="mt-7 max-w-2xl rounded-[1.6rem] border border-white/[0.08] bg-white/[0.04] p-5 md:p-6"
                    >
                      <p className="text-sm leading-7 text-white/[0.64]">{moment.copy}</p>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                      {moment.chips.map((chip) => (
                        <span
                          key={`${moment.label}-${chip}`}
                          data-sticky-chip
                          className="rounded-full border border-white/[0.08] bg-black/[0.24] px-4 py-2 text-[0.68rem] uppercase tracking-[0.24em] text-white/[0.5]"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}

            <div className="absolute bottom-6 left-6 right-6 flex justify-between text-[0.68rem] uppercase tracking-[0.24em] text-white/[0.28] md:bottom-8 md:left-10 md:right-10">
              <span>Scroll to reveal each line</span>
              <span>Previous beats fade out smoothly</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
