"use client"
import React from "react";
import {AddressProvider} from "../context/AddressContext";
import {LocationHierarchyProvider} from "@/app/context/LocationHierarchyContext";

export default function Layout({
                                   children,
                               }: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <LocationHierarchyProvider>
            <AddressProvider>
                <div className={"bg-[#efefef] py-6"}>
                    <div className=" container">{children}</div>
                </div>
            </AddressProvider>
        </LocationHierarchyProvider>
    );
}
