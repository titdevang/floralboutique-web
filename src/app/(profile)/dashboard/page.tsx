import SvgIcon from "@/app/components/ui/SvgIcon";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Wallet Balance Card */}
        <div className=" p-6 flex flex-col justify-between relative overflow-hidden bg-dark text-white">
          <div className=" space-y-4">
            <h2 className=" opacity-50">Wallet Balance</h2>
            <p className="text-3xl font-bold">₹ 0</p>
            <hr className="border-1 border-dotted" />
            <div>
              <p className=" opacity-50">Last Recharge</p>
              <p className="text-lg font-semibold">0</p>
            </div>
          </div>
          <button className="mt-4 rounded-full px-4 py-3 text-sm border border-white border-opacity-60 bg-white bg-opacity-20 hover:bg-transparent duration-300">
            + Recharge Wallet
          </button>
          <div className="absolute bottom-0 right-0 opacity-20">
            {/* <img
              src="/assets/wallet-illustration.png"
              alt="wallet"
              className="w-32"
            /> */}
          </div>
        </div>

        {/* Total Expenditure Card */}
        <div className="bg-primary p-6 flex flex-col justify-between text-white">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 text-xl rounded-full flex items-center justify-center bg-white bg-opacity-20">
                ₹
              </div>
              <h2 className="">Total Expenditure</h2>
            </div>
            <div className="ml-12">
              <p className="text-2xl font-semibold">₹0</p>
            </div>
          </div>
          <Link
            href="/purchase-history"
            className="hover:underline duration-300"
          >
            View Order History &gt;
          </Link>
        </div>
      </div>

      {/* Products Card */}
      <div className="flex md:flex-row flex-col gap-6 w-full pt-6">
        <div className="flex items-center gap-4 w-full border border-gray-light p-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 text-xl rounded-full flex items-center justify-center  bg-hov-primary text-white">
              <SvgIcon
                name="cart.svg"
                width={20}
                height={20}
                localImage="cart.svg"
                fill="currentColor"
              />
            </div>
            <div className="flex flex-col">
              <h2 className="">Total Expenditure</h2>
              <h2 className="">0</h2>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 w-full border border-gray-light p-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 text-xl rounded-full flex items-center justify-center bg-blue text-white">
              <SvgIcon
                name="wishlist.svg"
                width={20}
                height={20}
                localImage="wishlist.svg"
                fill="currentColor"
              />
            </div>
            <div className="flex flex-col">
              <h2 className="">Total Expenditure</h2>
              <h2 className="">0</h2>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 w-full border border-gray-light p-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 text-xl rounded-full flex items-center justify-center bg-secondary-base text-white">
              <SvgIcon
                name="history.svg"
                width={16}
                height={16}
                localImage="history.svg"
                fill="currentColor"
              />
            </div>
            <div className="flex flex-col">
              <h2 className="">Total Expenditure</h2>
              <h2 className="">0</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
