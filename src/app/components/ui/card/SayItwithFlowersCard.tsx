import React from "react";
import ImageWithFallback from "../fields/ImageWithFallback";
import { SayItWithFlower } from "@/app/types/HomeItem";
import Link from "next/link";

interface SayItwithFlowersCardProps {
  item: SayItWithFlower;
}

const SayItwithFlowersCard: React.FC<SayItwithFlowersCardProps> = ({
  item,
}) => {
  return (
    <Link
      href={item.link}
      className="flex flex-col items-center justify-start bg-primary text-white rounded-lg overflow-hidden p-2 md:p-4 text-center"
    >
      <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-md ">
        <ImageWithFallback
          src={item.image}
          alt={item.title}
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

export default SayItwithFlowersCard;
