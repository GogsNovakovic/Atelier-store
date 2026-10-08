// Sample catalogue loaded by `npm run db:seed`. Photography: Unsplash (unsplash.com/license).
import { unsplash, type CatalogImage } from "@/lib/catalog";

/** A 4:5 crop of the same photo, zoomed on a focal point, for product detail views. */
function detail(id: string, x: number, y: number, zoom: number): string {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&crop=focalpoint&fp-x=${x}&fp-y=${y}&fp-z=${zoom}&w=1600&h=2000&q=80`;
}

export type SeedCategory = { slug: string; name: string };

export type SeedProduct = {
  slug: string;
  /** Category slug. */
  category: string;
  name: string;
  priceCents: number;
  colour: string;
  description: string;
  details: string[];
  /** The first is the primary image. */
  images: CatalogImage[];
  isNew?: boolean;
  /** Units per size, in size-run order. A null size means no size choice. */
  stock: [size: string | null, quantity: number][];
};

export const seedCategories: SeedCategory[] = [
  { slug: "outerwear", name: "Outerwear" },
  { slug: "bags", name: "Bags" },
  { slug: "shoes", name: "Shoes" },
  { slug: "knitwear", name: "Knitwear" },
  { slug: "accessories", name: "Accessories" },
  { slug: "jersey", name: "Jersey" },
  { slug: "jewellery", name: "Jewellery" },
];

export const seedProducts: SeedProduct[] = [
  {
    slug: "biker-jacket-black-leather",
    name: "Biker jacket in black leather",
    category: "outerwear",
    priceCents: 1450_00,
    isNew: true,
    colour: "Black",
    stock: [
      ["XS", 0],
      ["S", 2],
      ["M", 3],
      ["L", 3],
      ["XL", 1],
    ],
    description:
      "A close-fitting biker in supple lambskin, with an asymmetric zip, notched lapels and zipped pockets. Cut to sit at the hip and soften with wear.",
    details: [
      "Lambskin leather, cotton lining",
      "Asymmetric front zip",
      "Three zipped pockets",
      "Professional leather clean only",
    ],
    images: [
      {
        // Cropped below the collar: the source photo shows a third-party label inside it.
        src: detail("1551028719-00167b16eac5", 0.4, 0.75, 1.7),
        alt: "Black leather biker jacket laid flat on white linen, lapels and zipped pockets in view",
      },
      {
        src: detail("1551028719-00167b16eac5", 0.3, 0.6, 2.6),
        alt: "Close view of the jacket's notched lapel and diagonal front zip",
      },
    ],
  },
  {
    slug: "chain-bag-blush",
    name: "Chain shoulder bag",
    category: "bags",
    priceCents: 980_00,
    isNew: true,
    colour: "Blush",
    stock: [[null, 2]],
    description:
      "A structured flap bag in smooth calfskin with an inlaid chevron. The sliding chain strap wears long on the shoulder or doubled under the arm.",
    details: [
      "Calfskin leather, suede lining",
      "Magnetic flap closure",
      "Sliding chain strap, 110 cm",
      "22 × 14 × 6 cm",
    ],
    images: [
      {
        src: unsplash("1566150905458-1bf1fc113f0d", 2000),
        alt: "Blush pink leather shoulder bag with a metal chain strap",
      },
      {
        src: detail("1566150905458-1bf1fc113f0d", 0.75, 0.3, 2.2),
        alt: "Side view of the bag showing the chain strap fixing",
      },
      {
        src: detail("1566150905458-1bf1fc113f0d", 0.5, 0.5, 2),
        alt: "Close view of the yellow and white chevron inlay on the flap",
      },
    ],
  },
  {
    slug: "lace-up-boot-brown",
    name: "Lace-up boot in brown leather",
    category: "shoes",
    priceCents: 690_00,
    colour: "Dark brown",
    stock: [
      ["39", 0],
      ["40", 2],
      ["41", 3],
      ["42", 4],
      ["43", 3],
      ["44", 2],
      ["45", 0],
    ],
    description:
      "A Goodyear-welted boot in burnished calf leather with a stitched toe cap. Built on a leather sole that can be resoled for years of wear.",
    details: [
      "Burnished calf leather upper",
      "Goodyear-welted leather sole",
      "Seven-eyelet lacing",
      "Fits true to size",
    ],
    images: [
      {
        src: unsplash("1608256246200-53e635b5b65f", 2000),
        alt: "Pair of dark brown leather lace-up boots on a black background",
      },
      {
        src: detail("1608256246200-53e635b5b65f", 0.45, 0.6, 2.2),
        alt: "Close view of the laces and stitched toe caps",
      },
    ],
  },
  {
    slug: "open-knit-poncho-ecru",
    name: "Open-knit poncho",
    category: "knitwear",
    priceCents: 520_00,
    isNew: true,
    colour: "Ecru",
    stock: [["One size", 6]],
    description:
      "A loose V-neck poncho in an open cotton stitch, finished with a hand-knotted fringe. Light enough to layer over a coat on mild days.",
    details: ["100% organic cotton", "Hand-knotted fringe", "Hand wash cold, dry flat"],
    images: [
      {
        src: unsplash("1434389677669-e08b4cac3105", 2000),
        alt: "Ecru open-knit poncho with fringed hem on a wooden hanger",
      },
      {
        src: detail("1434389677669-e08b4cac3105", 0.5, 0.5, 2.5),
        alt: "Close view of the open knit stitch",
      },
      {
        src: detail("1434389677669-e08b4cac3105", 0.5, 0.85, 2),
        alt: "The knotted fringe along the poncho's pointed hem",
      },
    ],
  },
  {
    slug: "round-sunglasses-gold",
    name: "Round sunglasses",
    category: "accessories",
    priceCents: 340_00,
    colour: "Gold and green",
    stock: [[null, 20]],
    description:
      "Fine round frames in gold-plated titanium with bottle-green mineral lenses. Adjustable nose pads keep them steady through a long day.",
    details: [
      "Gold-plated titanium frame",
      "Mineral glass lenses, 100% UV protection",
      "Adjustable nose pads",
      "Leather case included",
    ],
    images: [
      {
        src: unsplash("1511499767150-a48a237f0083", 2000),
        alt: "Round sunglasses with thin gold frames and green lenses",
      },
      {
        src: detail("1511499767150-a48a237f0083", 0.35, 0.55, 2.2),
        alt: "Close view of the lenses and bridge",
      },
      {
        src: detail("1511499767150-a48a237f0083", 0.6, 0.5, 2.5),
        alt: "Close view of the thin gold temple and hinge",
      },
    ],
  },
  {
    slug: "crew-neck-sweatshirt-white",
    name: "Crew-neck sweatshirt",
    category: "jersey",
    priceCents: 290_00,
    colour: "Optic white",
    stock: [
      ["XS", 2],
      ["S", 3],
      ["M", 3],
      ["L", 3],
      ["XL", 0],
    ],
    description:
      "A relaxed sweatshirt in heavyweight loopback cotton, with ribbed collar, cuffs and hem. Brushed inside and softer with every wash.",
    details: ["100% organic cotton loopback", "Ribbed collar, cuffs and hem", "Machine wash at 30°C"],
    images: [
      {
        src: unsplash("1620799140408-edc6dcb6d633", 2000),
        alt: "White crew-neck sweatshirt laid flat on a grey surface beside a pair of jeans",
      },
      {
        src: detail("1620799140408-edc6dcb6d633", 0.45, 0.82, 2.5),
        alt: "Close view of the ribbed cuff and hem",
      },
    ],
  },
  {
    slug: "bomber-jacket-rust",
    name: "Bomber jacket in rust",
    category: "outerwear",
    priceCents: 860_00,
    isNew: true,
    colour: "Rust",
    stock: [
      ["XS", 2],
      ["S", 0],
      ["M", 0],
      ["L", 3],
      ["XL", 2],
    ],
    description:
      "A lightweight bomber in water-repellent technical twill, with ribbed collar, cuffs and hem and a utility pocket on the sleeve.",
    details: [
      "Technical cotton twill, water repellent",
      "Ribbed collar, cuffs and hem",
      "Zipped sleeve pocket",
      "Machine wash at 30°C",
    ],
    images: [
      {
        src: unsplash("1591047139829-d91aecb6caea", 2000),
        alt: "Rust coloured bomber jacket hanging against a pale grey wall",
      },
      {
        src: detail("1591047139829-d91aecb6caea", 0.6, 0.65, 2),
        alt: "Close view of the front zip, side pocket and ribbed hem",
      },
    ],
  },
  {
    slug: "pearl-necklace",
    name: "Freshwater pearl necklace",
    category: "jewellery",
    priceCents: 420_00,
    colour: "White",
    stock: [[null, 0]],
    description:
      "A single strand of hand-knotted freshwater pearls finished with a floral clasp in sterling silver.",
    details: [
      "Freshwater pearls, 7 to 8 mm",
      "Sterling silver clasp",
      "Length 45 cm",
      "Presented in a gift box",
    ],
    images: [
      {
        src: unsplash("1515562141207-7a88fb7ce338", 2000),
        alt: "Strand of white pearls resting in an open jewellery box",
      },
      {
        src: detail("1515562141207-7a88fb7ce338", 0.45, 0.6, 2.2),
        alt: "Close view of the floral silver clasp",
      },
      {
        src: detail("1515562141207-7a88fb7ce338", 0.6, 0.5, 2.5),
        alt: "Close view of the knotted pearls",
      },
    ],
  },
];
