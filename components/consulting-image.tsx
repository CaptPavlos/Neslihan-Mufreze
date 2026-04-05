"use client";

import Image from "next/image";
import { FadeIn } from "@/components/ui/fade-in";

export function ConsultingImage() {
  return (
    <div className="relative py-12 md:py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 flex justify-end">
        <FadeIn direction="right" delay={0.1}>
          <div
            className="relative w-[45vw] max-w-lg aspect-[3/4]"
            style={{
              maskImage:
                "radial-gradient(ellipse 70% 70% at center, black 40%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 70% 70% at center, black 40%, transparent 100%)",
            }}
          >
            <Image
              src="/neslihan-consulting.jpg"
              alt="Neslihan Müfreze"
              fill
              className="object-cover"
              sizes="45vw"
            />
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
