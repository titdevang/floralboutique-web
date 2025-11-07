"use client";

import React, {useState, useEffect, useRef, useId} from "react";
import Link from "next/link";
import SvgIcon from "./SvgIcon";

export interface MenuItem {
    name: string;
    icon?: string;
    link?: string;
    action?: () => void;
}

interface DropdownMenuProps {
    items: MenuItem[];
    trigger: React.ReactNode;
    align?: "left" | "right";
    actionClassName?: string;
    linkClassName?: string;
    selectedSort?: string;
    isMobile?: boolean;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
                                                       items,
                                                       trigger,
                                                       align = "right",
                                                       actionClassName,
                                                       linkClassName,
                                                       selectedSort,
                                                       isMobile
                                                   }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const menuRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<(HTMLButtonElement | HTMLAnchorElement | null)[]>([]);

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

    useEffect(() => {
        if (menuOpen) {
            const selectedIndex = selectedSort ? items.findIndex(item => item.name === selectedSort) : -1;
            const initialIndex = selectedIndex > -1 ? selectedIndex : 0;
            setFocusedIndex(initialIndex);
            setTimeout(() => {
                itemsRef.current[initialIndex]?.focus();
            }, 0);
        }
    }, [menuOpen, selectedSort, items]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            if (!menuOpen) {
                setMenuOpen(true);
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

    return (
        <div
            className="relative inline-block"
            ref={menuRef}
            onKeyDown={handleKeyDown}
        >
            <div
                ref={triggerRef}
                onClick={() => setMenuOpen(prev => !prev)}
                aria-haspopup="true"
                aria-expanded={menuOpen}
                aria-controls={menuOpen ? menuId : undefined}
                className={"w-full"}
            >
                {trigger}
            </div>

            <div
                className={`absolute ${
                    align === "right" ? "right-0" : "left-0"
                } mt-2 min-w-[220px] bg-white shadow-xl border-gray z-50 overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out ${
                    menuOpen ? "max-h-[350px]" : "max-h-0"
                }`}
                id={menuId}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby={triggerRef.current?.firstElementChild?.id}
            >
                <ul>
                    {items.map((item, index) => (
                        <li key={index} role="none">
                            {item.link ? (
                                <Link
                                    href={item.link}
                                    ref={(el) => {
                                        itemsRef.current[index] = el;
                                    }}
                                    role="menuitem"
                                    tabIndex={-1}
                                    className={`flex items-center w-full gap-3 text-sm focus:bg-soft-secondary-base focus:outline-0 group duration-300 px-4 py-3 cursor-pointer border border-[#ddd] border-b-0  hover:bg-soft-secondary-base ${
                                        focusedIndex === index ? "bg-soft-secondary-base" : ""
                                    } ${linkClassName}`}
                                    onClick={() => handleItemClick(item.action)}
                                    onMouseEnter={() => setFocusedIndex(index)}
                                >
                                    {item.icon && (
                                        <SvgIcon
                                            name={item.icon + (isMobile ? "-mobile" : "")}
                                            width={16}
                                            height={16}
                                            localImage={item.icon}
                                        />
                                    )}
                                    <span>{item.name}</span>
                                </Link>
                            ) : (
                                <button
                                    ref={(el) => {
                                        itemsRef.current[index] = el;
                                    }}
                                    role="menuitem"
                                    tabIndex={-1}
                                    className={`flex items-center w-full gap-3 text-sm focus:bg-soft-secondary-base focus:outline-0 group duration-300 px-4 py-3 cursor-pointer border border-[#ddd] border-b-0 last:border-b-1 hover:bg-soft-secondary-base ${
                                        focusedIndex === index ? "bg-soft-secondary-base" : ""
                                    } ${actionClassName}`}
                                    onClick={() => handleItemClick(item.action)}
                                    onMouseEnter={() => setFocusedIndex(index)}
                                >
                                    {item.icon && (
                                        <SvgIcon
                                            name={item.icon + (isMobile ? "-mobile" : "")}
                                            width={16}
                                            height={16}
                                            localImage={item.icon}
                                            fill="currentColor"
                                        />
                                    )}
                                    <span>{item.name}</span>
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default DropdownMenu;
