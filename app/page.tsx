import { CTASection } from "@/app/components/CTASection";
import { HeroSection } from "@/app/components/HeroSection";
import { ParallaxSection } from "@/app/components/ParallaxSection";
import { ScrollReveal } from "@/app/components/ScrollReveal";
import { StickyStorySection } from "@/app/components/StickyStorySection";
import { ScrollProgress } from "@/components/ScrollProgress";

const productLayers = [
  {
    title: "Motion with purpose",
    copy:
      "Every section should reveal meaning, not just animate into existence. The scroll becomes a pacing tool, not a gimmick."
  },
  {
    title: "Story-driven layout",
    copy:
      "The homepage should read like one continuous sequence, where each section hands attention to the next without a visual reset."
  },
  {
    title: "Premium interaction detail",
    copy:
      "Hover states, subtle gradients, layered depth, and restrained easing make the experience feel more like a product launch than a static page."
  }
];

const journeyPoints = [
  {
    label: "Reveal",
    title: "Headlines and body copy arrive with intent.",
    copy: "Sections fade in smoothly, guiding the eye instead of competing for it."
  },
  {
    label: "Depth",
    title: "Parallax adds atmosphere without adding noise.",
    copy: "Backgrounds move slower than foreground content, creating a cinematic sense of space."
  },
  {
    label: "Memory",
    title: "The pinned story section becomes the moment people remember.",
    copy: "Each message takes over the viewport for a beat, then gracefully yields to the next."
  }
];

export default function Home() {
  return (
    <main className="relative isolate overflow-hidden bg-[#050505] text-white">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.11),transparent_0),radial-gradient(circle_at_80%_20%,rgba(160,160,180,0.16),transparent_28%),radial-gradient(circle_at_50%_55%,rgba(255,255,255,0.07),transparent_34%),linear-gradient(180deg,#050505_0%,#09090b_40%,#030303_100%)]" />
        <div className="page-aura absolute inset-[-10%] opacity-[0.42]" />
        <div className="absolute inset-0 bg-grid-fade bg-[size:96px_96px] opacity-[0.035]" />
        <div className="page-noise absolute inset-0 opacity-[0.08]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(5,5,5,0.6)_100%)]" />
      </div>

      <ScrollProgress />
      <HeroSection />

      <ScrollReveal id="experience-layers" className="section-shell py-24 md:py-32">
        <section className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="max-w-xl">
            <p className="reveal text-sm uppercase tracking-[0.32em] text-white/[0.38]">
              Experience Layers
            </p>
            <h2 className="reveal mt-5 text-balance text-4xl font-semibold leading-[0.95] text-white sm:text-5xl md:text-6xl">
              Upgrade the homepage by turning scrolling into a guided narrative.
            </h2>
            <p className="reveal mt-7 text-pretty text-base leading-8 text-white/[0.62] sm:text-lg">
              This pass focuses on the experience layer inside the existing app:
              entrance motion, scroll reveals, pinned storytelling, parallax
              depth, and premium micro-interactions.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {productLayers.map((layer) => (
              <article
                key={layer.title}
                className="reveal rounded-[1.7rem] border border-white/[0.08] bg-white/[0.025] p-6 transition-transform duration-300 hover:scale-[1.02] hover:border-white/[0.14] hover:shadow-[0_24px_60px_rgba(0,0,0,0.22)] will-change-transform"
              >
                <p className="text-sm font-medium uppercase tracking-[0.24em] text-white/[0.38]">
                  {layer.title}
                </p>
                <p className="mt-4 text-sm leading-7 text-white/[0.62]">{layer.copy}</p>
              </article>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal id="journey-points" className="section-shell py-24 md:py-32">
        <section className="rounded-[2.2rem] border border-white/[0.08] bg-white/[0.02] p-6 md:p-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="reveal text-sm uppercase tracking-[0.32em] text-white/[0.38]">
                Scroll Journey
              </p>
              <h2 className="reveal mt-4 text-balance text-3xl font-semibold leading-[1] text-white sm:text-4xl md:text-5xl">
                Each motion beat should introduce something new and make the next
                section feel inevitable.
              </h2>
            </div>
            <p className="reveal max-w-md text-sm leading-7 text-white/[0.52]">
              The core interaction system stays in GSAP ScrollTrigger, while
              hover polish uses lightweight motion patterns.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {journeyPoints.map((point) => (
              <article
                key={point.label}
                className="reveal rounded-[1.6rem] border border-white/[0.08] bg-black/[0.24] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.16] hover:shadow-[0_24px_60px_rgba(0,0,0,0.24)] will-change-transform"
              >
                <p className="text-xs uppercase tracking-[0.28em] text-white/[0.36]">
                  {point.label}
                </p>
                <h3 className="mt-4 text-xl font-semibold leading-tight text-white">
                  {point.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-white/[0.58]">{point.copy}</p>
              </article>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <ParallaxSection />
      <StickyStorySection />
      <CTASection />
    </main>
  );
}
