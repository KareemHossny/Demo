import { CTASection } from "@/components/CTASection";
import { HeroSection } from "@/components/HeroSection";
import { MotionSection } from "@/components/MotionSection";
import { ScrollProgress } from "@/components/ScrollProgress";
import { StickySection } from "@/components/StickySection";
import { StorySection } from "@/components/StorySection";

const storySections = [
  {
    id: "story-precision",
    eyebrow: "Act I",
    title: "Clarity arrives first, motion follows, and every frame earns its place.",
    description:
      "We shape space, rhythm, and typography into a narrative that feels calm at first glance and magnetic on every scroll. The interaction never shouts, but it never feels still.",
    detail:
      "Measured transitions, deliberate spacing, and visual restraint create confidence before a single word is read.",
    accent: "Precision Layer",
    direction: "left" as const,
    tone: "default" as const
  },
  {
    id: "story-depth",
    eyebrow: "Act II",
    title:
      "The pace shifts as the surface deepens and the page starts to breathe.",
    description:
      "A darker field, opposing motion, and soft parallax add tension and contrast. The experience feels richer because the movement is choreographed, not decorative.",
    detail:
      "This is where the interface starts behaving like a story arc instead of a stack of sections.",
    accent: "Parallax Field",
    direction: "right" as const,
    tone: "muted" as const
  }
];

export default function Home() {
  return (
    <main className="relative isolate overflow-hidden bg-[#050505] text-white">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.11),transparent_0),radial-gradient(circle_at_80%_20%,rgba(160,160,180,0.16),transparent_28%),linear-gradient(180deg,#050505_0%,#09090b_45%,#030303_100%)]" />
        <div className="absolute inset-0 bg-grid-fade bg-[size:96px_96px] opacity-[0.035]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(5,5,5,0.6)_100%)]" />
      </div>

      <ScrollProgress />
      <HeroSection />

      {storySections.map((section) => (
        <StorySection key={section.id} {...section} />
      ))}

      <StickySection />
      <MotionSection />
      <CTASection />
    </main>
  );
}
