// Sample catalogue loaded by `npm run db:seed`. Photography: Unsplash (unsplash.com/license).
import { unsplash, type CatalogImage, type Department } from "@/lib/catalog";

/** A 4:5 crop of the same photo, zoomed on a focal point, for product detail views. */
function detail(id: string, x: number, y: number, zoom: number): string {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&crop=focalpoint&fp-x=${x}&fp-y=${y}&fp-z=${zoom}&w=1600&h=2000&q=80`;
}

export type SeedCategory = { slug: string; name: string };

export type SeedProduct = {
  slug: string;
  /** Category slug. */
  category: string;
  department: Department;
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
    department: "women",
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
    department: "women",
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
    department: "men",
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
    department: "women",
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
    department: "unisex",
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
    department: "unisex",
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
    department: "men",
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
    department: "women",
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
  // Autumn Winter 2026 additions. All share one created_at on first seed, so New arrivals
  // breaks the tie by id: the first eight below lead the listing.
  {
    slug: "trench-coat-stone",
    name: "Belted trench coat",
    category: "outerwear",
    department: "women",
    priceCents: 1350_00,
    isNew: true,
    colour: "Stone",
    stock: [
      ["XS", 2],
      ["S", 4],
      ["M", 4],
      ["L", 2],
      ["XL", 1],
    ],
    description:
      "A double-breasted trench in water-repellent cotton gabardine, with storm flaps, buckled cuffs and a tie belt. Long enough to cover a knee-length skirt.",
    details: [
      "Cotton gabardine, water repellent",
      "Detachable tie belt",
      "Buckled cuff straps",
      "Dry clean only",
    ],
    images: [
      {
        src: unsplash("1633821879282-0c4e91f96232", 2000),
        alt: "Woman in a stone trench coat with a tied belt over a black top",
      },
      {
        src: detail("1633821879282-0c4e91f96232", 0.5, 0.62, 2),
        alt: "Close view of the tied belt and front pocket",
      },
    ],
  },
  {
    slug: "single-breasted-coat-camel",
    name: "Single-breasted coat in camel",
    category: "outerwear",
    department: "men",
    priceCents: 1290_00,
    isNew: true,
    colour: "Camel",
    stock: [
      ["S", 2],
      ["M", 4],
      ["L", 3],
      ["XL", 2],
    ],
    description:
      "A relaxed overcoat in brushed wool and cashmere, with notched lapels, a three-button front and flap pockets. Cut long to sit over a jacket.",
    details: [
      "80% wool, 20% cashmere",
      "Three-button front",
      "Viscose lining",
      "Dry clean only",
    ],
    images: [
      {
        src: unsplash("1619603364904-c0498317e145", 2000),
        alt: "Man in a camel overcoat over a brown roll-neck, standing against a pale wall",
      },
      {
        src: detail("1619603364904-c0498317e145", 0.45, 0.55, 2.2),
        alt: "Close view of the notched lapel and horn buttons",
      },
    ],
  },
  {
    slug: "cable-knit-jumper-green",
    name: "Cable-knit jumper",
    category: "knitwear",
    department: "men",
    priceCents: 480_00,
    isNew: true,
    colour: "Bottle green",
    stock: [
      ["S", 3],
      ["M", 5],
      ["L", 4],
      ["XL", 2],
    ],
    description:
      "A fisherman jumper in thick lambswool, worked in vertical cables with a ribbed crew neck. Warm enough to wear in place of a jacket.",
    details: ["100% lambswool", "Hand-linked crew neck", "Hand wash cold, dry flat"],
    images: [
      {
        src: unsplash("1610901157620-340856d0a50f", 2000),
        alt: "Man in a bottle green cable-knit jumper on a rooftop above the city",
      },
      {
        src: detail("1610901157620-340856d0a50f", 0.5, 0.68, 2.6),
        alt: "Close view of the vertical cable stitch",
      },
    ],
  },
  {
    slug: "cardigan-bottle-green",
    name: "V-neck cardigan",
    category: "knitwear",
    department: "women",
    priceCents: 450_00,
    isNew: true,
    colour: "Bottle green",
    stock: [
      ["XS", 2],
      ["S", 3],
      ["M", 3],
      ["L", 1],
    ],
    description:
      "A soft V-neck cardigan in an open lace stitch of merino and alpaca, with ribbed cuffs and a straight hem. Wear it buttoned on its own or open over a slip dress.",
    details: ["70% merino wool, 30% alpaca", "Horn buttons", "Hand wash cold, dry flat"],
    images: [
      {
        src: unsplash("1605131546231-a5f385db4a6b", 2000),
        alt: "Bottle green knit cardigan held up on a hanger beside dried grasses",
      },
      {
        src: detail("1605131546231-a5f385db4a6b", 0.6, 0.45, 2.2),
        alt: "Close view of the lace stitch on the cardigan's front",
      },
    ],
  },
  {
    slug: "zip-crossbody-bag-black",
    name: "Zip crossbody bag",
    category: "bags",
    department: "unisex",
    priceCents: 540_00,
    isNew: true,
    colour: "Black",
    stock: [[null, 7]],
    description:
      "A compact camera bag in nubuck with a zipped front pocket and a long adjustable strap. Holds a phone, cardholder and keys and wears close to the body.",
    details: [
      "Nubuck leather, cotton lining",
      "Two-way top zip",
      "Adjustable strap, up to 130 cm",
      "20 × 14 × 7 cm",
    ],
    images: [
      {
        src: unsplash("1620786514684-ff35b5aae55e", 2000),
        alt: "Black crossbody bag with a zipped front pocket hanging from its strap",
      },
      {
        src: detail("1620786514684-ff35b5aae55e", 0.45, 0.75, 2),
        alt: "Close view of the front zip pocket",
      },
    ],
  },
  {
    slug: "leather-trainer-white",
    name: "Leather trainer",
    category: "shoes",
    department: "unisex",
    priceCents: 390_00,
    isNew: true,
    colour: "White and grey",
    stock: [
      ["37", 2],
      ["38", 3],
      ["39", 4],
      ["40", 4],
      ["41", 5],
      ["42", 4],
      ["43", 3],
      ["44", 2],
      ["45", 1],
    ],
    description:
      "A low trainer in smooth white calfskin with grey suede overlays and a gum rubber cupsole. Made in Portugal and stitched all the way round.",
    details: [
      "Calfskin and suede upper",
      "Leather lining",
      "Stitched gum rubber sole",
      "Fits true to size",
    ],
    images: [
      {
        src: unsplash("1620989928625-08536e746255", 2000),
        alt: "Hand holding a white leather trainer with grey suede panels and a gum sole",
      },
      {
        src: detail("1620989928625-08536e746255", 0.45, 0.6, 2),
        alt: "Close view of the suede overlays and laces",
      },
    ],
  },
  {
    slug: "gold-hoop-earrings",
    name: "Gold hoop earrings",
    category: "jewellery",
    department: "women",
    priceCents: 310_00,
    isNew: true,
    colour: "Gold",
    stock: [[null, 9]],
    description:
      "Small, wide-profile hoops in recycled sterling silver with a thick gold plate. Light enough to wear every day.",
    details: [
      "18k gold plate on recycled sterling silver",
      "Hinged snap closure",
      "Diameter 18 mm",
      "Presented in a gift box",
    ],
    images: [
      {
        src: unsplash("1608508644127-ba99d7732fee", 2000),
        alt: "Pair of gold hoop earrings on a pink ribbed ceramic dish",
      },
      {
        src: detail("1608508644127-ba99d7732fee", 0.6, 0.55, 2.4),
        alt: "Close view of the wide gold hoops",
      },
    ],
  },
  {
    slug: "leather-briefcase-cognac",
    name: "Leather briefcase",
    category: "bags",
    department: "men",
    priceCents: 1150_00,
    isNew: true,
    colour: "Cognac",
    stock: [[null, 3]],
    description:
      "A structured briefcase in polished calfskin with twin buckled straps, top handles and a detachable shoulder strap. Fits a 14-inch laptop.",
    details: [
      "Polished calfskin, cotton twill lining",
      "Padded laptop sleeve",
      "Detachable shoulder strap",
      "38 × 28 × 10 cm",
    ],
    images: [
      {
        src: unsplash("1691480150204-66dd1eb77391", 2000),
        alt: "Cognac leather briefcase with two buckled straps and top handles",
      },
      {
        src: detail("1691480150204-66dd1eb77391", 0.5, 0.42, 2.2),
        alt: "Close view of the buckled straps and stitching",
      },
    ],
  },
  {
    slug: "belted-wrap-coat-camel",
    name: "Belted wrap coat",
    category: "outerwear",
    department: "women",
    priceCents: 1190_00,
    colour: "Camel",
    stock: [
      ["XS", 1],
      ["S", 2],
      ["M", 3],
      ["L", 2],
    ],
    description:
      "A collarless wrap coat in double-faced wool, finished by hand with no lining, so it drapes softly and ties at the waist.",
    details: ["100% double-faced wool", "Unlined, hand-finished seams", "Tie belt", "Dry clean only"],
    images: [
      {
        src: unsplash("1539533113208-f6df8cc8b543", 2000),
        alt: "Woman in a camel wrap coat tied at the waist, against a stone wall",
      },
      {
        src: detail("1539533113208-f6df8cc8b543", 0.5, 0.5, 2.2),
        alt: "Close view of the tied belt",
      },
    ],
  },
  {
    slug: "leather-tote-tan",
    name: "Leather tote",
    category: "bags",
    department: "unisex",
    priceCents: 690_00,
    colour: "Tan",
    stock: [[null, 5]],
    description:
      "An unlined tote in waxed vegetable-tanned leather that darkens and marks with use. Long handles sit comfortably over a coat.",
    details: [
      "Vegetable-tanned leather, unlined",
      "Inside slip pocket",
      "Handle drop 26 cm",
      "36 × 40 × 12 cm",
    ],
    images: [
      {
        src: unsplash("1624687943971-e86af76d57de", 2000),
        alt: "Tan leather tote hanging by its handles on a white door",
      },
      {
        src: detail("1624687943971-e86af76d57de", 0.5, 0.6, 2.2),
        alt: "Close view of the waxed leather grain",
      },
    ],
  },
  {
    slug: "weekend-holdall-brown",
    name: "Weekend holdall",
    category: "bags",
    department: "men",
    priceCents: 1490_00,
    colour: "Brown",
    stock: [[null, 2]],
    description:
      "A roomy holdall in full-grain leather with saddle stitching, rolled handles and a luggage tag. Sized for two or three nights away.",
    details: [
      "Full-grain leather, canvas lining",
      "Rolled top handles",
      "Brass hardware",
      "52 × 28 × 26 cm",
    ],
    images: [
      {
        src: detail("1636098152681-ea367dcb7ca7", 0.5, 0.4, 1.2),
        alt: "Brown leather holdall with rolled handles in front of a brick wall",
      },
      {
        src: detail("1636098152681-ea367dcb7ca7", 0.6, 0.3, 2),
        alt: "Close view of the rolled handles and luggage tag",
      },
    ],
  },
  {
    slug: "pointed-pump-ivory",
    name: "Pointed pump",
    category: "shoes",
    department: "women",
    priceCents: 620_00,
    colour: "Ivory",
    stock: [
      ["36", 1],
      ["37", 3],
      ["38", 3],
      ["39", 2],
      ["40", 1],
      ["41", 0],
    ],
    description:
      "A classic pointed pump in pebbled calfskin on a slim 90 mm heel, with a leather sole and a padded footbed.",
    details: [
      "Pebbled calfskin upper",
      "Leather sole, 90 mm heel",
      "Padded leather footbed",
      "Fits true to size",
    ],
    images: [
      {
        src: unsplash("1535043934128-cf0b28d52f95", 2000),
        alt: "Pair of ivory pointed pumps on a dark polished floor",
      },
      {
        src: detail("1535043934128-cf0b28d52f95", 0.4, 0.6, 2),
        alt: "Close view of the pointed toe and pebbled leather",
      },
    ],
  },
  {
    slug: "brogue-oxford-black",
    name: "Brogue Oxford",
    category: "shoes",
    department: "men",
    priceCents: 590_00,
    colour: "Black",
    stock: [
      ["40", 1],
      ["41", 3],
      ["42", 3],
      ["43", 2],
      ["44", 1],
      ["45", 0],
    ],
    description:
      "A closed-laced Oxford in polished black calf with a punched toe cap, built on a Goodyear-welted leather sole.",
    details: [
      "Polished calf leather upper",
      "Goodyear-welted leather sole",
      "Punched toe cap",
      "Fits true to size",
    ],
    images: [
      {
        src: unsplash("1576133385309-203e67da8e58", 2000),
        alt: "Black leather brogue Oxford on a pale wooden floor",
      },
      {
        src: detail("1576133385309-203e67da8e58", 0.55, 0.4, 2.2),
        alt: "Close view of the punched toe cap and laces",
      },
    ],
  },
  {
    slug: "zip-ankle-boot-black",
    name: "Zip ankle boot",
    category: "shoes",
    department: "women",
    priceCents: 650_00,
    colour: "Black",
    stock: [
      ["36", 2],
      ["37", 3],
      ["38", 4],
      ["39", 3],
      ["40", 2],
      ["41", 1],
    ],
    description:
      "A sleek ankle boot in polished calf with twin side zips and a stacked 35 mm block heel. Rubber-topped leather sole for grip on wet streets.",
    details: [
      "Polished calf leather upper",
      "Twin side zips",
      "35 mm stacked heel",
      "Fits true to size",
    ],
    images: [
      {
        src: unsplash("1605732440685-d0654d81aa30", 2000),
        alt: "Black leather ankle boot with two silver side zips",
      },
      {
        src: detail("1605732440685-d0654d81aa30", 0.35, 0.42, 2.2),
        alt: "Close view of the twin zips",
      },
    ],
  },
  {
    slug: "ribbed-roll-neck-ivory",
    name: "Ribbed roll-neck",
    category: "knitwear",
    department: "women",
    priceCents: 420_00,
    colour: "Ivory",
    stock: [
      ["XS", 2],
      ["S", 4],
      ["M", 4],
      ["L", 2],
    ],
    description:
      "A long roll-neck in a wide merino rib, cut generously through the body to wear over trousers or a slip skirt.",
    details: ["100% extra-fine merino", "Wide rib throughout", "Hand wash cold, dry flat"],
    images: [
      {
        src: unsplash("1687275161342-8699c61e4364", 2000),
        alt: "Ivory ribbed roll-neck jumper held up on a hanger beside dried grasses",
      },
      {
        src: detail("1687275161342-8699c61e4364", 0.5, 0.3, 2.2),
        alt: "Close view of the roll neck and rib",
      },
    ],
  },
  {
    slug: "roll-neck-jumper-grey",
    name: "Roll-neck jumper",
    category: "knitwear",
    department: "men",
    priceCents: 430_00,
    colour: "Pale grey",
    stock: [
      ["S", 0],
      ["M", 2],
      ["L", 1],
      ["XL", 0],
    ],
    description:
      "A ribbed roll-neck in brushed wool and cashmere, close through the shoulder and easy through the body.",
    details: ["90% wool, 10% cashmere", "Ribbed throughout", "Dry clean or hand wash cold"],
    images: [
      {
        src: unsplash("1760006502808-e44ef11b3bfa", 2000),
        alt: "Man in a pale grey roll-neck jumper and trousers sitting on a low wall",
      },
      {
        src: detail("1760006502808-e44ef11b3bfa", 0.5, 0.47, 2.4),
        alt: "Close view of the ribbed roll neck",
      },
    ],
  },
  {
    slug: "leather-belt-brown",
    name: "Leather belt",
    category: "accessories",
    department: "men",
    priceCents: 220_00,
    colour: "Dark brown",
    stock: [
      ["85", 2],
      ["90", 3],
      ["95", 3],
      ["100", 2],
    ],
    description:
      "A 35 mm belt in oiled bridle leather with a hand-burnished edge and a solid nickel roller buckle.",
    details: ["Oiled bridle leather", "Solid nickel roller buckle", "Width 35 mm", "Made in England"],
    images: [
      {
        src: unsplash("1664286074176-5206ee5dc878", 2000),
        alt: "Coiled dark brown leather belt with a silver buckle on a dark surface",
      },
      {
        src: detail("1664286074176-5206ee5dc878", 0.45, 0.45, 2.2),
        alt: "Close view of the roller buckle and keeper",
      },
    ],
  },
  {
    slug: "silk-scarf-ivory",
    name: "Silk twill scarf",
    category: "accessories",
    department: "women",
    priceCents: 280_00,
    colour: "Ivory",
    stock: [[null, 8]],
    description:
      "A large square of heavy silk twill with hand-rolled edges. Tie it at the neck, over the hair or on the handle of a bag.",
    details: ["100% silk twill", "Hand-rolled edges", "90 × 90 cm", "Dry clean only"],
    images: [
      {
        src: unsplash("1606259458027-54d2a728b6ab", 2000),
        alt: "Folds of ivory silk twill catching the light",
      },
      {
        src: detail("1606259458027-54d2a728b6ab", 0.5, 0.5, 2),
        alt: "Close view of the silk's sheen",
      },
    ],
  },
  {
    slug: "bifold-wallet-brown",
    name: "Bifold wallet",
    category: "accessories",
    department: "men",
    priceCents: 260_00,
    colour: "Brown",
    stock: [[null, 6]],
    description:
      "A slim bifold in vegetable-tanned leather with six card slots and a note compartment. Darkens to a rich patina.",
    details: ["Vegetable-tanned leather", "Six card slots", "11 × 9 cm closed"],
    images: [
      {
        src: unsplash("1627123424574-724758594e93", 2000),
        alt: "Brown leather bifold wallet against a dark green background",
      },
      {
        src: detail("1627123424574-724758594e93", 0.5, 0.55, 2.4),
        alt: "Close view of the worn leather edge",
      },
    ],
  },
  {
    slug: "leather-gloves-black",
    name: "Leather gloves",
    category: "accessories",
    department: "unisex",
    priceCents: 240_00,
    colour: "Black",
    stock: [
      ["S", 2],
      ["M", 4],
      ["L", 3],
    ],
    description:
      "Close-fitting gloves in soft lambskin with hand-stitched points on the back and a cashmere lining.",
    details: ["Lambskin leather", "Cashmere lining", "Hand-stitched points"],
    images: [
      {
        src: unsplash("1643650374762-196c86358df3", 2000),
        alt: "Hands in black leather gloves with stitched detailing",
      },
      {
        src: detail("1643650374762-196c86358df3", 0.6, 0.45, 2),
        alt: "Close view of the stitched points on the back of the glove",
      },
    ],
  },
  {
    slug: "cotton-t-shirt-white",
    name: "Cotton T-shirt",
    category: "jersey",
    department: "men",
    priceCents: 120_00,
    colour: "White",
    stock: [
      ["S", 6],
      ["M", 8],
      ["L", 6],
      ["XL", 4],
    ],
    description:
      "A crew-neck T-shirt in dense combed cotton jersey that holds its shape wash after wash.",
    details: ["100% combed cotton jersey", "Ribbed crew neck", "Machine wash at 30°C"],
    images: [
      {
        src: unsplash("1778671394516-8270eac13c42", 2000),
        alt: "White crew-neck T-shirt on a wooden hanger against a pale wall",
      },
      {
        src: detail("1778671394516-8270eac13c42", 0.5, 0.25, 2.2),
        alt: "Close view of the ribbed crew neck",
      },
    ],
  },
  {
    slug: "cotton-t-shirt-black",
    name: "Boxy T-shirt",
    category: "jersey",
    department: "women",
    priceCents: 120_00,
    colour: "Black",
    stock: [
      ["XS", 3],
      ["S", 5],
      ["M", 5],
      ["L", 3],
    ],
    description:
      "A boxy T-shirt in heavyweight cotton jersey, cut short and wide with dropped shoulders.",
    details: ["100% organic cotton jersey", "Dropped shoulders", "Machine wash at 30°C"],
    images: [
      {
        src: detail("1610502778270-c5c6f4c7d575", 0.5, 0.5, 1.4),
        alt: "Black T-shirt on a wooden hanger against a white background",
      },
      {
        src: detail("1610502778270-c5c6f4c7d575", 0.5, 0.3, 2.5),
        alt: "Close view of the neckline",
      },
    ],
  },
  {
    slug: "pocket-t-shirt-stone",
    name: "Pocket T-shirt",
    category: "jersey",
    department: "men",
    priceCents: 150_00,
    colour: "Stone",
    stock: [
      ["S", 2],
      ["M", 3],
      ["L", 3],
      ["XL", 1],
    ],
    description:
      "A relaxed T-shirt in slubby cotton jersey with a patch pocket and turned-back sleeves.",
    details: ["100% cotton slub jersey", "Patch chest pocket", "Machine wash at 30°C"],
    images: [
      {
        src: unsplash("1660983414551-b3758336be15", 2000),
        alt: "Man in a stone pocket T-shirt and brown trousers by a corrugated wall",
      },
      {
        src: detail("1660983414551-b3758336be15", 0.55, 0.5, 2.2),
        alt: "Close view of the patch pocket",
      },
    ],
  },
  {
    slug: "gold-band-ring",
    name: "Gold band ring",
    category: "jewellery",
    department: "unisex",
    priceCents: 450_00,
    colour: "Gold",
    stock: [
      ["50", 1],
      ["52", 2],
      ["54", 2],
      ["56", 2],
      ["58", 1],
      ["60", 0],
    ],
    description: "A polished court-shaped band in solid 14k gold, 4 mm wide.",
    details: ["Solid 14k yellow gold", "Court profile, 4 mm wide", "Presented in a gift box"],
    images: [
      {
        src: unsplash("1622398925373-3f91b1e275f5", 2000),
        alt: "Two polished gold band rings resting on a pale fabric",
      },
      {
        src: detail("1622398925373-3f91b1e275f5", 0.5, 0.5, 2),
        alt: "Close view of the band's polished surface",
      },
    ],
  },
  {
    slug: "stone-set-bangle-gold",
    name: "Stone-set bangle",
    category: "jewellery",
    department: "women",
    priceCents: 380_00,
    colour: "Gold and peach",
    stock: [[null, 3]],
    description:
      "A fine open bangle in gold-plated sterling silver, set with four faceted peach stones.",
    details: [
      "18k gold plate on sterling silver",
      "Faceted peach topaz",
      "Inner diameter 58 mm",
      "Presented in a gift box",
    ],
    images: [
      {
        src: unsplash("1689367436629-1d288f1e23b6", 2000),
        alt: "Gold bangle set with four peach stones against travertine",
      },
      {
        src: detail("1689367436629-1d288f1e23b6", 0.5, 0.6, 2.2),
        alt: "Close view of the faceted stones",
      },
    ],
  },
  {
    slug: "hammered-silver-band",
    name: "Hammered silver band",
    category: "jewellery",
    department: "men",
    priceCents: 190_00,
    colour: "Silver",
    stock: [
      ["58", 1],
      ["60", 2],
      ["62", 2],
      ["64", 1],
      ["66", 0],
    ],
    description:
      "A wide band in recycled sterling silver, hand-hammered for a textured surface that catches the light.",
    details: ["Recycled sterling silver", "Hand-hammered finish, 6 mm wide", "Presented in a gift box"],
    images: [
      {
        src: unsplash("1620968867360-5cda83d2bffd", 2000),
        alt: "Two hammered silver band rings resting on a wooden surface",
      },
      {
        src: detail("1620968867360-5cda83d2bffd", 0.6, 0.45, 2),
        alt: "Close view of the hammered texture",
      },
    ],
  },
];
