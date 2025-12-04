"use client";

import React, {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {apiRequest} from "@/app/utils/apiRequest";
import {ApiResponse} from "@/app/types/ApiRequest";
import OrderDetailPageSkeleton from "@/app/components/ui/loader/OrderDetailPageSkeleton";
import Link from "next/link";
import SvgIcon from "@/app/components/ui/SvgIcon";
import FullPageLoader from "@/app/components/ui/loader/FullPageLoader";
import SmoothAccordion from "@/app/components/section/accordion/SmoothAccordion";
import { Product } from "@/app/types/Product";

export default function PaymentStatusPage() {
    const [status, setStatus] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [orderDetail, setOrderDetail] = useState<any | null>(null);

    const orderId = Cookies.get("orderId");

    const fetchOrder = async (orderUrl: String) => {
        try {
            const response = await apiRequest("GET", `/orders/${orderUrl}`);
            if (response?.status === 200) {
                setOrderDetail(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const checkPaymentStatus = async () => {
            setLoading(true);
            try {
                const response = await apiRequest<{
                data: {
                    state: string, orderId: string
                }}>(
                    "POST",
                    `/orders/payment/status/${orderId}`
                );

                if (response?.status == 200) {
                    const PaymentStatus = response?.data?.data?.state
                    setStatus(PaymentStatus);
                    if (PaymentStatus) {
                        fetchOrder(response?.data?.data?.orderId);
                    }
                }

            } catch (error) {
                setStatus("error");
            } finally {
                setLoading(false);
            }
        };

        if (orderId) {
            checkPaymentStatus();
        }
    }, [orderId]);

    if (loading) {
        return <div><FullPageLoader isLoading={loading}/></div>;
    }

    return (
      <div className=" space-y-10 lg:py-20 py-10">
        {/*------------order thank you-------------*/}
        <div
          className={
            "flex flex-col items-center justify-center text-success gap-2 pb-10"
          }
        >
          <SvgIcon
            name={"check-success.svg"}
            width={45}
            height={45}
            localImage="check-success.svg"
            fill="currentColor"
          />
          <h3 className={"lg:text-3xl text-2xl"}>Thank You for Your Order!</h3>
          <p className={"text-gray-extra-dark"}>
            A copy or your order summary has been sent to
          </p>
        </div>
        {!orderDetail ? (
          <OrderDetailPageSkeleton />
        ) : (
          <div className=" space-y-6">
            {/* Header */}
            <h1 className="text-xl font-semibold">
              Order Id: {orderDetail.orderId}
            </h1>

            {/* Card */}
            <div className="border border-gray-light p-6 ">
              <h2 className="font-semibold text-sm mb-4 pb-4 border-b border-soft-secondary">
                Order Summary
              </h2>

              {/* Grid */}
              <div className="md:grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-10">
                {/* Left column */}
                <div>
                    <DataRow label="Order Code" value={orderDetail.orderId}/>
                    <DataRow label="Customer" value={orderDetail.customer}/>
                    <DataRow label="Email" value={orderDetail.email ?? "N/A"}/>
                    <DataRow
                        label="Payment method"
                        value={orderDetail.paymentMethod}
                    />
                </div>

                {/* Right column */}
                <div>
                  <DataRow label="Order date" value={orderDetail.orderDate} />
                    <DataRow label="Order status"
                             value={`
                                  <p class="
                                    ${orderDetail.orderStatus === "pending" ? "text-warning" :
                                                                 orderDetail.orderStatus === "complete" ? "text-success" : "text-danger"
                                                             }
                                  ">
                                    ${orderDetail.orderStatus}
                                  </p>
                                 `}
                    />
                  <DataRow
                    label="Total order amount"
                    value={`₹ ${orderDetail.grandTotal}`}
                  />

                  {/* Additional Info */}
                  {orderDetail.additionalInfo && (
                    <div className="grid grid-cols-2">
                      <p className="font-semibold">Additional Info</p>
                      <p className="font-[400]">{orderDetail.additionalInfo}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Product Details Table */}
              <div className={"grid grid-cols-3 gap-6"}>
                <div className="col-span-2 border border-gray-light lg:p-4 p-2 ">
              <h2 className="font-semibold text-sm  p-4">Order Details</h2>

              <div>
                <SmoothAccordion
                  items={orderDetail.products.map(
                    (item: any, index: number) => ({
                      title: (
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-[500]">
                              #{String(index + 1).padStart(2, "0")}
                            </span>
                            <span className="text-sm font-[400] line-clamp-1">
                              {item.name}
                            </span>
                          </div>
                          <span className=" font-light">₹{item.total}</span>
                        </div>
                      ),
                      content: (
                        <div className="text-sm grid grid-cols-1 md:grid-cols-2 mt-4 lg:pl-6">
                          <DataRow label="Variation" value={item.variation} />
                          <DataRow
                            label="Unit Price"
                            value={`₹ ${item.unitPrice}`}
                          />
                          <DataRow label="Quantity" value={item.quantity} />
                          <DataRow
                            label="Net Price"
                            value={`₹ ${item.netPrice}`}
                          />
                          <DataRow label="Tax" value={`₹ ${item.tax}`} />
                          <DataRow
                            label="Delivery Price"
                            value={`₹ ${item.deliveryPrice}`}
                          />
                          <DataRow label="Total" value={`₹ ${item.total}`} />
                          <DataRow label="Refund" value="N/A" />
                          <DataRow
                            label="Shipping method"
                            value={item.shippingMethod}
                          />
                          <DataRow
                            label="Address"
                            value={`${[
                              item.address.address_1,
                              item.address.address_2,
                              item.address.address_3,
                              item.address.city,
                              item.address.postalCode,
                              item.address.state,
                              item.address.country,
                            ]
                              .filter(Boolean)
                              .join(", ")}`}
                          />
                        </div>
                      ),
                    })
                  )}
                  titleClasses="text-sm"
                  contentClasses="text-sm"
                  contentWithHTMLFormate={false}
                />

                {/* Accordion Ends */}
              </div>
            </div>
                  {/* Summary */}
                  <div className="md:flex items-start">
                      <div className="border border-gray-light p-4 w-full">
                          <h2 className="font-semibold mb-4 pb-4 border-b border-soft-secondary">
                              Order Amount
                          </h2>

                          <div className="space-y-6  ">
                              <PriceRow label="Subtotal" value={orderDetail.subTotal} />
                              <PriceRow
                                  label="Delivery Price"
                                  value={orderDetail.deliveryPrice}
                              />
                              <PriceRow
                                  label="Shipping Cost"
                                  value={orderDetail.shippingCost}
                              />
                              <PriceRow
                                  label="Coupon Discount"
                                  value={`${orderDetail.Coupon}`}
                              />

                              <div className="flex justify-between mb-2">
                                  <span className="font-semibold">Grand Total</span>
                                  <span className="font-semibold">
                      ₹ {orderDetail.grandTotal}
                    </span>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

          </div>
        )}
      </div>
    );
}


function DataRow({label, value}: { label: string; value: any }) {
    return (
        <div className="mb-4 grid grid-cols-2">
            <p className=" font-semibold">{label}:</p>
            <p className=" font-[400] capitalize" dangerouslySetInnerHTML={{__html: value}}/>
        </div>
    );
}

function PriceRow({label, value}: { label: string; value: any }) {
    return (
        <div className="flex justify-between mb-2">
            <span className="font-semibold">{label}</span>
            <span className="font-light">₹ {value}</span>
        </div>
    );
}
