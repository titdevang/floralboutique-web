"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import RecursiveSubMenu from "./RecursiveMenu";
import { HeaderMenuProps } from "@/app/types/Navbar";
import Link from "next/link";

const HeaderMenu: React.FC<HeaderMenuProps> = ({ menuItems }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
        setActiveMenu(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={menuRef} className="relative">
      {/* Menu Button */}
      <button
        type="button"
        className="cursor-pointer"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <Image src={"/assets/svg/menu.svg"} width={15} height={15} alt="menu" />
      </button>

      <div onMouseLeave={() => setActiveMenu(null)}>
        <div
          className={`absolute top-10 left-0 w-64 bg-white shadow-xl border-gray z-50 overflow-auto transition-[max-height,opacity] duration-500 ease-in-out
        ${isMenuOpen ? "max-h-[500px]" : "max-h-0"}`}
        >
          {menuItems.map((menu, idx) => (
            <Link
              key={idx}
              href={"/category/" + menu.slug}
              className={`${
                activeMenu == idx ? "bg-soft-secondary-base" : ""
              } group duration-300 px-4 py-3 cursor-pointer border border-[#ddd] border-b-0 last:border-b-2 hover:bg-soft-secondary-base flex items-center gap-1`}
              onMouseEnter={() => setActiveMenu(idx)}
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(false);
                setActiveMenu(null);
              }}
              //   onMouseLeave={() => setActiveMenu(null)}
            >
              {menu.subCategory.length > 0 && (
                <span className="font-bold text-[20px]">+</span>
              )}
              <span
                className={`${
                  activeMenu == idx ? "pl-1" : ""
                } group-hover:pl-1 duration-300`}
              >
                {menu.name}
              </span>
            </Link>
          ))}
        </div>
        <div
          className={`absolute left-64 top-10 bg-white shadow-lg px-6 py-4  z-50 transition-all duration-300 ease-in-out ${
            isMenuOpen &&
            activeMenu !== null &&
            menuItems[activeMenu].subCategory.length > 0
              ? "opacity-100 min-h-[350px] min-w-[500px]"
              : "opacity-0 overflow-hidden "
          }`}
          onMouseEnter={() => activeMenu !== null && setActiveMenu(activeMenu)}
          onMouseLeave={() => setActiveMenu(null)}
        >
          {isMenuOpen &&
            activeMenu !== null &&
            menuItems[activeMenu].subCategory.length > 0 && (
              <RecursiveSubMenu
                sections={menuItems[activeMenu].subCategory}
                setIsMenuOpen={setIsMenuOpen}
              />
            )}
        </div>
      </div>
    </div>
  );
};

export default HeaderMenu;
