"use client"
import React from "react";

export default function Layout({
                                   children,
                               }: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div className={"bg-[#efefef] p-6"}>
            <div>{children}</div>
        </div>
    );
}
