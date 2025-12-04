"use client";
import React from "react";
import { CheckoutProvider } from "@/app/context/CheckoutContext";
import PriceDetails from "@/app/components/checkout/PriceDetails";
import { LocationHierarchyProvider } from "@/app/context/LocationHierarchyContext";
import { AddressProvider } from "@/app/context/AddressContext";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LocationHierarchyProvider>
      <AddressProvider>
        <CheckoutProvider>
          <div className={"lg:grid grid-cols-3 gap-6 space-y-6 lg:space-y-0"}>
            <div className="w-full h-full col-span-2">{children}</div>
            <div className={"col-span-1 w-full"}>
              {/* Order Summary */}
              <PriceDetails />
            </div>
          </div>
        </CheckoutProvider>
      </AddressProvider>
    </LocationHierarchyProvider>
  );
}
