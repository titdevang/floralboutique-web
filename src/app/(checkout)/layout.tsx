"use client";
import React from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={"bg-[#efefef] py-6"}>
      <div className=" container">{children}</div>
    </div>
  );
}
