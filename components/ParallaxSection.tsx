"use client";

import { useLayoutEffect, useRef } from "react";

import { createSectionBlend, initGSAP, reducedMotion } from "@/lib/animations";

const layerCards = [
  {
    speed: 0.45,
    className:
      "left-[8%] top-[12%] w-[14rem] md:w-[16rem] rounded-[1.6rem] border border-white/[0.08] bg-black/[0.36] p-5",
    label: "Background layer",
    title: "The slowest surface holds the mood so the scene never becomes noisy."
  },
  {
    speed: 0.85,
    className:
      "right-[10%] top-[20%] w-[18rem] md:w-[20rem] rounded-[1.8rem] border border-white/[0.08] bg-white/[0.05] p-6",
    label: "Middle layer",
    title: "Mid-speed motion adds spatial richness without looking engineered."
  },
  {
    speed: 1.2,
    className:
      "left-[18%] bottom-[12%] w-[16rem] md:w-[18rem] rounded-[1.6rem] border border-white/[0.08] bg-black/[0.42] p-5",
    label: "Foreground layer",
    title: "The closest layer guides attention while everything else stays supportive."
  }
];

type ParallaxMotionSettings = {
  blendStartOpacity: number;
  blendEndOpacity: number;
  blendStartY: number;
  blendEndY: number;
  shellScale: number;
  shellBlur: number;
  copyDriftFrom: number;
  copyDriftTo: number;
  copyScrub: number;
  sheenFrom: number;
  sheenTo: number;
  sheenAlpha: number;
  layerStart: number;
  layerEnd: number;
  layerTravel: number;
  rotateStart: number;
  rotateEnd: number;
  scrubBase: number;
  scrubFactor: number;
};

