"use client";

import Image from "next/image";
import SvgIcon from "@/app/components/ui/SvgIcon";
import {useCart} from "@/app/context/CartContext";
import {Product} from "@/app/types/Product";
import DeliveryCardSkeleton from "../ui/loader/DeliveryCardSkeleton";
import ChangeDeliveryModal from "./ChangeDeliveryModal";
import {formatDate} from "@/app/lib/formatDate";

interface DeliveryCardProps {
    product: Product;
}
const DeliveryCard: React.FC<DeliveryCardProps> = ({product}) => {

    const {updateQuantity, removeFromCart} = useCart();

    const handleIncrement = (cartId: number) => {
        updateQuantity({ ...product, id: cartId }, (product.quantity || 0) + 1);
    };

    const handleDecrement = (cartId: number) => {
      if ((product.quantity || 0) > 1) {
        updateQuantity({ ...product, id: cartId }, (product.quantity || 0) - 1);
      }
    };

    const handleRemoveProduct = (id: number) => {
        removeFromCart(id);
    };

    return (
      <div className="flex flex-col md:flex-row justify-between items-start md:items-start gap-6 py-4">
        {/* Left Section */}
        <div className="flex flex-col items-start justify-start gap-4 w-full md:w-1/2">
          <div className="flex items-start gap-4 w-full">
            <div className={"flex items-center flex-col gap-2"}>
              <div className="relative rounded-lg overflow-hidden">
                <Image
                  src={product.productData?.imageUrl || "/placeholder.jpg"}
                  alt={product.productData?.name || ""}
                  width={70}
                  height={70}
                  className="rounded-md object-cover"
                />
              </div>
              <button
                type={"button"}
                onClick={() => handleRemoveProduct(Number(product?.id))}
                className="flex items-center gap-1 text-[11px] text-muted "
              >
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
              <p className="font-medium">{product.productData?.name}</p>
              <div className={"flex items-center gap-6"}>
                <p className="text-sm text-gray-extra-dark">
                  ₹{product.productData?.finalPrice} × {product.quantity}
                </p>
                <div className="flex items-center gap-3 text-primary">
                  <button
                    type={"button"}
                    onClick={() => handleDecrement(product.id)}
                    className="text-3xl font-medium"
                  >
                    −
                  </button>
                  <button
                    type={"button"}
                    onClick={() => handleIncrement(product.id)}
                    className="text-3xl font-medium"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
          {!!product.addonProducts?.length &&
            product.addonProducts.map((addonProduct, index) => (
              <div key={index} className="flex items-start gap-4 w-full">
                <div className={"flex items-center flex-col gap-2"}>
                  <div className="relative rounded-lg overflow-hidden">
                    <Image
                      src={addonProduct?.imageUrl || "/placeholder.jpg"}
                      alt={addonProduct?.name || ""}
                      width={70}
                      height={70}
                      className="rounded-md object-cover"
                    />
                  </div>
                  <button
                    type={"button"}
                    name={"delete"}
                    onClick={() => handleRemoveProduct(addonProduct.cart_id)}
                    className="flex items-center gap-1 text-[11px] text-muted "
                  >
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
                  <p className="font-medium">{addonProduct?.name}</p>
                  <div className={"flex items-center gap-6"}>
                    <p className="text-sm text-gray-extra-dark">
                      ₹{addonProduct?.finalPrice} × {addonProduct.quantity}
                    </p>
                    <div className="flex items-center gap-3 text-primary">
                      <button
                        type={"button"}
                        onClick={() => handleDecrement(addonProduct.cart_id)}
                        className="text-3xl font-medium"
                      >
                        −
                      </button>
                      <button
                        type={"button"}
                        onClick={() => handleIncrement(addonProduct.cart_id)}
                        className="text-3xl font-medium"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Right Section */}
        <div className="flex flex-row items-start md:items-center md:justify-end gap-6 justify-between ">
          <div className="text-xs text-muted">
            <p className="text-dark text-sm font-medium">Delivery On</p>
            <p className="mt-1">
              {formatDate(new Date(product.deliveryDate))}
              {/* Wed,{" "}
              <span className="font-semibold">
                13<sup>th</sup> Aug, 2025
              </span> */}
            </p>
            <p className="mt-1">
              {product?.deliveryType as unknown as string}: ₹
              {product?.deliveryPrice}
            </p>
            <p className="mt-1">
              {product?.deliveryTimeSlot as unknown as string}
            </p>
          </div>
          <ChangeDeliveryModal product={product} />
        </div>
      </div>
    );
}

export default DeliveryCard