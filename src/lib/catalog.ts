// Editorial storefront content and the shared catalogue types. Products, categories and
// stock live in Postgres (see src/lib/products.ts). Photography: Unsplash (unsplash.com/license).

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
  category: { id: number; slug: string; name: string };
  /** EUR. The database stores cents. */
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

/** A homepage "Shop by category" tile. Editorial, not the product categories table. */
export type CategoryTile = {
  slug: string;
  name: string;
  image: CatalogImage;
};

/** Caps the source width so the optimizer never pulls a full-resolution original. */
export function unsplash(id: string, width = 1600): string {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`;
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

export type StockState = { status: "in-stock" | "low-stock" | "sold-out"; label: string };

const LOW_STOCK_THRESHOLD = 3;

export function getStockState(product: Product): StockState {
  if (product.stock === 0) return { status: "sold-out", label: "Sold out" };
  if (product.stock <= LOW_STOCK_THRESHOLD) {
    return { status: "low-stock", label: `Only ${product.stock} left` };
  }
  return { status: "in-stock", label: "In stock" };
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

export const categoryTiles: CategoryTile[] = [
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
