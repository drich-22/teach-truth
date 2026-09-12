"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ReviewPasswordGate } from "@/components/review/ReviewPasswordGate";
import {
  groupNotesByPage,
  isReviewUnlocked,
  loadNotes,
  saveNotes,
  type ReviewNote,
} from "@/lib/review-surface";
import "@/components/review/review-widget.css";

type Tab = "pending" | "completed";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function ReviewEditsPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [notes, setNotes] = useState<ReviewNote[]>([]);
  const [tab, setTab] = useState<Tab>("pending");
  const [commentDraft, setCommentDraft] = useState<Record<string, string>>({});

  useEffect(() => {
    setUnlocked(isReviewUnlocked());
    setNotes(loadNotes());
  }, []);

  const refresh = () => setNotes(loadNotes());

  const filtered = useMemo(
    () => notes.filter((n) => (tab === "pending" ? n.status === "pending" : n.status === "completed")),
    [notes, tab]
  );

  const pendingCount = notes.filter((n) => n.status === "pending").length;
  const completedCount = notes.filter((n) => n.status === "completed").length;

  const removeNote = (id: string) => {
    const updated = notes.filter((n) => n.id !== id);
    setNotes(updated);
    saveNotes(updated);
  };

  const markComplete = (id: string) => {
    const updated = notes.map((n) =>
      n.id === id ? { ...n, status: "completed" as const, completedAt: new Date().toISOString() } : n
    );
    setNotes(updated);
    saveNotes(updated);
  };

  const reopen = (id: string) => {
    const updated = notes.map((n) =>
      n.id === id ? { ...n, status: "pending" as const, completedAt: undefined } : n
    );
    setNotes(updated);
    saveNotes(updated);
  };

  const addComment = (id: string) => {
    const text = commentDraft[id]?.trim();
    if (!text) return;
    const updated = notes.map((n) =>
      n.id === id
        ? {
            ...n,
            followUpComments: [...(n.followUpComments ?? []), { text, createdAt: new Date().toISOString() }],
          }
        : n
    );
    setNotes(updated);
    saveNotes(updated);
    setCommentDraft((prev) => ({ ...prev, [id]: "" }));
  };

  if (!unlocked) {
    return (
      <div className="cr-page">
        <div className="cr-page-inner">
          <ReviewPasswordGate onUnlock={() => { setUnlocked(true); refresh(); }} />
        </div>
      </div>
    );
  }

  const grouped = groupNotesByPage(filtered);
  const pages = Object.keys(grouped).sort();

  return (
    <div className="cr-page">
      <div className="cr-page-inner">
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "1rem", marginBottom: "1.5rem" }}>
          <div>
            <p className="cr-muted" style={{ textTransform: "uppercase", letterSpacing: "0.12em", fontSize: "0.65rem" }}>
              Staging review
            </p>
            <h1 className="cr-title" style={{ fontSize: "1.75rem", marginTop: "0.35rem" }}>Your edits</h1>
            <p className="cr-muted" style={{ marginTop: "0.35rem" }}>
              Pending edits stay active until marked complete after we implement them.
            </p>
          </div>
          <Link href="/" className="cr-btn cr-btn-outline" style={{ textDecoration: "none", alignSelf: "flex-start" }}>
            Back to site
          </Link>
        </div>

        <div className="cr-tabs">
          <button type="button" className={`cr-tab${tab === "pending" ? " cr-tab-active" : ""}`} onClick={() => setTab("pending")}>
            Pending ({pendingCount})
          </button>
          <button type="button" className={`cr-tab${tab === "completed" ? " cr-tab-active" : ""}`} onClick={() => setTab("completed")}>
            Completed ({completedCount})
          </button>
        </div>

        {filtered.length === 0 ? (
          <div className="cr-card" style={{ borderStyle: "dashed", textAlign: "center", padding: "2.5rem" }}>
            <p className="cr-muted">
              {tab === "pending"
                ? "No pending edits — use the ✎ bubble on any page to add notes and pictures."
                : "No completed edits yet."}
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {pages.map((page) => (
              <section key={page}>
                <h2 className="cr-title" style={{ fontSize: "1rem", marginBottom: "0.75rem", paddingBottom: "0.5rem", borderBottom: "1px solid #e5e7eb" }}>
                  {page === "/" ? "Home" : page}
                </h2>
                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {grouped[page].map((n) => (
                    <li key={n.id} className="cr-card">
                      <div style={{ display: "flex", justifyContent: "space-between", gap: "0.75rem" }}>
                        <div style={{ minWidth: 0 }}>
                          <p className="cr-title" style={{ fontSize: "0.8125rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{n.label}</p>
                          <p className="cr-muted" style={{ fontSize: "0.625rem", marginTop: "0.15rem" }}>{formatDate(n.createdAt)}</p>
                        </div>
                        <div style={{ display: "flex", flexShrink: 0, gap: "0.35rem" }}>
                          {n.status === "pending" ? (
                            <button type="button" onClick={() => markComplete(n.id)} className="cr-btn cr-btn-primary" style={{ fontSize: "0.65rem", padding: "0.35rem 0.5rem" }}>
                              Mark complete
                            </button>
                          ) : (
                            <button type="button" onClick={() => reopen(n.id)} className="cr-btn cr-btn-outline" style={{ fontSize: "0.65rem", padding: "0.35rem 0.5rem" }}>
                              Reopen
                            </button>
                          )}
                          <button type="button" onClick={() => removeNote(n.id)} className="cr-btn cr-btn-outline" style={{ fontSize: "0.65rem", padding: "0.35rem 0.5rem", color: "#dc2626" }}>
                            Remove
                          </button>
                        </div>
                      </div>

                      {n.note && <p className="cr-muted" style={{ marginTop: "0.75rem", color: "#374151" }}>{n.note}</p>}

                      {n.image && (
                        <div className="cr-preview" style={{ marginTop: "0.75rem" }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={n.image} alt={`Reference for ${n.label}`} />
                        </div>
                      )}

                      {(n.followUpComments ?? []).length > 0 && (
                        <ul className="cr-instructions" style={{ marginTop: "0.75rem" }}>
                          {(n.followUpComments ?? []).map((c) => (
                            <li key={c.createdAt + c.text.slice(0, 8)}>
                              <strong style={{ fontWeight: 600 }}>{formatDate(c.createdAt)}:</strong> {c.text}
                            </li>
                          ))}
                        </ul>
                      )}

                      {n.status === "pending" && (
                        <div style={{ marginTop: "0.75rem", display: "flex", gap: "0.5rem" }}>
                          <input
                            type="text"
                            value={commentDraft[n.id] ?? ""}
                            onChange={(e) => setCommentDraft((prev) => ({ ...prev, [n.id]: e.target.value }))}
                            placeholder="Add another comment…"
                            className="cr-input"
                            style={{ flex: 1 }}
                            onKeyDown={(e) => e.key === "Enter" && addComment(n.id)}
                          />
                          <button type="button" onClick={() => addComment(n.id)} className="cr-btn cr-btn-outline">
                            Add
                          </button>
                        </div>
                      )}

                      <p className="cr-muted" style={{ marginTop: "0.5rem", fontFamily: "ui-monospace, monospace", fontSize: "0.625rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {n.selector}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
