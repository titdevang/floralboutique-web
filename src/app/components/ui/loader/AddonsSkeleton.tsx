export function AddonsSkeleton() {
  return (
    <div className="w-full animate-pulse h-full max-h-[400px]">
      {/* Tabs Skeleton */}
      <div className="p-5 flex gap-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-10 w-28 bg-gray rounded-md"></div>
        ))}
      </div>

      {/* Product Grid Skeleton */}
      <div className="px-5 grid grid-cols-3 md:grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="border border-gray-light rounded-sm shadow-sm p-3"
          >
            {/* Image */}
            <div className="w-full h-40 bg-gray rounded-sm"></div>

            {/* Title */}
            <div className="mt-3 h-4 bg-gray rounded w-full"></div>

            {/* Price */}
            <div className="mt-3 h-4 bg-gray rounded w-1/2 mx-auto"></div>

            {/* Button */}
            <div className="mt-4 h-10 bg-gray rounded-sm"></div>
          </div>
        ))}
      </div>

      {/* Sticky Footer */}
      <div className="sticky bottom-0 flex justify-between p-2 px-10 gap-4 w-full bg-white border-t border-gray-light mt-5">
        <div className="w-full h-14 bg-gray rounded-sm"></div>
        <div className="w-full h-14 bg-gray rounded-sm"></div>
      </div>
    </div>
  );
}
