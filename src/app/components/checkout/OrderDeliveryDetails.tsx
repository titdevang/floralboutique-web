"use client";
import React from "react";
import OrderDetails from "@/app/components/checkout/OrderDetails";
import OrderDeliveryAddress from "@/app/components/checkout/OrderDeliveryAddress";
import SenderDetails from "./SenderDetails";
import {useCart} from "@/app/context/CartContext";
import SvgIcon from "@/app/components/ui/SvgIcon";
import DeliveryCardSkeleton from "@/app/components/ui/loader/DeliveryCardSkeleton";

const OrderDeliveryDetails = () => {
    const {cartData, loading} = useCart()

    return (
        <div className="py-6 md:px-6 px-4 bg-white rounded-[40px]">
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
            {
                loading ?
                    <div>
                        <DeliveryCardSkeleton/>
                        <DeliveryCardSkeleton/>
                    </div> :
                    cartData.length ?
                        <div>
                            <div>
                                <OrderDetails/>
                            </div>
                            <div>
                                <SenderDetails/>
                            </div>
                        </div> :
                        <div className={"flex items-center justify-center py-10"}>
                            <SvgIcon
                                name={"empty-cart.svg"}
                                width={180}
                                height={180}
                                fill={"currentColor"}
                                localImage={"empty-cart.svg"}
                            />
                        </div>
            }
        </div>
    );
};

export default OrderDeliveryDetails;