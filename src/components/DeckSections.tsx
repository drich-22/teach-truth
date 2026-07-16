import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/ui";
import {
  councils,
  einsteinQuote,
  helpClose,
  nationalChanges,
  ruthDreams,
  topReasons,
  whereWeBegin,
} from "@/lib/ruth-deck";

export function WhereWeBeginSection() {
  return (
    <Section id="where-we-begin" tone="light" className="py-20 md:py-28">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-steel">
          {whereWeBegin.eyebrow}
        </p>
        <h2 className="mt-3 max-w-3xl font-display text-3xl font-extrabold tracking-tight text-balance md:text-5xl">
          {whereWeBegin.title}
        </h2>
        <p className="answer-lead mt-5 max-w-3xl text-base leading-relaxed text-charcoal md:text-lg">
          {whereWeBegin.answer}
        </p>
      </Reveal>
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {whereWeBegin.points.map((point, i) => (
          <Reveal
            key={point.title}
            delay={(Math.min(i + 1, 3) as 1 | 2 | 3)}
            className="rounded-2xl bg-blank p-6 ring-1 ring-ash md:p-8"
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
  );
}

export function TopReasonsSection() {
  return (
    <Section id="top-reasons" tone="dark" className="py-20 md:py-28">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate">
          Ruth Lerno&apos;s opinion
        </p>
        <h2 className="mt-3 max-w-3xl font-display text-3xl font-extrabold tracking-tight text-balance md:text-5xl">
          The top three reasons for the decline of public education
        </h2>
      </Reveal>
      <ol className="mt-12 space-y-0">
        {topReasons.map((reason, index) => (
          <Reveal
            key={reason.title}
            as="li"
            delay={(Math.min(index, 3) as 0 | 1 | 2 | 3)}
            className={`border-t border-white/15 py-8 ${
              index === topReasons.length - 1 ? "border-b" : ""
            }`}
          >
            <div className="grid gap-4 md:grid-cols-[88px_1fr] md:gap-10">
              <span className="font-display text-3xl font-extrabold text-slate">
                {reason.number}
              </span>
              <div>
                <h3 className="font-display text-2xl font-extrabold tracking-tight md:text-3xl">
                  {reason.title}
                </h3>
                <p className="mt-3 max-w-3xl text-base leading-relaxed text-fog/85">
                  {reason.body}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

export function EinsteinBand() {
  return (
    <Section tone="light" className="py-16 md:py-20">
      <Reveal className="mx-auto max-w-3xl text-center">
        <blockquote className="font-display text-2xl font-bold tracking-tight text-balance md:text-4xl">
          &ldquo;{einsteinQuote.text}&rdquo;
        </blockquote>
        <p className="mt-5 text-sm text-steel">— {einsteinQuote.attribution}</p>
      </Reveal>
    </Section>
  );
}

export function CouncilsSection() {
  return (
    <Section id="councils" tone="dark" className="py-20 md:py-28">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate">
          {councils.eyebrow}
        </p>
        <h2 className="mt-3 max-w-3xl font-display text-3xl font-extrabold tracking-tight text-balance md:text-5xl">
          {councils.title}
        </h2>
        <p className="answer-lead mt-5 max-w-2xl text-base leading-relaxed text-fog/85 md:text-lg">
          {councils.answer}
        </p>
      </Reveal>
      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {councils.tiers.map((tier, i) => (
          <Reveal
            key={tier.label}
            delay={(Math.min(i + 1, 3) as 1 | 2 | 3)}
            className="rounded-2xl bg-blank p-6 text-press md:p-8"
          >
            <p className="font-display text-4xl font-extrabold tracking-tight md:text-5xl">
              {tier.count}
            </p>
            <p className="mt-3 text-sm font-semibold leading-snug">{tier.label}</p>
          </Reveal>
        ))}
      </div>
      <Reveal delay={2}>
        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-slate md:text-base">
          {councils.fullCouncilNote}
        </p>
      </Reveal>
    </Section>
  );
}

export function NationalChangesSection() {
  return (
    <Section id="national-changes" tone="light" className="py-20 md:py-28">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-steel">
          Changes across the nation
        </p>
        <h2 className="mt-3 max-w-3xl font-display text-3xl font-extrabold tracking-tight text-balance md:text-5xl">
          Five national shifts Ruth is fighting for
        </h2>
      </Reveal>
      <ol className="mt-12 space-y-0">
        {nationalChanges.map((item, index) => (
          <Reveal
            key={item.title}
            as="li"
            className={`border-t border-ash py-8 ${
              index === nationalChanges.length - 1 ? "border-b" : ""
            }`}
          >
            <div className="grid gap-4 md:grid-cols-[72px_1fr] md:gap-8">
              <span className="font-display text-2xl font-extrabold text-steel">
                {item.number}
              </span>
              <div>
                <h3 className="font-display text-xl font-extrabold tracking-tight md:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-charcoal md:text-base">
                  {item.body}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

export function RuthDreamsSection() {
  return (
    <Section id="ruths-dream" tone="dark" className="py-20 md:py-28">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate">
          Ruth&apos;s dream
        </p>
        <h2 className="mt-3 max-w-3xl font-display text-3xl font-extrabold tracking-tight text-balance md:text-5xl">
          From mastery to life skills — the full proposal
        </h2>
        <p className="answer-lead mt-5 max-w-2xl text-base leading-relaxed text-fog/85 md:text-lg">
          Teaching for mastery. Limited technology until age 10. Accessible
          national curriculum. Stop over-testing. More recess. Fair pay. SPED
          that meets kids where they are. These are not slogans — they are
          design choices.
        </p>
      </Reveal>
      <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {ruthDreams.map((dream, i) => (
          <Reveal
            key={dream.title}
            delay={(Math.min((i % 4) + 1, 4) as 1 | 2 | 3 | 4)}
            className="rounded-2xl bg-blank/5 p-5 ring-1 ring-white/10 md:p-6"
          >
            <p className="text-xs font-semibold text-slate">{dream.number}</p>
            <h3 className="mt-2 font-display text-lg font-bold tracking-tight">
              {dream.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-fog/80">
              {dream.body}
            </p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function HelpCloseSection() {
  return (
    <Section tone="light" className="py-20 md:py-28">
      <Reveal className="max-w-3xl">
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-balance md:text-5xl">
          {helpClose.title}
        </h2>
        <p className="answer-lead mt-5 text-base leading-relaxed text-charcoal md:text-lg">
          {helpClose.body}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/join" className="btn-primary">
            Take the wheel
          </Link>
          <Link href="/reality" className="btn-secondary">
            See classroom reality
          </Link>
          <Link href="/ruth" className="btn-secondary">
            Meet Ruth
          </Link>
        </div>
      </Reveal>
    </Section>
  );
}
