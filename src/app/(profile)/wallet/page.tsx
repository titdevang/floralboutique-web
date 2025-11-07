import SvgIcon from "@/app/components/ui/SvgIcon";
import Table from "@/app/components/ui/table/Table";
import { Column } from "@/app/types/Table";
import React from "react";

interface Order {
  orderId: string;
  date: string;
  amount: string;
  deliveryStatus: string;
  paymentStatus: string;
  options: string;
}

const page = () => {
  const columns = [
    { key: "orderId", label: "Order Id" },
    { key: "date", label: "Date" },
    { key: "amount", label: "Amount" },
    { key: "deliveryStatus", label: "Delivery Status" },
    { key: "paymentStatus", label: "Payment Status" },
    { key: "options", label: "Options" },
  ] satisfies Column<Order>[];
  const data: Order[] = [
    {
      orderId: "#12345",
      date: "2023-10-26",
      amount: "₹ 500",
      deliveryStatus: "Pending",
      paymentStatus: "Paid",
      options: "...",
    },
    {
      orderId: "#12346",
      date: "2023-10-25",
      amount: "₹ 1200",
      deliveryStatus: "Delivered",
      paymentStatus: "Paid",
      options: "...",
    },
    {
      orderId: "#12347",
      date: "2023-10-24",
      amount: "₹ 750",
      deliveryStatus: "Shipped",
      paymentStatus: "Pending",
      options: "...",
    },
  ];
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">My Wallet</h2>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
          <div className="p-6 flex flex-col justify-between items-center relative overflow-hidden bg-dark text-white py-10">
            <div className="flex flex-col justify-center items-center text-center space-y-2 h-full">
              <div className="text-white text-opacity-30 flex justify-center items-center">
                <SvgIcon
                  name="wallet.svg"
                  width={25}
                  height={25}
                  localImage="wallet.svg"
                  fill="currentColor"
                />
              </div>
              <h2 className="opacity-70">Wallet Balance</h2>
              <p className="text-3xl font-bold">₹ 0</p>
            </div>
          </div>

          <div className="p-6 flex flex-col justify-between items-center relative overflow-hidden bg-soft-light hover:bg-soft-secondary-base duration-500 text-black py-10">
            <div className="flex flex-col justify-center items-center text-center h-full space-y-2">
              <div className="text-white p-2 flex justify-center items-center bg-dark rounded-full">
                <SvgIcon
                  name="add.svg"
                  width={40}
                  height={40}
                  localImage="add.svg"
                  fill="currentColor"
                />
              </div>
              <h2 className="opacity-50">Recharge Wallet</h2>
            </div>
          </div>
        </div>
        <div className="mt-4 border border-gray-light p-3 md:p-6">
          <h3 className="text-xl font-semibold mb-6">
            Wallet Recharge History
          </h3>
          <Table columns={columns} data={data} />
        </div>
      </div>
    </div>
  );
};

export default page;
