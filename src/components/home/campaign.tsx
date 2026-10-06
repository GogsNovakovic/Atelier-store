import Image from "next/image";
import Link from "next/link";

import { campaign } from "@/lib/catalog";

export function Campaign() {
  return (
    <section
      aria-labelledby="campaign-title"
      className="relative flex h-[75svh] max-h-224 min-h-120 items-center justify-center overflow-hidden bg-ink text-canvas"
    >
      <Image
        src={campaign.image.src}
        alt={campaign.image.alt}
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-ink/45" />

      <div className="relative flex flex-col items-center gap-4 px-gutter text-center">
        <p className="label">{campaign.eyebrow}</p>
        <h2 id="campaign-title" className="text-title">
          {campaign.title}
        </h2>
        <p className="text-body">{campaign.description}</p>
        <Link href={campaign.cta.href} className="btn btn-inverse mt-4">
          {campaign.cta.label}
        </Link>
      </div>
    </section>
  );
}
