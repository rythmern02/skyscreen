import { Navbar } from "@/components/ui/Navbar";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Manifesto } from "@/components/sections/Manifesto";
import { WhatIs } from "@/components/sections/WhatIs";
import { Showcase } from "@/components/sections/Showcase";
import { Technology } from "@/components/sections/Technology";
import { Stats } from "@/components/sections/Stats";
import { Industries } from "@/components/sections/Industries";
import { Process } from "@/components/sections/Process";
import { Gallery } from "@/components/sections/Gallery";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main className="relative">
        <Hero />
        <Marquee />
        <Manifesto />
        <WhatIs />
        <Showcase />
        <Technology />
        <Stats />
        <Industries />
        <Process />
        <Gallery />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
