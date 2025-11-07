"use client";

import {CategoryFilterProvider} from "@/app/context/CategoryFilterContext";

export default function Layout({
                                   children,
                               }: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div>
            <CategoryFilterProvider>
                {children}
            </CategoryFilterProvider>
        </div>
    );
}
