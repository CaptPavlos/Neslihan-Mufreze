"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";

const IMAGES = ["/neslihan-story-1.jpg", "/neslihan-story-2.jpg"];
const INTERVAL = 5000;

export function RotatingPortrait() {
  const [index, setIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const advance = useCallback(() => {
    setIndex((prev) => (prev + 1) % IMAGES.length);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = setInterval(advance, INTERVAL);
    return () => clearInterval(id);
  }, [prefersReducedMotion, advance]);

  if (prefersReducedMotion) {
    return (
      <div className="relative aspect-[3/4] w-full max-w-md mx-auto lg:mx-0 rounded-sm overflow-hidden">
        <Image
          src={IMAGES[0]}
          alt="Neslihan Müfreze"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="absolute inset-0 rounded-sm border border-gold/10 pointer-events-none" />
      </div>
    );
  }

  return (
    <div className="relative aspect-[3/4] w-full max-w-md mx-auto lg:mx-0 rounded-sm overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.div
          key={IMAGES[index]}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <Image
            src={IMAGES[index]}
            alt="Neslihan Müfreze"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority={index === 0}
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 rounded-sm border border-gold/10 pointer-events-none z-10" />
    </div>
  );
}
