"use client";

import { ReactNode, useLayoutEffect, useRef } from "react";

import { initGSAP, reducedMotion } from "@/lib/animations";

type SmoothScrollShellProps = {
  children: ReactNode;
};

export function SmoothScrollShell({ children }: SmoothScrollShellProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;

    if (!wrapper || !content) {
      return;
    }

    const { gsap, ScrollTrigger, ScrollSmoother } = initGSAP();

    const ctx = gsap.context(() => {
      if (reducedMotion()) {
        return;
      }

      ScrollTrigger.matchMedia({
        "(min-width: 768px)": () => {
          const existing = ScrollSmoother.get();
          existing?.kill();

          document.documentElement.classList.add("smoother-active");
          document.body.classList.add("smoother-active");

          const smoother = ScrollSmoother.create({
            wrapper,
            content,
            smooth: 1.42,
            smoothTouch: 0.12,
            normalizeScroll: true,
            effects: true
          });

          ScrollTrigger.refresh();

          return () => {
            smoother.kill();
            document.documentElement.classList.remove("smoother-active");
            document.body.classList.remove("smoother-active");
            ScrollTrigger.refresh();
          };
        }
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} id="smooth-wrapper" className="relative">
      <div ref={contentRef} id="smooth-content" className="overflow-visible">
        {children}
      </div>
    </div>
  );
}
