import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/ui";
import { spedSpotlight } from "@/lib/reality";

/** Compact SpEd interrupt for the home page */
export function SpedHomeInterrupt() {
  return (
    <Section tone="light" className="py-16 md:py-20">
      <div className="grid gap-8 md:grid-cols-[1.3fr_0.9fr] md:items-end">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-steel">
            {spedSpotlight.eyebrow}
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-2xl font-extrabold tracking-tight text-balance md:text-4xl">
            Rights without resources are a broken promise.
          </h2>
          <p className="answer-lead mt-4 max-w-xl text-base leading-relaxed text-charcoal">
            {spedSpotlight.answer}
          </p>
        </Reveal>
        <Reveal delay={1}>
          <div className="rounded-2xl bg-press px-6 py-7 text-blank md:px-8">
            <p className="text-sm leading-relaxed text-fog/90">
              {spedSpotlight.teachTruth}
            </p>
            <Link
              href={`/reality#${spedSpotlight.slug}`}
              className="mt-5 inline-block text-sm font-semibold text-blank underline-offset-4 hover:underline"
            >
              Read the special education spotlight →
            </Link>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
