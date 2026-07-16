"use client";

import Link from "next/link";
import { useMemo, useState, useTransition } from "react";
import { submitPledge } from "@/app/actions/pledge";
import {
  type ActionId,
  type RoleId,
  actionOptions,
  getAction,
  roles,
} from "@/lib/take-action";
import { siteConfig } from "@/lib/site";

type Step = 1 | 2 | 3 | 4;

export function TakeTheWheelForm({ compact = false }: { compact?: boolean }) {
  const [step, setStep] = useState<Step>(1);
  const [role, setRole] = useState<RoleId | null>(null);
  const [action, setAction] = useState<ActionId | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    pledge: string;
    nextSteps: string[];
    actionId: ActionId;
  } | null>(null);
  const [pending, startTransition] = useTransition();
  const [copied, setCopied] = useState(false);

  const progress = useMemo(() => {
    if (step === 4) return 100;
    return ((step - 1) / 3) * 100;
  }, [step]);

  function goNext() {
    setError(null);
    if (step === 1 && !role) {
      setError("Pick the role that fits you best.");
      return;
    }
    if (step === 2 && !action) {
      setError("Choose one action for this week.");
      return;
    }
    setStep((s) => (s < 4 ? ((s + 1) as Step) : s));
  }

  function goBack() {
    setError(null);
    setStep((s) => (s > 1 ? ((s - 1) as Step) : s));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!role || !action) return;
    setError(null);
    startTransition(async () => {
      const res = await submitPledge({ role, action, name, email, note });
      if (!res.ok) {
        setError(res.error);
        return;
      }
      setResult({
        pledge: res.pledge,
        nextSteps: res.nextSteps,
        actionId: res.actionId,
      });
      setStep(4);
    });
  }

  async function copyPlanLink() {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/#the-plan`,
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className={compact ? "" : "rounded-2xl bg-blank text-press"}>
      <div className={compact ? "" : "p-6 md:p-10"}>
        <div className="mb-8">
          <div className="flex items-center justify-between gap-4 text-xs font-semibold uppercase tracking-[0.14em] text-steel">
            <span>Take the wheel</span>
            <span>{step < 4 ? `Step ${step} of 3` : "You’re in"}</span>
          </div>
          <div className="mt-3 h-1 overflow-hidden rounded-full bg-ash">
            <div
              className="h-full bg-press transition-[width] duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {step === 1 && (
          <div className="animate-step">
            <h3 className="font-display text-2xl font-extrabold tracking-tight md:text-3xl">
              Who’s taking the wheel?
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-charcoal md:text-base">
              Reform isn’t abstract. Start from where you stand — then commit to
              one concrete move this week.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {roles.map((item) => {
                const selected = role === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setRole(item.id)}
                    className={`rounded-2xl border px-5 py-5 text-left transition ${
                      selected
                        ? "border-press bg-press text-blank"
                        : "border-ash bg-fog hover:border-press"
                    }`}
                  >
                    <span className="font-display text-lg font-bold tracking-tight">
                      {item.label}
                    </span>
                    <span
                      className={`mt-2 block text-sm leading-relaxed ${
                        selected ? "text-fog/80" : "text-steel"
                      }`}
                    >
                      {item.blurb}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-step">
            <h3 className="font-display text-2xl font-extrabold tracking-tight md:text-3xl">
              What will you do this week?
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-charcoal md:text-base">
              Pick one action. Motivation sticks when it’s specific — not when
              it’s a vague “support education.”
            </p>
            <div className="mt-8 grid gap-3">
              {actionOptions.map((item) => {
                const selected = action === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setAction(item.id)}
                    className={`rounded-2xl border px-5 py-5 text-left transition ${
                      selected
                        ? "border-press bg-press text-blank"
                        : "border-ash bg-fog hover:border-press"
                    }`}
                  >
                    <span className="font-display text-lg font-bold tracking-tight">
                      {item.title}
                    </span>
                    <span
                      className={`mt-2 block text-sm leading-relaxed ${
                        selected ? "text-fog/80" : "text-steel"
                      }`}
                    >
                      {item.summary}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 3 && action && (
          <form onSubmit={onSubmit} className="animate-step">
            <h3 className="font-display text-2xl font-extrabold tracking-tight md:text-3xl">
              Make it real
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-charcoal md:text-base">
              You’re committing to:{" "}
              <span className="font-semibold text-press">
                {getAction(action).pledge}
              </span>
            </p>

            <div className="mt-8 grid gap-5">
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-steel">
                  Name <span className="normal-case tracking-normal">(optional)</span>
                </span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="field mt-2"
                  autoComplete="name"
                  placeholder="First name or full name"
                />
              </label>
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-steel">
                  Email
                </span>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="field mt-2"
                  autoComplete="email"
                  placeholder="you@example.com"
                />
              </label>
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-steel">
                  Note / story{" "}
                  <span className="normal-case tracking-normal">(optional)</span>
                </span>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="field mt-2 min-h-[120px] resize-y"
                  placeholder={
                    action === "tell-truth"
                      ? "What’s happening in your classroom or school that kids need adults to hear?"
                      : "Anything you want Ruth’s team to know about your commitment…"
                  }
                />
              </label>
            </div>

            {error && (
              <p className="mt-4 text-sm font-medium text-evidence" role="alert">
                {error}
              </p>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              <button type="button" onClick={goBack} className="btn-secondary">
                Back
              </button>
              <button type="submit" className="btn-primary" disabled={pending}>
                {pending ? "Locking it in…" : "Commit to this week"}
              </button>
            </div>
          </form>
        )}

        {step === 4 && result && (
          <div className="animate-step">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-steel">
              Commitment locked
            </p>
            <h3 className="mt-3 font-display text-2xl font-extrabold tracking-tight md:text-4xl">
              {result.pledge}
            </h3>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-charcoal md:text-base">
              Motivation fades. A checklist doesn’t. Here’s how you follow
              through in the next seven days:
            </p>
            <ol className="mt-8 space-y-4">
              {result.nextSteps.map((stepText, i) => (
                <li
                  key={stepText}
                  className="flex gap-4 border-t border-ash pt-4 first:border-t-0 first:pt-0"
                >
                  <span className="font-display text-xl font-extrabold text-steel">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm leading-relaxed text-charcoal md:text-base">
                    {stepText}
                  </span>
                </li>
              ))}
            </ol>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={siteConfig.podcast.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Listen on Spotify
              </a>
              <button type="button" onClick={copyPlanLink} className="btn-secondary">
                {copied ? "Plan link copied" : "Copy plan link"}
              </button>
              <Link href="/#the-plan" className="btn-secondary">
                Revisit the pillars
              </Link>
            </div>
          </div>
        )}

        {step < 3 && (
          <div className="mt-8 flex flex-wrap gap-3">
            {step > 1 && (
              <button type="button" onClick={goBack} className="btn-secondary">
                Back
              </button>
            )}
            <button type="button" onClick={goNext} className="btn-primary">
              Continue
            </button>
          </div>
        )}

        {step < 4 && error && step !== 3 && (
          <p className="mt-4 text-sm font-medium text-evidence" role="alert">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
