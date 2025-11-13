"use client";

import Image from "next/image";
import SvgIcon from "@/app/components/ui/SvgIcon";
import {useCart} from "@/app/context/CartContext";
import {Product} from "@/app/types/Product";

interface DeliveryCardProps {
    product: Product;
}
const DeliveryCard: React.FC<DeliveryCardProps> = ({product}) => {

    const {updateQuantity, removeFromCart} = useCart();

    const handleIncrement = () => {
        updateQuantity(
          product.id,
          (product.quantity || 0) + 1,
          product.cart_id
        );
    };

    const handleDecrement = () => {
        if ((product.quantity || 0) > 1) {
            updateQuantity(product.id, (product.quantity || 0) - 1, product.cart_id);
        }
    };

    const handleRemoveProduct = () => {
        removeFromCart(product.cart_id);
    };

    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-start gap-6 md:p-5 py-4">
            {/* Left Section */}
            <div className="flex items-start gap-4 w-full md:w-1/2">
                <div className={"flex items-center flex-col gap-2"}>
                    <div className="relative rounded-lg overflow-hidden">
                        <Image
                            src={product.imageUrl || "/placeholder.jpg"}
                            alt={product.name}
                            width={70}
                            height={70}
                            className="rounded-md object-cover"
                        />
                    </div>
                    <button type={"button"} onClick={handleRemoveProduct}
                            className="flex items-center gap-1 text-[11px] text-muted ">
                        <SvgIcon
                            name={"delete.svg"}
                            width={16}
                            height={16}
                            fill={"currentColor"}
                            localImage={"delete.svg"}
                        />
                        Delete
                    </button>
                </div>

                <div className="flex flex-col justify-between">
                    <p className="font-medium">{product.name}</p>
                    <div className={"flex items-center gap-6"}>
                        <p className="text-sm text-gray-dark">₹{product.finalPrice} × {product.quantity}</p>
                        <div className="flex items-center gap-3 text-primary">
                            <button type={"button"} onClick={handleDecrement} className="text-3xl font-medium">−
                            </button>
                            <button type={"button"} onClick={handleIncrement} className="text-3xl font-medium">+
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Section */}
            <div className="flex flex-row items-start md:items-center md:justify-end gap-6 justify-between ">
                <div className="text-xs text-muted">
                    <p className="text-dark text-sm font-medium">Delivery On</p>
                    <p className="mt-1">Wed, <span className="font-semibold">13<sup>th</sup> Aug, 2025</span></p>
                    <p className="mt-1">Express Delivery: ₹29</p>
                    <p className="mt-1">17:00 – 21:00 Hrs</p>
                </div>

                <button
                    className=" px-5 py-2 text-primary border border-gray text-sm font-medium rounded-full transition">
                    CHANGE
                </button>
            </div>
        </div>
    );
}

export default DeliveryCard