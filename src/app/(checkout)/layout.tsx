"use client"
import React from "react";
import { AddressProvider } from "../context/AddressContext";

export default function Layout({
                                   children,
                               }: Readonly<{
    children: React.ReactNode;
}>) {

    return (
      <AddressProvider>
        <div className={"bg-[#efefef] p-6"}>
          <div>{children}</div>
        </div>
      </AddressProvider>
    );
}
