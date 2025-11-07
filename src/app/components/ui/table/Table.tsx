"use client";
import { cn } from "@/app/lib/utils";
import React from "react";
import SvgIcon from "../SvgIcon";
import { Column } from "@/app/types/Table";

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  renderRow?: (item: T, index: number) => React.ReactNode;
  emptyMessage?: string;
}

const Table = <T,>({
  columns,
  data,
  renderRow,
  emptyMessage = "Nothing found",
}: TableProps<T>) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse text-left">
        <thead className=" border-b border-light text-gray-dark">
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className={cn(
                  "text-[10px] pb-3 font-semibold tracking-wide",
                  col.className
                )}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="text-dark">
          {data.length > 0 ? (
            data.map((item, index) =>
              renderRow ? (
                renderRow(item, index)
              ) : (
                <tr key={index} className="hover:bg-light cursor-pointer">
                  {columns.map((col) => (
                    <td key={String(col.key)} className="py-4">
                      {(() => {
                        const value = item[col.key];
                        if (
                          typeof value === "string" ||
                          typeof value === "number" ||
                          typeof value === "boolean" ||
                          React.isValidElement(value)
                        ) {
                          return value;
                        }
                        return "-";
                      })()}
                    </td>
                  ))}
                </tr>
              )
            )
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
    </div>
  );
};

export default Table;
