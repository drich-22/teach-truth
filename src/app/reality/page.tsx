import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { JsonLd, Section } from "@/components/ui";
import {
  dualLedger,
  realityCards,
  spedSpotlight,
} from "@/lib/reality";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Classroom Reality — What Teachers and Children Face",
  description:
    "The real pressures on America’s teachers and children: burnout, behavior, time poverty, understaffing, absenteeism, mental health, attention, and special education’s broken funding promise — and what Teach Truth says next.",
  alternates: { canonical: "/reality" },
  openGraph: {
    title: "The Classroom Reality | Teach Truth",
    description: dualLedger.lead,
    url: "/reality",
  },
};

const realityGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/reality#webpage`,
      url: `${siteConfig.url}/reality`,
      name: "The Classroom Reality — What Teachers and Children Face",
      description:
        "Evidence-framed overview of problems teachers and children face in U.S. public schools, connected to Teach Truth’s reform plan.",
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: [".answer-lead", ".key-takeaways", ".faq-section"],
      },
      dateModified: new Date().toISOString().slice(0, 10),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteConfig.url,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Classroom Reality",
          item: `${siteConfig.url}/reality`,
        },
      ],
    },
    {
      "@type": "ItemList",
      name: "Classroom reality themes",
      itemListElement: [
        ...realityCards.map((card, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: card.title,
          url: `${siteConfig.url}/reality#${card.slug}`,
        })),
        {
          "@type": "ListItem",
          position: realityCards.length + 1,
          name: spedSpotlight.title,
          url: `${siteConfig.url}/reality#${spedSpotlight.slug}`,
        },
      ],
    },
  ],
};

export default function RealityPage() {
  return (
    <>
      <JsonLd data={realityGraph} />

      <section className="bg-press text-blank">
        <div className="mx-auto max-w-[1200px] px-5 py-20 md:px-8 md:py-28">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate">
              Classroom reality
            </p>
            <h1 className="mt-3 max-w-4xl font-display text-4xl font-extrabold tracking-tight text-balance md:text-6xl md:leading-[1.02]">
              What teachers carry. What children carry.
            </h1>
            <p className="answer-lead key-takeaways mt-5 max-w-2xl text-base leading-relaxed text-fog/85 md:text-lg">
              {dualLedger.lead} This page names the pressures with evidence —
              then points back to Teach Truth&apos;s plan and actions, because
              diagnosis without direction is just another report.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/#the-plan" className="btn-on-dark">
                See the plan
              </Link>
              <Link href="/join" className="btn-ghost-on-dark">
                Take the wheel
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Section tone="light" className="py-16 md:py-24">
        <ol className="space-y-0">
          {realityCards.map((card, index) => (
            <Reveal
              key={card.slug}
              as="li"
              id={card.slug}
              className={`border-t border-ash py-12 md:py-14 ${
                index === realityCards.length - 1 ? "" : ""
              }`}
            >
              <div className="grid gap-6 md:grid-cols-[88px_1fr] md:gap-10">
                <span
                  className="font-display text-3xl font-extrabold text-steel md:text-4xl"
                  aria-hidden
                >
                  {card.number}
                </span>
                <div>
                  <h2 className="font-display text-2xl font-extrabold tracking-tight text-balance md:text-3xl">
                    {card.title}
                  </h2>
                  <p className="answer-lead mt-4 max-w-3xl text-base leading-relaxed text-charcoal md:text-lg">
                    {card.answer}
                  </p>
                  <div className="mt-8 grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl bg-press p-5 text-blank md:p-6">
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate">
                        For teachers
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-fog/85">
                        {card.teacher}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-fog p-5 ring-1 ring-ash md:p-6">
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-steel">
                        For children
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-charcoal">
                        {card.child}
                      </p>
                    </div>
                  </div>
                  <p className="mt-6 max-w-3xl text-sm leading-relaxed text-charcoal md:text-base">
                    <span className="font-semibold text-press">
                      What Teach Truth says:{" "}
                    </span>
                    {card.teachTruth}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold">
                    <Link
                      href={card.pillarHref}
                      className="text-press underline-offset-4 hover:underline"
                    >
                      Related pillar →
                    </Link>
                    <Link
                      href={card.actionHref}
                      className="text-press underline-offset-4 hover:underline"
                    >
                      Take action →
                    </Link>
                  </div>
                  <p className="mt-4 text-xs text-steel">{card.sourceNote}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      <section
        id={spedSpotlight.slug}
        className="bg-press text-blank"
        aria-labelledby="sped-heading"
      >
        <div className="mx-auto max-w-[1200px] px-5 py-20 md:px-8 md:py-28">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate">
              {spedSpotlight.eyebrow}
            </p>
            <h2
              id="sped-heading"
              className="mt-3 max-w-4xl font-display text-3xl font-extrabold tracking-tight text-balance md:text-5xl"
            >
              {spedSpotlight.title}
            </h2>
            <p className="answer-lead mt-5 max-w-3xl text-base leading-relaxed text-fog/85 md:text-lg">
              {spedSpotlight.answer}
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <Reveal delay={1}>
              <p className="max-w-2xl text-sm leading-relaxed text-fog/80 md:text-base">
                {spedSpotlight.body}
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-blank/5 p-5 ring-1 ring-white/10">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate">
                    For teachers
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-fog/85">
                    {spedSpotlight.teacher}
                  </p>
                </div>
                <div className="rounded-2xl bg-blank/5 p-5 ring-1 ring-white/10">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate">
                    For children
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-fog/85">
                    {spedSpotlight.child}
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={2}>
              <aside className="rounded-2xl bg-evidence px-6 py-8 md:px-8">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blank/80">
                  What Teach Truth says
                </p>
                <p className="mt-4 font-display text-xl font-bold leading-snug tracking-tight text-blank md:text-2xl">
                  {spedSpotlight.teachTruth}
                </p>
                <Link
                  href={spedSpotlight.pillarHref}
                  className="mt-6 inline-block text-sm font-semibold text-blank underline-offset-4 hover:underline"
                >
                  Read Every child, not every score →
                </Link>
                <p className="mt-6 text-xs text-blank/70">
                  {spedSpotlight.sourceNote}
                </p>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>

      <Section tone="light" className="py-20 md:py-28">
        <Reveal className="max-w-3xl">
          <h2 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">
            Naming it isn&apos;t enough. Steering is.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-charcoal md:text-lg">
            If this page sounds like your school, you&apos;re not imagining it.
            Use the plan as shared language — then take one action this week.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/#the-plan" className="btn-primary">
              The five pillars
            </Link>
            <Link href="/join" className="btn-secondary">
              Take the wheel
            </Link>
            <Link href="/ruth" className="btn-secondary">
              Meet Ruth
            </Link>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
