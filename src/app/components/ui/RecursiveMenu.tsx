"use client";
import { HeaderMenuItem } from "@/app/types/Navbar";
import Link from "next/link";
import React, { useState } from "react";

interface RecursiveSubMenuProps {
  sections: HeaderMenuItem[];
  setIsMenuOpen: (isOpen: boolean) => void;
}

const RecursiveSubMenu: React.FC<RecursiveSubMenuProps> = ({
  sections,
  setIsMenuOpen,
}) => {
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [activeItem, setActiveItem] = useState<number | null>(null);

  return (
    <div className="flex bg-white w-full relative">
      <div className="flex flex-col">
        {sections.map((section, sIdx) => (
          <Link
            key={sIdx}
            href={"/category/" + section.slug}
            className="group py-2 cursor-pointer font-[700] transition-colors"
            onMouseEnter={() => {
              setActiveSection(sIdx);
              setActiveItem(null);
            }}
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(false);
            }}
          >
            <span className="truncate group-hover:text-primary">
              {section.name}
            </span>
            {section.subCategory.length > 0 && (
              <span className="group-hover:text-primary ml-4">›</span>
            )}
          </Link>
        ))}
      </div>

      <div
        className="w-full py-2 font-[700] relative"
        onMouseLeave={() => {
          setActiveSection(null);
          setActiveItem(null);
        }}
      >
        {activeSection !== null && (
          <div className="flex flex-col items-start justify-center pl-10 gap-2 relative">
            {sections[activeSection] &&
              sections[activeSection]?.subCategory.map((item, idx) => (
                <Link
                  key={idx}
                  href={"/category/" + item.slug}
                  className="relative group"
                  onMouseEnter={() => setActiveItem(idx)}
                  onMouseLeave={() => setActiveItem(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMenuOpen(false);
                  }}
                >
                  <span className="truncate hover:cursor-pointer hover:text-primary flex items-center">
                    {item.name}
                    {item.subCategory && <span className="ml-2">›</span>}
                  </span>

                  {/* Recursive render of next level */}
                  {activeItem === idx && item.subCategory && (
                    <div className="absolute left-full top-0 bg-white shadow-lg px-6 py-4 w-[300px] h-full">
                      <RecursiveSubMenu
                        sections={[
                          {
                            id: item.id,
                            name: item.name,
                            categoriesCount: item.categoriesCount,
                            subCategory: item.subCategory,
                            slug: item.slug,
                          },
                        ]}
                        setIsMenuOpen={setIsMenuOpen}
                      />
                    </div>
                  )}
                </Link>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecursiveSubMenu;
