"use client";

import { useLayoutEffect, useRef } from "react";

import { createSectionBlend, initGSAP, reducedMotion } from "@/lib/animations";

const layerCards = [
  {
    speed: 0.45,
    className:
      "left-[8%] top-[12%] w-[14rem] md:w-[16rem] rounded-[1.6rem] border border-white/[0.08] bg-black/[0.36] p-5",
    label: "Background layer",
    title: "The base motion stays slow and atmospheric."
  },
  {
    speed: 0.85,
    className:
      "right-[10%] top-[20%] w-[18rem] md:w-[20rem] rounded-[1.8rem] border border-white/[0.08] bg-white/[0.05] p-6",
    label: "Mid layer",
    title: "Cards drift at a different pace to create depth."
  },
  {
    speed: 1.2,
    className:
      "left-[18%] bottom-[12%] w-[16rem] md:w-[18rem] rounded-[1.6rem] border border-white/[0.08] bg-black/[0.42] p-5",
    label: "Foreground layer",
    title: "The fastest element leads the eye toward the CTA."
  }
];

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

    const { gsap } = initGSAP();

    const ctx = gsap.context(() => {
      const shell = section.querySelector("[data-parallax-shell]");
      const layers = gsap.utils.toArray<HTMLElement>("[data-parallax-layer]");

      if (reducedMotion()) {
        gsap.set(
          [
            "[data-parallax-word]",
            "[data-parallax-copy]",
            "[data-parallax-copy-block]",
            "[data-parallax-shell]",
            "[data-parallax-layer]",
            "[data-parallax-sheen]"
          ],
          {
            autoAlpha: 1,
            y: 0,
            yPercent: 0,
            scale: 1,
            filter: "blur(0px)"
          }
        );

        return;
      }

      if (shell) {
        createSectionBlend(shell, section, {
          scrub: 1.2,
          yStart: 9,
          yEnd: -6,
          opacityStart: 0.45,
          opacityEnd: 0.7
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
          duration: 1,
          stagger: 0.03,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 76%"
          }
        }
      );

      gsap.fromTo(
        "[data-parallax-copy]",
        { autoAlpha: 0, y: 26 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 72%"
          }
        }
      );

      gsap.fromTo(
        "[data-parallax-copy-block]",
        { yPercent: 6 },
        {
          yPercent: -6,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2
          }
        }
      );

      gsap.fromTo(
        "[data-parallax-shell]",
        {
          autoAlpha: 0,
          scale: 0.96,
          y: 36,
          filter: "blur(18px)"
        },
        {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 72%"
          }
        }
      );

      gsap.fromTo(
        "[data-parallax-sheen]",
        { xPercent: -22, autoAlpha: 0 },
        {
          xPercent: 18,
          autoAlpha: 0.36,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2
          }
        }
      );

      layers.forEach((layer) => {
        const speed = Number(layer.dataset.speed ?? 1);

        gsap.fromTo(
          layer,
          {
            yPercent: -6 * speed,
            rotate: -1 * speed
          },
          {
            yPercent: 13 * speed,
            y: 26 * speed,
            rotate: 1.5 * speed,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1 + speed * 0.25
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-shell py-24 md:py-36">
      <div className="grid items-center gap-12 lg:grid-cols-[0.86fr_1.14fr]">
        <div data-parallax-copy-block className="will-change-transform">
          <p
            data-parallax-copy
            className="text-sm uppercase tracking-[0.32em] text-white/[0.38]"
          >
            Parallax Depth
          </p>
          <h2 className="mt-5 max-w-3xl text-[2.8rem] font-semibold leading-[0.95] text-white sm:text-[3.4rem] md:text-[4.5rem]">
            {renderWords("Layer the motion so the page feels dimensional, not flat.", "depth")}
          </h2>
          <p
            data-parallax-copy
            className="mt-7 max-w-xl text-pretty text-base leading-8 text-white/[0.64] sm:text-lg"
          >
            Background surfaces drift slower than the foreground. That tiny
            difference is enough to make the section feel richer without adding
            visual clutter or resorting to heavy 3D.
          </p>
          <p
            data-parallax-copy
            className="mt-6 max-w-lg border-l border-white/[0.12] pl-5 text-sm leading-7 text-white/[0.52]"
          >
            The effect works because it stays restrained. Depth is a feeling
            here, not a gimmick.
          </p>
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
            data-speed="0.25"
            className="absolute inset-[10%] rounded-[2rem] border border-white/[0.08] bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_40%)] will-change-transform"
          />

          {layerCards.map((layer) => (
            <div
              key={layer.label}
              data-parallax-layer
              data-speed={layer.speed}
              className={`absolute will-change-transform ${layer.className}`}
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
            className="absolute bottom-[8%] right-[8%] max-w-[19rem] rounded-[1.8rem] border border-white/[0.08] bg-white px-5 py-6 text-black shadow-[0_25px_80px_rgba(255,255,255,0.12)] will-change-transform"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-black/45">
              Foreground focus
            </p>
            <p className="mt-4 text-2xl font-semibold leading-tight">
              The scroll should feel guided, not random.
            </p>
            <p className="mt-4 text-sm leading-6 text-black/66">
              Premium experiences reward patience with deliberate pacing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
