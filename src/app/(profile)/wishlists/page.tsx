"use client";
import WishlistCard from "@/app/components/ui/card/WishlistCard";
import { Product } from "@/app/types/Product";
import React from "react";


const page = () => {
  const dummyData = [
    {
      id: 1,
      name: "Red Roses Bouquet",
      finalPrice: 499,
      rating: 4.5,
      totalReviews: 120,
      imageUrl: "/assets/images/red-roses.webp",
      slug: "red-roses-bouquet",
    },
    {
      id: 2,
      name: "Mixed Flowers Basket",
      finalPrice: 799,
      rating: 4.8,
      totalReviews: 85,
      imageUrl: "/assets/images/mixed-flowers.webp",
      slug: "mixed-flowers-basket",
    },
    {
      id: 3,
      name: "Orchid Plant",
      finalPrice: 1299,
      rating: 4.2,
      totalReviews: 50,
      imageUrl: "/assets/images/orchid-plant.webp",
      slug: "orchid-plant",
    },
    {
      id: 4,
      name: "Sunflower Bunch",
      finalPrice: 599,
      rating: 4.0,
      totalReviews: 90,
      imageUrl: "/assets/images/sunflower-bunch.webp",
      slug: "sunflower-bunch",
    },
  ];
  return (
    <div className="border border-gray-light p-3 md:p-6">
      <h2 className="text-xl font-semibold mb-4">Wishlist</h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        {dummyData.map((item, index) => {
          return <WishlistCard product={item as Product} key={index} categoryName="" />;
        })}
      </div>
    </div>
  );
};

export default page;
