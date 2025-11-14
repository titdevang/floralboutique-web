// app/utils/cacheKey.ts
export const makeCategoryCacheKey = (
  slug: string | undefined,
  filter: string | Record<string, any> | undefined
) => {
  const s = slug ?? "__noslug__";
  const filterString =
    typeof filter === "string"
      ? filter || "__nofilter__"
      : filter && Object.keys(filter).length
      ? Object.keys(filter)
          .sort()
          .map(
            (k) =>
              `${encodeURIComponent(k)}=${encodeURIComponent(
                JSON.stringify(filter[k])
              )}`
          )
          .join("&")
      : "__nofilter__";

  return `${s}::${filterString}`;
};
