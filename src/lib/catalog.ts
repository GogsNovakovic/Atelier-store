// Sample storefront content. Stands in for the product database until the
// catalogue schema exists. Photography: Unsplash (unsplash.com/license).

export type CatalogImage = {
  src: string;
  alt: string;
};

export type ProductSize = {
  label: string;
  available: boolean;
};

export type Product = {
  slug: string;
  name: string;
  category: string;
  price: number;
  colour: string;
  description: string;
  details: string[];
  /** Units on hand across all sizes. */
  stock: number;
  /** Omitted for items with no size choice (bags, jewellery, eyewear). */
  sizes?: ProductSize[];
  /** Primary image: product cards and the first gallery frame. */
  image: CatalogImage;
  /** Further views shown on the product page after the primary image. */
  gallery: CatalogImage[];
  isNew?: boolean;
};

export type Collection = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  image: CatalogImage;
};

export type Category = {
  slug: string;
  name: string;
  image: CatalogImage;
};

/** Caps the source width so the optimizer never pulls a full-resolution original. */
function unsplash(id: string, width = 1600): string {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`;
}

/** A 4:5 crop of the same photo, zoomed on a focal point, for product detail views. */
function detail(id: string, x: number, y: number, zoom: number): string {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&crop=focalpoint&fp-x=${x}&fp-y=${y}&fp-z=${zoom}&w=1600&h=2000&q=80`;
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export const hero = {
  eyebrow: "Autumn Winter 2026",
  title: "The Long Season",
  panels: [
    {
      label: "Shop women",
      href: "/women",
      image: {
        src: unsplash("1539109136881-3be0616acf4b", 2000),
        alt: "A woman in a long pale blue coat stands in a cathedral square among pigeons",
      },
    },
    {
      label: "Shop men",
      href: "/men",
      image: {
        src: unsplash("1488161628813-04466f872be2", 2000),
        alt: "A man in a dark jacket and tan trousers sits beneath a round window in a stone wall",
      },
    },
  ],
} as const;

const clothingSizes = ["XS", "S", "M", "L", "XL"];

/** Builds a size run; listed sizes are sold out. */
function sizeRun(labels: string[], soldOut: string[] = []): ProductSize[] {
  return labels.map((label) => ({ label, available: !soldOut.includes(label) }));
}

export const products: Product[] = [
  {
    slug: "biker-jacket-black-leather",
    name: "Biker jacket in black leather",
    category: "Outerwear",
    price: 1450,
    isNew: true,
    colour: "Black",
    stock: 9,
    sizes: sizeRun(clothingSizes, ["XS"]),
    description:
      "A close-fitting biker in supple lambskin, with an asymmetric zip, notched lapels and zipped pockets. Cut to sit at the hip and soften with wear.",
    details: [
      "Lambskin leather, cotton lining",
      "Asymmetric front zip",
      "Three zipped pockets",
      "Professional leather clean only",
    ],
    image: {
      // Cropped below the collar: the source photo shows a third-party label inside it.
      src: detail("1551028719-00167b16eac5", 0.4, 0.75, 1.7),
      alt: "Black leather biker jacket laid flat on white linen, lapels and zipped pockets in view",
    },
    gallery: [
      {
        src: detail("1551028719-00167b16eac5", 0.3, 0.6, 2.6),
        alt: "Close view of the jacket's notched lapel and diagonal front zip",
      },
    ],
  },
  {
    slug: "chain-bag-blush",
    name: "Chain shoulder bag",
    category: "Bags",
    price: 980,
    isNew: true,
    colour: "Blush",
    stock: 2,
    description:
      "A structured flap bag in smooth calfskin with an inlaid chevron. The sliding chain strap wears long on the shoulder or doubled under the arm.",
    details: [
      "Calfskin leather, suede lining",
      "Magnetic flap closure",
      "Sliding chain strap, 110 cm",
      "22 × 14 × 6 cm",
    ],
    image: {
      src: unsplash("1566150905458-1bf1fc113f0d", 2000),
      alt: "Blush pink leather shoulder bag with a metal chain strap",
    },
    gallery: [
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
    category: "Shoes",
    price: 690,
    colour: "Dark brown",
    stock: 14,
    sizes: sizeRun(["39", "40", "41", "42", "43", "44", "45"], ["39", "45"]),
    description:
      "A Goodyear-welted boot in burnished calf leather with a stitched toe cap. Built on a leather sole that can be resoled for years of wear.",
    details: [
      "Burnished calf leather upper",
      "Goodyear-welted leather sole",
      "Seven-eyelet lacing",
      "Fits true to size",
    ],
    image: {
      src: unsplash("1608256246200-53e635b5b65f", 2000),
      alt: "Pair of dark brown leather lace-up boots on a black background",
    },
    gallery: [
      {
        src: detail("1608256246200-53e635b5b65f", 0.45, 0.6, 2.2),
        alt: "Close view of the laces and stitched toe caps",
      },
    ],
  },
  {
    slug: "open-knit-poncho-ecru",
    name: "Open-knit poncho",
    category: "Knitwear",
    price: 520,
    isNew: true,
    colour: "Ecru",
    stock: 6,
    sizes: sizeRun(["One size"]),
    description:
      "A loose V-neck poncho in an open cotton stitch, finished with a hand-knotted fringe. Light enough to layer over a coat on mild days.",
    details: ["100% organic cotton", "Hand-knotted fringe", "Hand wash cold, dry flat"],
    image: {
      src: unsplash("1434389677669-e08b4cac3105", 2000),
      alt: "Ecru open-knit poncho with fringed hem on a wooden hanger",
    },
    gallery: [
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
    category: "Accessories",
    price: 340,
    colour: "Gold and green",
    stock: 20,
    description:
      "Fine round frames in gold-plated titanium with bottle-green mineral lenses. Adjustable nose pads keep them steady through a long day.",
    details: [
      "Gold-plated titanium frame",
      "Mineral glass lenses, 100% UV protection",
      "Adjustable nose pads",
      "Leather case included",
    ],
    image: {
      src: unsplash("1511499767150-a48a237f0083", 2000),
      alt: "Round sunglasses with thin gold frames and green lenses",
    },
    gallery: [
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
    category: "Jersey",
    price: 290,
    colour: "Optic white",
    stock: 11,
    sizes: sizeRun(clothingSizes, ["XL"]),
    description:
      "A relaxed sweatshirt in heavyweight loopback cotton, with ribbed collar, cuffs and hem. Brushed inside and softer with every wash.",
    details: ["100% organic cotton loopback", "Ribbed collar, cuffs and hem", "Machine wash at 30°C"],
    image: {
      src: unsplash("1620799140408-edc6dcb6d633", 2000),
      alt: "White crew-neck sweatshirt laid flat on a grey surface beside a pair of jeans",
    },
    gallery: [
      {
        src: detail("1620799140408-edc6dcb6d633", 0.45, 0.82, 2.5),
        alt: "Close view of the ribbed cuff and hem",
      },
    ],
  },
  {
    slug: "bomber-jacket-rust",
    name: "Bomber jacket in rust",
    category: "Outerwear",
    price: 860,
    isNew: true,
    colour: "Rust",
    stock: 7,
    sizes: sizeRun(clothingSizes, ["S", "M"]),
    description:
      "A lightweight bomber in water-repellent technical twill, with ribbed collar, cuffs and hem and a utility pocket on the sleeve.",
    details: [
      "Technical cotton twill, water repellent",
      "Ribbed collar, cuffs and hem",
      "Zipped sleeve pocket",
      "Machine wash at 30°C",
    ],
    image: {
      src: unsplash("1591047139829-d91aecb6caea", 2000),
      alt: "Rust coloured bomber jacket hanging against a pale grey wall",
    },
    gallery: [
      {
        src: detail("1591047139829-d91aecb6caea", 0.6, 0.65, 2),
        alt: "Close view of the front zip, side pocket and ribbed hem",
      },
    ],
  },
  {
    slug: "pearl-necklace",
    name: "Freshwater pearl necklace",
    category: "Jewellery",
    price: 420,
    colour: "White",
    stock: 0,
    description:
      "A single strand of hand-knotted freshwater pearls finished with a floral clasp in sterling silver.",
    details: [
      "Freshwater pearls, 7 to 8 mm",
      "Sterling silver clasp",
      "Length 45 cm",
      "Presented in a gift box",
    ],
    image: {
      src: unsplash("1515562141207-7a88fb7ce338", 2000),
      alt: "Strand of white pearls resting in an open jewellery box",
    },
    gallery: [
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

export const newArrivals = products;

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

/** Same category first, then the rest of the catalogue, excluding the product itself. */
export function getRelatedProducts(product: Product, count = 4): Product[] {
  const others = products.filter((p) => p.slug !== product.slug);
  return [
    ...others.filter((p) => p.category === product.category),
    ...others.filter((p) => p.category !== product.category),
  ].slice(0, count);
}

export type StockState = { status: "in-stock" | "low-stock" | "sold-out"; label: string };

const LOW_STOCK_THRESHOLD = 3;

export function getStockState(product: Product): StockState {
  if (product.stock === 0) return { status: "sold-out", label: "Sold out" };
  if (product.stock <= LOW_STOCK_THRESHOLD) {
    return { status: "low-stock", label: `Only ${product.stock} left` };
  }
  return { status: "in-stock", label: "In stock" };
}

export function categoryHref(category: string): string {
  return `/${category.toLowerCase().replace(/\s+/g, "-")}`;
}

export const collections: Collection[] = [
  {
    slug: "outerwear",
    eyebrow: "Collection",
    title: "Outerwear",
    description: "Wool, check and leather, cut long and built to outlast the weather.",
    cta: "Shop outerwear",
    image: {
      src: unsplash("1485968579580-b6d095142e6e", 1600),
      alt: "A woman in a long dark plaid coat walks along a city street",
    },
  },
  {
    slug: "knitwear",
    eyebrow: "Collection",
    title: "Knitwear",
    description: "Cashmere and merino in oat, camel and chestnut.",
    cta: "Shop knitwear",
    image: {
      src: unsplash("1558769132-cb1aea458c5e", 1600),
      alt: "Knitted sweaters in neutral tones hanging on a rail beside dried pampas grass",
    },
  },
];

export const campaign = {
  eyebrow: "Gifts",
  title: "The Gift Edit",
  description: "Small things for the people who notice.",
  cta: { label: "Discover gifts", href: "/gifts" },
  image: {
    src: unsplash("1445205170230-053b83016050", 2400),
    alt: "Rails of cream and camel garments in a warmly lit boutique",
  },
} as const;

export const categories: Category[] = [
  {
    slug: "women",
    name: "Women",
    image: {
      src: unsplash("1617922001439-4a2e6562f328", 1000),
      alt: "A woman in a wide-brimmed hat and fitted grey dress on a palm-lined street",
    },
  },
  {
    slug: "men",
    name: "Men",
    image: {
      src: unsplash("1520975954732-35dd22299614", 1000),
      alt: "A man in a black leather jacket and sunglasses crouches on a brick ledge",
    },
  },
  {
    slug: "bags",
    name: "Bags",
    image: {
      src: unsplash("1594223274512-ad4803739b7c", 1000),
      alt: "Teal leather handbag with a gold clasp beside a pair of glasses",
    },
  },
  {
    slug: "jewellery",
    name: "Jewellery",
    image: {
      src: unsplash("1599643478518-a784e5dc4c8f", 1000),
      alt: "Layered gold necklaces with a blue stone and a crescent pendant",
    },
  },
];

export const services = [
  {
    title: "Complimentary delivery",
    body: "Free standard delivery on orders over €250.",
  },
  {
    title: "Thirty-day returns",
    body: "Return any unworn piece within 30 days, by post or in store.",
  },
  {
    title: "Gift wrapping",
    body: "Every order can be wrapped and sent with a handwritten note.",
  },
] as const;

export const primaryNav = [
  { label: "Women", href: "/women" },
  { label: "Men", href: "/men" },
  { label: "Bags", href: "/bags" },
  { label: "Shoes", href: "/shoes" },
  { label: "Jewellery", href: "/jewellery" },
  { label: "Gifts", href: "/gifts" },
] as const;

export const footerNav = [
  {
    title: "Client services",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Delivery", href: "/delivery" },
      { label: "Returns", href: "/returns" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "The house",
    links: [
      { label: "About Atelier", href: "/about" },
      { label: "Journal", href: "/journal" },
      { label: "Stores", href: "/stores" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms of sale", href: "/terms" },
      { label: "Accessibility", href: "/accessibility" },
    ],
  },
] as const;
