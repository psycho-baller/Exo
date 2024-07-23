import Hero from "~components/Hero";
import Feature from "~components/Features";
import CTA from "~components/CTA";
import OpenSource from "~components/OpenSource";

export default function Home() {
  return (
    <main>
      <Hero />
      <Feature />
      <CTA />
      <OpenSource />
    </main>
  );
}
