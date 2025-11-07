"use client";
import React from "react";
import DeliveryCard from "@/app/components/checkout/DeliveryCard";
import {useCart} from "@/app/context/CartContext";

const OrderDetails = () => {
    const {cartData} = useCart()
    return (
        <div className={"w-full divide-y divide-gray-light py-4"}>
            {
                cartData.map((product, index) => {
                    return (
                        <div key={index} className={"w-full"}>
                            <DeliveryCard product={product}/>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default OrderDetails;