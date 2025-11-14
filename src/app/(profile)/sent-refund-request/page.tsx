'use client'
import Table from "@/app/components/ui/table/Table";
import { Column } from "@/app/types/Table";
import { apiRequest } from "@/app/utils/apiRequest";
import React, { useEffect, useState } from "react";

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

      const [refundsData, setRefundsData] = useState<Order[]>([]);

      useEffect(()=>{
        const fetchData = async() => {
          try {
            const response = await apiRequest("GET", "/refunds");
            if (response?.status == 200 && response.data) {
              setRefundsData((response.data as { data: Order[]}).data);
            }
          } catch (error) {
           console.error(error) 
          }
        }
        fetchData();
      },[])

  return (
    <div className="border border-gray-light p-3 md:p-6">
      <h3 className="text-xl font-semibold mb-6">Approved Refunds</h3>
      <Table columns={columns} data={refundsData} />
    </div>
  );
};

export default page;
