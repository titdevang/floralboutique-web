"use client";

import { Product } from "@/app/types/Product";
import SvgIcon from "../SvgIcon";
import ImageWithFallback from "../fields/ImageWithFallback";
import { Cities } from "@/app/types/Types";

interface CartItemCardProps {
  item: Product;
  onRemove: (product: Product) => void;
  onMakeSpecial?: (id: number) => void;
  onChangeDeliveryDate: (cartId: number) => void;
}

export default function CartItemCard({
  item,
  onRemove,
  onMakeSpecial,
  onChangeDeliveryDate,
}: CartItemCardProps) {
  
  return (
    <div className="w-full rounded-xl overflow-hidden border border-soft-peach shadow-sm transition bg-white ">
      {/* Address */}
      <div className="text-dark p-2 py-3 flex items-center gap-2 text-[12px] font-medium bg-gradient-to-b from-[#F3D0C3] to-[#fff]">
        <SvgIcon
          name={"location.svg"}
          width={20}
          height={20}
          fill={"currentColor"}
          localImage={"location.svg"}
        />
        <span>
          {item.pinCode}, {(item.city as Cities)?.name},{" "}
          {(item.state as Cities)?.name}
        </span>
      </div>

      {/* Product Info */}
      <div className="flex items-start justify-between gap-3 p-4">
        <ImageWithFallback
          src={`${item?.productData?.imageUrl}`}
          alt={item?.productData?.name || ""}
          width={50}
          height={50}
          className="h-16 w-16 object-cover rounded-md group-hover:scale-105 duration-300"
        />
        <div className="flex-1">
          <p className="text-[13.5px] text-dark font-medium leading-tight line-clamp-2">
            {item?.productData?.name}
          </p>
          <p className="font-semibold text-[15px] text-primary mt-1">
            {item?.quantity} x ₹{item?.productData?.finalPrice}
          </p>
        </div>
        <button
          type="button"
          className="text-peach"
          onClick={() => onRemove(item)}
        >
          <SvgIcon
            name={"delete.svg"}
            width={22}
            height={22}
            fill={"currentColor"}
            localImage={"delete.svg"}
          />
        </button>
      </div>

      {item.addonProducts?.map((addonProduct, index) => (
        <div key={index} className="flex items-start justify-between gap-3 p-4">
          <ImageWithFallback
            src={`${addonProduct?.imageUrl}`}
            alt={addonProduct?.name || ""}
            width={50}
            height={50}
            className="h-16 w-16 object-cover rounded-md group-hover:scale-105 duration-300"
          />
          <div className="flex-1">
            <p className="text-[13.5px] text-dark font-medium leading-tight line-clamp-2">
              {addonProduct?.name}
            </p>
            <p className="font-semibold text-[15px] text-primary mt-1">
              {addonProduct?.quantity} x ₹{addonProduct?.finalPrice}
            </p>
          </div>
          <button
            type="button"
            className="text-peach"
            onClick={() => onRemove(addonProduct)}
          >
            <SvgIcon
              name={"delete.svg"}
              width={22}
              height={22}
              fill={"currentColor"}
              localImage={"delete.svg"}
            />
          </button>
        </div>
      ))}

      {/* Delivery Slot */}
      <button
        type="button"
        onClick={() => onChangeDeliveryDate(item.id)}
        className="px-4 py-1.5 relative w-full text-start"
      >
        <div className="  flex items-center justify-between border border-soft-primary rounded-lg p-3">
          <p className=" absolute bg-white top-0 left-[115px] text-[11px] text-gray-dark font-medium">
            Delivery Date & Time Slot
          </p>
          <div className="flex items-center gap-3">
            <SvgIcon
              name={"calender.svg"}
              width={25}
              height={25}
              fill={"currentColor"}
              localImage={"calender.svg"}
              className="text-peach"
            />
            <div className="text-[13px] text-neutral-600 font-[500] leading-tight">
              <p>
                {item?.deliveryDate},{" "}
                {item?.deliveryTimeSlot as unknown as string}
              </p>
              <p className="text-[12px]">
                {item?.deliveryType as unknown as string} – ₹
                {item?.deliveryPrice}
              </p>
            </div>
          </div>
        </div>
      </button>

      {/* Button */}
      <div className="px-4 pb-4">
        <button
          className="w-full mt-4 flex items-center hover:bg-peach-light duration-300  text-[13px] justify-center gap-2 border border-peach text-peach font-semibold rounded-lg py-2.5 transition"
          onClick={() => onMakeSpecial?.(item.id as number)}
        >
          <SvgIcon
            name={"gift.svg"}
            width={23}
            height={23}
            fill={"currentColor"}
            localImage={"gift.svg"}
            className="text-peach"
          />
          {/* <Gift size={16} /> */}
          Make it extra special
        </button>
      </div>
    </div>
  );
}
