"use client";

const PriceDetailsSkeleton = () => {
  return (
    <div className="w-full animate-pulse ">

      <div className="mt-6 space-y-4">
        {/* Total Product Price */}
        <div className="flex justify-between text-sm">
          <div className="h-4 w-32 bg-gray rounded"></div>
          <div className="h-4 w-16 bg-gray rounded"></div>
        </div>

        {/* Shipping */}
        <div className="flex justify-between text-sm">
          <div className="h-4 w-20 bg-gray rounded"></div>
          <div className="h-4 w-16 bg-gray rounded"></div>
        </div>

        {/* Total */}
        <div className="flex justify-between text-lg font-bold pb-4 pt-4">
          <div className="h-5 w-16 bg-gray rounded"></div>
          <div className="h-5 w-20 bg-gray rounded"></div>
        </div>

        {/* Divider Section */}
        <div className="border-y border-gray-light py-4 text-center">
          <div className="h-4 w-40 bg-gray rounded mx-auto"></div>
        </div>

        {/* Terms */}
        <div>
          <div className="h-4 w-56 bg-gray rounded"></div>
        </div>

        {/* Button */}
        <div>
          <div className="w-full h-10 bg-gray rounded-[40px]"></div>
        </div>
      </div>
    </div>
  );
};

export default PriceDetailsSkeleton;
