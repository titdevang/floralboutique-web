import { useCart } from "@/app/context/CartContext";
import React, { useState } from "react";
import ButtonLoder from "../ui/loader/ButtonLoder";
import { useCheckout } from "@/app/context/CheckoutContext";
import PriceDetailsSkeleton from "../ui/loader/PriceDetailsSkeleton";
import InputField from "../common/fields/InputField";

const PriceDetails = () => {
    const [loading] = useState(false);
    const [showCouponApply, setShowCouponApply] = useState(false);
    const [couponCode, setCouponCode] = useState("")
    const { cartData, calculateTotal, deliveryChargeTotal } = useCart();
    const { message, paymentMethod, senderDetails } = useCheckout()

  const cartIds = cartData.map(item => item.id);

  const placeOrderPayload = {
    cartIds: cartIds,
    message: message,
    paymentMethod: paymentMethod,
    senderDetail: senderDetails,
  };

    return (
      <div className="bg-white p-6 rounded-[40px] sticky top-10 w-full ">
        <h2 className="text-lg font-semibold mb-4">Price Details</h2>
        {cartData.length === 0 ? (
          <PriceDetailsSkeleton />
        ) : (
          <>
            <div className="mt-6 space-y-4">
              <div className="flex justify-between text-sm">
                <span>Total Product Price:</span>
                <span>₹{calculateTotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping:</span>
                <span>₹{deliveryChargeTotal}</span>
              </div>
              <div className="flex justify-between text-lg font-bold pb-4 pt-4">
                <span>Total:</span>
                <span>₹{calculateTotal + deliveryChargeTotal}</span>
              </div>
              <div className={"border-y border-gray-light py-4 text-center"}>
                {showCouponApply ? (
                  <div>
                    <InputField
                      type="text"
                      // label="coupon"
                      name="coupon_code"
                      placeholder="Coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <div className="mt-4 space-x-6">
                      <button
                        type="button"
                        onClick={() => setShowCouponApply(false)}
                        className="bg-gray px-3 py-2 hover:bg-hov-primary rounded-sm text-white duration-300"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="bg-primary px-3 py-2 hover:bg-hov-secondary-base rounded-sm text-white duration-300"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowCouponApply(true)}
                    type={"button"}
                    className={"text-blue "}
                  >
                    Have a Discount Coupon?
                  </button>
                )}
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
                  className="w-full bg-primary text-white h-10 font-semibold text-sm hover:bg-hov-primary transition duration-500 disabled:opacity-50 rounded-[40px]"
                  disabled={loading}
                >
                  {loading ? <ButtonLoder /> : "Place Order"}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    );
};

export default PriceDetails;
