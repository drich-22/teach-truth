"use client";

import { useEffect, useState } from "react";
import { shouldShowReviewBubble } from "@/lib/review-surface";
import { ReviewBubble } from "./ReviewBubble";

export function ClientReviewHost() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(shouldShowReviewBubble());
  }, []);

  if (!show) return null;
  return <ReviewBubble />;
}
