"use client";
import { cn } from "@/app/lib/utils";
import React, { Dispatch, SetStateAction, useState } from "react";
import SvgIcon from "../SvgIcon";
import { Column } from "@/app/types/Table";
import Loader from "../loader/loader";
import PerPageList from "../../section/pagination/PerPageList";
import PaginationNumber from "../../section/pagination/PaginationNumber";
import Link from "next/link";
import Modal from "../modal/modal";
import { apiRequest } from "@/app/utils/apiRequest";
import { toast } from "react-toastify";
import { ApiResponse } from "@/app/types/ApiRequest";
import {toastError} from "@/app/lib/toast";

export type RowData = {
  id: number;
} & Record<
  string,
  string | number | boolean | Record<string, string | number>
>;

interface TableProps<T> {
  columns: Column<T>[];
  data: RowData[];
  emptyMessage?: string;
  loading?: boolean;
  setPerPageLength: (value: number) => void;
  perPageLength: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  setRefreshData: Dispatch<SetStateAction<string>>;
  totalPages: number;
}

const Table = <T,>({
  columns,
  data,
  emptyMessage = "Nothing found",
  loading,
  setCurrentPage,
  currentPage,
  setPerPageLength,
  perPageLength,
  totalPages,
  setRefreshData,
}: TableProps<T>) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleDelete = async () => {
    setDeleteModal(false);
    try {
      const response = await apiRequest<ApiResponse>(
        "POST",
        `/order/${selectedId}/cancel`
      );
      if (response?.status == 200 && response.data) {
        toast.success(response.data.message);
        setRefreshData(selectedId?.toString() || "");
      } else {
        toastError("something went wrong");
      }
    } catch (error) {
      toastError("something went wrong");
      console.error(error);
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <Modal
        isOpen={!!deleteModal}
        onClose={() => setDeleteModal(false)}
        title="Delete Confirmation"
        className="max-w-sm"
      >
        <div className="text-center space-y-4">
          <h4 className="text-sm">Are you sure to delete this?</h4>
          <div className=" space-x-4 font-[500]">
            <button
              onClick={() => setDeleteModal(false)}
              className="p-2 bg-primary text-white rounded-sm"
            >
              Cancel
            </button>
            <button
              onClick={() => handleDelete()}
              className="p-2 bg-danger text-white rounded-sm"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
      <table className="w-full border-collapse text-left">
        <thead className=" border-b border-light text-gray-dark">
          <tr className="">
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className={cn(
                  "text-[10px] last:text-end pb-3 px-3 font-semibold tracking-wide",
                  col.className
                )}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="text-dark w-full">
          {loading ? (
            <tr className="w-full h-40">
              <td
                colSpan={columns.length}
                className="py-10 text-center text-gray"
              >
                <Loader />
              </td>
            </tr>
          ) : data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index} className="hover:bg-light cursor-pointer">
                {columns.map((col) => (
                  <td key={String(col.key)} className="p-3 truncate">
                    {col.key == "orderId" ? (
                      <Link
                        href={`/purchase-history/details/${item.id}`}
                        className="text-primary text-[14px] font-light"
                      >
                        {String(item[col.key])}
                      </Link>
                    ) : col.key == "date" ? (
                      <p className="text-gray text-[14px] font-light">
                        {String(item[col.key])}
                      </p>
                    ) : col.key == "amount" ? (
                      <p className="text-gray-extra-dark text-[14px] font-bold">
                        ₹ {String(item[col.key])}
                      </p>
                    ) : col.key == "deliveryStatus" ? (
                      <p className="text-gray-extra-dark text-[14px] font-bold capitalize">
                        {String(item[col.key])}{" "}
                        {item.deliveryViewed == 0 && (
                          <span className="text-hov-secondary-base">*</span>
                        )}
                      </p>
                    ) : col.key == "paymentStatus" ? (
                      <div
                        className={`text-white text-[12px] capitalize w-fit flex gap-1`}
                      >
                        <p
                          className={` px-3 py-1 rounded-full ${
                            String(item[col.key]) == "paid"
                              ? "bg-success"
                              : "bg-danger"
                          }`}
                        >
                          {String(item[col.key])}
                        </p>
                        {item.deliveryViewed == 0 && (
                          <span className="text-hov-secondary-base font-bold text-[14px]">
                            *
                          </span>
                        )}
                      </div>
                    ) : col.key == "options" ? (
                      <div className="flex items-center justify-end gap-2">
                        {/*---------- Delete------ */}
                        {item.paymentStatus == "unpaid" && (
                          <button
                            onClick={() => {
                              setDeleteModal(true);
                              setSelectedId(item.id);
                            }}
                            title="Cancel"
                            className="text-danger bg-soft-danger hover:bg-danger hover:text-white duration-500 p-2 rounded-full"
                          >
                            <SvgIcon
                              name="delete.svg"
                              width={17}
                              height={17}
                              localImage="delete.svg"
                              fill="currentColor"
                            />
                          </button>
                        )}
                        <Link
                          href={`/purchase-history/details/${item.id}`}
                          title="Order detail"
                          className="text-blue bg-soft-blue hover:bg-blue hover:text-white duration-500 p-2 rounded-full"
                        >
                          <SvgIcon
                            name="order-detail.svg"
                            width={17}
                            height={17}
                            localImage="order-detail.svg"
                            fill="currentColor"
                          />
                        </Link>
                        <button
                          title="Download Invoice"
                          className="text-secondary-base bg-soft-secondary-base hover:bg-secondary-base hover:text-white duration-500 p-2 rounded-full"
                        >
                          <SvgIcon
                            name="download.svg"
                            width={17}
                            height={17}
                            localImage="download.svg"
                            fill="currentColor"
                          />
                        </button>
                      </div>
                    ) : String(item[col.key]) ? (
                      String(item[col.key])
                    ) : (
                      ""
                    )}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="py-10 text-center text-gray"
              >
                <div className="flex flex-col items-center gap-2">
                  <SvgIcon
                    name="data-not-found.svg"
                    width={40}
                    height={40}
                    localImage="data-not-found.svg"
                    fill="currentColor"
                  />
                  <p className=" font-medium">{emptyMessage}</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex items-center justify-between">
        {data.length > 10 && (
          <PerPageList
            perPageLength={perPageLength}
            setPerPageLength={setPerPageLength}
          />
        )}
        {totalPages > 1 && (
          <PaginationNumber
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default Table;
