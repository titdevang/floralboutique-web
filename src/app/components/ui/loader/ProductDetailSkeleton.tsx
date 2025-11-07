import React from "react";

const ProductDetailSkeleton = () => {
  return (
    <div className="w-full flex flex-col lg:flex-row gap-8 bg-white animate-pulse">
      <div className="flex-col lg:flex-row flex gap-4 flex-1 w-full">
        <div className="lg:order-1 order-2 flex lg:flex-col justify-center lg:justify-normal gap-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="w-20 h-20 bg-gray"></div>
          ))}
        </div>

          <div className="lg:order-2 order-1  flex justify-start items-start flex-col gap-6 flex-1 animate-pulse">
              {/* Image Skeleton */}
              <div className="h-[300px] lg:h-[400px] w-full aspect-square bg-gray"></div>

              {/* Tabs Skeleton (visible on large screens) */}
              <div className="w-full lg:flex hidden flex-col gap-3 mt-4">
                  <div className="h-6 w-1/3 bg-gray rounded"></div>
                  <div className="h-4 w-2/3 bg-gray rounded"></div>
                  <div className="h-4 w-1/2 bg-gray rounded"></div>
              </div>
          </div>

      </div>

      <div className="flex-1">
        <div className="flex justify-between items-start flex-col">
          <div className="h-6 bg-gray rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray rounded w-1/4"></div>
        </div>

        <div className="flex items-center gap-1 mt-4">
          <div className="h-4 w-1/3 bg-gray rounded"></div>
          <div className="h-4 w-20 bg-gray rounded ml-2"></div>
        </div>

        <div className="h-8 w-1/5 bg-gray rounded mt-6"></div>

        <div className="h-12 w-full bg-gray rounded mt-4"></div>

        <div className="h-4 w-1/2 bg-gray rounded mt-2"></div>

        <div className="flex gap-4 mt-6 w-full">
          <div className="h-12 w-full bg-gray rounded"></div>
          <div className="h-12 w-full bg-gray rounded"></div>
        </div>

        <div className="mt-1 bg-white border border-gray shadow-sm">
          <div className="flex">
            <div className="px-6 py-3 h-12 w-28 bg-gray-200 m-2 rounded"></div>
            <div className="px-6 py-3 h-12 w-28 bg-gray-200 m-2 rounded"></div>
            <div className="px-6 py-3 h-12 w-28 bg-gray-200 m-2 rounded"></div>
          </div>
          <div className="p-6">
            <div className="h-4 bg-gray rounded w-full mb-2"></div>
            <div className="h-4 bg-gray rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
