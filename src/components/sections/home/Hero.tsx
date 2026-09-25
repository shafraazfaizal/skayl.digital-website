"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import AnimatedText from "@/components/ui/AnimatedText";

const fade = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 },
  }),
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32">
      <Container>
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <h1 className="display text-5xl leading-[0.95] sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            <AnimatedText
              as="span"
              play="mount"
              text="We don’t work for you."
              className="block text-ink/35"
            />
            <AnimatedText
              as="span"
              play="mount"
              text="We work with you."
              className="block text-ink"
            />
          </h1>

          <motion.p
            custom={1}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mt-6 max-w-xl text-balance text-lg text-muted"
          >
            One embedded team handling development, design, branding,
            photography, and content. No handoffs, no freelancers, no
            coordination overhead.
          </motion.p>

          <motion.div
            custom={2}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
          >
            <Button href="/contact" variant="primary">
              Start a Project →
            </Button>
            <Button href="/works" variant="outline">
              View our work
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
