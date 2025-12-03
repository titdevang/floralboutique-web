"use client";

export default function OrderDetailPageSkeleton() {
  return (
    <div className="space-y-4 animate-pulse container">
      {/* Header */}
      <div className="h-6 w-40 bg-gray rounded"></div>

      {/* Order Summary Card */}
      <div className="border border-gray-light p-6 bg-white">
        <div className="h-4 w-32 bg-gray mb-4 pb-4 border-b border-soft-secondary"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-10">
          {/* Left column */}
          <div className="space-y-6">
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
          </div>

          {/* Right column */}
          <div className="space-y-6">
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
          </div>
        </div>
      </div>

      {/* Product Table */}
      <div className="border border-gray-light p-4">
        <div className="h-4 bg-gray w-32 mb-4"></div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left">
                {Array(8)
                  .fill(0)
                  .map((_, i) => (
                    <th key={i} className="py-3 px-3">
                      <div className="h-3 bg-gray rounded w-16"></div>
                    </th>
                  ))}
              </tr>
            </thead>

            <tbody>
              {Array(2)
                .fill(0)
                .map((_, i) => (
                  <tr key={i} className="border-t border-soft-secondary">
                    {Array(8)
                      .fill(0)
                      .map((_, j) => (
                        <td key={j} className="p-3">
                          <div className="h-3 bg-gray rounded w-10"></div>
                        </td>
                      ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="md:flex items-center justify-end">
        <div className="border border-gray-light p-4 md:w-1/2">
          <div className="h-4 bg-gray mb-4 pb-4 border-b border-soft-secondary w-40"></div>

          <div className="space-y-6">
            <PriceSkeletonRow />
            <PriceSkeletonRow />
            <PriceSkeletonRow />
            <PriceSkeletonRow />

            <div className="flex justify-between mb-2">
              <div className="h-4 bg-gray w-24 rounded"></div>
              <div className="h-4 bg-gray w-20 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Small reusable components */

function SkeletonRow() {
  return (
    <div className="grid grid-cols-2 gap-2 mb-4">
      <div className="h-4 bg-gray rounded w-24"></div>
      <div className="h-4 bg-gray rounded w-40"></div>
    </div>
  );
}

function PriceSkeletonRow() {
  return (
    <div className="flex justify-between mb-2">
      <div className="h-3 bg-gray w-24 rounded"></div>
      <div className="h-3 bg-gray w-20 rounded"></div>
    </div>
  );
}
