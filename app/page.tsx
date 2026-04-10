import { CTASection } from "@/components/CTASection";
import { HeroSection } from "@/components/HeroSection";
import { ParallaxSection } from "@/components/ParallaxSection";
import { ScrollRevealSection } from "@/components/ScrollRevealSection";
import { ScrollProgress } from "@/components/ScrollProgress";
import { StickyStorySection } from "@/components/StickyStorySection";

const storyBeats = [
  {
    id: "beat-clarity",
    eyebrow: "Chapter 01",
    title: "Open with quiet confidence, then pull the viewer closer.",
    description:
      "The first act should feel spacious and premium. Motion stays restrained, typography leads, and each reveal earns attention instead of demanding it.",
    detail:
      "This is where layout, rhythm, and contrast establish trust before the deeper interactions arrive.",
    accent: "Atmosphere",
    direction: "left" as const,
    metric: "91%",
    metricLabel: "Attention hold",
    signals: ["Quiet confidence", "Measured reveals", "Product-first pacing"] as const,
    insight:
      "The first section should feel expensive before it asks for attention. Space and timing do the convincing."
  },
  {
    id: "beat-contrast",
    eyebrow: "Chapter 02",
    title: "Shift the visual pressure and let the scroll introduce contrast.",
    description:
      "Directional motion and a denser surface change the emotional temperature. The page stops feeling like stacked blocks and starts feeling sequenced.",
    detail:
      "A subtle left-right alternation gives the eye a path to follow while the background drifts beneath the content.",
    accent: "Motion Contrast",
    direction: "right" as const,
    metric: "4.8s",
    metricLabel: "Rhythm pulse",
    signals: ["Directional tension", "Layered surfaces", "Controlled contrast"] as const,
    insight:
      "The user should feel the page changing temperature, not jumping between unrelated blocks."
  },
  {
    id: "beat-focus",
    eyebrow: "Chapter 03",
    title: "Reduce the noise until the message lands with weight.",
    description:
      "By the final story beat, the interface should feel distilled. Fewer elements, stronger hierarchy, and smoother transitions give the product its premium edge.",
    detail:
      "The best landing pages do not overwhelm. They guide, pause, and reveal at the exact moment the user is ready.",
    accent: "Editorial Focus",
    direction: "left" as const,
    metric: "12px",
    metricLabel: "Micro motion lift",
    signals: ["Lower visual noise", "Sharper hierarchy", "More deliberate pauses"] as const,
    insight:
      "The closer the story gets to its final point, the more restraint matters. Premium pages know when to go quiet."
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
      <ScrollRevealSection beats={storyBeats} />
      <ParallaxSection />
      <StickyStorySection />
      <CTASection />
    </main>
  );
}
