import React from "react";
import ProductCarousel from "../ui/slider/ProductCarousel";
import { useHomeItem } from "@/app/context/HomeItemContext";

const TopTrendingProducts = () => {
  const { trandingProducts } = useHomeItem();

  return (
    <div>
      <div>
        <h4 className="heading-2 mb-2">Top Trending Products</h4>
      </div>
      <ProductCarousel products={trandingProducts} categoryName="" />
    </div>
  );
};

export default TopTrendingProducts;
