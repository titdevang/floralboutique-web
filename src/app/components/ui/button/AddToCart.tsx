"use client";

import React from "react";
import {Product} from "@/app/types/Product";
import Image from "next/image";

interface AddToCartProps {
    product: Product;
    children?: React.ReactNode;
    className?: string;
    onAdded?: (product: Product) => void;
}

const AddToCart: React.FC<AddToCartProps> = ({
                                                 product,
                                                 children,
                                                 className,
                                                 onAdded
                                             }) => {

    const handleAddToCart = (product: Product) => {
        onAdded?.(product);
    };

    return (
        <div>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAddToCart(product);
                }}
                type="button"
                className={className}
            >
                {children ? (
                    children
                ) : (
                    <span className="!text-white font-[600] text-center flex items-center gap-2">
          Add to cart{" "}
                        <Image
                            src={"/assets/svg/addToCart.svg"}
                            alt="cart"
                            width={18}
                            height={18}
                        />
        </span>
                )}
            </button>
        </div>
    );
};

export default AddToCart;
