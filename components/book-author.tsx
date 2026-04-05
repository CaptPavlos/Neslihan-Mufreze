import Image from "next/image";
import { FadeIn } from "@/components/ui/fade-in";

interface BookAuthorProps {
  name: string;
  credentials: string;
  bio: string;
  imageSrc?: string;
  sectionLabel?: string;
}

export function BookAuthor({ name, credentials, bio, imageSrc, sectionLabel }: BookAuthorProps) {
  return (
    <section className="py-(--spacing-section) sm:py-(--spacing-section-sm)">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <div className="mx-auto max-w-3xl">
            <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start">
              <div className="shrink-0">
                {imageSrc ? (
                  <Image
                    src={imageSrc}
                    alt={name}
                    width={112}
                    height={112}
                    className="h-28 w-28 rounded-full border-2 border-gold/30 object-cover"
                  />
                ) : (
                  <div className="flex h-28 w-28 items-center justify-center rounded-full border-2 border-gold/30 bg-navy-mid">
                    <span className="font-serif text-3xl text-gold">
                      {name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                )}
              </div>

              <div className="text-center sm:text-left">
                <span className="section-marker">{sectionLabel}</span>
                <h3 className="mt-3 font-serif text-2xl text-bone">{name}</h3>
                <p className="mt-1 text-sm text-gold-dim">{credentials}</p>
                <p className="mt-4 text-sm leading-relaxed text-bone/60">{bio}</p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
