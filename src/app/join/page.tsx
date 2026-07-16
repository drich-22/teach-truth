import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { TakeTheWheelForm } from "@/components/TakeTheWheelForm";
import { JsonLd, Section } from "@/components/ui";
import { actionOptions } from "@/lib/take-action";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Take the Wheel — Commit to One Action",
  description:
    "Take the wheel with Teach Truth: choose one concrete education-reform action this week — tell your truth, share the plan, invite a colleague, speak up locally, or stand with a teacher.",
  alternates: { canonical: "/join" },
  openGraph: {
    title: "Take the Wheel — Commit to One Action | Teach Truth",
    description:
      "Motivation without a next step fades. Lock in one classroom-led reform action for this week.",
    url: "/join",
  },
};

const joinGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/join#webpage`,
      url: `${siteConfig.url}/join`,
      name: "Take the Wheel — Commit to One Action",
      description:
        "A commitment form for classroom-led education reform actions: tell your truth, share the plan, invite a colleague, speak up locally, or stand with a teacher.",
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: [".answer-lead", ".key-takeaways"],
      },
    },
    {
      "@type": "HowTo",
      name: "How to take action for classroom-led education reform",
      description:
        "Choose your role, pick one weekly action, and follow the checklist from Teach Truth.",
      step: actionOptions.map((action, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        name: action.title,
        text: `${action.summary} Pledge: ${action.pledge}`,
        url: `${siteConfig.url}/join`,
      })),
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
          name: "Take the Wheel",
          item: `${siteConfig.url}/join`,
        },
      ],
    },
  ],
};

export default function JoinPage() {
  return (
    <>
      <JsonLd data={joinGraph} />

      <section className="bg-press text-blank">
        <div className="mx-auto max-w-[1200px] px-5 py-20 md:px-8 md:py-28">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate">
              Take action
            </p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-extrabold tracking-tight text-balance md:text-6xl md:leading-[1.02]">
              More dreams to come… this is where she needs your help.
            </h1>
            <p className="answer-lead mt-5 max-w-2xl text-base leading-relaxed text-fog/85 md:text-lg">
              Ruth&apos;s Save USA Public Education plan is a starting map —
              not a finished product. Take the Wheel is a weekly commitment:
              one action that advances teacher-driven reform. Start from the{" "}
              <Link
                href="/reality"
                className="font-semibold text-blank underline underline-offset-4"
              >
                classroom reality
              </Link>
              , pick your move, lock it in, and follow the checklist.
            </p>
          </Reveal>
        </div>
      </section>

      <Section tone="light" className="py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal className="key-takeaways">
            <h2 className="font-display text-2xl font-extrabold tracking-tight md:text-3xl">
              What is “Take the Wheel”?
            </h2>
            <p className="answer-lead mt-4 text-base leading-relaxed text-charcoal md:text-lg">
              Take the Wheel is Teach Truth&apos;s action pledge: choose who you
              are, commit to one concrete reform move this week, and get a
              short checklist so the commitment turns into behavior — not just
              another like or share.
            </p>
            <ul className="mt-8 space-y-4">
              {actionOptions.map((action) => (
                <li key={action.id} className="border-t border-ash pt-4">
                  <p className="font-display text-lg font-bold tracking-tight">
                    {action.title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-steel">
                    {action.summary}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-steel">
              Prefer to read first?{" "}
              <Link href="/reality" className="font-semibold text-press underline-offset-2 hover:underline">
                See classroom reality
              </Link>
              ,{" "}
              <Link href="/#the-plan" className="font-semibold text-press underline-offset-2 hover:underline">
                the five pillars
              </Link>
              ,{" "}
              <Link href="/#ruths-dream" className="font-semibold text-press underline-offset-2 hover:underline">
                Ruth&apos;s dream
              </Link>
              , or{" "}
              <Link href="/ruth" className="font-semibold text-press underline-offset-2 hover:underline">
                meet Ruth
              </Link>
              .
            </p>
          </Reveal>

          <Reveal delay={1}>
            <TakeTheWheelForm />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
