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

export function StickyStorySection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;

    if (!section || !pin) {
      return;
    }

    const { gsap } = initGSAP();

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

      if (shell) {
        gsap.fromTo(
          shell,
          {
            autoAlpha: 0.72,
            scale: 0.985,
            y: 24,
            filter: "blur(16px)"
          },
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            filter: "blur(0px)",
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
        y: 36,
        filter: "blur(16px)"
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          pin,
          scrub: 1.2,
          anticipatePin: 1
        }
      });

      items.forEach((item, index) => {
        const dot = dots[index];

        if (dot) {
          timeline.to(
            dot,
            {
              backgroundColor: "rgba(255,255,255,0.96)",
              borderColor: "rgba(255,255,255,0.96)",
              scale: 1.18,
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
              yPercent: index * 26,
              autoAlpha: 0.9 - index * 0.08,
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
            filter: "blur(0px)",
            duration: 0.5,
            ease: "power3.out"
          },
          index + 0.08
        );

        if (index < items.length - 1) {
          timeline.to(
            item,
            {
              autoAlpha: 0.14,
              y: -24,
              filter: "blur(10px)",
              duration: 0.38,
              ease: "power2.inOut"
            },
            index + 0.72
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="sticky-story"
      className="section-shell relative h-[360vh] py-20 md:h-[400vh]"
    >
      <div
        ref={pinRef}
        data-sticky-shell
        className="panel-border panel-surface flex h-screen overflow-hidden rounded-[2.4rem]"
      >
        <div
          data-sticky-spotlight
          className="absolute left-[18%] top-[12%] h-52 w-52 rounded-full bg-white/[0.14] blur-[95px]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_42%)] opacity-80" />

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
                This is the sequence users remember. Each motion beat exists to
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
                className={`absolute inset-0 flex max-w-4xl flex-col justify-center ${
                  index === 0 ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="max-w-3xl">
                  <p className="text-sm uppercase tracking-[0.32em] text-white/[0.38]">
                    {moment.label}
                  </p>
                  <h3
                    className="mt-6 text-balance text-4xl font-semibold leading-[0.98] text-white sm:text-5xl md:text-6xl"
                    lang={index === moments.length - 1 ? "ar" : undefined}
                    dir={index === moments.length - 1 ? "rtl" : undefined}
                  >
                    {moment.title}
                  </h3>
                  <div className="mt-8 max-w-2xl rounded-[1.6rem] border border-white/[0.08] bg-black/[0.26] p-5 md:p-6">
                    <p className="text-sm leading-7 text-white/[0.62]">{moment.copy}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
