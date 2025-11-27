"use client";

const DeliveryCardSkeleton = () => {
  return (
    <div className="mt-10">
      <div className="flex items-center text-primary gap-1 bg-gray h-8 w-20 px-3 py-2 rounded-lg">
      </div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-start gap-6 py-4 animate-pulse">
        {/* Left Section */}
        <div className="flex flex-col items-start justify-start gap-4 w-full md:w-1/2">
          <div className="flex items-start gap-4 w-full">
            {/* Image + Delete */}
            <div className="flex items-center flex-col gap-2">
              <div className="w-[80px] h-[80px] bg-gray rounded-md"></div>
              <div className="w-10 h-3 bg-gray rounded"></div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-between w-full gap-3">
              <div className="h-4 w-54 bg-gray rounded"></div>

              <div className="flex items-center gap-6">
                <div className="h-4 w-24 bg-gray rounded"></div>

                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 bg-gray rounded-full"></div>
                  <div className="h-6 w-6 bg-gray rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-row items-start md:items-center md:justify-center gap-6 justify-between ">
          <div className="text-xs">
            <div className="h-4 w-24 bg-gray rounded"></div>
            <div className="h-4 w-28 bg-gray rounded mt-2"></div>
            <div className="h-4 w-20 bg-gray rounded mt-2"></div>
            <div className="h-4 w-32 bg-gray rounded mt-2"></div>
          </div>

          <div className="w-20 h-8 bg-gray rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryCardSkeleton;
