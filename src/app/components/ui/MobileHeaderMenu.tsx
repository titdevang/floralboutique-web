"use client";
import React, {useEffect, useRef, useState} from "react";
import Image from "next/image";
import {HeaderMenuProps} from "@/app/types/Navbar";
import MobileRecursiveSubMenu from "./MobileRecursiveMenu";
import Link from "next/link";

const MobileHeaderMenu: React.FC<HeaderMenuProps> = ({menuItems}) => {
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
            <button
                type="button"
                className="cursor-pointer"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                <div className="relative w-6 h-6">
                    <Image src="/assets/svg/menu.svg" alt="menu" fill sizes="24px"/>
                </div>
            </button>

            <div
                className={`fixed top-0 left-0 h-full w-80 bg-white z-50 shadow-lg transition-transform duration-300 ease-in-out ${
                    isMenuOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="p-4">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-4xl text-primary"
                    >
                        &times;
                    </button>
                </div>

                <div className="flex items-center gap-2 text-sm px-4">
                    <span className="text-gray-600">Login</span>
                    <span>|</span>
                    <span className="text-gray-600">Registration</span>
                </div>

                <div
                    className="overflow-y-auto max-h-[calc(100%-60px)] pt-5 mt-5 border-gray border-opacity-50 border-t">
                    {menuItems.map((menu, idx) => {
                        const isOpen = activeMenu === idx;
                        return (
                            <div
                                key={idx}
                            >
                                <div
                                    className={`flex justify-between items-center px-6 py-2 cursor-pointer font-[600] text-[16px]`}
                                >
                                    <Link onClick={() => {
                                            setIsMenuOpen(false);
                                            setActiveMenu(null);
                                        }} href={"/category/" + menu.slug}
                                          className={`duration-500 ${
                                              isOpen
                                                  ? " text-primary scale-95 underline underline-offset-2 "
                                                  : ""
                                          }`}
                                    >
                                        {menu.name}
                                    </Link>
                                    {menu.subCategory.length > 0 && (
                                        <span
                                            onClick={() =>
                                                setActiveMenu((prev) => (prev === idx ? null : idx))
                                            }
                                            className="text-primary text-3xl font-light">
                      {isOpen ? "-" : "+"}
                    </span>
                                    )}
                                </div>

                                <div
                                    className={`pl-8 pr-4 transition-[max-height,opacity] duration-500 ease-in-out overflow-hidden ${
                                        isOpen ? "max-h-[500px]" : "max-h-0"
                                    }`}
                                    style={{
                                        transitionProperty: "max-height, opacity, transform",
                                    }}
                                >
                                    <MobileRecursiveSubMenu sections={menu.subCategory} setIsMenuOpen={setIsMenuOpen}/>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default MobileHeaderMenu;
