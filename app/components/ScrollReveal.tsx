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

      const getRevealState = (
        direction: string | undefined,
        distance: number,
        scaleStart: number
      ) => {
        if (direction === "left") {
          return {
            x: -distance,
            y: distance * 0.22,
            scale: scaleStart
          };
        }

        if (direction === "right") {
          return {
            x: distance,
            y: distance * 0.22,
            scale: scaleStart
          };
        }

        return {
          x: 0,
          y: distance,
          scale: scaleStart
        };
      };

      const animateNodes = (
        distance: number,
        duration: number,
        scaleStart: number,
        blendScrub: number
      ) => {
        createSectionBlend(container, container, {
          scrub: blendScrub,
          yStart: 7,
          yEnd: -6,
          opacityStart: 0.5,
          opacityEnd: 0.74,
          scaleStart: scaleStart - 0.004,
          scaleEnd: 0.996
        });

        revealNodes.forEach((node, index) => {
          const direction = node.dataset.revealDirection;
          const initialState = getRevealState(direction, distance, scaleStart);

          gsap.fromTo(
            node,
            {
              autoAlpha: 0,
              x: initialState.x,
              y: initialState.y,
              scale: initialState.scale,
              filter: "blur(14px)"
            },
            {
              autoAlpha: 1,
              x: 0,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              duration,
              delay: index * 0.04,
              ease: "power3.out",
              scrollTrigger: {
                trigger: node,
                start: "top 85%",
                toggleActions: "play none none reverse"
              }
            }
          );
        });
      };

      ScrollTrigger.matchMedia({
        "(max-width: 767px)": () => {
          animateNodes(56, 0.92, 0.994, 0.98);
        },
        "(min-width: 768px)": () => {
          animateNodes(100, 1.08, 0.986, 1.16);
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
