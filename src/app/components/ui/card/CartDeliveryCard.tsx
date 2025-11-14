"use client";

import { Product } from "@/app/types/Product";
import Image from "next/image";
import SvgIcon from "../SvgIcon";

interface CartItemCardProps {
  location: string;
  item: Product;
  onRemove: (id: number) => void;
  onMakeSpecial?: (id: number) => void;
}

export default function CartItemCard({
  location,
  item,
  onRemove,
  onMakeSpecial,
}: CartItemCardProps) {
  return (
    <div className="w-full rounded-xl overflow-hidden border border-soft-peach shadow-sm transition bg-white ">
      {/* Address */}
      <div className="text-dark p-2 py-3 flex items-center gap-2 text-[15px] font-medium bg-gradient-to-b from-[#F3D0C3] to-[#fff]">
        <SvgIcon
          name={"location.svg"}
          width={22}
          height={22}
          fill={"currentColor"}
          localImage={"location.svg"}
        />
        <span>{location}</span>
      </div>

      {/* Product Info */}
      <div className="flex items-start justify-between gap-3 mt-3 p-4">
        <Image
          src={`${item?.imageUrl}`}
          alt={item.name}
          width={50}
          height={50}
          className="h-16 w-16 object-cover rounded-md group-hover:scale-105 duration-300"
        />
        <div className="flex-1">
          <p className="text-[15px] text-dark font-medium leading-tight line-clamp-2">
            {item.name}
          </p>
          <p className="font-semibold text-[16px] text-primary mt-1">
            {item.quantity} x ₹{item.finalPrice}
          </p>
        </div>
        <button type="button" className="text-peach" onClick={() => onRemove(item.cart_id)}>
          <SvgIcon
            name={"delete.svg"}
            width={22}
            height={22}
            fill={"currentColor"}
            localImage={"delete.svg"}
          />
        </button>
      </div>

      {/* Delivery Slot */}
      <div className="px-4 py-2 relative">
        <div className="  flex items-center justify-between border border-soft-primary rounded-lg p-3">
          <p className=" absolute bg-white top-0 left-[115px] text-xs text-gray-dark font-medium">
            Delivery Date & Time Slot
          </p>
          <div className="flex items-center gap-3">
            <SvgIcon
              name={"calender.svg"}
              width={28}
              height={28}
              fill={"currentColor"}
              localImage={"calender.svg"}
              className="text-peach"
            />
            <div className="text-[14px] text-neutral-600 font-[500] leading-tight">
              <p>
                {item?.deliverySlot?.date}, {item?.deliverySlot?.time}
              </p>
              <p className="text-[13px]">
                {item?.deliverySlot?.type} – ₹{item?.deliverySlot?.cost}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="px-4 pb-4">
        <button
          className="w-full mt-4 flex items-center hover:bg-peach-light duration-300  text-[15px] justify-center gap-2 border border-peach text-peach font-semibold rounded-lg py-2.5 transition"
          onClick={() => onMakeSpecial?.(item.id as number)}
        >
          <SvgIcon
            name={"gift.svg"}
            width={28}
            height={28}
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
