import React from "react";
import YourFavouriteBloomsCard from "../ui/card/YourFavouriteBloomsCard";
import { Product } from "@/app/types/Product";

const YourFavouriteBlooms = () => {
  const cardData = [
    {
      id: 1,
      imageUrl: "/assets/images/defualt-floralboutique.webp",
      name: `Say\n“Get well soon”`,
      slug: "",
    },
    {
      id: 2,
      imageUrl: "/assets/images/defualt-floralboutique.webp",
      name: `Say\n“Happy Birthday”`,
      slug: "",
    },
    {
      id: 3,
      imageUrl: "/assets/images/defualt-floralboutique.webp",
      name: `Say\n“Congratulations”`,
      slug: "",
    },
  ];
  return (
    <div>
      <div>
        <h4 className="heading-2">Your Favourite Blooms</h4>
      </div>
      <div className="flex flex-wrap md:gap-4 gap-3 justify-center mt-4">
        {cardData.map((card, index) => (
          <YourFavouriteBloomsCard product={card as Product} key={index} categoryName="" />
        ))}
      </div>
    </div>
  );
};

export default YourFavouriteBlooms;
