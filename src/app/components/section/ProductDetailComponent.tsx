"use client";

import ImageWithFallback from "@/app/components/ui/fields/ImageWithFallback";
import PincodeDropdown from "@/app/components/ui/fields/PincodeDropdown";
import ProductDetailSkeleton from "@/app/components/ui/loader/ProductDetailSkeleton";
import { DeliveryMethod, DeliveryTimeSlot, Product } from "@/app/types/Product";
import { apiRequest } from "@/app/utils/apiRequest";
import { Dispatch, SetStateAction, use, useEffect, useState } from "react";
import { toast } from "react-toastify";
import SvgIcon from "@/app/components/ui/SvgIcon";
import { useCart } from "@/app/context/CartContext";
import Image from "next/image";
import CitiesDropdown from "@/app/components/ui/fields/CitiesDropdown";
import { useLocation } from "@/app/context/LocationContext";
import { Cities } from "@/app/types/Types";
import { getDate } from "@/app/lib/getDate";
import DatePickerPopup from "@/app/components/common/fields/DatePickerPopup";
import { ApiResponse } from "@/app/types/ApiRequest";
import SelectField from "@/app/components/common/fields/SelectField";

interface ProductProps {
  productData: Product;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}

export default function ProductDetail({ productData, setOpenModal }: ProductProps) {
  const product = productData?.productData;
  const [selecteDate, setSelectDate] = useState<string | undefined>();
  const [deliveryMethods, setDeliveryMethods] = useState<DeliveryMethod[]>([]);
  const [deliveryTimeSlots, setDeliveryTimeSlots] = useState<
    DeliveryTimeSlot[]
  >([]);
  const [deliveryType, setDeliveryType] = useState<DeliveryMethod | undefined>(
    undefined
  );
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState<
    DeliveryTimeSlot | undefined
  >();
  const { updateQuantity } = useCart();
  const { selectCities, selectPincode, selectCitieName } = useLocation();

  useEffect(() => {
    setDeliveryType(undefined);
    setDeliveryMethods([]);
    setDeliveryTimeSlot(undefined);
    setDeliveryTimeSlots([]);
    setSelectDate("");
  }, [selectPincode]);

  const fetchDeliveryMethods = async (date: string | undefined) => {
    try {
      const response = await apiRequest<ApiResponse>(
        "GET",
        `/products/${product?.slug}/delivery-methods?city_id=${selectCities}&pin_code=${selectPincode}&date=${date}`
      );
      if (response?.status === 200 && response.data) {
        setDeliveryMethods(
          (response.data as unknown as { data: DeliveryMethod[] }).data
        );
        setDeliveryType(response.data.data[0] as unknown as DeliveryMethod);
      } else {
        toast.warn(response?.data?.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const fetchDeliveryTimeSlots = async (id: number, date?: string) => {
    try {
      const response = await apiRequest<ApiResponse>(
        "GET",
        `/products/${
          product?.slug
        }/delivery-time-slots?delivery_id=${id}&date=${selecteDate || date}`
      );
      if (response?.status === 200 && response.data) {
        setDeliveryTimeSlots(
          (response.data as unknown as { data: DeliveryTimeSlot[] }).data
        );

        setDeliveryTimeSlot(
          response.data.data[0] as unknown as DeliveryTimeSlot
        );
      } else {
        toast.warn(response?.data?.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleAddToCart = async (product: Product) => {
    if (!deliveryTimeSlot) {
      toast.warning("Please Select Delivery Time Slot");
      return;
    }

    const productPayload = {
      ...product,
      city_id: selectCities,
      city: selectCitieName,
      pincode: selectPincode,
      deliveryDate: String(selecteDate),
      deliveryType: deliveryType?.name,
      deliveryTimeSlot: deliveryTimeSlot.time_slots,
      delivery_price: deliveryType?.price,
      deliveryTypeId: deliveryType?.id,
      startTime: deliveryTimeSlot.start_time
    };
    updateQuantity(productPayload as unknown as Product);
    setOpenModal(false);
  };

  return (
    <div>
      <div>
        <div className="space-y-10">
          {selectCities && (
            <div className={""}>
              <PincodeDropdown
                isBlink={!selectPincode}
                // dropdownClassName="!absolute"
              />
            </div>
          )}

          {/*--------------- start Schedule your delivery----------------- */}
          {selectPincode && selectCities && (
            <div className={``}>
              <div>
                <h3
                  className={`heading-2 !text-[18px] mb-2 !font-light w-fit ${
                    !selecteDate ? "animate-shadow-blink" : ""
                  }`}
                >
                  Schedule Your Delivery With Ease
                </h3>
              </div>
              <div className={"grid grid-cols-3 gap-2"}>
                <button
                  type="button"
                  onClick={() => {
                    setSelectDate(getDate("today", "full"));
                    fetchDeliveryMethods(getDate("today", "full"));
                  }}
                  className={`deliveryCard ${
                    selecteDate == getDate("today", "full")
                      ? "!border-primary"
                      : ""
                  }`}
                >
                  <span>Today</span>
                  <span>{getDate("today")}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectDate(getDate("tomorrow", "full"));
                    fetchDeliveryMethods(getDate("tomorrow", "full"));
                  }}
                  className={`deliveryCard ${
                    selecteDate == getDate("tomorrow", "full")
                      ? "!border-primary"
                      : ""
                  } `}
                >
                  <span>Tomorrow</span>
                  <span>{getDate("tomorrow")}</span>
                </button>

                <div
                  className={`h-full deliveryCard !p-0 w-full text-center ${
                    ![
                      getDate("tomorrow", "full"),
                      getDate("today", "full"),
                      "",
                    ].includes(selecteDate)
                      ? "!border-primary"
                      : ""
                  }`}
                >
                  <DatePickerPopup
                    onChange={(date) => {
                      setSelectDate(date);
                      fetchDeliveryMethods(date);
                    }}
                  />
                </div>
              </div>
            </div>
          )}
          {/*--------------- End Schedule your delivery----------------- */}

          {/*------------- start deliveryMethods------------------ */}
          {!!deliveryMethods.length && selecteDate && (
            <div className={``}>
              <div>
                <h3
                  className={`heading-2 !text-[18px] mb-2 !font-light w-fit ${
                    !deliveryType ? "animate-shadow-blink" : ""
                  }`}
                >
                  Preffred time slot
                </h3>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {deliveryMethods.map((method, index) => (
                  <div key={index} className={"h-full"}>
                    <button
                      type="button"
                      onClick={() => {
                        setDeliveryType(method);
                        fetchDeliveryTimeSlots(method.id);
                      }}
                      className={`deliveryCard ${
                        deliveryType?.id == method.id ? "!border-primary" : ""
                      } `}
                    >
                      <span>{method.name}</span>
                      <span>₹{method.price}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!!deliveryTimeSlots.length && deliveryType && (
            <div className={``}>
              <div>
                <h3 className={`heading-2 !text-[18px] mb-2 !font-light w-fit`}>
                  Time slot
                </h3>
              </div>
              <div
                className={`${!deliveryTimeSlot ? "animate-shadow-blink" : ""}`}
              >
                <SelectField
                  label="time slot"
                  name="time_slot"
                  value={deliveryTimeSlot?.id as unknown as string}
                  onChange={(e) =>
                    setDeliveryTimeSlot(
                      deliveryTimeSlots.find(
                        (timeslot) => timeslot.id == Number(e.target.value)
                      )
                    )
                  }
                  options={deliveryTimeSlots}
                  getOptionLabel={(option) => option.time_slots}
                  getOptionValue={(option) => option.id}
                />
              </div>
            </div>
          )}
        </div>
        {/*------------- end deliveryMethods------------------ */}

        {/*------------ Add to cart -------------- */}
        <div className="flex gap-4 mt-6 w-full sticky bottom-0">
          <button
            onClick={() => handleAddToCart(productData)}
            className="bg-secondary-base rounded-full w-full text-white px-6 py-3 transition"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
