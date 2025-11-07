"use client";
import React from "react";
import CheckoutAddressList from "@/app/components/ui/card/CheckoutAddressCard";

const OrderDeliveryAddress = () => {
    return (
        <div className={"pt-6 border-gray-light border-t"}>
            <CheckoutAddressList/>
        </div>
    );
};

export default OrderDeliveryAddress;