"use client";
import React from "react";
import OrderDetails from "@/app/components/checkout/OrderDetails";
import OrderDeliveryAddress from "@/app/components/checkout/OrderDeliveryAddress";

const OrderDeliveryDetails = () => {

    return (
        <div className="p-6 bg-white rounded-[40px]">
            <div className={"flex items-center gap-4"}>
                <div className={"bg-primary w-10 h-10"}>
                    <p className={"text-white flex items-center justify-center h-full text-md"}>
                        2
                    </p>
                </div>
                <div>
                    <p className={"text-md"}>
                        Order & Delivery Details
                    </p>
                </div>
            </div>
            <div>
                <OrderDetails/>
            </div>
            <div>
                <OrderDeliveryAddress/>
            </div>
        </div>
    );
};

export default OrderDeliveryDetails;