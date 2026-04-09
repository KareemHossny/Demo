"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let initialized = false;

export function initGSAP() {
  if (typeof window !== "undefined" && !initialized) {
    gsap.registerPlugin(ScrollTrigger);
    initialized = true;
  }

  return { gsap, ScrollTrigger };
}

export function reducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

type RevealOptions = {
  y?: number;
  duration?: number;
  start?: string;
  stagger?: number;
};

export function createReveal(
  targets: gsap.TweenTarget,
  trigger: Element,
  options: RevealOptions = {}
) {
  const { y = 48, duration = 1.1, start = "top 78%", stagger = 0.12 } = options;

  return gsap.fromTo(
    targets,
    {
      autoAlpha: 0,
      y
    },
    {
      autoAlpha: 1,
      y: 0,
      duration,
      stagger,
      ease: "power3.out",
      scrollTrigger: {
        trigger,
        start
      }
    }
  );
}

export function createParallax(
  target: gsap.TweenTarget,
  trigger: Element,
  amount = 80
) {
  return gsap.fromTo(
    target,
    {
      yPercent: -15
    },
    {
      yPercent: 15,
      y: amount,
      ease: "none",
      scrollTrigger: {
        trigger,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    }
  );
}
