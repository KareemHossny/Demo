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
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[2px] bg-white/[0.06]">
      <div
        ref={barRef}
        className="h-[2px] w-full bg-gradient-to-r from-white via-white/[0.55] to-white"
      />
      <div ref={glowRef} className="absolute inset-y-0 left-0 w-full">
        <div className="absolute right-0 top-1/2 h-3 w-16 -translate-y-1/2 rounded-full bg-white/[0.42] blur-md" />
      </div>
    </div>
  );
}
