"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { FadeIn } from "@/components/ui/fade-in";

interface FaqItem {
  question: string;
  answer: string;
}

interface BookFaqProps {
  items: FaqItem[];
  sectionMarker?: string;
  heading?: string;
}

function FaqAccordion({ item, index }: { item: FaqItem; index: number }) {
  const [open, setOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <FadeIn delay={index * 0.08}>
      <div className="border-b border-slate/20">
        <button
          className="flex w-full items-center justify-between py-5 text-left cursor-pointer"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
        >
          <span className="text-sm font-medium text-bone/90 pr-4">{item.question}</span>
          <span
            className={`shrink-0 font-serif text-xl text-gold transition-transform duration-300 ${
              open ? "rotate-45" : ""
            }`}
          >
            +
          </span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <p className="pb-5 text-sm leading-relaxed text-bone/60">{item.answer}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FadeIn>
  );
}

export function BookFaq({ items, sectionMarker, heading }: BookFaqProps) {
  return (
    <section className="py-(--spacing-section) sm:py-(--spacing-section-sm)">
      <div className="mx-auto max-w-3xl px-6">
        <FadeIn>
          <div className="mb-10 text-center">
            <span className="section-marker">{sectionMarker}</span>
            <h2 className="mt-4 font-serif text-3xl text-bone sm:text-4xl">{heading}</h2>
          </div>
        </FadeIn>

        <div>
          {items.map((item, i) => (
            <FaqAccordion key={item.question} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
