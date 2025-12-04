'use client'
import { ApiResponse } from '@/app/types/ApiRequest';
import { DeliveryMethod, DeliveryTimeSlot, Product } from '@/app/types/Product';
import { apiRequest } from '@/app/utils/apiRequest';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import DatePickerPopup from '../../common/fields/DatePickerPopup';
import { getDate } from '@/app/lib/getDate';
import SelectField from '../../common/fields/SelectField';
import { useCart } from '@/app/context/CartContext';
import {toastError} from "@/app/lib/toast";

interface ChangeTimeSlotProps {
  product?: Product;
  setChangeDeliveryDateScreen: React.Dispatch<React.SetStateAction<boolean>>
}

const ChangeTimeSlot: React.FC<ChangeTimeSlotProps> = ({
  product,
  setChangeDeliveryDateScreen,
}) => {
  const [selecteDate, setSelectDate] = useState<string | undefined>("");
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

  const fetchDeliveryMethods = async (date: string | undefined) => {
    setDeliveryType(undefined);
    try {
      const response = await apiRequest<ApiResponse>(
        "GET",
        `/products/${product?.productData?.slug}/delivery-methods?city_id=${
          (product?.city as { id: number })?.id
        }&pin_code=${product?.pinCode}&date=${date}`
      );
      if (response?.status === 200 && response.data) {
        setDeliveryMethods(
          (response.data as unknown as { data: DeliveryMethod[] }).data
        );
      } else {
        toast.warn(response?.data?.message);
      }
    } catch (error) {
      console.error(error);
      toastError("Something went wrong. Please try again.");
    }
  };

  const fetchDeliveryTimeSlots = async (id: number) => {
    try {
      const response = await apiRequest<ApiResponse>(
        "GET",
        `/products/${product?.productData?.slug}/delivery-time-slots?delivery_id=${id}&date=${selecteDate}`
      );
      if (response?.status === 200 && response.data) {
        setDeliveryTimeSlots(
          (response.data as unknown as { data: DeliveryTimeSlot[] }).data
        );
      } else {
        toast.warn(response?.data?.message);
      }
    } catch (error) {
      console.error(error);
      toastError("Something went wrong. Please try again.");
    }
  };

  const handleSaveInfoToAddToCart = async () => {
    if (!deliveryTimeSlot) {
      toast.warning("Please Select Delivery Time Slot");
      return;
    }
    setChangeDeliveryDateScreen(false);
    // const productPayload = {
    //   ...product,
    //   city_id: (product?.city as { id: number }).id,
    //   city: (product?.city as { name: string })?.name,
    //   pincode: product?.pinCode,
    //   deliveryDate: String(selecteDate),
    //   deliveryType: deliveryType,
    //   deliveryTimeSlot: deliveryTimeSlot,
    //   taxes: product?.productData?.taxes,
    //   id: product?.productData?.id,
    //   finalPrice: product?.productData?.finalPrice,
    // };
    const productPayload = {
      ...product,
      city_id: (product?.city as { id: number }).id,
      city: (product?.city as { name: string })?.name,
      pincode: product?.pinCode,
      deliveryDate: String(selecteDate),
      deliveryType: deliveryType?.name,
      deliveryTimeSlot: deliveryTimeSlot.time_slots,
      deliveryPrice: deliveryType?.price,
      deliveryTypeId: deliveryType?.id,
      startTime: deliveryTimeSlot.start_time,
    };
     updateQuantity(productPayload as unknown as Product);
  };
  
  return (
    <div className={`p-6`}>
      <div className="space-y-10">
        {/*--------------- start Schedule your delivery----------------- */}
        {
          <div>
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
                {/* <span>{getDate("today")}</span> */}
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
                {/* <span>{getDate("tomorrow")}</span> */}
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
        }
        {/*--------------- End Schedule your delivery----------------- */}

        {/*------------- start deliveryMethods------------------ */}
        {selecteDate && (
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
                value={deliveryTimeSlot as unknown as string}
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
      <div className="text-center mt-6">
        <button
          type="button"
          onClick={handleSaveInfoToAddToCart}
          className="bg-primary hover:bg-hov-primary duration-300 px-6 py-1.5 text-white rounded-sm "
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ChangeTimeSlot