"use client";

import { useLayoutEffect, useRef } from "react";

import {
  createParallax,
  createReveal,
  initGSAP,
  reducedMotion
} from "@/lib/animations";

type StorySectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  detail: string;
  accent: string;
  direction?: "left" | "right";
  tone?: "default" | "muted";
};

export function StorySection({
  id,
  eyebrow,
  title,
  description,
  detail,
  accent,
  direction = "left",
  tone = "default"
}: StorySectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const orbRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const { gsap } = initGSAP();

    const ctx = gsap.context(() => {
      if (reducedMotion()) {
        gsap.set("[data-story-item]", { autoAlpha: 1, y: 0, x: 0 });
        return;
      }

      createReveal("[data-story-item]", section, {
        y: 52,
        duration: 1,
        stagger: 0.14
      });

      gsap.fromTo(
        panelRef.current,
        {
          autoAlpha: 0,
          x: direction === "left" ? 48 : -48
        },
        {
          autoAlpha: 1,
          x: 0,
          duration: 1.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 72%"
          }
        }
      );

      if (orbRef.current) {
        createParallax(orbRef.current, section, 64);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [direction]);

  const isMuted = tone === "muted";

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`section-shell py-28 md:py-36 ${
        isMuted ? "bg-white/[0.03]" : ""
      }`}
    >
      <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr]">
        <div className={`relative ${direction === "right" ? "lg:order-2" : ""}`}>
          <div
            ref={orbRef}
            className={`absolute ${
              direction === "right" ? "right-4" : "left-4"
            } top-0 -z-10 h-48 w-48 rounded-full ${
              isMuted ? "bg-zinc-200/[0.06]" : "bg-white/[0.08]"
            } blur-[90px] will-change-transform md:h-64 md:w-64`}
          />

          <p
            data-story-item
            className="text-sm uppercase tracking-[0.3em] text-white/[0.45]"
          >
            {eyebrow}
          </p>
          <h2
            data-story-item
            className="mt-6 max-w-3xl text-balance text-4xl font-semibold leading-[1] text-white sm:text-5xl md:text-6xl"
          >
            {title}
          </h2>
          <p
            data-story-item
            className="mt-7 max-w-2xl text-pretty text-base leading-8 text-white/[0.68] sm:text-lg"
          >
            {description}
          </p>
          <p
            data-story-item
            className="mt-6 max-w-xl border-l border-white/[0.12] pl-5 text-sm leading-7 text-white/[0.52]"
          >
            {detail}
          </p>
        </div>

        <div
          ref={panelRef}
          className={`panel-border panel-surface relative overflow-hidden rounded-[2rem] p-6 will-change-transform md:p-8 ${
            direction === "right" ? "lg:order-1" : ""
          }`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_45%)] opacity-60" />
          <div className="relative">
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <p className="text-xs uppercase tracking-[0.32em] text-white/[0.35]">
                {accent}
              </p>
              <p className="text-xs uppercase tracking-[0.32em] text-white/[0.35]">
                Scroll Triggered
              </p>
            </div>

            <div className="grid gap-5 py-8 md:grid-cols-2">
              <div className="rounded-[1.5rem] border border-white/[0.08] bg-black/30 p-5">
                <p className="text-sm text-white/[0.45]">Atmosphere</p>
                <p className="mt-3 text-3xl font-semibold text-white">
                  Quietly bold
                </p>
                <p className="mt-4 text-sm leading-6 text-white/[0.55]">
                  Strong type and soft motion create tension without visual
                  noise.
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-white/[0.08] bg-white/[0.03] p-5">
                <p className="text-sm text-white/[0.45]">Direction</p>
                <p className="mt-3 text-3xl font-semibold text-white">
                  {direction === "left" ? "Forward" : "Counterpoint"}
                </p>
                <p className="mt-4 text-sm leading-6 text-white/[0.55]">
                  Opposing motion gives the second act a more immersive feel.
                </p>
              </div>
            </div>

            <div className="rounded-[1.6rem] border border-white/[0.08] bg-white/[0.02] p-5">
              <div className="grid gap-4 sm:grid-cols-[1.1fr_0.9fr]">
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-white/[0.38]">
                    Visual Rhythm
                  </p>
                  <p className="mt-3 max-w-[18ch] text-2xl font-semibold leading-tight text-white">
                    Long-form calm, premium contrast, and just enough motion.
                  </p>
                </div>
                <div className="flex items-end justify-start sm:justify-end">
                  <div className="w-full max-w-[14rem] rounded-[1.25rem] border border-white/[0.08] bg-black/30 p-4">
                    <p className="text-xs uppercase tracking-[0.28em] text-white/[0.36]">
                      Narrative Pulse
                    </p>
                    <p className="mt-4 text-4xl font-semibold text-white">4.9s</p>
                    <p className="mt-2 text-sm leading-6 text-white/[0.52]">
                      Average motion cycle in the storytelling sequence.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
