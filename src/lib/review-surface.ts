/**
 * Client review surface detection.
 * Show the review bubble on staging / Preview / local — never on live domains.
 */

const LIVE_HOSTS = (process.env.NEXT_PUBLIC_LIVE_HOSTS ?? "teachtruth.org,www.teachtruth.org")
  .split(",")
  .map((h) => h.trim().toLowerCase())
  .filter(Boolean);

/** Shared unlock password for client review (simple gate, not auth). */
export const REVIEW_PASSWORD =
  process.env.NEXT_PUBLIC_REVIEW_PASSWORD ?? "truth-review";

export const REVIEW_STORAGE_KEY = "teach-truth.client-review.notes.v1";
export const REVIEW_UNLOCK_KEY = "teach-truth.client-review.unlocked.v1";

export function isLiveHost(hostname: string): boolean {
  const host = hostname.split(":")[0]?.toLowerCase() ?? "";
  return LIVE_HOSTS.some((live) => host === live || host.endsWith(`.${live}`));
}

/**
 * Review tools mount when:
 * - NEXT_PUBLIC_CLIENT_REVIEW === "1" (force on), or
 * - localhost / *.vercel.app / Vercel Preview,
 * AND the host is not a configured live domain,
 * AND NEXT_PUBLIC_CLIENT_REVIEW !== "0" (force off).
 */
export function isClientReviewSurface(hostname?: string): boolean {
  if (process.env.NEXT_PUBLIC_CLIENT_REVIEW === "0") return false;
  if (process.env.NEXT_PUBLIC_CLIENT_REVIEW === "1") return true;

  if (typeof window === "undefined" && !hostname) {
    // Server: allow client hydrate to decide; mount shell only if not forced off.
    return true;
  }

  const host = (hostname ?? (typeof window !== "undefined" ? window.location.hostname : ""))
    .split(":")[0]
    ?.toLowerCase();

  if (!host) return false;
  if (isLiveHost(host)) return false;

  if (host === "localhost" || host === "127.0.0.1" || host === "0.0.0.0") {
    return true;
  }

  // Vercel Preview + project .vercel.app URLs (staging review)
  if (host.endsWith(".vercel.app")) return true;

  return false;
}
