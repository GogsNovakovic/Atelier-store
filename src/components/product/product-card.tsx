import Image from "next/image";
import Link from "next/link";

import { WishlistButton } from "@/components/product/wishlist-button";
import { formatPrice, getStockState, type Product } from "@/lib/catalog";

export function ProductCard({
  product,
  sizes = "(min-width: 64rem) 25vw, 50vw",
}: {
  product: Product;
  sizes?: string;
}) {
  const soldOut = getStockState(product).status === "sold-out";

  return (
    <article className="group relative">
      <div className="media-stage aspect-product">
        <Image
          src={product.image.src}
          alt={product.image.alt}
          fill
          sizes={sizes}
          className="transition-transform duration-700 ease-luxe group-hover:scale-[1.03]"
        />
      </div>

      <div className="absolute right-2 top-2 z-10">
        <WishlistButton productName={product.name} />
      </div>

      <div className="mt-3 flex flex-col gap-1 px-1 sm:px-0">
        {soldOut ? (
          <p className="label text-muted">Sold out</p>
        ) : product.isNew ? (
          <p className="label text-muted">New</p>
        ) : null}
        <h3 className="text-ui">
          {/* Stretched link: the whole card is the click target, the save button sits above it. */}
          <Link href={`/products/${product.slug}`} className="after:absolute after:inset-0">
            {product.name}
          </Link>
        </h3>
        <p className="numeric text-ui text-muted">{formatPrice(product.price)}</p>
      </div>
    </article>
  );
}
