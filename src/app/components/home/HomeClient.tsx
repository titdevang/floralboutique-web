"use client";

import { useHomeItem } from "@/app/context/HomeItemContext";
import HomePageSkeleton from "../ui/loader/HomePageSkeleton";
import HeaderCategoryMenu from "./HeaderCategoryMenu";
import HandDelivered from "./HandDelivered";
import TopTrendingProducts from "./TopTrendingProducts";
import SayItwithFlowers from "./SayItwithFlowers";
import TrendingCollections from "./TrendingCollections";
import YourFavouriteBlooms from "./YourFavouriteBlooms";
import MultiCategoryCarousel from "./MultiCategoryCarousel";
import OurCustomersLoveUs from "./OurCustomersLoveUs";
import Testimonial from "./Testimonial";
import WhyTrustUs from "./WhyTrustUs";
import { Suspense } from "react";
import ResponsiveCarousel from "./slider";

export default function HomeClient() {
  const { categoryMenu } = useHomeItem();

  if (categoryMenu.length === 0) return <HomePageSkeleton />;

  return (
    <div className="w-full space-y-10 ">
      <Suspense fallback={<HomePageSkeleton />}>
        <HeaderCategoryMenu />
        <ResponsiveCarousel />
        <HandDelivered />
        <TopTrendingProducts />
        <SayItwithFlowers />
        <TrendingCollections />
        <YourFavouriteBlooms />
        <MultiCategoryCarousel categoryMenu={categoryMenu} />
        <OurCustomersLoveUs />
        <Testimonial />
        <WhyTrustUs />
      </Suspense>
    </div>
  );
}
