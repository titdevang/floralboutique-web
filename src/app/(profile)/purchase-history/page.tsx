'use client'
import Table, { RowData } from "@/app/components/ui/table/Table";
import { ApiResponse } from "@/app/types/ApiRequest";
import { Column } from "@/app/types/Table";
import { apiRequest } from "@/app/utils/apiRequest";
import { useEffect, useState } from "react";

const page = () => {
  const columns = [
    { key: "orderId", label: "Order Id" },
    { key: "date", label: "Date" },
    { key: "amount", label: "Amount" },
    { key: "deliveryStatus", label: "Delivery Status" },
    { key: "paymentStatus", label: "Payment Status" },
    { key: "options", label: "Options" },
  ]; 
  
    const [ordersData, setOrdersData] = useState<RowData[]>([]);
    const [loading, setLoading] = useState(false);
    const [perPageLength, setPerPageLength] = useState<number>(50);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [refreshData, setRefreshData] = useState("");
  
    useEffect(() => {
      setLoading(true);
      const fetchOrderesData = async () => {
        try {
          const response = await apiRequest<ApiResponse>("GET", "/orders");
          if (response?.status == 200 && response.data) {
            setOrdersData((response.data as unknown as { data: RowData[] }).data);
            setTotalPages(response.data.last_page);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
      fetchOrderesData();
    }, [refreshData]);

  return (
    <div className="border border-gray-light p-3 md:p-6">
      <h3 className="text-xl font-semibold mb-6">Purchase History</h3>
      <Table
        columns={columns}
        data={ordersData}
        loading={loading}
        setPerPageLength={setPerPageLength}
        perPageLength={perPageLength}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        setRefreshData={setRefreshData}
        totalPages={totalPages}
      />
    </div>
  );
};

export default page;
