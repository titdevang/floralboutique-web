import React from "react";
import SayItwithFlowersCard from "../ui/card/SayItwithFlowersCard";
import { Product } from "@/app/types/Product";

const SayItwithFlowers = () => {
    const cardData = [
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
        <h4 className="heading-2">Say It with Flowers</h4>
      </div>
      <div className="flex flex-wrap md:gap-4 gap-3 justify-center mt-4">
        {cardData.length > 0 &&
          cardData.map((card, index) => (
            <SayItwithFlowersCard
              product={card as Product}
              key={index}
              categoryName={''}
            />
          ))}
      </div>
    </div>
  );
};

export default SayItwithFlowers;
