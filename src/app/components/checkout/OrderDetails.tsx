"use client";
import React from "react";
import DeliveryCard from "@/app/components/checkout/DeliveryCard";
import {useCart} from "@/app/context/CartContext";
import OrderDeliveryAddress from "./OrderDeliveryAddress";
import SvgIcon from "../ui/SvgIcon";

const OrderDetails = () => {
    const {cartData} = useCart()
    return (
        <div className={"w-full divide-y divide-gray-light py-4"}>
            {
                cartData.map((product, index) => {
                    return (
                      <div key={index} className={"w-full py-4 pt-10"}>
                        <div className="flex items-center text-primary gap-1 bg-soft-primary w-fit px-3 py-2 rounded-lg">
                          <SvgIcon
                            name={"gift.svg"}
                            width={20}
                            height={20}
                            fill={"currentColor"}
                            localImage={"gift.svg"}
                          />
                          Gift {index + 1}
                        </div>
                        <DeliveryCard product={product} />
                        <OrderDeliveryAddress product={product} />
                      </div>
                    );
                })
            }
        </div>
    );
};

export default OrderDetails;