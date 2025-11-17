'use client'
import Table, { RowData } from "@/app/components/ui/table/Table";
import { ApiResponse } from "@/app/types/ApiRequest";
import { apiRequest } from "@/app/utils/apiRequest";
import React, { useEffect, useState } from "react";

const page = () => {
  const columns = [
    { key: "orderId", label: "Order Id" },
    { key: "date", label: "Date" },
    { key: "amount", label: "Amount" },
    { key: "deliveryStatus", label: "Delivery Status" },
    { key: "paymentStatus", label: "Payment Status" },
    { key: "options", label: "Options" },
  ];

      const [refundsData, setRefundsData] = useState<RowData[]>([]);
      const [loading, setLoading] = useState(false);
      const [perPageLength, setPerPageLength] = useState<number>(50);
      const [currentPage, setCurrentPage] = useState<number>(1);
      const [totalPages, setTotalPages] = useState<number>(0);
      const [refreshData, setRefreshData] = useState("");

      useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
          try {
            const response = await apiRequest<ApiResponse>("GET", "/refunds");
            if (response?.status == 200 && response.data) {
              setRefundsData(
                (response.data as unknown as { data: RowData[] }).data
              );
              setTotalPages(response.data.last_page);
            }
          } catch (error) {
            console.error(error);
          } finally {
            setLoading(false);
          }
        };
        fetchData();
      }, [refreshData]);

  return (
    <div className="border border-gray-light p-3 md:p-6">
      <h3 className="text-xl font-semibold mb-6">Approved Refunds</h3>
      <Table
        columns={columns}
        data={refundsData}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        perPageLength={perPageLength}
        totalPages={totalPages}
        loading={loading}
        setRefreshData={setRefreshData}
        setPerPageLength={setPerPageLength}
      />
    </div>
  );
};

export default page;
