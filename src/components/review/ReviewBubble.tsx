"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  REVIEW_INSTRUCTIONS,
  checkReviewPassword,
  compressReviewImage,
  describeElement,
  isReviewUnlocked,
  loadNotes,
  saveNotes,
  setReviewUnlocked,
  type ReviewNote,
} from "@/lib/review-surface";
import "./review-widget.css";

export function ReviewBubble() {
  const pathname = usePathname();
  const fileRef = useRef<HTMLInputElement>(null);
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [picking, setPicking] = useState(false);
  const [draft, setDraft] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [target, setTarget] = useState<{ selector: string; label: string } | null>(null);
  const [pendingCount, setPendingCount] = useState(0);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setUnlocked(isReviewUnlocked());
    setPendingCount(loadNotes().filter((n) => n.status === "pending").length);
  }, [open]);

  useEffect(() => {
    if (!picking) return;
    let hovered: Element | null = null;

    const onMove = (e: MouseEvent) => {
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (!el || el.closest("[data-review-ui]")) return;
      if (hovered && hovered !== el) hovered.removeAttribute("data-review-hover");
      hovered = el;
      el.setAttribute("data-review-hover", "true");
    };

    const onClick = (e: MouseEvent) => {
      const el = e.target as Element;
      if (el.closest("[data-review-ui]")) return;
      e.preventDefault();
      e.stopPropagation();
      setTarget(describeElement(el));
      setPicking(false);
      document.querySelectorAll("[data-review-hover]").forEach((n) => n.removeAttribute("data-review-hover"));
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("click", onClick, true);
      document.querySelectorAll("[data-review-hover]").forEach((n) => n.removeAttribute("data-review-hover"));
    };
  }, [picking]);

  const unlock = () => {
    if (checkReviewPassword(password)) {
      setReviewUnlocked(true);
      setUnlocked(true);
      setError("");
    } else {
      setError("Incorrect password");
    }
  };

  const onImagePick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file");
      return;
    }
    setSaving(true);
    setError("");
    try {
      setImagePreview(await compressReviewImage(file));
    } catch {
      setError("Could not load that image — try another file");
    } finally {
      setSaving(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const addNote = () => {
    if (!target || (!draft.trim() && !imagePreview)) return;
    const next: ReviewNote = {
      id: crypto.randomUUID(),
      selector: target.selector,
      label: target.label,
      note: draft.trim(),
      page: pathname,
      createdAt: new Date().toISOString(),
      status: "pending",
      followUpComments: [],
      ...(imagePreview ? { image: imagePreview } : {}),
    };
    const updated = [next, ...loadNotes()];
    saveNotes(updated);
    setPendingCount(updated.filter((n) => n.status === "pending").length);
    setDraft("");
    setTarget(null);
    setImagePreview(null);
  };

  return (
    <div data-review-ui className="cr-root">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="cr-fab"
        aria-label="Client review"
      >
        <span aria-hidden="true">✎</span>
        {pendingCount > 0 && <span className="cr-badge">{pendingCount}</span>}
      </button>

      {open && (
        <div className="cr-panel">
          {!unlocked ? (
            <div className="space-y-3" style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <p className="cr-title">Client review</p>
              <p className="cr-muted">Enter the review password to add edits on this staging site.</p>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Review password"
                className="cr-input"
                onKeyDown={(e) => e.key === "Enter" && unlock()}
              />
              {error && <p className="cr-error">{error}</p>}
              <button type="button" onClick={unlock} className="cr-btn cr-btn-primary" style={{ width: "100%" }}>
                Unlock
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p className="cr-title">Add an edit</p>
                <button type="button" onClick={() => setOpen(false)} className="cr-muted" style={{ border: "none", background: "none", cursor: "pointer" }}>
                  Close
                </button>
              </div>

              <ul className="cr-instructions">
                {REVIEW_INSTRUCTIONS.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>

              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button
                  type="button"
                  onClick={() => {
                    setPicking(true);
                    setTarget(null);
                    setImagePreview(null);
                  }}
                  className="cr-btn cr-btn-outline"
                  style={{ flex: 1 }}
                >
                  {picking ? "Click an element…" : "Pick spot"}
                </button>
                <Link href="/review-edits" className="cr-btn cr-btn-primary" style={{ flex: 1, textDecoration: "none" }} onClick={() => setOpen(false)}>
                  View edits
                </Link>
              </div>

              {target && (
                <div className="cr-target" style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <p className="cr-title" style={{ fontSize: "0.75rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {target.label}
                  </p>
                  <textarea
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder="What should change here? Be specific about text, placement, and images."
                    className="cr-textarea"
                  />
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onImagePick} style={{ display: "none" }} />
                  <button type="button" onClick={() => fileRef.current?.click()} disabled={saving} className="cr-btn cr-btn-outline" style={{ width: "100%" }}>
                    {saving ? "Processing…" : imagePreview ? "Change picture" : "Add picture"}
                  </button>
                  {imagePreview && (
                    <div className="cr-preview">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={imagePreview} alt="Reference upload" />
                      <button type="button" onClick={() => setImagePreview(null)} className="cr-btn cr-btn-outline" style={{ marginTop: "0.5rem", width: "100%" }}>
                        Remove picture
                      </button>
                    </div>
                  )}
                  {error && <p className="cr-error">{error}</p>}
                  <button type="button" onClick={addNote} disabled={!draft.trim() && !imagePreview} className="cr-btn cr-btn-primary" style={{ width: "100%" }}>
                    Save edit
                  </button>
                </div>
              )}

              {!target && (
                <p className="cr-muted">Pick a spot on the page, then describe the change and optionally add a reference image.</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
