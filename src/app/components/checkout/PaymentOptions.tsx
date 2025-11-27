import ImageWithFallback from "../ui/fields/ImageWithFallback";
import { useCheckout } from "@/app/context/CheckoutContext";

const PaymentOptions = () => {
  const { setPaymentMethod, paymentMethod } = useCheckout();

  return (
    <div
      className={
        "bg-white rounded-[40px] md:space-y-0 space-y-4 md:flex items-center justify-between py-10 px-6"
      }
    >
      <div>
        <div className={"flex items-center gap-4 w-full"}>
          <div className={"bg-primary w-10 h-10"}>
            <p
              className={
                "text-white flex items-center justify-center h-full text-md"
              }
            >
              4
            </p>
          </div>
          <div>
            <p className={"text-md"}>Payment Options</p>
          </div>
        </div>
        <div className="pt-10 pb-4 flex flex-wrap gap-6">
          {/* -------Razorpay--------- */}
          <button
            onClick={() => setPaymentMethod("razorpay")}
            className={`border ${
              paymentMethod == "razorpay"
                ? "border-primary"
                : "border-gray-light"
            } hover:border-primary duration-300 
                     p-4 rounded-sm w-[210px] h-[150px] flex flex-col items-center justify-between`}
          >
            <ImageWithFallback
              src={"/assets/images/cards/razorpay.png"}
              alt="razorpay"
              width={160}
              height={100}
              className="h-[80px] object-contain"
            />
            <p className="text-sm text-center font-semibold">Razorpay</p>
          </button>

          {/* -------PhonePe--------- */}
          <button
            onClick={() => setPaymentMethod("phonepe")}
            className={`border ${
              paymentMethod == "phonepe"
                ? "border-primary"
                : "border-gray-light"
            }
            border-gray-light hover:border-primary duration-300 
                     p-4 rounded-sm w-[210px] h-[150px] flex flex-col items-center justify-between`}
          >
            <ImageWithFallback
              src={"/assets/images/cards/phonepe.png"}
              alt="phonepe"
              width={160}
              height={100}
              className="h-[80px] object-contain"
            />
            <p className="text-sm text-center font-semibold">PhonePe</p>
          </button>

          {/*-------- Wallet-----------*/}
          <button
            onClick={() => setPaymentMethod("wallet")}
            className={`border ${
              paymentMethod == "wallet" ? "border-primary" : "border-gray-light"
            } border-gray-light hover:border-primary duration-300 
                     p-4 rounded-sm w-[210px] h-[150px] flex flex-col items-center justify-center gap-2 bg-soft-secondary-base`}
          >
            <div className="text-center space-y-1">
              <p className="text-[14px] font-light">
                Or, Your wallet balance :
              </p>
              <h5 className="text-sm font-semibold">₹ 5828</h5>
            </div>

            <h4
              className="bg-primary hover:bg-hov-primary text-white px-3 py-1.5 
                   text-sm text-center rounded-sm duration-300"
            >
              Wallet Pay
            </h4>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentOptions;