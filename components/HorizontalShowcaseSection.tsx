"use client";

import { useLayoutEffect, useRef } from "react";

import { createSectionBlend, initGSAP, reducedMotion } from "@/lib/animations";

const frames = [
  {
    index: "01",
    label: "Opening control",
    title: "The page earns authority before the motion expands.",
    copy:
      "This first panel establishes tone with typography, spacing, and contrast so the later movement feels deliberate rather than decorative.",
    accent: ["Measured intro", "Clear hierarchy", "Quiet confidence"]
  },
  {
    index: "02",
    label: "Rhythm shift",
    title: "A lateral chapter changes the cadence of the entire story.",
    copy:
      "Instead of stacking another vertical section, the experience pivots into a broader composition and immediately feels more directed.",
    accent: ["Wide composition", "Pinned motion", "Cinematic midpoint"]
  },
  {
    index: "03",
    label: "Depth cues",
    title: "Layered surfaces make the motion feel tangible and expensive.",
    copy:
      "Foreground and background elements drift at different rates, creating spatial richness without resorting to loud 3D tricks.",
    accent: ["Glass surfaces", "Depth drift", "Focused foreground"]
  },
  {
    index: "04",
    label: "Quiet close",
    title: "The final frame softens the motion so the message lands harder.",
    copy:
      "That restraint is what separates premium polish from a page that simply contains more animation than it needs.",
    accent: ["Sharper memory", "Calmer motion", "Stronger finish"]
  }
];

