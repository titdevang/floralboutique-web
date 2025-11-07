import { ProductCardProps } from "@/app/types/Product";
import React from "react";
import ImageWithFallback from "../fields/ImageWithFallback";

const YourFavouriteBloomsCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="flex flex-col items-center justify-start bg-[#fceae5] text-primary rounded-lg overflow-hidden p-2 md:p-4 text-center">
      <div className="relative w-full aspect-square mb-4">
        <ImageWithFallback
          src={product.imageUrl || "/assets/images/placeholder.jpg"}
          alt={product.name || "Product image"}
          fill
          className="rounded-md"
        />
      </div>
      <p className="text-sm md:text-base font-semibold whitespace-pre-line">
        {product.name}
      </p>
    </div>
  );
};

export default YourFavouriteBloomsCard;
