"use client";

import React, {useState, useEffect, useRef, useId} from "react";
import Link from "next/link";
import SvgIcon from "./SvgIcon";
import {useCart} from "@/app/context/CartContext";
import CartItemCard from "./card/CartDeliveryCard";
import CartItemCardSkeleton from "./loader/CartItemCardSkeleton";
import BottomToUpModal from "./modal/BottomToUpModal";
import { Product } from "@/app/types/Product";
import ImageWithFallback from "./fields/ImageWithFallback";
import DatePickerPopup from "../common/fields/DatePickerPopup";

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
    const [removeCartItemModal, setRemoveCartItemModal] = useState(false);
    const [removeCartItem, setRemoveCartItem] = useState<Product>();
    const [changeDeliveryDateScreen, setChangeDeliveryDateScreen] = useState(false)
    const [changeDeliveryDateCartId, setChangeDeliveryDateCartId] = useState<number>();
    const { cartData, removeFromCart, setMenuOpen, menuOpen, loading } = useCart();
    const contentEl = useRef<HTMLDivElement>(null);
    const priceDetailsRef = useRef <HTMLDivElement | null>(null);

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
        setRemoveCartItemModal(false);
        removeFromCart(id)
    };

    const scrollToPriceDetails = () => {
      priceDetailsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    };

    const subtotal = cartData.reduce(
        (total, item) => total + Number(item?.productData?.finalPrice) * item.quantity,
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
          <div id="cart-modal-root" className="relative z-[99999]"></div>
          <BottomToUpModal
            onClose={() => setRemoveCartItemModal(false)}
            isOpen={!!removeCartItemModal}
            portalId="cart-modal-root"
          >
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Remove Item?
              </h2>
              <p className="text-gray-600 mt-1">
                Are you sure you want to remove this gift?
              </p>

              {/* Product Block */}
              <div className="flex items-center gap-4 mt-5 p-3">
                <ImageWithFallback
                  src={`${removeCartItem?.productData?.imageUrl}`}
                  alt={removeCartItem?.productData?.name || ""}
                  width={50}
                  height={50}
                  className="h-16 w-16 object-cover rounded-md group-hover:scale-105 duration-300"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {removeCartItem?.productData?.name}
                  </p>
                  <p className="font-semibold text-[16px] text-primary mt-1">
                    {removeCartItem?.quantity} x ₹
                    {removeCartItem?.productData?.finalPrice}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6">
                <button
                  onClick={() => handleRemoveItem(removeCartItem?.id as number)}
                  className="w-full bg-primary text-white py-3 rounded font-semibold hover:bg-hov-primary duration-300"
                >
                  Yes, Remove
                </button>
              </div>
            </div>
          </BottomToUpModal>
          <div className=" w-full max-w-md md:w-[420px] h-full rounded-l-sm bg-white flex flex-col text-gray-extra-dark">
            {!changeDeliveryDateScreen && (
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
            )}

            {loading && (
              <div className="px-4">
                <CartItemCardSkeleton />
              </div>
            )}
            {!changeDeliveryDateScreen ? (
              <div className="h-full overflow-y-auto">
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
                            item={item}
                            onRemove={() => {
                              setRemoveCartItem(item);
                              setRemoveCartItemModal(true);
                            }}
                            onChangeDeliveryDate={(cartId) => {
                              setChangeDeliveryDateScreen(true);
                              setChangeDeliveryDateCartId(cartId);
                            }}
                            // onMakeSpecial={handleMakeSpecial}
                          />
                        </div>
                      ))}
                      <div ref={priceDetailsRef} className="py-4 bg-white px-4">
                        <h4 className="text-[15px] font-semibold pb-2">
                          Price Details
                        </h4>
                        <div className=" space-y-1 text-neutral-600 text-[13px] font-[500]">
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
                        <span
                          onClick={scrollToPriceDetails}
                          className="text-peach text-xs truncate"
                        >{`View price details >`}</span>
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
            ) : (
              <div>
                <div className="px-4 py-3 font-[500] text-[15px] border-b border-peach-light flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setChangeDeliveryDateScreen(false)}
                  >
                    <SvgIcon
                      name={"back.svg"}
                      width={25}
                      height={25}
                      localImage="back.svg"
                      fill="currentColor"
                    />
                  </button>
                  <h3>Select Delivery Date</h3>
                </div>
                <div className={`p-6`}>
                  <div className="space-y-10">
                    {/*--------------- start Schedule your delivery----------------- */}
                    {
                      <div>
                        <div className={"grid grid-cols-3 gap-2"}>
                          <button
                            type="button"
                            className="deliveryCard"
                            // onClick={() => {
                            //   setSelectDate(getDate("today", "full"));
                            //   fetchDeliveryMethods(getDate("today", "full"));
                            // }}
                            // className={`deliveryCard ${
                            //   selecteDate == getDate("today", "full")
                            //     ? "!border-primary"
                            //     : ""
                            // }`}
                          >
                            <span>Today</span>
                            {/* <span>{getDate("today")}</span> */}
                          </button>
                          <button
                            type="button"
                            className="deliveryCard"
                            // onClick={() => {
                            //   setSelectDate(getDate("tomorrow", "full"));
                            //   fetchDeliveryMethods(getDate("tomorrow", "full"));
                            // }}
                            // className={`deliveryCard ${
                            //   selecteDate == getDate("tomorrow", "full")
                            //     ? "!border-primary"
                            //     : ""
                            // } `}
                          >
                            <span>Tomorrow</span>
                            {/* <span>{getDate("tomorrow")}</span> */}
                          </button>

                          <div
                            className="deliveryCard"
                            // className={`h-full deliveryCard !p-0 w-full text-center ${
                            //   ![
                            //     getDate("tomorrow", "full"),
                            //     getDate("today", "full"),
                            //     "",
                            //   ].includes(selecteDate)
                            //     ? "!border-primary"
                            //     : ""
                            // }`}
                          >
                            <DatePickerPopup
                              onChange={(date) => {
                                // setSelectDate(date);
                                // fetchDeliveryMethods(date);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    }
                    {/*--------------- End Schedule your delivery----------------- */}

                    {/*------------- start deliveryMethods------------------ */}
                    {
                      <div className={``}>
                        <div>
                          <h3
                          // className={`heading-2 !text-[18px] mb-2 !font-light w-fit ${
                          //   !deliveryId ? "animate-shadow-blink" : ""
                          // }`}
                          >
                            Preffred time slot
                          </h3>
                        </div>
                        {/* <div className="grid grid-cols-3 gap-2">
                                    {deliveryMethods.map((method, index) => (
                                      <div key={index} className={"h-full"}>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            setDeliveryId(method.id);
                                            fetchDeliveryTimeSlots(method.id);
                                          }}
                                          className={`deliveryCard ${
                                            deliveryId == method.id ? "!border-primary" : ""
                                          } `}
                                        >
                                          <span>{method.name}</span>
                                          <span>₹{method.price}</span>
                                        </button>
                                      </div>
                                    ))}
                                  </div> */}
                      </div>
                    }

                    {/* {!!deliveryTimeSlots.length && deliveryId && (
                                <div className={``}>
                                  <div>
                                    <h3
                                      className={`heading-2 !text-[18px] mb-2 !font-light w-fit`}
                                    >
                                      Time slot
                                    </h3>
                                  </div>
                                  <div
                                    className={`${
                                      !deliveryTimeSlotId ? "animate-shadow-blink" : ""
                                    }`}
                                  >
                                    <SelectField
                                      label="time slot"
                                      name="time_slot"
                                      value={deliveryTimeSlotId as unknown as string}
                                      onChange={(e) =>
                                        setDeliveryTimeSlotId(e.target.value as unknown as number)
                                      }
                                      options={deliveryTimeSlots}
                                      getOptionLabel={(option) => option.time_slots}
                                      getOptionValue={(option) => option.id}
                                    />
                                  </div>
                                </div>
                              )} */}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
};

export default CartDropdownMenu;
