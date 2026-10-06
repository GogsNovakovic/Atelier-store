"use client";

import { useState } from "react";

import { HeartIcon } from "@/components/ui/icons";

// Visual state only until saved items are persisted for signed-in clients.
export function WishlistButton({ productName }: { productName: string }) {
  const [saved, setSaved] = useState(false);

  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={`Save ${productName}`}
      onClick={() => setSaved((value) => !value)}
      className="inline-flex size-10 cursor-pointer items-center justify-center bg-canvas/85 text-ink transition-colors duration-300 ease-luxe hover:bg-canvas"
    >
      <HeartIcon fill={saved ? "currentColor" : "none"} />
    </button>
  );
}
