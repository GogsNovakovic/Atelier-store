"use client";

import { useId, useState } from "react";

import { HeartIcon } from "@/components/ui/icons";
import type { ProductSize } from "@/lib/catalog";

type Status = { tone: "error" | "info"; message: string } | null;

export function PurchasePanel({
  productName,
  sizes,
  soldOut,
}: {
  productName: string;
  sizes?: ProductSize[];
  soldOut: boolean;
}) {
  const id = useId();
  // A single size (e.g. "One size") needs no choice, so it starts selected.
  const [size, setSize] = useState<string | null>(sizes?.length === 1 ? sizes[0].label : null);
  const [saved, setSaved] = useState(false);
  const [status, setStatus] = useState<Status>(null);
  const needsSize = Boolean(sizes && sizes.length > 1);

  function addToBag() {
    if (needsSize && !size) {
      setStatus({ tone: "error", message: "Select a size to continue." });
      return;
    }
    // No cart exists yet. Say so rather than pretend the item was added.
    setStatus({
      tone: "info",
      message: "The bag isn't built yet in this demo, so nothing was added.",
    });
  }

  return (
    <div className="flex flex-col gap-6">
      {needsSize && sizes && !soldOut ? (
        <fieldset aria-describedby={status?.tone === "error" ? `${id}-status` : undefined}>
          <legend className="label mb-3 flex w-full justify-between">
            <span>Size</span>
            {size ? <span className="text-muted">{size}</span> : null}
          </legend>
          <div className="grid grid-cols-5 gap-1">
            {sizes.map((option) => (
              <label key={option.label} className="relative">
                <input
                  type="radio"
                  name={`${id}-size`}
                  value={option.label}
                  checked={size === option.label}
                  disabled={!option.available}
                  onChange={() => {
                    setSize(option.label);
                    setStatus(null);
                  }}
                  className="peer sr-only"
                />
                <span className="flex min-h-12 cursor-pointer items-center justify-center border border-line text-ui transition-colors duration-300 ease-luxe hover:border-ink peer-checked:border-ink peer-checked:bg-ink peer-checked:text-canvas peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-disabled:cursor-not-allowed peer-disabled:border-line peer-disabled:text-subtle peer-disabled:line-through">
                  {option.label}
                  {!option.available ? <span className="sr-only">, sold out</span> : null}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      ) : null}

      {sizes?.length === 1 ? (
        <p className="label text-muted">{sizes[0].label}</p>
      ) : null}

      <div className="flex gap-1">
        <button
          type="button"
          onClick={addToBag}
          disabled={soldOut}
          className="btn btn-primary flex-1"
        >
          {soldOut ? "Sold out" : "Add to bag"}
        </button>
        <button
          type="button"
          aria-pressed={saved}
          aria-label={`Save ${productName}`}
          onClick={() => setSaved((value) => !value)}
          className="btn btn-secondary px-0 size-12"
        >
          <HeartIcon fill={saved ? "currentColor" : "none"} />
        </button>
      </div>

      <p
        id={`${id}-status`}
        role="status"
        className={`-mt-2 min-h-5 text-ui ${status?.tone === "error" ? "text-danger" : "text-muted"}`}
      >
        {status?.message}
      </p>
    </div>
  );
}
