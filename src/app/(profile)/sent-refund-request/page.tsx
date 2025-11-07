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
    <div className="border border-gray-light p-3 md:p-6">
      <h3 className="text-xl font-semibold mb-6">Approved Refunds</h3>
      <Table columns={columns} data={data} />
    </div>
  );
};

export default page;
