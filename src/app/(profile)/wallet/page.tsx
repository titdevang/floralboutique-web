'use client'
import RechargeWallet from "@/app/components/section/modal/RechargeWallet";
import CountUpAnimation from "@/app/components/ui/loader/CountUpAnimation";
import SvgIcon from "@/app/components/ui/SvgIcon";
import Table, { RowData } from "@/app/components/ui/table/Table";
import { ApiResponse } from "@/app/types/ApiRequest";
import { apiRequest } from "@/app/utils/apiRequest";
import { useEffect, useState } from "react";

const page = () => {
  const [rechargeWalletModal, setRechargeWalletModal] = useState(false);

  const columns = [
    { key: "orderId", label: "#" },
    { key: "date", label: "Date" },
    { key: "amount", label: "Amount" },
    { key: "paymentMethod", label: "Payment method" },
  ]; 

        const [data, setData] = useState<RowData[]>([]);
        const [balance, setBalance] = useState(0)
        const [loading, setLoading] = useState(false);
        const [perPageLength, setPerPageLength] = useState<number>(10);
        const [currentPage, setCurrentPage] = useState<number>(1);
        const [totalPages, setTotalPages] = useState<number>(0);
        const [refreshData, setRefreshData] = useState("");

        useEffect(()=>{
          setLoading(true);
          const fetchData = async() => {
            try {
              const response = await apiRequest<ApiResponse>("GET", "/wallets");

              if (response?.status == 200 && response.data) {
                setData(
                  (response.data as unknown as { data: { history: {data: RowData[]} } }).data.history
                    .data
                );
                setBalance(
                  (response.data as unknown as { data: { balance: number} }).data.balance
                );
                setTotalPages(response.data.last_page);
              }
            } catch (error) {
             console.error(error) 
            } finally {
              setLoading(false);
            }
          }
          fetchData();
        },[refreshData])
  

  return (
    <div>
      <RechargeWallet
        setRechargeWalletModal={setRechargeWalletModal}
        rechargeWalletModal={rechargeWalletModal}
      />
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
              <p className="text-3xl font-bold">
                ₹ <CountUpAnimation value={balance} />
              </p>
            </div>
          </div>

          <div className="p-6 flex flex-col justify-between items-center relative overflow-hidden bg-soft-light hover:bg-soft-secondary-base duration-500 text-black py-10">
            <button
              type="button"
              onClick={() => setRechargeWalletModal(true)}
              className="flex flex-col justify-center items-center text-center h-full space-y-2"
            >
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
            </button>
          </div>
        </div>
        <div className="mt-4 border border-gray-light p-3 md:p-6">
          <h3 className="text-xl font-semibold mb-6">
            Wallet Recharge History
          </h3>
          <Table
            columns={columns}
            data={data}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            perPageLength={perPageLength}
            totalPages={totalPages}
            loading={loading}
            setRefreshData={setRefreshData}
            setPerPageLength={setPerPageLength}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
