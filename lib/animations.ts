"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let initialized = false;

export function initGSAP() {
  if (typeof window !== "undefined" && !initialized) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.config({
      autoSleep: 60,
      nullTargetWarn: false,
      force3D: true
    });
    gsap.defaults({
      ease: "power3.out"
    });
    ScrollTrigger.config({
      ignoreMobileResize: true,
      limitCallbacks: true
    });
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
  ease?: string;
};

export function createReveal(
  targets: gsap.TweenTarget,
  trigger: Element,
  options: RevealOptions = {}
) {
  const {
    y = 48,
    duration = 1.1,
    start = "top 78%",
    stagger = 0.12,
    ease = "power3.out"
  } = options;

  return gsap.fromTo(
    targets,
    {
      autoAlpha: 0,
      y,
      filter: "blur(12px)"
    },
    {
      autoAlpha: 1,
      y: 0,
      duration,
      stagger,
      filter: "blur(0px)",
      ease,
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
  amount = 80,
  scrub = 1.2
) {
  return gsap.fromTo(
    target,
    {
      yPercent: -12
    },
    {
      yPercent: 12,
      y: amount,
      ease: "none",
      scrollTrigger: {
        trigger,
        start: "top bottom",
        end: "bottom top",
        scrub
      }
    }
  );
}

type SectionBlendOptions = {
  start?: string;
  end?: string;
  scrub?: number;
  yStart?: number;
  yEnd?: number;
  opacityStart?: number;
  opacityEnd?: number;
  scaleStart?: number;
  scaleEnd?: number;
};

export function createSectionBlend(
  target: gsap.TweenTarget,
  trigger: Element,
  options: SectionBlendOptions = {}
) {
  const {
    start = "top bottom",
    end = "bottom top",
    scrub = 1.15,
    yStart = 10,
    yEnd = -8,
    opacityStart = 0.42,
    opacityEnd = 0.58,
    scaleStart = 0.985,
    scaleEnd = 0.992
  } = options;

  return gsap.timeline({
    scrollTrigger: {
      trigger,
      start,
      end,
      scrub
    }
  })
    .fromTo(
      target,
      {
        yPercent: yStart,
        autoAlpha: opacityStart,
        scale: scaleStart
      },
      {
        yPercent: 0,
        autoAlpha: 1,
        scale: 1,
        ease: "none",
        duration: 0.56
      },
      0
    )
    .to(
      target,
      {
        yPercent: yEnd,
        autoAlpha: opacityEnd,
        scale: scaleEnd,
        ease: "none",
        duration: 0.44
      },
      0.56
    );
}
