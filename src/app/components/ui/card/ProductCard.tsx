import { Product, ProductCardProps } from "@/app/types/Product";
import Link from "next/link";
import React, {memo, useState} from "react";
import ImageWithFallback from "../fields/ImageWithFallback";
// import AddToCart from "@/app/components/ui/button/AddToCart";
import Modal from "@/app/components/ui/modal/modal";
import ProductDetail from "@/app/components/section/ProductDetailComponent";

const ProductCard: React.FC<ProductCardProps> = memo(({ product }) => {
    const [addedProduct, setAddedProduct] = useState<null | Product>(null);

  return (
    <div className="p-2 select-none h-full">
        <Modal
            isOpen={!!addedProduct}
            onClose={() => setAddedProduct(null)}
            title="Added to your cart"
        >
            <ProductDetail slug={addedProduct?.slug || ""} />
        </Modal>
      <Link
        href={"/product/" + product.slug}
        className="group h-full bg-product-card border border-neutral-200 hover:shadow-[0px_0px_20px_-10px_rgba(0,0,0,0.59)] duration-300 select-none rounded-xl p-2  flex flex-col justify-between"
      >
        <div className="flex flex-col h-full ">
          <div className="relative w-full aspect-square mb-3 rounded-lg overflow-hidden">
            <ImageWithFallback
              src={product.imageUrl || ""}
              alt={product.name || ""}
              fill
              className="object-cover pointer-events-none group-hover:scale-105 duration-500"
              loading="lazy"
            />
              {product.discount?.discount && <h4 className="absolute z-20 bg-primary text-white top-2 left-2 px-2 py-0.5 rounded-tl-md rounded-sm">
                  {
                      product.discount?.discount_type == 'percent' ? <span>-{product.discount?.discount}%</span> : <span>-₹{product.discount?.discount}</span>
                  }

              </h4>}
              {/*<AddToCart product={product} onAdded={(p) => setAddedProduct(p)}  className="absolute z-20 -bottom-0.5 w-full py-1.5 bg-black hover:bg-opacity-100 bg-opacity-65 transform translate-y-full group-hover:translate-y-0 transition-all duration-300 ease-in-out flex justify-center"/>*/}
          </div>
          <div className="flex flex-col flex-grow justify-between">
            <h3 className="mb-2 line-clamp-2 text-gray-extra-dark group-hover:text-primary duration-300">
              {product.name}
            </h3>

            <div className="flex items-center justify-between mt-auto">
                { product.finalPrice == product.unitPrice ?
                    <p className="text-primary font-bold">₹{product.finalPrice}</p>
                    :
                    <div className={"flex items-center gap-1"}>
                        <p className="text-gray-dark line-through ">₹{product.unitPrice}</p>
                        <p className="text-primary font-bold">₹{product.finalPrice}</p>
                    </div>
                }
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

ProductCard.displayName = "ProductCard";

export default ProductCard;
