"use client";

import { useLayoutEffect, useRef } from "react";

import { initGSAP, reducedMotion } from "@/lib/animations";

const steps = [
  {
    label: "Reveal 01",
    title: "A landing page can guide attention without forcing it.",
    copy: "The first moments set the tone: bold typography, generous space, and subtle movement that feels confident instead of crowded."
  },
  {
    label: "Reveal 02",
    title: "Each scroll should unlock a new idea, not repeat the last one.",
    copy: "Pinned storytelling turns the section into a controlled sequence where rhythm, opacity, and timing do the heavy lifting."
  },
  {
    label: "Reveal 03",
    title: "Premium motion is less about flash and more about emotional pacing.",
    copy: "The animation disappears into the story. What remains is a feeling that the product has craft, clarity, and intent."
  },
  {
    label: "Reveal 04",
    title: "حتى التفاصيل الصغيرة يجب أن تبدو مقصودة",
    copy: "Arabic support, responsive balance, and motion restraint ensure the experience stays polished across languages and screen sizes."
  }
];

export function StickySection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !pinRef.current) {
      return;
    }

    const { gsap } = initGSAP();

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-step]");
      const dots = gsap.utils.toArray<HTMLElement>("[data-step-dot]");
      const progress =
        sectionRef.current?.querySelector<HTMLElement>("[data-step-progress]") ??
        null;

      if (reducedMotion()) {
        gsap.set(sectionRef.current, { height: "auto" });
        gsap.set(pinRef.current, { height: "auto" });
        gsap.set("[data-step-stage]", { display: "block" });
        gsap.set(items, {
          autoAlpha: 1,
          y: 0,
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

      gsap.set(items, {
        autoAlpha: 0,
        y: 30
      });

      gsap.set(items[0], {
        autoAlpha: 1,
        y: 0
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: pinRef.current,
          scrub: true
        }
      });

      items.forEach((item, index) => {
        const dot = dots[index];

        if (dot) {
          tl.to(
            dot,
            {
              backgroundColor: "rgba(255,255,255,0.96)",
              borderColor: "rgba(255,255,255,0.96)",
              duration: 0.18
            },
            index
          );
        }

        tl.to(
          item,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.45,
            ease: "power2.out"
          },
          index + 0.05
        );

        if (progress) {
          tl.to(
            progress,
            {
              height: `${((index + 1) / items.length) * 100}%`,
              duration: 0.4,
              ease: "none"
            },
            index
          );
        }

        if (index < items.length - 1) {
          tl.to(
            item,
            {
              autoAlpha: 0.18,
              y: -18,
              duration: 0.35,
              ease: "power2.inOut"
            },
            index + 0.62
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="immersive"
      className="section-shell relative h-[320vh] py-20 md:h-[360vh]"
    >
      <div
        ref={pinRef}
        className="panel-border panel-surface flex h-screen overflow-hidden rounded-[2.2rem]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_42%)] opacity-80" />

        <div className="relative grid h-full w-full gap-10 px-6 py-10 md:px-10 lg:grid-cols-[0.34fr_1fr] lg:px-14 lg:py-14">
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-white/40">
                Immersive Sequence
              </p>
              <h2 className="mt-5 max-w-sm text-4xl font-semibold leading-[0.98] text-white sm:text-5xl">
                Pinned motion that turns scrolling into a reveal.
              </h2>
            </div>

            <div className="hidden items-start gap-4 lg:flex">
              <div className="relative h-44 w-px bg-white/[0.12]">
                <div
                  data-step-progress
                  className="absolute bottom-0 left-0 w-px bg-white"
                  style={{ height: "0%" }}
                />
              </div>
              <div className="grid gap-4">
                {steps.map((step) => (
                  <div key={step.label} className="flex items-center gap-3">
                    <span
                      data-step-dot
                      className="h-3 w-3 rounded-full border border-white/[0.20] bg-transparent"
                    />
                    <span className="text-sm uppercase tracking-[0.22em] text-white/[0.38]">
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div data-step-stage className="relative flex items-center justify-center">
            {steps.map((step, index) => (
              <article
                key={step.label}
                data-step
                className={`absolute inset-0 flex max-w-4xl flex-col justify-center ${
                  index === 0 ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="max-w-3xl">
                  <p className="text-sm uppercase tracking-[0.32em] text-white/[0.38]">
                    {step.label}
                  </p>
                  <h3
                    className="mt-6 text-balance text-4xl font-semibold leading-[1] text-white sm:text-5xl md:text-6xl"
                    lang={index === 3 ? "ar" : undefined}
                    dir={index === 3 ? "rtl" : undefined}
                  >
                    {step.title}
                  </h3>
                  <p className="mt-7 max-w-2xl text-pretty text-base leading-8 text-white/[0.64] sm:text-lg">
                    {step.copy}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
