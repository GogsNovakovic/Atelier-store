"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
      className="flex flex-col gap-4"
    >
      <label htmlFor="newsletter-email" className="label text-canvas/70">
        Email address
      </label>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          disabled={submitted}
          className="min-h-12 flex-1 border-0 border-b border-canvas/50 bg-transparent px-0 text-body text-canvas outline-offset-4 placeholder:text-canvas/50 focus:border-canvas disabled:opacity-60"
          placeholder="name@example.com"
        />
        <button type="submit" className="btn btn-inverse" disabled={submitted}>
          Subscribe
        </button>
      </div>
      <p role="status" className="min-h-6 text-ui text-canvas/70">
        {submitted
          ? "Thank you. Atelier is a demo store, so no emails will be sent."
          : null}
      </p>
    </form>
  );
}