function renderWords(text: string, prefix: string) {
  return (
    <span className="flex flex-wrap gap-x-3 gap-y-2">
      {text.split(" ").map((word, index) => (
        <span key={`${prefix}-${word}-${index}`} className="inline-flex overflow-hidden">
          <span data-parallax-word className="inline-block will-change-transform">
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}

export function ParallaxSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const { gsap, ScrollTrigger } = initGSAP();

    const ctx = gsap.context(() => {
      const shell = section.querySelector<HTMLElement>("[data-parallax-shell]");
      const layers = gsap.utils.toArray<HTMLElement>("[data-parallax-layer]");

      if (reducedMotion()) {
        gsap.set(
          [
            "[data-parallax-word]",
            "[data-parallax-copy]",
            "[data-parallax-copy-block]",
            "[data-parallax-shell]",
            "[data-parallax-layer]",
            "[data-parallax-sheen]",
            "[data-parallax-line]",
            "[data-parallax-ring]",
            "[data-parallax-orb]"
          ],
          {
            autoAlpha: 1,
            y: 0,
            yPercent: 0,
            scale: 1,
            scaleX: 1,
            filter: "blur(0px)"
          }
        );

        return;
      }

      const animateScene = (settings: ParallaxMotionSettings) => {
        if (shell) {
          createSectionBlend(shell, section, {
            scrub: settings.copyScrub,
            yStart: settings.blendStartY,
            yEnd: settings.blendEndY,
            opacityStart: settings.blendStartOpacity,
            opacityEnd: settings.blendEndOpacity,
            scaleStart: 0.984,
            scaleEnd: 0.992
          });
        }

        gsap.fromTo(
          "[data-parallax-word]",
          {
            autoAlpha: 0,
            yPercent: 110,
            filter: "blur(16px)"
          },
          {
              autoAlpha: 1,
              yPercent: 0,
              filter: "blur(0px)",
              duration: 1.14,
              stagger: 0.03,
              ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%"
            }
          }
        );

        gsap.fromTo(
          "[data-parallax-copy]",
          {
            autoAlpha: 0,
            y: 80,
            filter: "blur(12px)"
          },
          {
              autoAlpha: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.98,
              stagger: 0.11,
              ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%"
            }
          }
        );

        gsap.fromTo(
          "[data-parallax-line]",
          { scaleX: 0, transformOrigin: "left center" },
          {
              scaleX: 1,
              duration: 1.22,
              ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%"
            }
          }
        );

        gsap.fromTo(
          "[data-parallax-copy-block]",
          { yPercent: settings.copyDriftFrom },
          {
            yPercent: settings.copyDriftTo,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: settings.copyScrub
            }
          }
        );

        gsap.fromTo(
          "[data-parallax-shell]",
          {
            autoAlpha: 0,
            scale: settings.shellScale,
            y: 80,
            filter: `blur(${settings.shellBlur}px)`
          },
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.14,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%"
            }
          }
        );

        gsap.fromTo(
          "[data-parallax-sheen]",
          { xPercent: settings.sheenFrom, autoAlpha: 0 },
          {
            xPercent: settings.sheenTo,
            autoAlpha: settings.sheenAlpha,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: settings.copyScrub
            }
          }
        );

        gsap.fromTo(
          "[data-parallax-ring]",
          {
            autoAlpha: 0.2,
            scale: 0.92,
            rotate: -8
          },
          {
            autoAlpha: 0.44,
            scale: 1.06,
            rotate: 6,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: settings.copyScrub + 0.12
            }
          }
        );

        gsap.fromTo(
          "[data-parallax-orb]",
          {
            xPercent: -10,
            yPercent: -12,
            scale: 0.92
          },
          {
            xPercent: 14,
            yPercent: 18,
            scale: 1.06,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: settings.copyScrub + 0.08
            }
          }
        );

        layers.forEach((layer) => {
          const speed = Number(layer.dataset.speed ?? 1);

          gsap.fromTo(
            layer,
            {
              yPercent: -settings.layerStart * speed,
              rotate: -settings.rotateStart * speed
            },
            {
              yPercent: settings.layerEnd * speed,
              y: settings.layerTravel * speed,
              rotate: settings.rotateEnd * speed,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: settings.scrubBase + speed * settings.scrubFactor
              }
            }
          );
        });
      };

      ScrollTrigger.matchMedia({
        "(max-width: 767px)": () => {
          animateScene({
            blendStartOpacity: 0.56,
            blendEndOpacity: 0.72,
            blendStartY: 6,
            blendEndY: -4,
            shellScale: 0.985,
            shellBlur: 14,
            copyDriftFrom: 4,
            copyDriftTo: -3,
            copyScrub: 1,
            sheenFrom: -12,
            sheenTo: 12,
            sheenAlpha: 0.24,
            layerStart: 3,
            layerEnd: 8,
            layerTravel: 18,
            rotateStart: 0.35,
            rotateEnd: 0.75,
            scrubBase: 0.92,
            scrubFactor: 0.18
          });
        },
        "(min-width: 768px)": () => {
          animateScene({
            blendStartOpacity: 0.4,
            blendEndOpacity: 0.68,
            blendStartY: 10,
            blendEndY: -7,
            shellScale: 0.958,
            shellBlur: 18,
            copyDriftFrom: 7,
            copyDriftTo: -6,
            copyScrub: 1.26,
            sheenFrom: -24,
            sheenTo: 20,
            sheenAlpha: 0.38,
            layerStart: 6,
            layerEnd: 13,
            layerTravel: 28,
            rotateStart: 1,
            rotateEnd: 1.65,
            scrubBase: 1,
            scrubFactor: 0.26
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-shell -mt-4 py-24 md:-mt-8 md:py-32">
      <div className="grid items-center gap-12 lg:grid-cols-[0.82fr_1.18fr]">
        <div data-parallax-copy-block className="will-change-transform">
          <p
            data-parallax-copy
            className="text-sm uppercase tracking-[0.32em] text-white/[0.38]"
        >
            Parallax Depth
          </p>
          <h2 className="mt-5 max-w-3xl text-[2.8rem] font-semibold leading-[0.95] text-white sm:text-[3.4rem] md:text-[4.5rem]">
            {renderWords(
              "Layer the motion so the page feels dimensional, not decorative.",
              "depth"
            )}
          </h2>
          <p
            data-parallax-copy
            className="mt-7 max-w-xl text-pretty text-base leading-8 text-white/[0.64] sm:text-lg"
          >
            Background surfaces drift slower than the foreground, which makes
            the section feel tactile and cinematic without leaning on gimmicks
            or exaggerated perspective.
          </p>
          <div
            data-parallax-line
            className="mt-8 h-px w-36 bg-gradient-to-r from-white via-white/[0.42] to-transparent"
          />
          <p
            data-parallax-copy
            className="mt-6 max-w-lg border-l border-white/[0.12] pl-5 text-sm leading-7 text-white/[0.52]"
          >
            Depth works best when it stays almost invisible. The user should
            feel the scene opening up before they start noticing the technique.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-[0.68rem] uppercase tracking-[0.24em] text-white/[0.38]">
            <span
              data-parallax-copy
              className="interactive-pill rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2"
            >
              Slow background
            </span>
            <span
              data-parallax-copy
              className="interactive-pill rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2"
            >
              Mid-layer drift
            </span>
            <span
              data-parallax-copy
              className="interactive-pill rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2"
            >
              Focused foreground
            </span>
          </div>
        </div>

        <div
          data-parallax-shell
          className="panel-border panel-surface relative min-h-[30rem] overflow-hidden rounded-[2.4rem] p-6 will-change-transform md:min-h-[38rem] md:p-8"
        >
          <div
            data-parallax-sheen
            className="sheen-overlay absolute inset-y-[8%] left-[-10%] w-[38%] opacity-0 blur-2xl"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))]" />
          <div className="absolute inset-6 rounded-[2rem] border border-white/[0.08] bg-[linear-gradient(135deg,rgba(255,255,255,0.03),transparent)]" />
          <div
            data-parallax-ring
            className="absolute right-[14%] top-[16%] h-28 w-28 rounded-full border border-white/[0.08] will-change-transform md:h-36 md:w-36"
          />
          <div
            data-parallax-orb
            className="absolute right-[21%] top-[23%] h-3 w-3 rounded-full bg-white/[0.82] shadow-[0_0_18px_rgba(255,255,255,0.4)] will-change-transform"
          />
          <div
            data-parallax-layer
            data-speed="0.22"
            className="absolute inset-[12%] rounded-[2rem] border border-white/[0.05] will-change-transform"
          />
          <div
            data-parallax-layer
            data-speed="0.38"
            className="absolute -left-[6%] top-[8%] h-36 w-36 rounded-full bg-white/[0.08] blur-[80px] will-change-transform"
          />
          <div
            data-parallax-layer
            data-speed="0.52"
            className="absolute bottom-[10%] right-[12%] h-44 w-44 rounded-full bg-zinc-300/[0.08] blur-[95px] will-change-transform"
          />
          <div
            data-parallax-layer
            data-speed="0.3"
            className="absolute left-[18%] top-[18%] h-px w-[24%] bg-gradient-to-r from-transparent via-white/[0.28] to-transparent will-change-transform"
          />

          {layerCards.map((layer) => (
            <div
              key={layer.label}
              data-parallax-layer
              data-speed={layer.speed}
              className={`interactive-card absolute will-change-transform ${layer.className}`}
            >
              <p className="text-xs uppercase tracking-[0.28em] text-white/[0.34]">
                {layer.label}
              </p>
              <p className="mt-4 text-xl font-semibold leading-tight text-white">
                {layer.title}
              </p>
            </div>
          ))}

          <div
            data-parallax-layer
            data-speed="1.45"
            className="interactive-card absolute bottom-[8%] right-[8%] max-w-[19rem] rounded-[1.8rem] border border-white/[0.08] bg-white px-5 py-6 text-black shadow-[0_25px_80px_rgba(255,255,255,0.12)] will-change-transform"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-black/45">
              Foreground focus
            </p>
            <p className="mt-4 text-2xl font-semibold leading-tight">
              The scroll should feel guided, never random.
            </p>
            <p className="mt-4 text-sm leading-6 text-black/66">
              Premium experiences reward patience with deliberate pacing and
              better hierarchy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
