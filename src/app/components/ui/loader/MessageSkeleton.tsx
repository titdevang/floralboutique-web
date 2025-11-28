"use client";

const MessageSkeleton = () => {
  return (
    <div className=" animate-pulse">
      {/* Categories */}
      <div className="py-10 space-y-6">
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="h-7 w-24 bg-gray rounded-full"></div>
          ))}
        </div>

        {/* Checkbox skeleton */}
        <div className="border-b border-gray-light pb-4 flex items-center gap-3">
          <div className="w-4 h-4 bg-gray rounded"></div>
          <div className="w-60 h-4 bg-gray rounded"></div>
        </div>

        {/* Subcategories skeleton */}
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-7 w-20 bg-gray rounded-full"></div>
          ))}
        </div>
      </div>

      {/* Messages + Compose */}
      <div className="flex gap-4">
        {/* Left Side: Messages */}
        <div className="w-1/2">
          <div className="h-4 w-32 bg-gray rounded mb-3"></div>

          <div className="flex flex-col gap-3 h-full max-h-72 pr-1">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-full h-16 bg-gray rounded-sm"></div>
            ))}
          </div>
        </div>

        {/* Right Side: Compose */}
        <div className="w-1/2">
          <div className="h-4 w-40 bg-gray rounded mb-3"></div>

          <div className="w-full h-52 bg-gray rounded-sm"></div>

          <div className="text-end mt-4">
            <div className="h-8 w-24 bg-gray rounded-sm ml-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageSkeleton;
