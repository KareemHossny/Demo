"use client";

import { motion } from "framer-motion";
import { useLayoutEffect, useRef } from "react";

import { createReveal, initGSAP, reducedMotion } from "@/lib/animations";

const cards = [
  {
    title: "Staggered presence",
    copy: "Elements appear in measured succession so the page never feels like everything is shouting at once."
  },
  {
    title: "Intentional contrast",
    copy: "Soft glass, restrained borders, and tonal depth keep the interface feeling premium under motion."
  },
  {
    title: "Responsive rhythm",
    copy: "The choreography compresses gracefully on smaller screens instead of collapsing into generic stack-and-fade patterns."
  }
];

export function MotionSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const { gsap } = initGSAP();

    const ctx = gsap.context(() => {
      if (reducedMotion()) {
        gsap.set("[data-motion-head]", { autoAlpha: 1, y: 0 });
        gsap.set("[data-motion-card]", { autoAlpha: 1, y: 0 });
        return;
      }

      createReveal("[data-motion-head]", section, {
        y: 50,
        duration: 1,
        stagger: 0.12
      });

      gsap.fromTo(
        "[data-motion-card]",
        {
          autoAlpha: 0,
          y: 46
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          stagger: 0.18,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%"
          }
        }
      );

      gsap.fromTo(
        "[data-motion-line]",
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 72%"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-shell py-28 md:py-36">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
        <div>
          <p
            data-motion-head
            className="text-sm uppercase tracking-[0.3em] text-white/40"
          >
            Motion Language
          </p>
          <h2
            data-motion-head
            className="mt-5 max-w-2xl text-balance text-4xl font-semibold leading-[1] text-white sm:text-5xl md:text-6xl"
          >
            Smooth transitions, staggered reveals, and a finish that feels alive.
          </h2>
          <p
            data-motion-head
            className="mt-7 max-w-xl text-pretty text-base leading-8 text-white/[0.64] sm:text-lg"
          >
            GSAP handles the scroll choreography. Framer Motion adds just enough
            tactility on hover to make the page feel responsive under the
            cursor.
          </p>
        </div>

        <div className="space-y-8">
          <div
            data-motion-line
            className="h-px w-full bg-gradient-to-r from-white via-white/[0.35] to-transparent"
          />

          <div className="grid gap-5 md:grid-cols-3">
            {cards.map((card) => (
              <motion.article
                key={card.title}
                data-motion-card
                whileHover={{ y: -8, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 180, damping: 18 }}
                className="panel-border panel-surface rounded-[1.8rem] p-6 will-change-transform"
              >
                <div className="mb-10 h-12 w-12 rounded-2xl border border-white/10 bg-white/[0.04]" />
                <h3 className="text-2xl font-semibold text-white">{card.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/[0.58]">{card.copy}</p>
              </motion.article>
            ))}
          </div>

          <div className="grid gap-4 rounded-[1.8rem] border border-white/[0.08] bg-white/[0.03] p-6 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-white/[0.36]">
                Transition Cue
              </p>
              <p className="mt-3 max-w-2xl text-2xl font-semibold leading-tight text-white">
                The experience stays minimal, but the movement gives every
                section a sense of momentum.
              </p>
            </div>
            <motion.div
              whileHover={{ scale: 1.06 }}
              transition={{ type: "spring", stiffness: 180, damping: 16 }}
              className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white text-black"
            >
              01
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
