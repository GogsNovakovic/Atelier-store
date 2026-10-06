import type { StockState } from "@/lib/catalog";

const tone: Record<StockState["status"], { text: string; dot: string }> = {
  "in-stock": { text: "text-ink", dot: "bg-success" },
  "low-stock": { text: "text-accent", dot: "bg-accent" },
  "sold-out": { text: "text-muted", dot: "bg-subtle" },
};

// The label carries the meaning; the dot is a secondary cue, never the only one.
export function StockStatus({ state }: { state: StockState }) {
  return (
    <p className={`flex items-center gap-2 text-ui ${tone[state.status].text}`}>
      <span aria-hidden="true" className={`size-1.5 ${tone[state.status].dot}`} />
      {state.label}
    </p>
  );
}
