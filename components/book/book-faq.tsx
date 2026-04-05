"use client";

import { useState } from "react";
import { SectionMarker } from "@/components/ui/section-marker";
import { FadeIn } from "@/components/ui/fade-in";

export interface FAQItem {
  question: string;
  answer: string;
}

interface BookFAQProps {
  items: FAQItem[];
  sectionMarker?: string;
  heading?: string;
}

function FAQAccordion({ item, index }: { item: FAQItem; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <FadeIn delay={index * 0.08}>
      <div className="border-b border-slate/20">
        <button
          className="flex w-full items-center justify-between py-5 text-left cursor-pointer"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
        >
          <span className="font-sans text-sm font-medium text-bone pr-4">{item.question}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className={`w-5 h-5 text-gold-dim shrink-0 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div
          className={`overflow-hidden transition-all duration-200 ${
            open ? "max-h-96 pb-5" : "max-h-0"
          }`}
        >
          <p className="text-sm leading-relaxed text-bone/60">{item.answer}</p>
        </div>
      </div>
    </FadeIn>
  );
}

export function BookFAQ({ items, sectionMarker = "FAQ", heading = "Frequently Asked Questions" }: BookFAQProps) {
  return (
    <section className="py-(--spacing-section) sm:py-(--spacing-section-sm)">
      <div className="mx-auto max-w-3xl px-6">
        <FadeIn>
          <div className="mb-14 text-center">
            <SectionMarker>{sectionMarker}</SectionMarker>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl text-bone">{heading}</h2>
          </div>
        </FadeIn>

        <div>
          {items.map((item, i) => (
            <FAQAccordion key={item.question} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
