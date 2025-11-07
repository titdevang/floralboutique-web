"use client"
import React from "react";

export default function Layout({
                                   children,
                               }: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div className={"container py-10"}>
            <div>{children}</div>
        </div>
    );
}
