import React from "react";

const ProductCardSkeleton = () => {
  return (
    <div className="md:p-2 select-none h-full animate-pulse">
      <div className="h-full bg-product-card rounded-xl p-2 pb-4 flex flex-col justify-between">
        <div className="flex flex-col h-full">
          {/* Image Skeleton */}
          <div className="relative w-full h-[180px] md:h-[210px] mb-3 rounded-lg overflow-hidden bg-gray"></div>

          {/* Title Skeleton */}
          <div className="flex flex-col flex-grow justify-between h-[75px]">
            <div className="mb-2">
              <div className="w-3/4 h-4 bg-gray rounded mb-2"></div>
              <div className="w-1/2 h-4 bg-gray rounded"></div>
            </div>

            {/* Price + Rating Skeleton */}
            <div className="flex items-center justify-between mt-auto">
              <div className="w-16 h-5 bg-gray rounded"></div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-4 bg-gray rounded"></div>
                <div className="w-6 h-4 bg-gray rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
