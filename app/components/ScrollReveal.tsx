"use client";

import { ReactNode, useLayoutEffect, useRef } from "react";

import { initGSAP, reducedMotion } from "@/lib/animations";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export function ScrollReveal({ children, className, id }: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const { gsap } = initGSAP();

    const ctx = gsap.context(() => {
      const revealNodes = Array.from(container.querySelectorAll<HTMLElement>(".reveal"));

      if (revealNodes.length === 0) {
        return;
      }

      if (reducedMotion()) {
        gsap.set(revealNodes, {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)"
        });

        return;
      }

      revealNodes.forEach((node, index) => {
        gsap.fromTo(
          node,
          {
            autoAlpha: 0,
            y: 48,
            filter: "blur(12px)"
          },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
            delay: index * 0.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: node,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} id={id} className={className}>
      {children}
    </div>
  );
}
