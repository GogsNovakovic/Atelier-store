// Editorial storefront content and the shared catalogue types. Products, categories and
// stock live in Postgres (see src/lib/products.ts). Photography: Unsplash (unsplash.com/license).

export type CatalogImage = {
  src: string;
  alt: string;
};

/** Mirrors the department CHECK constraint in src/db/catalog-schema.ts. */
export const DEPARTMENTS = ["women", "men", "unisex"] as const;

export type Department = (typeof DEPARTMENTS)[number];

export type ProductSize = {
  label: string;
  available: boolean;
};

export type Product = {
  slug: string;
  name: string;
  category: { id: number; slug: string; name: string };
  department: Department;
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

/** Which products a listing page shows. Women and Men also include unisex pieces. */
export type ProductFilter =
  | { department: Exclude<Department, "unisex"> }
  | { categories: string[] };

/** Editorial header for a listing page: copy plus a banner photograph. */
export type ListingContent = {
  eyebrow: string;
  description: string;
  banner: CatalogImage & {
    /** CSS object-position, so the subject survives both the wide and the portrait crop. */
    focus?: string;
  };
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

/** Mirrors the slug CHECK constraints in src/db/catalog-schema.ts. */
const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

export function isSlug(value: string): boolean {
  return SLUG_PATTERN.test(value);
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

/** Listing pages that aren't a single database category. Any category slug also gets a page. */
const curatedListings: Record<string, { title: string; filter: ProductFilter }> = {
  women: { title: "Women", filter: { department: "women" } },
  men: { title: "Men", filter: { department: "men" } },
  gifts: { title: "Gifts", filter: { categories: ["bags", "jewellery", "accessories"] } },
};

export const curatedListingSlugs = Object.keys(curatedListings);

// Lookups take a URL segment, so guard against inherited keys like "constructor".
export function getCuratedListing(slug: string) {
  return Object.hasOwn(curatedListings, slug) ? curatedListings[slug] : undefined;
}

/** Banner and copy per listing slug. A category without an entry gets a plain header. */
const listingContent: Record<string, ListingContent> = {
  "new-arrivals": {
    eyebrow: "Just in",
    description: "The latest pieces to arrive in store, newest first.",
    banner: {
      src: unsplash("1621261027519-a71ac66d5a68", 2400),
      alt: "A bright boutique with rails of linen clothing beside tall windows",
    },
  },
  women: {
    eyebrow: "Autumn Winter 2026",
    description: "Coats, knitwear and leather for the long season.",
    banner: {
      src: unsplash("1571513800374-df1bbe650e56", 2400),
      alt: "A woman in a mustard jacket holds dried flowers in soft studio light",
      focus: "50% 25%",
    },
  },
  men: {
    eyebrow: "Autumn Winter 2026",
    description: "Tailored coats, heavy knits and shoes built to be resoled.",
    banner: {
      src: unsplash("1788500304887-6711fead4b54", 2400),
      alt: "A man walks through a white studio with a jacket slung over his shoulder",
      focus: "50% 30%",
    },
  },
  gifts: {
    eyebrow: "The Gift Edit",
    description: "Bags, jewellery and small leather goods, wrapped by hand with a note.",
    banner: {
      src: unsplash("1669994814741-fa5a07c97c67", 2400),
      alt: "A navy gift box tied with a silver ribbon and bow on a pale blue background",
      focus: "60% 40%",
    },
  },
  outerwear: {
    eyebrow: "Autumn Winter 2026",
    description: "Wool, gabardine and leather, cut long and built to outlast the weather.",
    banner: {
      src: unsplash("1737508945707-ebdccee97cc5", 2400),
      alt: "A man in a double-breasted ivory coat on a city street",
      focus: "50% 25%",
    },
  },
  knitwear: {
    eyebrow: "Autumn Winter 2026",
    description: "Cashmere, merino and lambswool in ivory, green and grey.",
    banner: {
      src: unsplash("1601379327928-bedfaf9da2d0", 2400),
      alt: "A stack of folded grey and cream cable-knit jumpers",
    },
  },
  jersey: {
    eyebrow: "Autumn Winter 2026",
    description: "T-shirts and sweatshirts in dense cotton jersey.",
    banner: {
      src: unsplash("1666358080392-49924b6d81be", 2400),
      alt: "A man in a navy T-shirt against a white background",
      focus: "50% 20%",
    },
  },
  bags: {
    eyebrow: "Autumn Winter 2026",
    description: "Totes, crossbody bags and holdalls in leather that ages well.",
    banner: {
      src: unsplash("1682031215004-161c99d5b225", 2400),
      alt: "Hands reaching up to a green croc-embossed handbag in raking light",
    },
  },
  shoes: {
    eyebrow: "Autumn Winter 2026",
    description: "Boots, Oxfords, pumps and trainers on leather and welted soles.",
    banner: {
      src: unsplash("1563433836985-8ce7df0842ca", 2400),
      alt: "Tan leather lace-up shoes against a cream background",
    },
  },
  accessories: {
    eyebrow: "Autumn Winter 2026",
    description: "Sunglasses, belts, gloves and silk to finish an outfit.",
    banner: {
      src: unsplash("1562261150-0989084c593e", 2400),
      alt: "Tortoiseshell sunglasses on a ledge beneath a bright blue sky",
    },
  },
  jewellery: {
    eyebrow: "Autumn Winter 2026",
    description: "Gold and silver, pearls and stones, each presented in a gift box.",
    banner: {
      src: unsplash("1598218940656-7126545fd283", 2400),
      alt: "A woman wearing gold chain jewellery and statement earrings in low light",
      focus: "50% 35%",
    },
  },
};

export function getListingContent(slug: string): ListingContent | undefined {
  return Object.hasOwn(listingContent, slug) ? listingContent[slug] : undefined;
}

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
  { label: "New In", href: "/new-arrivals" },
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
