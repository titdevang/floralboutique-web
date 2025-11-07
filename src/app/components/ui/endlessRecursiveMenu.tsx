"use client";
import React, { useState } from "react";

interface MenuItem {
  name: string;
  subMenu?: MenuItem[];
}

const RecursiveMenu: React.FC<{ items: MenuItem[] }> = ({ items }) => {
  const [activeItem, setActiveItem] = useState<number | null>(null);

  return (
    <div className="flex bg-white h-full font-bold">
      {/* Current column */}
      <div className="h-full" onMouseLeave={() => setActiveItem(null)}>
        {items.map((item, idx) => (
          <div
            key={idx}
            className="group px-4 py-2 font-bold cursor-pointer flex justify-between items-center gap-4"
            onMouseEnter={() => setActiveItem(idx)}
          >
            <span className="group-hover:text-primary truncate duration-500">
              {item.name}
            </span>
            {item.subMenu && (
              <span className="group-hover:text-primary duration-500">›</span>
            )}
          </div>
        ))}
      </div>

      {/* Next level (recursively rendered) */}
      {activeItem !== null && items[activeItem].subMenu && (
        <div
          className="px-5 w-full h-full"
          onMouseEnter={() => setActiveItem(activeItem)}
          onMouseLeave={() => setActiveItem(null)}
        >
          <RecursiveMenu items={items[activeItem].subMenu!} />
        </div>
      )}
    </div>
  );
};

export default RecursiveMenu;
