"use client";
import React from "react";
import CheckoutAddressList from "@/app/components/ui/card/CheckoutAddressCard";
import { Product } from "@/app/types/Product";

interface OrderDeliveryAddressProps {
    product: Product;
}
const OrderDeliveryAddress: React.FC<OrderDeliveryAddressProps> = ({product}) => {
    return (
      <div className={"pt-6"}>
        <CheckoutAddressList product ={product}/>
      </div>
    );
};

export default OrderDeliveryAddress;