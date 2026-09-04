"use client";

import dynamic from "next/dynamic";

const ReviewBubble = dynamic(
  () =>
    import("@/components/review/ReviewBubble").then((m) => m.ReviewBubble),
  { ssr: false },
);

/** Staging / Preview client-review host — no-op on live domains. */
export function ClientReviewHost() {
  return <ReviewBubble />;
}
