"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FormEvent,
} from "react";
import { usePathname } from "next/navigation";
import {
  isClientReviewSurface,
  REVIEW_PASSWORD,
  REVIEW_STORAGE_KEY,
  REVIEW_UNLOCK_KEY,
} from "@/lib/review-surface";

type ReviewNote = {
  id: string;
  createdAt: string;
  route: string;
  selector: string;
  tag: string;
  text: string;
  note: string;
};

function cssPath(el: Element): string {
  if (el.id) return `#${CSS.escape(el.id)}`;
  const parts: string[] = [];
  let node: Element | null = el;
  while (node && node.nodeType === 1 && parts.length < 5) {
    const tag = node.tagName.toLowerCase();
    const parent: Element | null = node.parentElement;
    if (!parent) {
      parts.unshift(tag);
      break;
    }
    const siblings = [...parent.children].filter((c) => c.tagName === node!.tagName);
    const index = siblings.indexOf(node) + 1;
    const cls =
      typeof node.className === "string" && node.className.trim()
        ? `.${node.className
            .trim()
            .split(/\s+/)
            .slice(0, 2)
            .map((c) => CSS.escape(c))
            .join(".")}`
        : "";
    parts.unshift(
      siblings.length > 1 ? `${tag}${cls}:nth-of-type(${index})` : `${tag}${cls}`,
    );
    node = parent;
    if (tag === "body" || tag === "html") break;
  }
  return parts.join(" > ");
}

