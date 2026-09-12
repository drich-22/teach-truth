"use client";

import { useState } from "react";
import { checkReviewPassword, setReviewUnlocked } from "@/lib/review-surface";
import "./review-widget.css";

type Props = {
  onUnlock: () => void;
  title?: string;
};

export function ReviewPasswordGate({ onUnlock, title = "Client review" }: Props) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const unlock = () => {
    if (checkReviewPassword(password)) {
      setReviewUnlocked(true);
      setError("");
      onUnlock();
    } else {
      setError("Incorrect password");
    }
  };

  return (
    <div className="cr-card" style={{ maxWidth: "28rem", margin: "0 auto" }}>
      <p className="cr-title" style={{ fontSize: "1.125rem" }}>{title}</p>
      <p className="cr-muted" style={{ marginTop: "0.5rem" }}>
        Enter the review password to view, add, or update edits.
      </p>
      <div style={{ marginTop: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
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
    </div>
  );
}
