import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/ui";
import {
  childLedger,
  dualLedger,
  teacherLedger,
} from "@/lib/reality";

export function DualLedgerSection() {
  return (
    <Section id="the-reality" tone="light" className="py-20 md:py-28">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-steel">
          {dualLedger.eyebrow}
        </p>
        <h2 className="mt-3 max-w-3xl font-display text-3xl font-extrabold tracking-tight text-balance md:text-5xl">
          {dualLedger.title}
        </h2>
        <p className="answer-lead mt-5 max-w-2xl text-base leading-relaxed text-charcoal md:text-lg">
          {dualLedger.lead}
        </p>
      </Reveal>

      <div className="mt-12 grid gap-4 lg:grid-cols-2">
        <Reveal className="rounded-2xl bg-press p-6 text-blank md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate">
            What teachers carry
          </p>
          <ul className="mt-6 space-y-0">
            {teacherLedger.map((item, i) => (
              <li
                key={item.title}
                className={`border-t border-white/15 py-5 ${
                  i === teacherLedger.length - 1 ? "border-b" : ""
                }`}
              >
                <p className="font-display text-lg font-bold tracking-tight md:text-xl">
                  {item.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-fog/80">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={1} className="rounded-2xl bg-blank p-6 text-press ring-1 ring-ash md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-steel">
            What children carry
          </p>
          <ul className="mt-6 space-y-0">
            {childLedger.map((item, i) => (
              <li
                key={item.title}
                className={`border-t border-ash py-5 ${
                  i === childLedger.length - 1 ? "border-b" : ""
                }`}
              >
                <p className="font-display text-lg font-bold tracking-tight md:text-xl">
                  {item.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-charcoal">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <Reveal delay={2} className="mt-10 flex flex-wrap items-center gap-4">
        <Link href="/reality" className="btn-primary">
          See the full classroom reality
        </Link>
        <Link
          href="/#the-plan"
          className="text-sm font-semibold text-press underline-offset-4 hover:underline"
        >
          Jump to the plan →
        </Link>
      </Reveal>
    </Section>
  );
}
