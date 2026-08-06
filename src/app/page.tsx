import { HeroBanner } from "@/components/home/HeroBanner";
import { CraftBadges } from "@/components/home/CraftBadges";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { CollectionSpotlight } from "@/components/home/CollectionSpotlight";
import { ProductCarousel } from "@/components/home/ProductCarousel";
import { ArtisanStory } from "@/components/home/ArtisanStory";
import { SilkCareGuide } from "@/components/home/SilkCareGuide";
import { CustomerReviews } from "@/components/home/CustomerReviews";
import { InstagramFeed } from "@/components/home/InstagramFeed";
import { NewsletterSection } from "@/components/home/NewsletterSection";

export default function HomePage() {
  return (
    <div className="space-y-0">
      <HeroBanner />
      <CraftBadges />
      <CategoryGrid />
      <CollectionSpotlight />
      <ProductCarousel />
      <ArtisanStory />
      <SilkCareGuide />
      <CustomerReviews />
      <InstagramFeed />
      <NewsletterSection />
    </div>
  );
}
