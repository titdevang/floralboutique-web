import React from "react";

const HomePageSkeleton = () => {
  return (
    <div className="animate-pulse space-y-10">
      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        {Array(8)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="w-24 md:w-32 md:h-32 h-[94px] bg-gray rounded-md"
            />
          ))}
      </div>

      {/* Hero Banner */}
      <div className="bg-gray w-full overflow-hidden rounded-2xl aspect-[16/5]" />

      {/* Hand Delivered With Love Section */}
      <div className="overflow-hidden">
        <div className="h-6 bg-gray w-48 mb-4 rounded" />
        <div className="flex gap-4">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="md:min-w-60 min-w-28 h-28 md:h-60 bg-gray rounded-md"
              />
            ))}
        </div>
      </div>

      {/* Top Trending Products */}
      <div>
        <div className="h-6 bg-gray w-56 mb-4 rounded" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="h-64 bg-gray rounded-md" />
            ))}
        </div>
      </div>

      {/* Say it with Flowers */}
      <div>
        <div className="h-6 bg-gray w-48 mb-4 rounded" />
        <div className="flex gap-4 justify-center">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="w-36 h-36 bg-gray rounded-md" />
            ))}
        </div>
      </div>

      {/* Flower Showcase Section */}
      <div className="h-64 bg-gray-300 rounded-md w-full" />
    </div>
  );
};

export default HomePageSkeleton;
