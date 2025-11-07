import Link from 'next/link';
import React from 'react'
import CategoryImageCard from '../ui/card/CategoryImageCard';

const HandpickedCollection = () => {
      const homeDeliverdList = [
        {
          name: "Floral Boutique promo",
          route: "/",
          src: "https://floralboutique.in/uploads/all/qhlWK2aMZwjLHrzydvWdZh682nLNOTcOuyRCOcxw.webp",
        },
        {
          name: "Floral Boutique promo",
          route: "/",
          src: "https://floralboutique.in/uploads/all/FiVxWhslIZfnhPEVieRqYxRaEQmlke8dsUfwGHOI.webp",
        },
        {
          name: "Floral Boutique promo",
          route: "/",
          src: "https://floralboutique.in/uploads/all/ow6dTxox2SHGj6wusvVWtH8CT1QD490Jl1ZjHem1.webp",
        },
        {
          name: "Floral Boutique promo",
          route: "/",
          src: "https://floralboutique.in/uploads/all/ow6dTxox2SHGj6wusvVWtH8CT1QD490Jl1ZjHem1.webp",
        },
        {
          name: "Floral Boutique promo",
          route: "/",
          src: "https://floralboutique.in/uploads/all/ow6dTxox2SHGj6wusvVWtH8CT1QD490Jl1ZjHem1.webp",
        },
        {
          name: "Floral Boutique promo",
          route: "/",
          src: "https://floralboutique.in/uploads/all/ow6dTxox2SHGj6wusvVWtH8CT1QD490Jl1ZjHem1.webp",
        },
      ];
  return (
    <div>
      <div>
        <h4 className="heading-1">Hand Delivered With Love</h4>
        <p className="desc">Use the language of flowers to send your love</p>
      </div>
      <div className="mt-4 sm:mt-6">
        <div className="grid grid-cols-3 gap-x-8 gap-y-[8px]">
          {homeDeliverdList.map((item, index) => (
            <Link href={'/'} key={index}>
              <CategoryImageCard
                src={item.src}
                alt={item.name}
                name={item.name}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HandpickedCollection