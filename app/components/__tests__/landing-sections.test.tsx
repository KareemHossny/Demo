import { describe, expect, it, jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";

import { HeroSection } from "@/app/components/HeroSection";
import { ScrollReveal } from "@/app/components/ScrollReveal";
import { StickyStorySection } from "@/app/components/StickyStorySection";

jest.mock("next/link", () => {
  return function LinkMock({
    children,
    href,
    ...props
  }: {
    children: ReactNode;
    href: string;
  }) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
});

jest.mock("framer-motion", () => {
  const React = require("react");

  return {
    motion: new Proxy(
      {},
      {
        get: (_target, tag: string) => {
          return function MotionPrimitive({
            children,
            ...props
          }: {
            children: ReactNode;
          }) {
            return React.createElement(tag, props, children);
          };
        }
      }
    )
  };
});

jest.mock("@/lib/animations", () => {
  const makeTimeline = () => {
    const timeline = {
      fromTo: jest.fn(() => timeline),
      to: jest.fn(() => timeline),
      from: jest.fn(() => timeline)
    };

    return timeline;
  };

  return {
    reducedMotion: () => true,
    initGSAP: () => ({
      gsap: {
        context: (callback: () => void) => {
          callback();

          return {
            revert: () => undefined
          };
        },
        set: jest.fn(),
        fromTo: jest.fn(),
        to: jest.fn(),
        timeline: jest.fn(() => makeTimeline()),
        utils: {
          toArray: jest.fn(() => [])
        }
      },
      ScrollTrigger: {
        matchMedia: jest.fn()
      }
    }),
    createReveal: jest.fn(),
    createParallax: jest.fn(),
    createSectionBlend: jest.fn()
  };
});

describe("landing page animation components", () => {
  it("renders the hero heading content", () => {
    render(<HeroSection />);

    const heroHeading = screen.getByRole("heading", { level: 1 });

    expect(heroHeading.textContent).toContain("Build");
    expect(heroHeading.textContent).toContain("cinema");
    expect(screen.getByText(/Enter the Story/i)).toBeTruthy();
  });

  it("renders the sticky story messages", () => {
    render(<StickyStorySection />);

    expect(screen.getAllByText("Opening calm").length).toBeGreaterThan(0);
    expect(
      screen.getByText(/Pinned storytelling lets each sentence take the lead for a beat/i)
    ).toBeTruthy();
    expect(screen.getAllByText("Meaning lands").length).toBeGreaterThan(0);
  });

  it("renders ScrollReveal children with the reveal class", () => {
    render(
      <ScrollReveal id="test-reveal" className="wrapper-shell">
        <h2 className="reveal">Reveal Title</h2>
        <p className="reveal">Reveal copy</p>
      </ScrollReveal>
    );

    expect(screen.getByText("Reveal Title").className).toContain("reveal");
    expect(screen.getByText("Reveal copy").className).toContain("reveal");
    expect(document.getElementById("test-reveal")?.className).toContain("wrapper-shell");
  });
});
