import { FadeIn } from "@/components/ui/fade-in";

interface Chapter {
  number: number;
  title: string;
}

interface BookTocProps {
  intro: string;
  introDescription: string;
  chapters: Chapter[];
  sectionMarker?: string;
}

export function BookToc({ intro, introDescription, chapters, sectionMarker }: BookTocProps) {
  return (
    <section className="py-(--spacing-section) sm:py-(--spacing-section-sm)">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeIn>
            <div>
              <span className="section-marker">{sectionMarker}</span>
              <h2 className="mt-4 font-serif text-3xl text-bone sm:text-4xl">{intro}</h2>
              <p className="mt-4 text-base leading-relaxed text-bone/60">{introDescription}</p>
            </div>
          </FadeIn>

          <div className="space-y-0">
            {chapters.map((chapter, i) => (
              <FadeIn key={chapter.number} delay={i * 0.05}>
                <div className="flex items-baseline gap-4 border-b border-slate/15 py-4">
                  <span className="font-serif text-2xl text-gold-dim tabular-nums">
                    {String(chapter.number).padStart(2, "0")}
                  </span>
                  <span className="text-sm text-bone/70">{chapter.title}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
