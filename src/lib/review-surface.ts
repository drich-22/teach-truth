/**
 * Client review bubble — staging-only edit capture (localStorage).
 * Configure via env: NEXT_PUBLIC_REVIEW_PASSWORD, NEXT_PUBLIC_LIVE_HOSTS,
 * NEXT_PUBLIC_REVIEW_STORAGE_KEY, NEXT_PUBLIC_CLIENT_REVIEW.
 */

export type ReviewNoteStatus = "pending" | "completed";

export type ReviewFollowUp = {
  text: string;
  createdAt: string;
};

export type ReviewNote = {
  id: string;
  selector: string;
  label: string;
  note: string;
  page: string;
  createdAt: string;
  status: ReviewNoteStatus;
  completedAt?: string;
  image?: string;
  followUpComments?: ReviewFollowUp[];
};

const DEFAULT_STORAGE = "client-review-notes-v1";
const UNLOCK_KEY = "client-review-unlocked-v1";

export function getStorageKey(): string {
  return process.env.NEXT_PUBLIC_REVIEW_STORAGE_KEY ?? DEFAULT_STORAGE;
}

export function shouldShowReviewBubble(): boolean {
  if (typeof window === "undefined") return false;

  const forced = process.env.NEXT_PUBLIC_CLIENT_REVIEW;
  if (forced === "0") return false;

  const liveHosts = parseLiveHosts();
  const host = window.location.hostname;
  if (liveHosts.some((h) => host === h || host.endsWith(`.${h}`))) return false;

  if (forced === "1") return true;
  if (host === "localhost" || host === "127.0.0.1" || host.endsWith(".vercel.app")) return true;

  return false;
}

export function parseLiveHosts(): string[] {
  return (process.env.NEXT_PUBLIC_LIVE_HOSTS ?? "")
    .split(",")
    .map((h) => h.trim().toLowerCase())
    .filter(Boolean);
}

export function getReviewPassword(): string {
  return process.env.NEXT_PUBLIC_REVIEW_PASSWORD ?? "client-review-24!";
}

export function isReviewUnlocked(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(UNLOCK_KEY) === "1";
}

export function setReviewUnlocked(unlocked: boolean) {
  if (typeof window === "undefined") return;
  if (unlocked) sessionStorage.setItem(UNLOCK_KEY, "1");
  else sessionStorage.removeItem(UNLOCK_KEY);
}

export function checkReviewPassword(password: string): boolean {
  return password === getReviewPassword();
}

function normalizeNote(raw: Partial<ReviewNote>): ReviewNote | null {
  if (!raw.id || !raw.page || !raw.createdAt) return null;
  return {
    id: raw.id,
    selector: raw.selector ?? "",
    label: raw.label ?? "Element",
    note: raw.note ?? "",
    page: raw.page,
    createdAt: raw.createdAt,
    status: raw.status === "completed" ? "completed" : "pending",
    completedAt: raw.completedAt,
    image: raw.image,
    followUpComments: Array.isArray(raw.followUpComments) ? raw.followUpComments : [],
  };
}

export function loadNotes(): ReviewNote[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(getStorageKey());
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Partial<ReviewNote>[];
    if (!Array.isArray(parsed)) return [];
    return parsed.map(normalizeNote).filter((n): n is ReviewNote => n != null);
  } catch {
    return [];
  }
}

export function saveNotes(notes: ReviewNote[]) {
  localStorage.setItem(getStorageKey(), JSON.stringify(notes));
}

export function groupNotesByPage(notes: ReviewNote[]): Record<string, ReviewNote[]> {
  return notes.reduce<Record<string, ReviewNote[]>>((acc, n) => {
    (acc[n.page] ??= []).push(n);
    return acc;
  }, {});
}

export function describeElement(el: Element): { selector: string; label: string } {
  const tag = el.tagName.toLowerCase();
  const id = el.id ? `#${el.id}` : "";
  const cls =
    el instanceof HTMLElement && el.className && typeof el.className === "string"
      ? `.${el.className.split(/\s+/).slice(0, 2).join(".")}`
      : "";
  const text =
    el.textContent?.trim().slice(0, 48) ||
    el.getAttribute("aria-label") ||
    el.getAttribute("alt") ||
    tag;

  return { selector: `${tag}${id}${cls}`, label: text };
}

export async function compressReviewImage(file: File): Promise<string> {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = url;
    });

    const maxDim = 1200;
    let { width, height } = img;
    if (width > maxDim || height > maxDim) {
      const scale = maxDim / Math.max(width, height);
      width = Math.round(width * scale);
      height = Math.round(height * scale);
    }

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas unavailable");
    ctx.drawImage(img, 0, 0, width, height);
    return canvas.toDataURL("image/jpeg", 0.82);
  } finally {
    URL.revokeObjectURL(url);
  }
}

export const REVIEW_INSTRUCTIONS = [
  "Be specific: say exactly what should change (wording, colors, spacing).",
  "Describe placement: above, below, left of, or replace this image/block.",
  "Upload a reference photo when you have one — it helps us match your vision.",
  "One focused edit per note works best; add more notes for separate changes.",
] as const;
