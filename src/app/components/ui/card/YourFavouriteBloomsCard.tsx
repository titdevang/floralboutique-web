import React from "react";
import ImageWithFallback from "../fields/ImageWithFallback";
import Link from "next/link";
import { SayItWithFlower } from "@/app/types/HomeItem";

interface YourFavouriteBloomsCardProps {
  item: SayItWithFlower;
}

const YourFavouriteBloomsCard: React.FC<YourFavouriteBloomsCardProps> = ({
  item,
}) => {
  return (
    <Link
      href={item.link}
      className="flex flex-col items-center justify-start bg-[#fceae5] text-primary rounded-lg overflow-hidden p-2 md:p-4 text-center"
    >
      <div className="relative w-full aspect-square mb-4 rounded-md overflow-hidden">
        <ImageWithFallback
          src={item.image}
          alt={item.title || "Product image"}
          fill
          className="hover:scale-105 duration-500"
        />
      </div>
      <p className="text-sm md:text-base font-semibold whitespace-pre-line">
        {item.title}
      </p>
    </Link>
  );
};

export default YourFavouriteBloomsCard;