function loadNotes(): ReviewNote[] {
  try {
    const raw = localStorage.getItem(REVIEW_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ReviewNote[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveNotes(notes: ReviewNote[]) {
  localStorage.setItem(REVIEW_STORAGE_KEY, JSON.stringify(notes));
}

export function ReviewBubble() {
  const pathname = usePathname();
  const [surface, setSurface] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [gateOpen, setGateOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [gateError, setGateError] = useState(false);
  const [inspecting, setInspecting] = useState(false);
  const [hoverEl, setHoverEl] = useState<Element | null>(null);
  const [draft, setDraft] = useState<{
    selector: string;
    tag: string;
    text: string;
  } | null>(null);
  const [noteText, setNoteText] = useState("");
  const [notes, setNotes] = useState<ReviewNote[]>([]);
  const [copied, setCopied] = useState(false);
  const [tab, setTab] = useState<"add" | "review">("add");

  useEffect(() => {
    const on = isClientReviewSurface(window.location.hostname);
    setSurface(on);
    if (!on) return;
    setUnlocked(sessionStorage.getItem(REVIEW_UNLOCK_KEY) === "1");
    setNotes(loadNotes());
  }, []);

  useEffect(() => {
    if (!inspecting) {
      setHoverEl(null);
      return;
    }

    const onMove = (e: MouseEvent) => {
      const t = e.target;
      if (!(t instanceof Element)) return;
      if (t.closest("[data-client-review-ui]")) return;
      setHoverEl(t);
    };

    const onClick = (e: MouseEvent) => {
      const t = e.target;
      if (!(t instanceof Element)) return;
      if (t.closest("[data-client-review-ui]")) return;
      e.preventDefault();
      e.stopPropagation();
      const text = (t.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 160);
      setDraft({
        selector: cssPath(t),
        tag: t.tagName.toLowerCase(),
        text,
      });
      setNoteText("");
      setInspecting(false);
      setTab("add");
      setPanelOpen(true);
    };

    document.addEventListener("mousemove", onMove, true);
    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("mousemove", onMove, true);
      document.removeEventListener("click", onClick, true);
    };
  }, [inspecting]);

  const hoverBox = useMemo(() => {
    if (!hoverEl || !(hoverEl instanceof HTMLElement)) return null;
    const r = hoverEl.getBoundingClientRect();
    return { top: r.top, left: r.left, width: r.width, height: r.height };
  }, [hoverEl]);

  const tryUnlock = (e: FormEvent) => {
    e.preventDefault();
    if (password.trim() === REVIEW_PASSWORD) {
      sessionStorage.setItem(REVIEW_UNLOCK_KEY, "1");
      setUnlocked(true);
      setGateOpen(false);
      setGateError(false);
      setPassword("");
      setPanelOpen(true);
      return;
    }
    setGateError(true);
  };

  const lock = () => {
    sessionStorage.removeItem(REVIEW_UNLOCK_KEY);
    setUnlocked(false);
    setPanelOpen(false);
    setInspecting(false);
    setDraft(null);
  };

  const addNote = useCallback(() => {
    if (!draft || !noteText.trim()) return;
    const next: ReviewNote = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      route: pathname,
      selector: draft.selector,
      tag: draft.tag,
      text: draft.text,
      note: noteText.trim(),
    };
    const merged = [next, ...loadNotes()];
    saveNotes(merged);
    setNotes(merged);
    setDraft(null);
    setNoteText("");
    setTab("review");
  }, [draft, noteText, pathname]);

  const removeNote = (id: string) => {
    const merged = loadNotes().filter((n) => n.id !== id);
    saveNotes(merged);
    setNotes(merged);
  };

  const clearNotes = () => {
    saveNotes([]);
    setNotes([]);
  };

  const copyForCursor = async () => {
    const body =
      notes.length === 0
        ? "No review notes yet."
        : notes
            .map(
              (n, i) =>
                `${i + 1}. [${n.route}] <${n.tag}> ${n.selector}\n   Visible: "${n.text}"\n   Fix: ${n.note}`,
            )
            .join("\n\n");
    const prompt = `Teach Truth client review notes (fix these):\n\n${body}`;
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  if (!surface) return null;

  return (
    <div data-client-review-ui className="pointer-events-none fixed inset-0 z-[80]">
      {inspecting && hoverBox ? (
        <div
          className="pointer-events-none fixed border-2 border-evidence bg-evidence/10"
          style={{
            top: hoverBox.top,
            left: hoverBox.left,
            width: hoverBox.width,
            height: hoverBox.height,
          }}
        />
      ) : null}

      <div className="pointer-events-auto fixed bottom-5 right-4 flex flex-col items-end gap-2 sm:bottom-6 sm:right-6">
        {inspecting ? (
          <p className="max-w-[11rem] rounded-lg bg-press px-2.5 py-1.5 text-[10px] font-medium text-blank shadow-lg">
            Click any element to leave a note
          </p>
        ) : null}

        <button
          type="button"
          aria-label={unlocked ? "Open client review" : "Unlock client review"}
          aria-expanded={panelOpen || gateOpen}
          onClick={() => {
            if (!unlocked) {
              setGateOpen((v) => !v);
              setPanelOpen(false);
              return;
            }
            setPanelOpen((v) => !v);
            setGateOpen(false);
          }}
          className={`relative flex size-12 items-center justify-center rounded-full bg-press text-blank shadow-lg ring-2 ring-blank/20 transition hover:opacity-90 ${
            inspecting ? "ring-evidence ring-offset-2 ring-offset-fog" : ""
          }`}
        >
          <span className="font-display text-lg font-extrabold" aria-hidden>
            ✎
          </span>
          {unlocked && notes.length > 0 ? (
            <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-evidence text-[10px] font-bold text-blank">
              {notes.length > 9 ? "9+" : notes.length}
            </span>
          ) : null}
        </button>
      </div>

      {gateOpen && !unlocked ? (
        <div className="pointer-events-auto fixed bottom-20 right-4 z-[81] w-[min(100vw-2rem,18rem)] rounded-2xl border border-ash bg-blank p-4 shadow-xl sm:right-6">
          <p className="font-display text-sm font-bold tracking-tight">Client review</p>
          <p className="mt-1 text-[11px] leading-relaxed text-steel">
            Staging only. Enter the review password to mark edits.
          </p>
          <form onSubmit={tryUnlock} className="mt-3 space-y-2">
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setGateError(false);
              }}
              placeholder="Password"
              autoComplete="current-password"
              className="w-full rounded-lg border border-ash bg-fog px-3 py-2 text-sm outline-none focus:border-press"
            />
            {gateError ? (
              <p className="text-[11px] font-medium text-evidence">Wrong password</p>
            ) : null}
            <button type="submit" className="btn-primary w-full py-2 text-sm">
              Unlock
            </button>
          </form>
        </div>
      ) : null}

      {panelOpen && unlocked ? (
        <div className="pointer-events-auto fixed bottom-20 right-4 z-[81] w-[min(100vw-2rem,22rem)] rounded-2xl border border-ash bg-blank p-3 shadow-xl sm:right-6">
          <div className="mb-2 flex items-center justify-between gap-2">
            <p className="font-display text-sm font-bold tracking-tight">Review notes</p>
            <button
              type="button"
              aria-label="Close review panel"
              className="flex size-8 items-center justify-center rounded-lg text-steel hover:bg-fog hover:text-press"
              onClick={() => {
                setPanelOpen(false);
                setInspecting(false);
                setDraft(null);
              }}
            >
              ×
            </button>
          </div>

          <div className="mb-3 flex gap-1 rounded-lg bg-fog p-1">
            <button
              type="button"
              className={`flex-1 rounded-md px-2 py-1.5 text-xs font-semibold ${
                tab === "add" ? "bg-blank text-press shadow-sm" : "text-steel"
              }`}
              onClick={() => setTab("add")}
            >
              Add note
            </button>
            <button
              type="button"
              className={`flex-1 rounded-md px-2 py-1.5 text-xs font-semibold ${
                tab === "review" ? "bg-blank text-press shadow-sm" : "text-steel"
              }`}
              onClick={() => setTab("review")}
            >
              Your edits ({notes.length})
            </button>
          </div>

          {tab === "add" ? (
            <>
              {draft ? (
                <div className="mb-3 space-y-2 rounded-xl border border-ash bg-fog/60 p-2.5">
                  <p className="break-all font-mono text-[10px] text-steel">
                    {draft.selector}
                  </p>
                  {draft.text ? (
                    <p className="line-clamp-2 text-xs text-charcoal">
                      &ldquo;{draft.text}&rdquo;
                    </p>
                  ) : null}
                  <textarea
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder="What’s wrong or what should change…"
                    rows={3}
                    className="w-full resize-none rounded-lg border border-ash bg-blank px-3 py-2 text-sm outline-none focus:border-press"
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="btn-primary py-2 text-xs"
                      onClick={addNote}
                      disabled={!noteText.trim()}
                    >
                      Save note
                    </button>
                    <button
                      type="button"
                      className="rounded-lg px-3 py-2 text-xs font-semibold text-steel hover:bg-fog"
                      onClick={() => {
                        setDraft(null);
                        setNoteText("");
                      }}
                    >
                      Discard
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  className={`mb-3 flex w-full items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-semibold transition ${
                    inspecting
                      ? "border-evidence bg-evidence/5 text-evidence"
                      : "border-ash bg-fog text-press hover:border-press"
                  }`}
                  onClick={() => setInspecting((v) => !v)}
                >
                  {inspecting ? "Cancel pick" : "Pick an element"}
                </button>
              )}
              <p className="text-[10px] leading-relaxed text-steel">
                Notes stay in this browser until you copy them for Damien.
              </p>
            </>
          ) : (
            <>
              <div className="mb-2 flex flex-wrap gap-2">
                <button
                  type="button"
                  className="rounded-lg bg-press px-2.5 py-1.5 text-[11px] font-semibold text-blank disabled:opacity-40"
                  onClick={() => void copyForCursor()}
                  disabled={notes.length === 0}
                >
                  {copied ? "Copied" : "Copy for Cursor"}
                </button>
                <button
                  type="button"
                  className="rounded-lg px-2.5 py-1.5 text-[11px] font-semibold text-evidence hover:bg-fog disabled:opacity-40"
                  onClick={clearNotes}
                  disabled={notes.length === 0}
                >
                  Clear all
                </button>
                <button
                  type="button"
                  className="rounded-lg px-2.5 py-1.5 text-[11px] font-semibold text-steel hover:bg-fog"
                  onClick={lock}
                >
                  Lock
                </button>
              </div>
              <ul className="max-h-52 space-y-2 overflow-y-auto text-xs">
                {notes.length === 0 ? (
                  <li className="py-4 text-center text-steel">No notes yet.</li>
                ) : (
                  notes.map((n) => (
                    <li
                      key={n.id}
                      className="rounded-xl border border-ash px-2.5 py-2"
                    >
                      <p className="font-semibold text-press">{n.note}</p>
                      <p className="mt-0.5 text-[10px] text-steel">
                        {n.route} · &lt;{n.tag}&gt;
                      </p>
                      {n.text ? (
                        <p className="mt-1 line-clamp-2 text-[10px] text-charcoal/80">
                          &ldquo;{n.text}&rdquo;
                        </p>
                      ) : null}
                      <button
                        type="button"
                        className="mt-1.5 text-[10px] font-semibold text-steel hover:text-evidence"
                        onClick={() => removeNote(n.id)}
                      >
                        Remove
                      </button>
                    </li>
                  ))
                )}
              </ul>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
}
