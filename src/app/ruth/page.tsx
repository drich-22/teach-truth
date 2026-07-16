import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { JsonLd, Section } from "@/components/ui";
import { pillars } from "@/lib/content";
import { ruthGraph } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Ruth Lerno — Meet the Visionary",
  description:
    "Meet Ruth Lerno: 25-year classroom teacher, host of Teacher Truth with Ruth, and the visionary behind Teach Truth’s classroom-led education reform plan.",
  alternates: { canonical: "/ruth" },
  openGraph: {
    title: "Ruth Lerno — Meet the Visionary | Teach Truth",
    description:
      "A teacher with 25 years in the classroom, on a mission to save public education.",
    url: "/ruth",
  },
};

const beliefs = [
  "We cannot solve education’s problems with the same thinking that created them.",
  "Slow down. Teach for mastery. Stop pushing kids forward with unfinished learning.",
  "Educators and specialists — not distant data culture — should write the national framework.",
  "More dreams to come… this is where Ruth needs your help.",
];

export default function RuthPage() {
  return (
    <>
      <JsonLd data={ruthGraph()} />

      <section className="relative isolate min-h-[88vh] overflow-hidden bg-press text-blank">
        <Image
          src={siteConfig.founder.image}
          alt={`${siteConfig.founder.name}, teacher and education reform visionary`}
          fill
          priority
          className="hero-ken object-cover object-[75%_center] opacity-60"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/30" />
        <div className="relative mx-auto flex min-h-[88vh] max-w-[1200px] flex-col justify-end px-5 pb-16 pt-28 md:px-8 md:pb-24">
          <p className="reveal text-xs font-semibold uppercase tracking-[0.18em] text-fog/80">
            Meet the visionary
          </p>
          <h1 className="reveal reveal-delay-1 mt-3 font-display text-5xl font-extrabold tracking-tight text-balance sm:text-6xl md:text-8xl md:leading-[0.95]">
            {siteConfig.founder.name}
          </h1>
          <p className="reveal reveal-delay-2 answer-lead mt-5 max-w-2xl text-base leading-relaxed text-fog/90 md:text-xl">
            Teacher. Host of {siteConfig.podcast.name}.{" "}
            {siteConfig.founder.yearsInClassroom} years in America&apos;s
            classrooms — now building {siteConfig.name} so public education
            reform starts with the people who still show up for children.
          </p>
          <div className="reveal reveal-delay-3 mt-8 flex flex-wrap gap-3">
            <Link href="/#the-plan" className="btn-on-dark">
              See her plan
            </Link>
            <a
              href={siteConfig.podcast.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost-on-dark"
            >
              Listen to Teacher Truth
            </a>
          </div>
        </div>
      </section>

      <Section tone="light" className="py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
          <Reveal className="reveal-from-left">
            <h2 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">
              Why Ruth
            </h2>
            <p className="answer-lead mt-5 text-lg leading-relaxed text-charcoal">
              Ruth Lerno is not a consultant inventing reform from outside the
              building. She is a classroom teacher who has lived the unintended
              consequences of testing regimes, watched wonderful educators walk
              away, and refused to accept that America&apos;s children must
              inherit a broken system.
            </p>
            <p className="mt-5 text-base leading-relaxed text-steel">
              Through {siteConfig.podcast.name}, she gives teachers a place to
              speak without fear — because the truth will set education free,
              and silence never will.
            </p>
          </Reveal>
          <Reveal
            delay={1}
            as="aside"
            className="reveal-from-right rounded-2xl bg-press p-8 text-blank md:p-10"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate">
              At a glance
            </p>
            <dl className="mt-6 space-y-5">
              <div>
                <dt className="text-sm text-slate">Classroom experience</dt>
                <dd className="mt-1 font-display text-3xl font-extrabold">
                  {siteConfig.founder.yearsInClassroom} years
                </dd>
              </div>
              <div>
                <dt className="text-sm text-slate">Platform</dt>
                <dd className="mt-1 text-lg font-semibold">
                  {siteConfig.podcast.name}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-slate">Mission</dt>
                <dd className="mt-1 text-lg font-semibold leading-snug">
                  Save public education for America&apos;s children
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </Section>

      <Section tone="dark" className="py-20 md:py-28">
        <Reveal>
          <h2 className="font-display text-3xl font-extrabold tracking-tight md:text-5xl">
            What she believes
          </h2>
        </Reveal>
        <ul className="mt-12 space-y-0">
          {beliefs.map((belief, index) => (
            <Reveal
              key={belief}
              as="li"
              delay={(Math.min(index, 3) as 0 | 1 | 2 | 3)}
              className={`border-t border-white/15 py-8 ${
                index === beliefs.length - 1 ? "border-b" : ""
              }`}
            >
              <p className="max-w-3xl font-display text-xl font-bold tracking-tight text-balance md:text-3xl">
                {belief}
              </p>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section tone="light" className="py-20 md:py-28">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <Reveal className="reveal-from-left">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-steel">
              The work
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight md:text-4xl">
              From podcast truth to a reform plan
            </h2>
            <p className="answer-lead mt-5 text-base leading-relaxed text-charcoal md:text-lg">
              Teach Truth carries Ruth&apos;s Save USA Public Education plan:
              slow down for mastery, teacher-driven councils, skill not just
              age, a free teacher pipeline with real pay, and whole-child
              reform from recess to life skills.
            </p>
            <Link href="/#the-plan" className="btn-primary mt-8">
              Read the five pillars
            </Link>
            <div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold">
              <Link
                href="/#councils"
                className="text-press underline-offset-4 hover:underline"
              >
                See the councils →
              </Link>
              <Link
                href="/#ruths-dream"
                className="text-press underline-offset-4 hover:underline"
              >
                Ruth&apos;s full dream →
              </Link>
            </div>
          </Reveal>
          <ul className="space-y-3">
            {pillars.map((pillar, i) => (
              <Reveal
                key={pillar.slug}
                as="li"
                delay={(Math.min(i, 4) as 0 | 1 | 2 | 3 | 4)}
              >
                <Link
                  href={`/#pillar-${pillar.slug}`}
                  className="flex items-center justify-between gap-4 rounded-2xl bg-blank px-5 py-4 ring-1 ring-ash transition hover:ring-press"
                >
                  <span className="font-semibold tracking-tight">
                    <span className="mr-3 text-steel">{pillar.number}</span>
                    {pillar.title}
                  </span>
                  <span aria-hidden className="text-steel">
                    →
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="dark" className="py-20 md:py-28">
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-3xl font-extrabold tracking-tight md:text-5xl">
            Teachers: she sees you.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-fog/85 md:text-lg">
            If you are exhausted, undervalued, or afraid to speak — this is your
            invitation. Listen. Share your story. Help build the system children
            deserve.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={siteConfig.podcast.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-on-dark"
            >
              Listen on Spotify
            </a>
            <Link href="/" className="btn-ghost-on-dark">
              Back to reform
            </Link>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
