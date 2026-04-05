import { SectionMarker } from "@/components/ui/section-marker";
import { FadeIn } from "@/components/ui/fade-in";

export interface Chapter {
  number: number;
  title: string;
  description: string;
}

interface BookChaptersProps {
  chapters: Chapter[];
  sectionTitle?: string;
}

export function BookChapters({
  chapters,
  sectionTitle = "What's Inside",
}: BookChaptersProps) {
  return (
    <section className="py-(--spacing-section) sm:py-(--spacing-section-sm)">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <div className="mb-14 text-center">
            <SectionMarker>Chapters</SectionMarker>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl text-bone">
              {sectionTitle}
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {chapters.map((chapter, i) => (
            <FadeIn key={chapter.number} delay={i * 0.06}>
              <div className="flex gap-4 rounded-sm border border-slate/20 bg-navy-deep/40 p-6 h-full">
                <span className="font-serif text-3xl text-gold/30 leading-none shrink-0">
                  {String(chapter.number).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-serif text-base text-bone mb-1">{chapter.title}</h3>
                  <p className="text-sm text-bone/50 leading-relaxed">{chapter.description}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
