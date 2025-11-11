"use client";

const SearchDropdownSkeleton = () => {
  return (
    <div className="">
      {/* SUGGESTIONS */}
      <div className="p-3">
        <div className="h-6 w-full bg-gray rounded mb-2"></div>
        <div className="space-y-2">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-4 w-3/4 bg-gray rounded animate-pulse"
            ></div>
          ))}
        </div>
      </div>

      {/* CATEGORIES */}
      <div className=" p-3">
        <div className="h-6 w-full bg-gray rounded mb-2"></div>
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-4 w-2/3 bg-gray rounded animate-pulse"
            ></div>
          ))}
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="p-3">
        <div className="h-6 bg-gray rounded mb-2"></div>
        <div className="space-y-3">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray rounded-md animate-pulse"></div>
              <div className="flex-1">
                <div className="h-3 w-3/4 bg-gray rounded animate-pulse mb-1"></div>
                <div className="h-3 w-1/4 bg-gray rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchDropdownSkeleton;
