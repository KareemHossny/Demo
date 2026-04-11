"use client";

import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let initialized = false;

export function initGSAP() {
  if (typeof window !== "undefined" && !initialized) {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    gsap.config({
      autoSleep: 60,
      nullTargetWarn: false
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

  return { gsap, ScrollTrigger, ScrollSmoother };
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
    y = 100,
    duration = 1.1,
    start = "top 80%",
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

type FadeUpRevealOptions = {
  y?: number;
  x?: number;
  duration?: number;
  start?: string;
  stagger?: number;
  scale?: number;
  blur?: number;
  ease?: string;
};

export function createFadeUpReveal(
  targets: gsap.TweenTarget,
  trigger: Element,
  options: FadeUpRevealOptions = {}
) {
  const {
    y = 80,
    x = 0,
    duration = 1.04,
    start = "top 80%",
    stagger = 0.08,
    scale = 0.985,
    blur = 12,
    ease = "power3.out"
  } = options;

  return gsap.fromTo(
    targets,
    {
      autoAlpha: 0,
      x,
      y,
      scale,
      filter: `blur(${blur}px)`
    },
    {
      autoAlpha: 1,
      x: 0,
      y: 0,
      scale: 1,
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

type WordRevealOptions = {
  yPercent?: number;
  duration?: number;
  start?: string;
  stagger?: number;
  scale?: number;
  blur?: number;
  ease?: string;
};

export function createWordReveal(
  targets: gsap.TweenTarget,
  trigger: Element,
  options: WordRevealOptions = {}
) {
  const {
    yPercent = 112,
    duration = 1.18,
    start = "top 80%",
    stagger = 0.032,
    scale = 0.965,
    blur = 16,
    ease = "power3.out"
  } = options;

  return gsap.fromTo(
    targets,
    {
      autoAlpha: 0,
      yPercent,
      scale,
      filter: `blur(${blur}px)`
    },
    {
      autoAlpha: 1,
      yPercent: 0,
      scale: 1,
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
