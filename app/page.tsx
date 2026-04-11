import { CTASection } from "@/app/components/CTASection";
import { HeroSection } from "@/app/components/HeroSection";
import { HorizontalShowcaseSection } from "@/app/components/HorizontalShowcaseSection";
import { ParallaxSection } from "@/app/components/ParallaxSection";
import { ScrollReveal } from "@/app/components/ScrollReveal";
import { SmoothScrollShell } from "@/app/components/SmoothScrollShell";
import { StickyStorySection } from "@/app/components/StickyStorySection";
import { ScrollProgress } from "@/components/ScrollProgress";

const productLayers = [
  {
    index: "01",
    title: "Calm opening",
    eyebrow: "First contact",
    copy:
      "The first viewport should lower the noise floor immediately so the product feels considered before the interface starts moving."
  },
  {
    index: "02",
    title: "Measured tension",
    eyebrow: "Rising rhythm",
    copy:
      "Motion then starts guiding the eye in small increments, turning the existing layout into a paced reveal instead of a stack of sections."
  },
  {
    index: "03",
    title: "Quiet conversion",
    eyebrow: "Lasting memory",
    copy:
      "By the end, restraint matters more than spectacle. The page closes with confidence, not visual fatigue."
  }
];

const journeyPoints = [
  {
    label: "Entry",
    title: "The opening frame slows the heartbeat before the story accelerates.",
    copy:
      "That calm is what makes the later motion feel premium instead of noisy."
  },
  {
    label: "Shift",
    title: "The midpoint changes direction so the scroll feels authored, not automatic.",
    copy:
      "A deliberate change in rhythm keeps the user attentive and makes the page feel bespoke."
  },
  {
    label: "Hold",
    title: "The pinned chapter gives one idea enough space to become memorable.",
    copy:
      "That single pause is often the part clients remember first when the page ends."
  }
];

