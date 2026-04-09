import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Luma Atelier",
  description:
    "A premium cinematic landing page crafted with Next.js, Tailwind CSS, GSAP, and Framer Motion."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>{children}</body>
    </html>
  );
}
