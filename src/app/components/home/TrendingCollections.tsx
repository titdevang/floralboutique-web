import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

const TrendingCollections = () => {
  return (
    <div className=" relative h-[150px] md:h-[400px] w-full">
      <Link href={"/category/online-flower-delivery-in-bangalore"}>
        <Image
          src={"/assets/images/trending-collection.webp"}
          alt="floralboutique"
          fill
          className=" object-cover rounded-[20px]"
        />
      </Link>
    </div>
  );
}

export default TrendingCollections