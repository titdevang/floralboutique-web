import { Product, ProductCardProps } from "@/app/types/Product";
import Link from "next/link";
import React, {memo, useState} from "react";
import ImageWithFallback from "../fields/ImageWithFallback";
import AddToCart from "@/app/components/ui/button/AddToCart";
import Modal from "@/app/components/ui/modal/modal";
import ProductDetail from "@/app/components/section/ProductDetailComponent";

const CategoryCard: React.FC<ProductCardProps> = memo(({ product }) => {
    const [addedProduct, setAddedProduct] = useState<null | Product>(null);

  return (
    <div className="select-none p-1 h-full">
        <Modal
            isOpen={!!addedProduct}
            onClose={() => setAddedProduct(null)}
            title="Added to your cart"
        >
            <ProductDetail slug={addedProduct?.slug || ""} />
        </Modal>
      <Link
        href={"/product/" + product.slug}
        className="group  h-full duration-300 select-none flex flex-col justify-between"
      >
        <div className="flex flex-col h-full rounded-md bg-product-card border border-neutral-200 hover:shadow-[0px_0px_20px_-1px_rgba(0,0,0,0.17)] duration-300 overflow-hidden pb-2">
          <div className="relative w-full aspect-square mb-3 overflow-hidden">
            <ImageWithFallback
              src={product.imageUrl || ""}
              alt={product.name || ""}
              fill
              className="object-cover pointer-events-none group-hover:scale-105 duration-500"
              loading="lazy"
            />
              <AddToCart product={product} onAdded={(p) => setAddedProduct(p)}  className="absolute z-20 -bottom-0.5 w-full py-1.5 bg-black hover:bg-opacity-100 bg-opacity-65 transform translate-y-full group-hover:translate-y-0 transition-all duration-300 ease-in-out flex justify-center"/>
          </div>
          <div className="flex flex-col flex-grow justify-between h-[75px] md:px-3 px-1">
            <h3 className=" line-clamp-2 group-hover:text-primary duration-300">
              {product.name}
            </h3>

            <div className="flex items-center justify-between ">
              <p className="text-primary font-bold">₹{product.finalPrice}</p>
              <div className="text-sm">
                <span>
                  {product.rating}{" "}
                  <span className="text-yellow-500 text-[20px]">★</span>
                </span>
                <span className="ml-1">({product.totalReviews})</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
});

CategoryCard.displayName = "CategoryCard";

export default CategoryCard;
