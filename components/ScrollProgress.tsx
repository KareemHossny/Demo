"use client";

import { useLayoutEffect, useRef } from "react";

import { initGSAP, reducedMotion } from "@/lib/animations";

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!barRef.current || reducedMotion()) {
      return;
    }

    const { gsap } = initGSAP();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        barRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: true
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 h-px bg-white/[0.08]">
      <div
        ref={barRef}
        className="h-px w-full bg-gradient-to-r from-white via-white/50 to-white"
      />
    </div>
  );
}
