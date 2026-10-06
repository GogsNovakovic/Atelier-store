// Sample storefront content. Stands in for the product database until the
// catalogue schema exists. Photography: Unsplash (unsplash.com/license).

export type CatalogImage = {
  src: string;
  alt: string;
};

export type Product = {
  slug: string;
  name: string;
  category: string;
  price: number;
  image: CatalogImage;
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

export const newArrivals: Product[] = [
  {
    slug: "biker-jacket-black-leather",
    name: "Biker jacket in black leather",
    category: "Outerwear",
    price: 1450,
    isNew: true,
    image: {
      src: unsplash("1551028719-00167b16eac5", 1200),
      alt: "Black leather biker jacket laid flat on white linen",
    },
  },
  {
    slug: "chain-bag-blush",
    name: "Chain shoulder bag",
    category: "Bags",
    price: 980,
    isNew: true,
    image: {
      src: unsplash("1566150905458-1bf1fc113f0d", 1200),
      alt: "Blush pink leather shoulder bag with a metal chain strap",
    },
  },
  {
    slug: "lace-up-boot-brown",
    name: "Lace-up boot in brown leather",
    category: "Shoes",
    price: 690,
    image: {
      src: unsplash("1608256246200-53e635b5b65f", 1200),
      alt: "Pair of dark brown leather lace-up boots on a black background",
    },
  },
  {
    slug: "open-knit-poncho-ecru",
    name: "Open-knit poncho",
    category: "Knitwear",
    price: 520,
    isNew: true,
    image: {
      src: unsplash("1434389677669-e08b4cac3105", 1200),
      alt: "Ecru open-knit poncho with fringed hem on a wooden hanger",
    },
  },
  {
    slug: "round-sunglasses-gold",
    name: "Round sunglasses",
    category: "Accessories",
    price: 340,
    image: {
      src: unsplash("1511499767150-a48a237f0083", 1200),
      alt: "Round sunglasses with thin gold frames and green lenses",
    },
  },
  {
    slug: "woven-top-handle-bag-tan",
    name: "Woven top-handle bag",
    category: "Bags",
    price: 1150,
    image: {
      src: unsplash("1590874103328-eac38a683ce7", 1200),
      alt: "Orange leather top-handle bag with a woven body, on a dark background",
    },
  },
  {
    slug: "bomber-jacket-rust",
    name: "Bomber jacket in rust",
    category: "Outerwear",
    price: 860,
    isNew: true,
    image: {
      src: unsplash("1591047139829-d91aecb6caea", 1200),
      alt: "Rust coloured bomber jacket hanging against a pale grey wall",
    },
  },
  {
    slug: "pearl-necklace",
    name: "Freshwater pearl necklace",
    category: "Jewellery",
    price: 420,
    image: {
      src: unsplash("1515562141207-7a88fb7ce338", 1200),
      alt: "Strand of white pearls resting in an open jewellery box",
    },
  },
];

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
