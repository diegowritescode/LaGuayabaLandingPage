import { Hero } from "@/components/home/Hero";
import { BrandMarquee } from "@/components/home/BrandMarquee";
import { StorySection } from "@/components/home/StorySection";
import { FeaturedDishes } from "@/components/home/FeaturedDishes";
import { MenuPreview } from "@/components/home/MenuPreview";
import { Gallery } from "@/components/home/Gallery";
import { EventsSection } from "@/components/home/EventsSection";
import { Testimonials } from "@/components/home/Testimonials";
import { CTAReservation } from "@/components/home/CTAReservation";
import { LocationMap } from "@/components/home/LocationMap";
import { RestaurantJsonLd } from "@/components/shared/JsonLd";

export default function HomePage() {
  return (
    <>
      <RestaurantJsonLd />
      <Hero />
      <BrandMarquee />
      <StorySection />
      <FeaturedDishes />
      <MenuPreview />
      <Gallery />
      <EventsSection />
      <Testimonials />
      <CTAReservation />
      <LocationMap />
    </>
  );
}