export default function Home() {
  return (
    <SmoothScrollShell>
      <main className="relative isolate overflow-hidden bg-[#050608] text-white">
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.1),transparent_14%),radial-gradient(circle_at_82%_18%,rgba(188,196,212,0.14),transparent_26%),radial-gradient(circle_at_50%_54%,rgba(255,255,255,0.06),transparent_34%),linear-gradient(180deg,#050608_0%,#090b10_42%,#040506_100%)]" />
          <div className="page-aura absolute inset-[-10%] opacity-[0.42]" />
          <div className="absolute inset-0 bg-grid-fade bg-[size:96px_96px] opacity-[0.035]" />
          <div className="page-noise absolute inset-0 opacity-[0.08]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_22%,rgba(5,6,8,0.62)_100%)]" />
        </div>

        <ScrollProgress />
        <HeroSection />
        <div className="section-shell">
          <div className="section-divider opacity-70" />
        </div>

        <ScrollReveal id="story-flow" className="section-shell -mt-4 py-24 md:-mt-8 md:py-32">
          <section className="panel-border panel-surface relative overflow-hidden rounded-[2.8rem] p-6 md:p-10 lg:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(255,255,255,0.09),transparent_24%),radial-gradient(circle_at_88%_26%,rgba(180,180,200,0.09),transparent_20%)]" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.24] to-transparent" />
            <div className="absolute inset-[5%] rounded-[2.2rem] border border-white/[0.05]" />

            <div className="relative grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
              <div className="max-w-xl">
                <p
                  data-reveal-direction="left"
                  className="reveal text-sm uppercase tracking-[0.32em] text-white/[0.38]"
                >
                  Experience Layers
                </p>
                <h2
                  data-reveal-direction="left"
                  className="reveal mt-5 text-balance text-4xl font-semibold leading-[0.95] text-white sm:text-5xl md:text-6xl"
                >
                  Upgrade the homepage by making every scroll beat feel inevitable.
                </h2>
                <p
                  data-reveal-direction="left"
                  className="reveal mt-7 text-pretty text-base leading-8 text-white/[0.62] sm:text-lg"
                >
                  The goal is not to add more motion. It is to tune emotion,
                  pacing, and continuity until the existing landing page feels
                  closer to a directed product film than a template.
                </p>

                <div
                  data-reveal-direction="left"
                  className="reveal mt-8 flex flex-wrap gap-3 text-[0.68rem] uppercase tracking-[0.24em] text-white/[0.42]"
                >
                  <span className="interactive-pill rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2">
                    Cleaner handoffs
                  </span>
                  <span className="interactive-pill rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2">
                    Slower breath
                  </span>
                  <span className="interactive-pill rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2">
                    Higher perceived craft
                  </span>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3 md:pt-6">
                {productLayers.map((layer, index) => (
                  <article
                    key={layer.title}
                    data-reveal-direction={
                      index === 0 ? "left" : index === 1 ? "up" : "right"
                    }
                    className={`interactive-card reveal relative overflow-hidden rounded-[1.9rem] border border-white/[0.08] p-6 will-change-transform ${
                      index === 1
                        ? "bg-white/[0.06] md:-translate-y-6"
                        : "bg-white/[0.025]"
                    }`}
                  >
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.2] to-transparent" />
                    <p className="text-[0.66rem] uppercase tracking-[0.3em] text-white/[0.3]">
                      {layer.index}
                    </p>
                    <p className="mt-4 text-[0.68rem] uppercase tracking-[0.28em] text-white/[0.4]">
                      {layer.eyebrow}
                    </p>
                    <h3 className="mt-5 text-xl font-semibold leading-tight text-white">
                      {layer.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-white/[0.6]">
                      {layer.copy}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal id="journey-points" className="section-shell -mt-4 py-24 md:-mt-8 md:py-32">
          <section className="relative overflow-hidden rounded-[2.7rem] border border-white/[0.08] bg-white/[0.02] p-6 md:p-10 lg:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(255,255,255,0.07),transparent_24%),radial-gradient(circle_at_82%_82%,rgba(255,255,255,0.04),transparent_28%)]" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.16] to-transparent" />

            <div className="relative flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <p
                  data-reveal-direction="left"
                  className="reveal text-sm uppercase tracking-[0.32em] text-white/[0.38]"
                >
                  Scroll Journey
                </p>
                <h2
                  data-reveal-direction="left"
                  className="reveal mt-4 text-balance text-3xl font-semibold leading-[1] text-white sm:text-4xl md:text-5xl"
                >
                  Each section should arrive as a consequence of the last one.
                </h2>
              </div>

              <p
                data-reveal-direction="right"
                className="reveal max-w-md text-sm leading-7 text-white/[0.52]"
              >
                GSAP handles the pacing, Framer Motion sharpens the touch points,
                and the overall experience stays quiet enough to feel expensive.
              </p>
            </div>

            <div className="relative mt-10 flex flex-wrap gap-3 text-[0.68rem] uppercase tracking-[0.24em] text-white/[0.34]">
              {journeyPoints.map((point, index) => (
                <div
                  key={point.label}
                  data-reveal-direction={index === 1 ? "up" : "left"}
                  className="interactive-pill reveal rounded-full border border-white/[0.08] bg-black/[0.2] px-4 py-2"
                >
                  0{index + 1} / {point.label}
                </div>
              ))}
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {journeyPoints.map((point, index) => (
                <article
                    key={point.label}
                    data-reveal-direction={
                      index === 0 ? "left" : index === 1 ? "up" : "right"
                    }
                  className={`interactive-card reveal relative overflow-hidden rounded-[1.7rem] border border-white/[0.08] p-6 will-change-transform ${
                    index === 1
                      ? "bg-white/[0.05] md:translate-y-6"
                      : "bg-black/[0.24]"
                  }`}
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.18] to-transparent" />
                  <p className="text-xs uppercase tracking-[0.28em] text-white/[0.36]">
                    {point.label}
                  </p>
                  <h3 className="mt-4 text-xl font-semibold leading-tight text-white">
                    {point.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-white/[0.58]">
                    {point.copy}
                  </p>
                </article>
              ))}
            </div>

            <p
              data-reveal-direction="up"
              className="reveal mt-10 max-w-2xl text-sm leading-7 text-white/[0.44]"
            >
              When the rhythm is right, the user stops noticing the animation as
              a feature and starts remembering the message it carried.
            </p>
          </section>
        </ScrollReveal>

        <HorizontalShowcaseSection />
        <ParallaxSection />
        <StickyStorySection />
        <CTASection />
      </main>
    </SmoothScrollShell>
  );
}
