import YourFavouriteBloomsCard from "../ui/card/YourFavouriteBloomsCard";

const YourFavouriteBlooms = () => {
  const cardData = [
    {
      id: 1,
      image: "/assets/images/defualt-floralboutique.webp",
      title: `Say\n“Get well soon”`,
      link: "",
    },
    {
      id: 2,
      image: "/assets/images/defualt-floralboutique.webp",
      title: `Say\n“Happy Birthday”`,
      link: "",
    },
    {
      id: 3,
      image: "/assets/images/defualt-floralboutique.webp",
      title: `Say\n“Congratulations”`,
      link: "",
    },
  ];
  return (
    <div>
      <div>
        <h4 className="heading-2">Your Favourite Blooms</h4>
      </div>
      <div className="flex flex-wrap items-center justify-center mt-4 gap-2 md:gap-4">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="flex-[0_0_40%] sm:flex-[0_0_30%] lg:flex-[0_0_20%]"
          >
            <YourFavouriteBloomsCard
              item={card}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default YourFavouriteBlooms;
