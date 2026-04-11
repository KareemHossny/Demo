"use client";

import { useLayoutEffect, useRef } from "react";

import { initGSAP, reducedMotion } from "@/lib/animations";

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!barRef.current || !glowRef.current || reducedMotion()) {
      return;
    }

    const { gsap } = initGSAP();

    const ctx = gsap.context(() => {
      const progress = gsap.timeline({
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.05
        }
      });

      progress
        .fromTo(
          barRef.current,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            ease: "none"
          },
          0
        )
        .fromTo(
          glowRef.current,
          { xPercent: -100 },
          {
            xPercent: 0,
            ease: "none"
          },
          0
        );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[2px] bg-white/[0.06] backdrop-blur">
      <div
        ref={barRef}
        className="h-[2px] w-full bg-gradient-to-r from-white/[0.65] via-white to-white/[0.78]"
      />
      <div ref={glowRef} className="absolute inset-y-0 left-0 w-full">
        <div className="absolute right-0 top-1/2 h-3 w-16 -translate-y-1/2 rounded-full bg-white/[0.42] blur-md" />
        <div className="absolute right-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.45)]" />
      </div>
    </div>
  );
}
