"use client";

export default function CartItemCardSkeleton() {
  return (
    <div className="w-full rounded-xl overflow-hidden border border-soft-peach shadow-sm bg-white animate-pulse">
      {/* Address */}
      <div className="p-3 flex items-center gap-2 bg-gradient-to-b from-[#F3D0C3] to-[#fff]">
        <div className="h-5 w-5 bg-peach/40 rounded-full"></div>
        <div className="h-4 w-32 bg-peach/40 rounded"></div>
      </div>

      {/* Product Info */}
      <div className="flex items-start justify-between gap-3 mt-3 p-4">
        {/* Image */}
        <div className="h-16 w-16 bg-gray rounded-md"></div>

        {/* Text */}
        <div className="flex-1 space-y-2">
          <div className="h-4 w-40 bg-gray rounded"></div>
          <div className="h-4 w-24 bg-gray rounded"></div>
        </div>

        {/* Delete Icon */}
        <div className="h-6 w-6 bg-gray rounded"></div>
      </div>

      {/* Delivery Slot */}
      <div className="px-4 py-2 relative">
        <div className="border border-soft-primary rounded-lg p-3">
          {/* Label */}
          <div className="absolute bg-white top-0 left-[115px] h-4 w-36 bg-gray rounded"></div>

          <div className="flex items-center gap-3 mt-2">
            <div className="h-7 w-7 bg-gray rounded"></div>

            <div className="space-y-2">
              <div className="h-4 w-36 bg-gray rounded"></div>
              <div className="h-4 w-28 bg-gray rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="px-4 pb-4">
        <div className="w-full mt-4 h-10 rounded-lg bg-gray"></div>
      </div>
    </div>
  );
}
