"use client";

import React from "react";

import UserContactInfo from "@/app/components/checkout/UserContactInfo";
import OrderDeliveryDetails from "@/app/components/checkout/OrderDeliveryDetails";

export default function CheckoutPage() {


  return (
    <div className=" mx-auto space-y-6">

        {/*    -------- start User info --------------*/}
        <UserContactInfo/>
        {/*    -------- end User info --------------*/}

        {/*--------- start Shipping info-----------*/}
        <OrderDeliveryDetails/>
        {/*--------- end Shipping info-----------*/}

    </div>
  );
}
