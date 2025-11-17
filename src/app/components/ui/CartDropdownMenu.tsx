"use client";

import React, {useState, useEffect, useRef, useId} from "react";
import Link from "next/link";
import SvgIcon from "./SvgIcon";
import {useCart} from "@/app/context/CartContext";
import CartItemCard from "./card/CartDeliveryCard";
import CartItemCardSkeleton from "./loader/CartItemCardSkeleton";

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
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const menuRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<(HTMLButtonElement | HTMLAnchorElement | null)[]>([]);
    const { cartData, removeFromCart, setMenuOpen, menuOpen, loading } = useCart();
    const contentEl = useRef<HTMLDivElement>(null);

    const id = useId();
    const menuId = `menu-${id}`;

    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]);


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
        removeFromCart(id)
    };

    const subtotal = cartData.reduce(
        (total, item) => total + item.finalPrice * item.quantity,
        0
    ).toFixed(2);

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

          // aria-haspopup="true"
          // aria-expanded={menuOpen}
          // aria-controls={menuOpen ? menuId : undefined}
        >
          {trigger}
        </div>

        <div
          className={`fixed inset-0 bg-black backdrop-blur-[1px] bg-opacity-20 z-40 transition-opacity duration-300 ${
            menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setMenuOpen(false)}
        ></div>

        <div
          className={`fixed top-0 right-0 z-50 h-screen overflow-hidden transition-transform duration-500 ease-in-out`}
          ref={contentEl}
          style={{
            transform: menuOpen ? "translateX(0)" : "translateX(100%)",
            opacity: menuOpen ? 1 : 0,
            transition: "transform 0.4s ease-in-out, opacity 0.4s ease-in-out",
          }}
          id={menuId}
          // role="menu"
        >
          <div className=" w-full max-w-md md:w-[420px] h-full rounded-l-sm bg-white flex flex-col text-gray-extra-dark">
            <div
              id="cart-drawer-title"
              className="px-4 py-3 font-semibold text-[16px] border-b border-peach-light flex items-center justify-between"
            >
              <h3 className="text-lg">Cart</h3>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="cart menu"
                className="p-1.5 rounded-full bg-gray text-white hover:bg-primary transition-colors duration-500"
              >
                <SvgIcon
                  name={"close.svg"}
                  width={15}
                  height={15}
                  localImage="close.svg"
                  fill="currentColor"
                />
              </button>
            </div>
            {loading && (
              <div className="px-4">
                <CartItemCardSkeleton />
              </div>
            )}
            {cartData.length ? (
              <>
                <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
                  {cartData.map((item, index) => (
                    <div
                      key={index}
                      role="none"
                      className="flex items-start justify-between gap-3 bg-white px-4 py-1 first:pt-4 "
                    >
                      <CartItemCard
                        key={item.id}
                        location="380001, Ahmedabad, Gujarat"
                        item={item}
                        onRemove={() => handleRemoveItem(item.cart_id)}
                        // onMakeSpecial={handleMakeSpecial}
                      />
                    </div>
                  ))}
                  <div className="py-4 bg-white px-4">
                    <h4 className="text-[16px] font-semibold pb-2">
                      Price Details
                    </h4>
                    <div className=" space-y-1 text-neutral-600 text-[14px] font-[500]">
                      <p className="flex items-center justify-between">
                        <span>Total Product Price</span>
                        <span>₹{subtotal}</span>
                      </p>
                      <p className="flex items-center justify-between">
                        <span>Delivery Charges</span>
                        <span>₹99</span>
                      </p>
                      <p className="flex items-center justify-between">
                        <span>Convenience Charge</span>
                        <span>₹99</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Subtotal & Actions */}
                <div className="px-4 py-4 bottom-0 border-t border-peach-light bg-white flex items-center gap-6">
                  <div className="flex flex-col h-full items-start justify-center text-sm font-medium w-fit ">
                    <span className="text-dark text-[16px] font-semibold">
                      ₹{subtotal}
                    </span>
                    <span className="text-peach text-xs truncate">{`View price details >`}</span>
                  </div>

                  <Link href={"/checkout"} className="w-full">
                    <button
                      onClick={() => handleItemClick()}
                      className="w-full text-[15px] bg-primary hover:bg-hov-primary duration-300 text-white py-3 rounded-full font-[500] transition"
                    >
                      Proceed to Pay
                    </button>
                  </Link>
                </div>
              </>
            ) : (
              <div className="px-4 py-4 h-full flex flex-col items-center justify-between">
                <div className=" h-full flex items-center justify-center flex-col text-center">
                  <SvgIcon
                    name="empty-cart.svg"
                    width={120}
                    height={100}
                    localImage="empty-cart.svg"
                    fill="currentColor"
                  />
                  <h3 className="font-semibold text-md mt-2">
                    Your cart is empty
                  </h3>
                  <p>Let's fill it up, shall we?</p>
                </div>
                <div className="w-full">
                  <button
                    type="button"
                    onClick={() => setMenuOpen(false)}
                    className="bg-primary w-full text-white py-3 hover:bg-hov-primary duration-300 rounded-full text-sm "
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
};

export default CartDropdownMenu;
