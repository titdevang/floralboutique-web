"use client"
import React, {useState} from "react";
import {useCart} from "@/app/context/CartContext";
import ButtonLoder from "@/app/components/ui/loader/ButtonLoder";

export default function Layout({
                                   children,
                               }: Readonly<{
    children: React.ReactNode;
}>) {
    const { cartData } = useCart();
    const [loading] = useState(false);
    const subtotal = cartData.reduce(
        (sum, item) => sum + Number(item.productData?.finalPrice) * (item.quantity ?? 1),
        0
    );

    const deliveryChargestotal = cartData
    .reduce((total, item) => total + Number(item?.deliveryPrice), 0)
    .toFixed(2);

    const total = Number(subtotal) + Number(deliveryChargestotal);

    return (
      <div className={"lg:grid grid-cols-3 gap-6 space-y-6 lg:space-y-0"}>
        <div className="w-full h-full col-span-2">{children}</div>
        <div className={"col-span-1 w-full"}>
          {/* Order Summary */}
          <div className="bg-white p-6 rounded-[40px] sticky top-10 w-full ">
            <h2 className="text-lg font-semibold mb-4">Price Details</h2>
            {cartData.length === 0 ? (
              <p className="text-gray-600">Your cart is empty.</p>
            ) : (
              <>
                {/*<div className="space-y-4">*/}
                {/*    {cartData.map((item) => (*/}
                {/*        <div key={item.id} className="flex items-center gap-4">*/}
                {/*            <Image*/}
                {/*                src={item.imageUrl || "/placeholder.jpg"}*/}
                {/*                alt={item.name}*/}
                {/*                width={70}*/}
                {/*                height={70}*/}
                {/*                className="rounded-md object-cover"*/}
                {/*            />*/}
                {/*            <div className="flex-grow">*/}
                {/*                <h3 className="">{item.name}</h3>*/}
                {/*                <p className="text-gray">*/}
                {/*                    ₹{item.finalPrice} x {item.quantity}*/}
                {/*                </p>*/}
                {/*            </div>*/}
                {/*            <p className="font-semibold">*/}
                {/*                ₹{(item.finalPrice * (item.quantity ?? 1)).toFixed(2)}*/}
                {/*            </p>*/}
                {/*        </div>*/}
                {/*    ))}*/}
                {/*</div>*/}

                <div className="mt-6 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Total Product Price:</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping:</span>
                    <span>₹{deliveryChargestotal}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pb-4 pt-4">
                    <span>Total:</span>
                    <span>₹{total}</span>
                  </div>
                  <div
                    className={"border-y border-gray-light py-4 text-center"}
                  >
                    <button type={"button"} className={"text-blue "}>
                      Have a Discount Coupon?
                    </button>
                  </div>
                  <div>
                    <span className={"text-gray-dark text-sm"}>
                      By continuing you agree to our{" "}
                      <span className={"text-dark"}>T&C/Disclaimer</span>
                    </span>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full bg-primary text-white h-8 font-semibold text-sm hover:bg-hov-primary transition duration-500 disabled:opacity-50 rounded-[40px]"
                      disabled={loading}
                    >
                      {loading ? <ButtonLoder /> : "Place Order"}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
}
