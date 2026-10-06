import type { SVGProps } from "react";

// Atelier logotype: monoline capitals on a 20-unit cap height, 1.6 stroke, square ends.
// The A has no crossbar; a square counter sits beneath the apex, the brand's one signature detail.
// Colour follows currentColor, so it works on the canvas and on the dark footer alike.
// Standalone files for use outside the app live in /public/brand.

type LogoProps = SVGProps<SVGSVGElement> & {
  /** Accessible name. Omit when the logo sits inside an element that is already labelled. */
  title?: string;
};

export function Logo({ title, ...props }: LogoProps) {
  return (
    <svg
      viewBox="-1.2 -0.8 128.2 21.6"
      fill="currentColor"
      {...(title ? { role: "img", "aria-label": title } : { "aria-hidden": true })}
      focusable="false"
      {...props}
    >
      <path d="M-1.155 20.8 6.945-.8h1.11l8.1 21.6h-1.71L7.5 2.28.555 20.8Z" />
      <path d="M6.25 11.5h2.5V14h-2.5z" />
      <path d="M117.72 9.5h1.91l7.35 11.3h-1.91z" />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="square"
        d="M22 0h14m-7 0v20M56 0H45v20h11M45 10h9M65 0v20h10M84 0v20M104 0H93v20h11M93 10h9M113 20V0h6.5a5 5 0 0 1 0 10H113"
      />
    </svg>
  );
}
