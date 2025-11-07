"use client";

import React, {useState, useEffect, useRef, useId} from "react";
import Link from "next/link";
import SvgIcon from "./SvgIcon";
import {useCart} from "@/app/context/CartContext";
import Image from "next/image";

export interface MenuItem {
    name: string;
    icon?: string;
    link?: string;
    action?: () => void;
}

interface CartDropdownMenuProps {
    items: MenuItem[];
    trigger: React.ReactNode;
    align?: "left" | "right";
    actionClassName?: string;
    linkClassName?: string;
}

const CartDropdownMenu: React.FC<CartDropdownMenuProps> = ({
                                                               items,
                                                               trigger,
                                                               align = "right",
                                                           }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const menuRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<(HTMLButtonElement | HTMLAnchorElement | null)[]>([]);
    const { cartData, setCartData } = useCart();
    const contentEl = useRef<HTMLDivElement>(null);
    const height = menuOpen ? contentEl.current?.scrollHeight : 0;

    const id = useId();
    const menuId = `menu-${id}`;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
                setFocusedIndex(-1);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            if (!menuOpen) {
                setMenuOpen(true);
                setFocusedIndex(0);
                itemsRef.current[0]?.focus();
            } else {
                setFocusedIndex((prev) => {
                    const nextIndex = prev < items.length - 1 ? prev + 1 : 0;
                    itemsRef.current[nextIndex]?.focus();
                    return nextIndex;
                });
            }
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (menuOpen) {
                setFocusedIndex((prev) => {
                    const nextIndex = prev > 0 ? prev - 1 : items.length - 1;
                    itemsRef.current[nextIndex]?.focus();
                    return nextIndex;
                });
            }
        } else if (e.key === "Escape") {
            setMenuOpen(false);
            setFocusedIndex(-1);
            (triggerRef.current?.firstElementChild as HTMLElement)?.focus();
        } else if (e.key === "Enter" || e.key === " ") {
            if (!menuOpen) {
                e.preventDefault();
                setMenuOpen(true);
                setFocusedIndex(0);
                itemsRef.current[0]?.focus();
            } else if (focusedIndex !== -1) {
                e.preventDefault();
                itemsRef.current[focusedIndex]?.click();
            }
        }
    };

    const handleItemClick = (itemAction?: () => void) => {
        setMenuOpen(false);
        setFocusedIndex(-1);
        itemAction?.();
        (triggerRef.current?.firstElementChild as HTMLElement)?.focus();
    };

    const handleRemoveItem = (id: number) => {
        setCartData((prevData) => prevData.filter((item) => item.id !== id));
    };

    const subtotal = cartData.reduce(
        (total, item) => total + item.finalPrice * item.quantity,
        0
    );

    return (
        <div
            className="relative inline-block"
            ref={menuRef}
            onKeyDown={handleKeyDown}
        >
            <div
                ref={triggerRef}
                onClick={() => {
                    const newMenuOpen = !menuOpen;
                    setMenuOpen(newMenuOpen);
                    if (newMenuOpen) {
                        setFocusedIndex(0);
                        setTimeout(() => itemsRef.current[0]?.focus(), 0);
                    }
                }}
                aria-haspopup="true"
                aria-expanded={menuOpen}
                aria-controls={menuOpen ? menuId : undefined}
            >
                {trigger}
            </div>

            <div
                className={`absolute ${
                    align === "right" ? "md:right-0 -right-5" : "left-0"
                } mt-2 w-[300px] md:min-w-[350px] bg-white shadow-xl border-gray z-50 overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out`}
                ref={contentEl}
                style={{
                    maxHeight: height ? `${height}px` : "0px",
                    transition: "max-height 0.4s ease-in-out, opacity 0.4s ease-in-out",
                    opacity: menuOpen ? 1 : 0,
                }}
                id={menuId}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby={triggerRef.current?.firstElementChild?.id}
            >
                <div className=" p-6 w-full max-w-md bg-white flex flex-col">
                    {cartData.length ? (
                        <>
                            <h3 className="font-semibold text-sm text-gray-800 mb-4 border-b border-gray-light pb-2">
                                Cart Items
                            </h3>

                            <div className="flex flex-col gap-4 flex-1 overflow-y-auto max-h-[50vh]">
                                {cartData.map((item, index) => (
                                    <div
                                        key={index}
                                        role="none"
                                        className="flex items-start justify-between gap-3 pb-3 "
                                    >
                                        <Link href={`/product/${item.slug}`} onClick={()=>handleItemClick()} className="flex gap-3 flex-1 group">

                                            <Image
                                                src={`${item?.imageUrl}`}
                                                alt={item.name}
                                                width={50}
                                                height={50}
                                                className="h-16 w-16 object-cover group-hover:scale-105 duration-300"
                                            />

                                            <div className="flex flex-col justify-between">
                                                <h4 className="text-sm font-medium  line-clamp-2 group-hover:text-primary duration-500">
                                                    {item.name}
                                                </h4>
                                                <p className="text-xs ">
                                                    {item.quantity}x ₹{item.finalPrice}
                                                </p>
                                            </div>
                                        </Link>
                                        <button
                                            onClick={() => handleRemoveItem(item.id)}
                                            className="text-gray"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* Subtotal & Actions */}
                            <div className="mt-4 pt-3 bottom-0 bg-white">
                                <div className="flex justify-between text-sm font-medium py-3 mb-3 border-y border-gray-light ">
                                    <span>Subtotal</span>
                                    <span>
            ₹
                                        {subtotal.toFixed(2)}
                                     </span>
                                </div>

                                <Link href={"/checkout"} >
                                    <button
                                        onClick={() => handleItemClick()}
                                        className="w-full bg-secondary-base text-white py-2 rounded-full font-medium hover:bg-hov-secondary-base transition">
                                        Proceed to Checkout
                                    </button>
                                </Link>
                                <button
                                    className="w-full bg-primary text-white py-2 rounded-full font-medium mt-2  hover:bg-hov-primary transition">
                                    View cart
                                </button>

                            </div>
                        </>
                    ) : (
                        <div className="flex items-center justify-center flex-col text-center">
                            <SvgIcon
                                name="data-not-found.svg"
                                width={40}
                                height={40}
                                localImage="data-not-found.svg"
                                fill="currentColor"
                            />
                            <h3 className="font-semibold mt-2">
                                Uh oh! It looks like your cart is empty.
                            </h3>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CartDropdownMenu;
