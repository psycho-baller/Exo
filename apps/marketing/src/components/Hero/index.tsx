"use client";
import Link from "next/link";
import { siteConfig } from "~config/site";
import { cn, buttonVariants } from "~lib/utils";
import SecondaryButtonLink from "../../shared/components/SecondaryButtonLink";
import { useStore } from "~stores/website";
import styles from "./styles.module.css";


const Hero = () => {
  const heroTextRef = useStore((state) => state.heroTextRef);
  return (
    <section
      ref={heroTextRef}
      className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-36 mt-16"
    >
      <div className="container flex max-w-[70rem] flex-col items-center gap-4 text-center">
        {/* <Link
            href={siteConfig.links.github}
            className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
            target="_blank"
          >
            Follow along on Twitter
          </Link> */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl">{siteConfig.hero}</h1>
        <p className="max-w-[42rem] !text-manatee leading-normal sm:text-xl sm:leading-8">{siteConfig.description}</p>
        <div className="space-x-4">
          <SecondaryButtonLink href={siteConfig.links.discord} className={styles.cta}>Join Discord Server</SecondaryButtonLink>
          <Link
            href="/#waitlist"
            className={cn(buttonVariants({ size: "lg" }))}
          >
            Join Waitlist
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
