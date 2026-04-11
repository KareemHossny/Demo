"use client";

import { ReactNode, useLayoutEffect, useRef } from "react";

import { createSectionBlend, initGSAP, reducedMotion } from "@/lib/animations";

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

    const { gsap, ScrollTrigger } = initGSAP();

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

      const getXOffset = (direction: string | undefined, distance: number) => {
        if (direction === "left") {
          return -distance;
        }

        if (direction === "right") {
          return distance;
        }

        return 0;
      };

      const getYOffset = (direction: string | undefined, distance: number) => {
        if (direction === "left" || direction === "right") {
          return distance * 0.32;
        }

        return distance;
      };

      const animateNodes = ({
        distance,
        duration,
        scaleStart,
        blur,
        stagger,
        blendScrub
      }: {
        distance: number;
        duration: number;
        scaleStart: number;
        blur: number;
        stagger: number;
        blendScrub: number;
      }) => {
        createSectionBlend(container, container, {
          scrub: blendScrub,
          yStart: 7,
          yEnd: -6,
          opacityStart: 0.5,
          opacityEnd: 0.76,
          scaleStart: scaleStart - 0.004,
          scaleEnd: 0.996
        });

        gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }).fromTo(
          revealNodes,
          {
            autoAlpha: 0,
            x: (_index, target) =>
              getXOffset(
                (target as HTMLElement).dataset.revealDirection,
                distance
              ),
            y: (_index, target) =>
              getYOffset(
                (target as HTMLElement).dataset.revealDirection,
                distance
              ),
            scale: scaleStart,
            filter: `blur(${blur}px)`
          },
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration,
            stagger
          }
        );
      };

      ScrollTrigger.matchMedia({
        "(max-width: 767px)": () => {
          animateNodes({
            distance: 56,
            duration: 0.92,
            scaleStart: 0.994,
            blur: 12,
            stagger: 0.08,
            blendScrub: 0.98
          });
        },
        "(min-width: 768px)": () => {
          animateNodes({
            distance: 80,
            duration: 1.04,
            scaleStart: 0.986,
            blur: 14,
            stagger: 0.09,
            blendScrub: 1.16
          });
        }
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
