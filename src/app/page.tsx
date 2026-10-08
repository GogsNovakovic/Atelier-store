import { Campaign } from "@/components/home/campaign";
import { Categories } from "@/components/home/categories";
import { FeaturedCollections } from "@/components/home/featured-collections";
import { Hero } from "@/components/home/hero";
import { Intro } from "@/components/home/intro";
import { NewArrivals } from "@/components/home/new-arrivals";
import { Services } from "@/components/home/services";

// New arrivals come from the database: refresh the prerendered page at most once a minute.
export const revalidate = 60;

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <NewArrivals />
      <FeaturedCollections />
      <Campaign />
      <Categories />
      <Services />
    </>
  );
}
