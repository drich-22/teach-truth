import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { DualLedgerSection } from "@/components/DualLedgerSection";
import { Reveal } from "@/components/Reveal";
import { SpedHomeInterrupt } from "@/components/SpedHomeInterrupt";
import { TakeTheWheelForm } from "@/components/TakeTheWheelForm";
import { UnitedStatesOutline } from "@/components/UnitedStatesOutline";
import { JsonLd, Section } from "@/components/ui";
import { faqs, pillars, problemPoints } from "@/lib/content";
import { homeGraph } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site";
import { actionOptions } from "@/lib/take-action";
import { mission, vision } from "@/lib/vision";

export const metadata: Metadata = {
  title: "Education Reform — Teachers Take the Wheel",
  description:
    "Teach Truth’s classroom-led plan to reform American public education: teachers take the wheel, bring teachers back, end testing theater, put every child first, and protect truth without fear.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Education Reform — Teachers Take the Wheel | Teach Truth",
    description:
      "A classroom-led reform plan for America’s children — led by teacher Ruth Lerno.",
    url: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={homeGraph()} />

      <section className="relative isolate min-h-[92vh] overflow-hidden bg-press text-blank">
        <Image
          src={siteConfig.founder.image}
          alt={`${siteConfig.founder.name}, host of ${siteConfig.podcast.name}`}
          fill
          priority
          className="hero-ken object-cover object-[72%_center] opacity-55 md:object-[78%_center]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/25" />
        <div className="relative mx-auto flex min-h-[92vh] max-w-[1200px] flex-col justify-end px-5 pb-16 pt-28 md:justify-center md:px-8 md:pb-24 md:pt-20">
          <p className="reveal font-display text-4xl font-extrabold tracking-tight text-balance sm:text-5xl md:text-7xl lg:text-[5.5rem] lg:leading-[0.95]">
            {siteConfig.name}
          </p>
          <h1 className="reveal reveal-delay-1 mt-5 max-w-3xl font-display text-2xl font-bold tracking-tight text-balance sm:text-3xl md:text-5xl md:leading-[1.08]">
            Teachers take the wheel. Children get a system that finally serves
            them.
          </h1>
          <p className="reveal reveal-delay-2 answer-lead mt-5 max-w-xl text-base leading-relaxed text-fog/90 md:text-lg">
            Public education will not be fixed from a boardroom.{" "}
            {siteConfig.founder.name} — {siteConfig.founder.yearsInClassroom}{" "}
            years in the classroom — is building classroom-led reform so
            teachers return, learning returns, and America&apos;s kids win.
          </p>
          <div className="reveal reveal-delay-3 mt-8 flex flex-wrap gap-3">
            <Link href="#the-plan" className="btn-on-dark">
              Read the plan
            </Link>
            <Link href="/reality" className="btn-ghost-on-dark">
              See the reality
            </Link>
            <Link href="/join" className="btn-ghost-on-dark">
              Take action
            </Link>
          </div>
        </div>
      </section>

      <Section tone="light" className="py-16 md:py-20">
        <Reveal className="key-takeaways max-w-3xl">
          <h2 className="font-display text-2xl font-extrabold tracking-tight md:text-3xl">
            What is classroom-led education reform?
          </h2>
          <p className="answer-lead mt-4 text-lg leading-relaxed text-charcoal">
            Classroom-led education reform puts teachers in charge of
            instruction, rebuilds conditions so educators stay, reduces testing
            theater, protects every child beyond a score, and makes it safe for
            teachers to tell the truth about what schools need.
          </p>
        </Reveal>
      </Section>

      <Section tone="dark" className="py-20 md:py-28">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate">
            The break
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-3xl font-extrabold tracking-tight text-balance md:text-5xl">
            Stand in a classroom right now and the crisis is obvious.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {problemPoints.map((point, i) => (
            <Reveal
              key={point.title}
              delay={(Math.min(i + 1, 3) as 1 | 2 | 3)}
              className="rounded-2xl bg-blank p-8 text-press"
            >
              <h3 className="font-display text-xl font-bold tracking-tight">
                {point.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-charcoal">
                {point.body}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      <DualLedgerSection />

      <Section id="vision" tone="dark" className="py-20 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate">
                Vision &amp; mission
              </p>
              <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-balance md:text-5xl">
                This is bigger than one classroom.
              </h2>
              <p className="answer-lead mt-5 text-base leading-relaxed text-fog/85 md:text-lg">
                Teach Truth is a national call — for America&apos;s teachers,
                America&apos;s children, and a public system that finally puts
                both first.
              </p>
            </Reveal>

            <div className="mt-10 space-y-8">
              <Reveal delay={1}>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate">
                  {vision.title}
                </p>
                <p className="mt-3 font-display text-xl font-bold leading-snug tracking-tight text-balance text-blank md:text-2xl">
                  {vision.statement}
                </p>
              </Reveal>
              <Reveal delay={2}>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate">
                  {mission.title}
                </p>
                <p className="mt-3 text-base leading-relaxed text-fog/85 md:text-lg">
                  {mission.statement}
                </p>
              </Reveal>
            </div>
          </div>

          <Reveal delay={1} className="relative">
            <div className="rounded-2xl bg-blank/5 px-4 py-8 ring-1 ring-white/10 md:px-8 md:py-10">
              <UnitedStatesOutline className="mx-auto max-w-xl" tone="paper" />
              <p className="mt-6 text-center font-display text-lg font-bold tracking-tight text-blank md:text-xl">
                Every state. Every child. One truth.
              </p>
              <p className="mx-auto mt-2 max-w-sm text-center text-sm leading-relaxed text-slate">
                Classroom-led reform isn&apos;t a local side project. It&apos;s
                how America rebuilds public education from the inside out.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section id="the-plan" tone="light" className="py-20 md:py-28">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-steel">
            The plan
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-3xl font-extrabold tracking-tight text-balance md:text-5xl">
            Five pillars for a system children deserve.
          </h2>
          <p className="answer-lead mt-5 max-w-2xl text-base leading-relaxed text-charcoal md:text-lg">
            The Teach Truth plan is built from the classroom out: teacher
            judgment, teacher retention, real learning, whole-child dignity, and
            protected truth-telling. These are the stakes for America&apos;s
            teachers and America&apos;s children.
          </p>
        </Reveal>

        <ol className="mt-14 space-y-0">
          {pillars.map((pillar, index) => (
            <Reveal
              key={pillar.slug}
              as="li"
              id={`pillar-${pillar.slug}`}
              className={`border-t border-ash py-10 md:py-12 ${
                index === pillars.length - 1 ? "border-b" : ""
              }`}
            >
              <div className="grid gap-6 md:grid-cols-[88px_1fr] md:gap-10">
                <span
                  className="font-display text-3xl font-extrabold text-steel md:text-4xl"
                  aria-hidden
                >
                  {pillar.number}
                </span>
                <div>
                  <h3 className="font-display text-2xl font-extrabold tracking-tight md:text-3xl">
                    {pillar.title}
                  </h3>
                  <p className="answer-lead mt-4 max-w-3xl text-base leading-relaxed text-charcoal md:text-lg">
                    {pillar.answer}
                  </p>
                  <p className="mt-4 max-w-3xl text-sm leading-relaxed text-steel md:text-base">
                    {pillar.body}
                  </p>
                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <p className="text-sm leading-relaxed">
                      <span className="font-semibold text-press">
                        For children:{" "}
                      </span>
                      <span className="text-charcoal">{pillar.forChildren}</span>
                    </p>
                    <p className="text-sm leading-relaxed">
                      <span className="font-semibold text-press">
                        For teachers:{" "}
                      </span>
                      <span className="text-charcoal">{pillar.forTeachers}</span>
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* NCLB — manifesto interrupt */}
      <section
        id="no-child-left-behind"
        className="overflow-hidden bg-press text-blank"
        aria-labelledby="nclb-heading"
      >
        <div className="mx-auto max-w-[1200px] px-5 py-20 md:px-8 md:py-28">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate">
              A promise that aged badly
            </p>
            <p
              id="nclb-heading"
              className="mt-6 font-display text-[clamp(2.4rem,9vw,6.5rem)] font-extrabold leading-[0.92] tracking-tight text-balance"
            >
              <span className="relative inline text-fog/35 line-through decoration-evidence decoration-[0.06em] underline-offset-[0.12em]">
                No Child Left Behind
              </span>
            </p>
            <p className="mt-4 font-display text-[clamp(1.75rem,5vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight text-balance md:max-w-4xl">
              The words promised children.
              <br className="hidden sm:block" />
              The system counted scores.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-10 border-t border-white/15 pt-10 md:grid-cols-[1.2fr_0.8fr] md:gap-16">
            <Reveal delay={1}>
              <p className="answer-lead max-w-2xl text-base leading-relaxed text-fog/85 md:text-lg">
                &ldquo;No Child Left Behind&rdquo; was meant to be a vow. In
                today&apos;s classrooms it feels like a museum plaque — still
                spoken, rarely believed. What started as a promise about kids
                hardened into pacing guides, practice tests, and dashboards.
                The slogan stayed. The child got harder to see.
              </p>
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-slate md:text-base">
                Ruth has lived that shift: instruction crowded out by proving,
                special education squeezed by accountability theater, teachers
                punished for telling the truth about what kids actually need.
                If that old promise no longer fits the country we&apos;re
                raising children in, the answer isn&apos;t louder testing — it&apos;s
                putting teachers back at the wheel.
              </p>
            </Reveal>
            <Reveal delay={2}>
              <aside className="rounded-2xl bg-evidence px-6 py-8 md:px-8">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blank/80">
                  The quiet rewrite
                </p>
                <p className="mt-4 font-display text-xl font-bold leading-snug tracking-tight text-blank md:text-2xl">
                  No child left behind
                  <br />
                  became
                  <br />
                  no score left uncounted.
                </p>
                <p className="mt-5 text-sm leading-relaxed text-blank/85">
                  And somehow, after all that counting, we still lost them —
                  their curiosity, their childhood, their teachers who walked
                  away.
                </p>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>

      <SpedHomeInterrupt />

      <Section tone="dark" className="py-16 md:py-20">
        <div className="grid gap-8 md:grid-cols-[1fr_1.2fr] md:items-end">
          <Reveal className="reveal-from-left">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate">
              From the classroom
            </p>
            <blockquote className="mt-4 font-display text-2xl font-bold tracking-tight text-balance md:text-4xl">
              &ldquo;I think teachers need to take the wheel. I know how to
              improve grades and get teachers to come back to the
              classroom.&rdquo;
            </blockquote>
            <p className="mt-4 text-sm text-slate">
              — {siteConfig.founder.name}, {siteConfig.podcast.name}
            </p>
          </Reveal>
          <Reveal delay={2} className="reveal-from-right rounded-2xl bg-evidence px-6 py-8 md:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blank/80">
              Why this matters now
            </p>
            <p className="mt-3 text-lg font-semibold leading-snug text-blank md:text-xl">
              When experienced teachers leave, children lose continuity,
              expertise, and advocates. Reform that does not bring teachers back
              fails children first.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section tone="light" className="py-20 md:py-28">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <Reveal className="reveal-from-left relative aspect-[4/5] overflow-hidden rounded-2xl bg-press md:aspect-square">
            <Image
              src={siteConfig.founder.image}
              alt={`${siteConfig.founder.name} — Teach Truth visionary`}
              fill
              className="object-cover object-[70%_center]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </Reveal>
          <Reveal delay={1} className="reveal-from-right">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-steel">
              Who leads
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight md:text-5xl">
              {siteConfig.founder.name}
            </h2>
            <p className="answer-lead mt-5 text-base leading-relaxed text-charcoal md:text-lg">
              Ruth Lerno is a {siteConfig.founder.yearsInClassroom}-year teacher
              and the host of {siteConfig.podcast.name}. She is building Teach
              Truth so public education reform starts with people who still
              stand in front of children every day.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/ruth" className="btn-primary">
                Meet the visionary
              </Link>
              <a
                href={siteConfig.podcast.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Teacher Truth with Ruth
              </a>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section id="listen" tone="dark" className="py-20 md:py-28">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate">
            Listen
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight md:text-5xl">
            {siteConfig.podcast.name}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-fog/85 md:text-lg">
            A platform for teachers to tell their truth — because silence
            protects broken systems, and truth is how we build a better one for
            every child.
          </p>
        </Reveal>
        <Reveal delay={1} className="mt-10 overflow-hidden rounded-2xl bg-blank/5 ring-1 ring-white/10">
          <iframe
            title={`${siteConfig.podcast.name} on Spotify`}
            src={siteConfig.podcast.spotifyEmbed}
            width="100%"
            height="352"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="w-full"
          />
        </Reveal>
      </Section>

      <Section id="take-action" tone="dark" className="py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-14">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate">
              Take the wheel
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-balance md:text-5xl">
              Feeling fired up isn&apos;t the same as doing something.
            </h2>
            <p className="answer-lead mt-5 text-base leading-relaxed text-fog/85 md:text-lg">
              Commit to one action this week — tell your truth, share the plan,
              invite a colleague, speak up locally, or stand with a teacher.
              We&apos;ll give you a checklist so the energy turns into motion.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-fog/75">
              {actionOptions.map((item) => (
                <li key={item.id} className="flex gap-3">
                  <span className="text-slate" aria-hidden>
                    →
                  </span>
                  <span>
                    <span className="font-semibold text-blank">
                      {item.title}.
                    </span>{" "}
                    {item.summary}
                  </span>
                </li>
              ))}
            </ul>
            <Link
              href="/join"
              className="mt-8 inline-block text-sm font-semibold text-blank underline-offset-4 hover:underline"
            >
              Open the full action page →
            </Link>
          </Reveal>
          <Reveal delay={1}>
            <TakeTheWheelForm />
          </Reveal>
        </div>
      </Section>

      <Section id="faq" tone="light" className="faq-section py-20 md:py-28">
        <Reveal>
          <h2 className="font-display text-3xl font-extrabold tracking-tight md:text-5xl">
            Questions people ask
          </h2>
        </Reveal>
        <div className="mt-12 divide-y divide-ash border-y border-ash">
          {faqs.map((faq, i) => (
            <Reveal
              key={faq.question}
              delay={(Math.min(i % 4, 3) as 0 | 1 | 2 | 3)}
              as="details"
              className="group py-6"
            >
              <summary className="cursor-pointer list-none font-display text-lg font-bold tracking-tight md:text-xl [&::-webkit-details-marker]:hidden">
                <span className="flex items-start justify-between gap-4">
                  {faq.question}
                  <span
                    aria-hidden
                    className="mt-1 text-steel transition group-open:rotate-45"
                  >
                    +
                  </span>
                </span>
              </summary>
              <p className="answer-lead mt-4 max-w-3xl text-base leading-relaxed text-charcoal">
                {faq.answer}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="dark" className="py-20 md:py-28">
        <Reveal className="max-w-3xl">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-balance md:text-5xl">
            If you care about children, the next conversation starts here.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-fog/85 md:text-lg">
            Share the plan. Listen to the podcast. Bring a colleague. Reform
            scales when teachers stop whispering alone.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/join" className="btn-on-dark">
              Take the wheel
            </Link>
            <Link href="/reality" className="btn-ghost-on-dark">
              See the reality
            </Link>
            <Link href="/ruth" className="btn-ghost-on-dark">
              Meet Ruth
            </Link>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
