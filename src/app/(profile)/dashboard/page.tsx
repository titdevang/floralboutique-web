'use client'
import RechargeWallet from "@/app/components/section/modal/RechargeWallet";
import CountUp from "@/app/components/ui/loader/CountUp";
import SvgIcon from "@/app/components/ui/SvgIcon";
import { apiRequest } from "@/app/utils/apiRequest";
import Link from "next/link";
import { useEffect, useState } from "react";

interface DashboardItem {
  balance: number;
  lastRecharge: number;
  totalExpenditure: number;
  productsInCart: number;
  totalOrders: number;
}

const page = () => {
  const [rechargeWalletModal, setRechargeWalletModal] = useState(false);
  const [dashboardData, setDashboardData] = useState<DashboardItem>();

  useEffect(()=>{
    const fetchDashboardData = async() => {
      try {
        const response = await apiRequest("GET", "/dashboard");
        if (response?.status == 200 && response.data) {
          setDashboardData((response.data as { data: DashboardItem })?.data);
        }
      } catch (error) {
        
      }
    }
    fetchDashboardData()
  },[])
  
  return (
    <div>
      <RechargeWallet
        setRechargeWalletModal={setRechargeWalletModal}
        rechargeWalletModal={rechargeWalletModal}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Wallet Balance Card */}
        <div className=" p-6 flex flex-col justify-between relative overflow-hidden bg-dark text-white">
          <div className=" space-y-4">
            <h2 className=" opacity-50">Wallet Balance</h2>
            <p className="text-3xl font-bold">
              ₹ <CountUp value={dashboardData?.balance || 0} />
            </p>
            <hr className="border-1 border-dotted" />
            <div>
              <p className=" opacity-50">Last Recharge</p>
              <p className="text-lg font-semibold">
                {dashboardData?.lastRecharge}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setRechargeWalletModal(true)}
            className="mt-4 rounded-full px-4 py-3 text-sm border border-white border-opacity-60 bg-white bg-opacity-20 hover:bg-transparent duration-300"
          >
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
              <p className="text-2xl font-semibold">
                ₹<CountUp value={dashboardData?.totalExpenditure || 0} />
              </p>
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
              <h2 className="">Product in Cart</h2>
              <h2 className="">{dashboardData?.productsInCart}</h2>
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
              <h2 className="">Total Products Orders</h2>
              <h2 className="">{dashboardData?.totalOrders}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
