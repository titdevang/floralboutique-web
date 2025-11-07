import Image from "next/image";
import Link from "next/link";
import React from "react";

const HandDelivered = () => {
  const homeDeliverdList = [
    {
      name: "Bangalore",
      route:
        "/category/online-flower-delivery-in-bangalore?utm_source=homepage&utm_medium=city_links&utm_campaign=city_pages_promo&utm_content=bangalore_link",
      src: "/assets/homeDelivered/Bangalore.png",
    },
    {
      name: "Delhi-NCR",
      route:
        "/category/online-flower-delivery-in-delhi?utm_source=homepage&utm_medium=city_links&utm_campaign=city_pages_promo&utm_content=delhi_link",
      src: "/assets/homeDelivered/Delhi.png",
    },
    {
      name: "Mumbai",
      route:
        "/category/online-flower-delivery-in-mumbai?utm_source=homepage&utm_medium=city_links&utm_campaign=city_pages_promo&utm_content=mumbai_link",
      src: "/assets/homeDelivered/Mumbai.png",
    },
    {
      name: "Pune",
      route:
        "/category/online-flower-delivery-in-pune?utm_source=homepage&utm_medium=city_links&utm_campaign=city_pages_promo&utm_content=pune_link",
      src: "/assets/homeDelivered/Pune.png",
    },
  ];
  return (
    <div>
      <div>
        <h4 className="heading-1">Hand Delivered With Love</h4>
      </div>
      <div className="mt-4 sm:mt-6">
        <div className="flex items-center justify-between gap-2 md:gap-8">
          {homeDeliverdList.map((item, index) => (
            <Link href={item.route} key={index}>
              <div>
                <Image
                  src={item.src}
                  alt={item.name + index}
                  width={640}
                  height={360}
                  className="rounded-[15px] md:rounded-[20px]"
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "auto"}
                  sizes="(max-width: 768px) 100vw, 640px"
                />
              </div>
              <span className=" md:text-[20px] truncate inline-block pt-[10px] text-center w-full font-[600] text-primary">
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HandDelivered;