function renderWords(text: string, prefix: string) {
  return (
    <span className="flex flex-wrap gap-x-3 gap-y-2">
      {text.split(" ").map((word, index) => (
        <span key={`${prefix}-${word}-${index}`} className="inline-flex overflow-hidden">
          <span data-horizontal-word className="inline-block will-change-transform">
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}

export function HorizontalShowcaseSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const { gsap, ScrollTrigger } = initGSAP();

    const ctx = gsap.context(() => {
      const shell = section.querySelector<HTMLElement>("[data-horizontal-shell]");
      const track = section.querySelector<HTMLElement>("[data-horizontal-track]");
      const panels = gsap.utils.toArray<HTMLElement>("[data-horizontal-panel]");
      const progressBar = section.querySelector<HTMLElement>("[data-horizontal-progress-bar]");

      if (!shell || !track) {
        return;
      }

      if (reducedMotion()) {
        gsap.set(
          [
            "[data-horizontal-word]",
            "[data-horizontal-copy]",
            "[data-horizontal-panel]",
            "[data-horizontal-item]",
            "[data-horizontal-line]",
            "[data-horizontal-shell-sheen]",
            "[data-horizontal-progress-bar]"
          ],
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            scaleX: 1,
            filter: "blur(0px)"
          }
        );

        return;
      }

      createSectionBlend(shell, section, {
        scrub: 1.14,
        yStart: 8,
        yEnd: -6,
        opacityStart: 0.46,
        opacityEnd: 0.68,
        scaleStart: 0.986,
        scaleEnd: 0.995
      });

      gsap.fromTo(
        "[data-horizontal-word]",
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
          stagger: 0.034,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%"
          }
        }
      );

      gsap.fromTo(
        "[data-horizontal-copy]",
        {
          autoAlpha: 0,
          y: 100,
          filter: "blur(14px)"
        },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%"
          }
        }
      );

      gsap.fromTo(
        "[data-horizontal-line]",
        {
          scaleX: 0,
          transformOrigin: "left center"
        },
        {
          scaleX: 1,
          duration: 1.16,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%"
          }
        }
      );

      gsap.fromTo(
        "[data-horizontal-shell-sheen]",
        {
          xPercent: -24,
          autoAlpha: 0
        },
        {
          xPercent: 18,
          autoAlpha: 0.34,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.08
          }
        }
      );

      ScrollTrigger.matchMedia({
        "(max-width: 767px)": () => {
          gsap.fromTo(
            panels,
            {
              autoAlpha: 0,
              y: 90,
              scale: 0.985,
              filter: "blur(14px)"
            },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              duration: 0.96,
              stagger: 0.14,
              ease: "power3.out",
              scrollTrigger: {
                trigger: shell,
                start: "top 82%"
              }
            }
          );

          if (progressBar) {
            gsap.fromTo(
              progressBar,
              {
                scaleX: 0,
                transformOrigin: "left center"
              },
              {
                scaleX: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: shell,
                  start: "top 82%"
                }
              }
            );
          }
        },
        "(min-width: 768px)": () => {
          const travel = () => Math.max(track.scrollWidth - shell.clientWidth, 0);
          const horizontalEnd = () => `+=${Math.max(travel(), window.innerWidth * 2.7)}`;

          const horizontalTween = gsap.to(track, {
            x: () => -travel(),
            ease: "none",
            scrollTrigger: {
              trigger: shell,
              start: "top top",
              end: horizontalEnd,
              pin: true,
              scrub: 1.24,
              anticipatePin: 1.2
            }
          });

          if (progressBar) {
            gsap.fromTo(
              progressBar,
              {
                scaleX: 0,
                transformOrigin: "left center"
              },
              {
                scaleX: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: shell,
                  start: "top top",
                  end: horizontalEnd,
                  scrub: 1.08
                }
              }
            );
          }

          panels.forEach((panel, index) => {
            const items = panel.querySelectorAll("[data-horizontal-item]");
            const glow = panel.querySelector("[data-horizontal-glow]");
            const initialOpacity = index === 0 ? 1 : 0.54;
            const initialScale = index === 0 ? 1 : 0.93;

            gsap.fromTo(
              panel,
              {
                autoAlpha: initialOpacity,
                scale: initialScale,
                yPercent: index === 0 ? 0 : 7
              },
              {
                autoAlpha: 1,
                scale: 1,
                yPercent: 0,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: horizontalTween,
                  start: "left 80%",
                  end: "left 50%",
                  toggleActions: "play none none reverse"
                }
              }
            );

            gsap.fromTo(
              items,
              {
                autoAlpha: index === 0 ? 1 : 0,
                y: index === 0 ? 0 : 70,
                filter: index === 0 ? "blur(0px)" : "blur(14px)"
              },
              {
                autoAlpha: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 0.96,
                stagger: 0.09,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: horizontalTween,
                  start: "left 76%",
                  end: "left 44%",
                  toggleActions: "play none none reverse"
                }
              }
            );

            if (glow instanceof HTMLElement) {
              gsap.fromTo(
                glow,
                {
                  autoAlpha: 0.16,
                  scale: 0.92
                },
                {
                  autoAlpha: 0.56,
                  scale: 1.1,
                  duration: 0.88,
                  ease: "power3.out",
                  scrollTrigger: {
                    trigger: panel,
                    containerAnimation: horizontalTween,
                    start: "left 76%",
                    end: "left 42%",
                    toggleActions: "play none none reverse"
                  }
                }
              );
            }
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-shell -mt-4 py-24 md:-mt-8 md:py-32">
      <div className="max-w-3xl">
        <p
          data-horizontal-copy
          className="text-sm uppercase tracking-[0.32em] text-white/[0.38]"
        >
          Storyboard Chapter
        </p>
        <h2 className="mt-5 max-w-4xl text-[2.8rem] font-semibold leading-[0.95] text-white sm:text-[3.6rem] md:text-[4.8rem]">
          {renderWords(
            "Change direction midway through the page so the story feels edited, not stacked.",
            "horizontal"
          )}
        </h2>
        <p
          data-horizontal-copy
          className="mt-7 max-w-2xl text-pretty text-base leading-8 text-white/[0.64] sm:text-lg"
        >
          A horizontal sequence resets the eye and makes the midpoint feel
          intentional. It is a pacing tool first, and a motion effect second.
        </p>
        <div
          data-horizontal-line
          className="mt-8 h-px w-40 bg-gradient-to-r from-white via-white/[0.42] to-transparent"
        />
      </div>

      <div
        data-horizontal-shell
        className="panel-border panel-surface relative mt-14 overflow-hidden rounded-[2.7rem] p-4 md:p-6"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_34%)]" />
        <div
          data-horizontal-shell-sheen
          className="sheen-overlay absolute inset-y-[12%] left-[-12%] w-[34%] opacity-0 blur-2xl"
        />
        <div className="absolute inset-x-4 top-4 h-px overflow-hidden rounded-full bg-white/[0.08] md:inset-x-6">
          <div
            data-horizontal-progress-bar
            className="h-full origin-left scale-x-0 bg-gradient-to-r from-white/[0.35] via-white to-white/[0.4]"
          />
        </div>
        <div
          data-horizontal-track
          className="relative mt-6 flex gap-4 md:mt-8 md:gap-6 will-change-transform"
        >
          {frames.map((frame, index) => (
            <article
              key={frame.index}
              data-horizontal-panel
              className="panel-border panel-surface relative min-h-[28rem] min-w-[82vw] overflow-hidden rounded-[2rem] p-6 will-change-transform sm:min-w-[70vw] md:min-h-[34rem] md:min-w-[68vw] md:p-8 lg:min-w-[54vw]"
            >
              <div
                data-horizontal-glow
                className={`absolute inset-auto rounded-full blur-[90px] ${
                  index % 2 === 0
                    ? "left-[12%] top-[14%] h-40 w-40 bg-white/[0.12]"
                    : "bottom-[18%] right-[12%] h-44 w-44 bg-zinc-300/[0.12]"
                }`}
              />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.22] to-transparent" />

              <div className="relative flex h-full flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <p
                      data-horizontal-item
                      className="text-xs uppercase tracking-[0.3em] text-white/[0.34]"
                    >
                      {frame.label}
                    </p>
                    <p
                      data-horizontal-item
                      className="text-[0.68rem] uppercase tracking-[0.24em] text-white/[0.28]"
                    >
                      Frame {frame.index}
                    </p>
                  </div>

                  <h3
                    data-horizontal-item
                    className="mt-6 max-w-[16ch] text-3xl font-semibold leading-[1] text-white md:text-5xl"
                  >
                    {frame.title}
                  </h3>
                </div>

                <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
                  <p
                    data-horizontal-item
                    className="max-w-xl text-base leading-8 text-white/[0.62] md:text-lg"
                  >
                    {frame.copy}
                  </p>
                  <div className="grid gap-3">
                    {frame.accent.map((item) => (
                      <div
                        key={item}
                        data-horizontal-item
                        className="interactive-card rounded-[1.2rem] border border-white/[0.08] bg-black/[0.24] px-4 py-3 text-sm uppercase tracking-[0.22em] text-white/[0.5]"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="relative mt-5 flex items-center justify-between px-1 text-[0.68rem] uppercase tracking-[0.24em] text-white/[0.28]">
          <span>A deliberate change of pace</span>
          <span>Scroll through the storyboard chapter</span>
        </div>
      </div>
    </section>
  );
}
