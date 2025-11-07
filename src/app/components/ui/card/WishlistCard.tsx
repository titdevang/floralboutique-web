import { Product, ProductCardProps } from "@/app/types/Product";
import Link from "next/link";
import React, { memo } from "react";
import ImageWithFallback from "../fields/ImageWithFallback";
import { useCart } from "@/app/context/CartContext";
import SvgIcon from "../SvgIcon";

const WishlistCard: React.FC<ProductCardProps> = memo(({ product }) => {
  const { setCartData } = useCart();

  const handleAddToCart = (product: Product) => {
    setCartData((prev) => {
      const existingItem = prev.find((item) => item.id == product.id);

      if (existingItem) {
        return prev.map((item) =>
          item.id == product.id
            ? { ...item, quantity: (item.quantity ?? 0) + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  return (
    <div className="select-none p-1 h-full">
      <Link
        href={"/product/" + product.slug}
        className="group h-full duration-300 pb-4 select-none rounded-xl flex flex-col justify-between"
      >
        <div className="flex flex-col h-full border p-2 border-soft-light group-hover:shadow-2xl duration-500 shadow-secondary-base">
          <div className="relative w-full h-[140px] lg:h-[150px] mb-3 overflow-hidden">
            <ImageWithFallback
              src={product.imageUrl || ""}
              alt={product.name || ""}
              fill
              className="object-cover pointer-events-none group-hover:scale-105 duration-500"
              loading="lazy"
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleAddToCart(product);
              }}
              type="button"
              className="absolute z-20 -bottom-0.5 w-full py-1.5 bg-black hover:bg-opacity-100 bg-opacity-65 transform translate-y-full group-hover:translate-y-0 transition-all duration-300 ease-in-out flex justify-center"
            >
              <span className="!text-white font-[600] text-center flex items-center gap-2">
                Add to cart{" "}
                <SvgIcon
                  name="cart.svg"
                  width={18}
                  height={18}
                  localImage="cart.svg"
                  fill="currentColor"
                />
              </span>
            </button>
          </div>
          <div className="flex flex-col flex-grow justify-between max-h-[70px]">
            <h3 className="line-clamp-2 group-hover:text-primary duration-300 font-light">
              {product.name}
            </h3>

            <div className="text-center mt-1">
              <p className="text-primary font-bold">₹{product.finalPrice}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
});

WishlistCard.displayName = "WishlistCard";

export default WishlistCard;
