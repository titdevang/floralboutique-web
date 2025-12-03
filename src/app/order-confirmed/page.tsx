"use client";

import React, {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {apiRequest} from "@/app/utils/apiRequest";
import {ApiResponse} from "@/app/types/ApiRequest";
import OrderDetailPageSkeleton from "@/app/components/ui/loader/OrderDetailPageSkeleton";
import Link from "next/link";
import SvgIcon from "@/app/components/ui/SvgIcon";
import FullPageLoader from "@/app/components/ui/loader/FullPageLoader";

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
                const response = await apiRequest<{ paymentStatus: string, orderId: string }>(
                    "GET",
                    `/phonepe/status?merchantTransactionId=${orderId}`
                );


                if (response?.status == 200) {
                    const PaymentStatus = response?.data?.paymentStatus
                    setStatus(PaymentStatus);
                    if (PaymentStatus == "COMPLETED") {
                        fetchOrder(response?.data.orderId);
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

    const address = orderDetail?.shippingAddress;

    return (
        <div className=" space-y-10 container lg:py-20 py-10">
            {/*------------order thank you-------------*/}
            <div className={"flex flex-col items-center justify-center text-success gap-2 pb-10"}>
                <SvgIcon
                    name={"check-success.svg"}
                    width={45}
                    height={45}
                    localImage="check-success.svg"
                    fill="currentColor"
                />
                <h3 className={"lg:text-3xl text-2xl"}>Thank You for Your Order!</h3>
                <p className={"text-gray-extra-dark"}>A copy or your order summary has been sent to</p>
            </div>
            {!orderDetail ? <OrderDetailPageSkeleton/> : <div>
                {/* Header */}
                <h1 className="text-xl font-semibold">Order Id: {orderDetail.orderId}</h1>

                {/* Card */}
                <div className="border border-gray-light p-6 bg-white">
                    <h2 className="font-semibold text-sm mb-4 pb-4 border-b border-soft-secondary">
                        Order Summary
                    </h2>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-10">
                        {/* Left column */}
                        <div>
                            <DataRow label="Order Code" value={orderDetail.orderId}/>
                            <DataRow label="Customer" value={orderDetail.customer}/>
                            <DataRow label="Email" value={orderDetail.email ?? "N/A"}/>

                            <div className="mb-4 grid grid-cols-2">
                                <p className="font-semibold">Shipping address:</p>
                                <p className="leading-6 font-[400]">
                                    {address.address}, {address.city}, <br/>
                                    {address.state} - {address.postalCode}, <br/>
                                    {address.country}
                                </p>
                            </div>
                        </div>

                        {/* Right column */}
                        <div>
                            <DataRow label="Order date" value={orderDetail.orderDate}/>
                            <DataRow label="Order status" value={orderDetail.orderStatus}/>
                            <DataRow
                                label="Total order amount"
                                value={`₹ ${orderDetail.grandTotal}`}
                            />
                            <DataRow
                                label="Shipping method"
                                value={orderDetail.shippingMethod}
                            />
                            <DataRow label="Payment method" value={orderDetail.paymentMethod}/>
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
                <div className="border border-gray-light p-4">
                    <h2 className="font-semibold text-sm  p-4">Order Details</h2>

                    <div className="overflow-x-auto">
                        <table className="w-full ">
                            <thead className="">
                            <tr className="text-left text-gray-dark">
                                <th className="py-3 px-3 font-semibold">#</th>
                                <th className="py-3 px-3 font-semibold">Product</th>
                                <th className="py-3 px-3 font-semibold">Variation</th>
                                <th className="py-3 px-3 font-semibold">Unit price</th>
                                <th className="py-3 px-3 font-semibold">QTY</th>
                                <th className="py-3 px-3 font-semibold">Net Price</th>
                                <th className="py-3 px-3 font-semibold">Tax</th>
                                <th className="py-3 px-3 font-semibold">Delivery Price</th>
                                <th className="py-3 px-3 font-semibold">Total</th>
                                <th className="py-3 px-3 font-semibold">Refund</th>
                                <th className="py-3 px-3 font-semibold">Review</th>
                            </tr>
                            </thead>

                            <tbody>
                            {orderDetail.products.map((item: any, index: number) => (
                                <tr
                                    key={item.id}
                                    className="border-t border-soft-secondary align-top text-sm"
                                >
                                    {/* Index */}
                                    <td className="p-3">{String(index + 1).padStart(2, "0")}</td>

                                    {/* Product Name (multi-line) */}
                                    <td className="p-3 text-primary font-light whitespace-pre-line">
                                        <Link href={`/product/${item.slug}`}>{item.name}</Link>
                                    </td>

                                    {/* Variation */}
                                    <td className="p-3 font-light">{item.variation}</td>

                                    {/* Unit Price */}
                                    <td className="p-3 font-light truncate">
                                        ₹ {item.unitPrice}
                                    </td>

                                    {/* Quantity */}
                                    <td className="p-3 font-light">{item.quantity}</td>

                                    {/* Net Price */}
                                    <td className="p-3 truncate font-light">₹ {item.netPrice}</td>

                                    {/* Tax */}
                                    <td className="p-3 truncate font-light">₹ {item.tax}</td>

                                    {/* Delivery Price */}
                                    <td className="p-3 truncate font-light">
                                        {item.deliveryPrice}
                                    </td>

                                    {/* Total */}
                                    <td className="p-3 truncate font-light">₹ {item.total}</td>

                                    {/* Refund */}
                                    <td className="p-3 font-semibold">N/A</td>

                                    {/* Review */}
                                    <td className="p-3 text-danger font-light">
                                        Not Delivered
                                        <br/>
                                        Yet
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Summary */}
                <div className="md:flex items-center justify-end">
                    <div className="border border-gray-light p-4 md:w-1/2">
                        <h2 className="font-semibold mb-4 pb-4 border-b border-soft-secondary">
                            Order Amount
                        </h2>

                        <div className="space-y-6  ">
                            <PriceRow label="Subtotal" value={orderDetail.subTotal}/>
                            <PriceRow
                                label="Delivery Price"
                                value={orderDetail.deliveryPrice}
                            />
                            <PriceRow label="Shipping Cost" value={orderDetail.shippingCost}/>
                            <PriceRow label="Coupon Discount" value={`${orderDetail.Coupon}`}/>

                            <div className="flex justify-between mb-2">
                                <span className="font-semibold">Grand Total</span>
                                <span className="font-semibold">₹ {orderDetail.grandTotal}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    );
}


function DataRow({label, value}: { label: string; value: any }) {
    return (
        <div className="mb-4 grid grid-cols-2">
            <p className=" font-semibold">{label}:</p>
            <p className=" font-[400] capitalize">{value}</p>
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
