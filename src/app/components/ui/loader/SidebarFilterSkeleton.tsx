"use client";

import React from "react";

const SidebarFilterSkeleton = () => {
    return (
        <aside className="w-full  space-y-6 animate-pulse">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-3">
                    <div className="h-6 bg-gray rounded" />
                </div>
            ))}
        </aside>
    );
};

export default SidebarFilterSkeleton;