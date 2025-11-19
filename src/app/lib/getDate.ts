export function getDate(
  type: "today" | "tomorrow",
  format: "short" | "full" = "short"
) {
  const date = new Date();

  if (type === "tomorrow") {
    date.setDate(date.getDate() + 1);
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = date.getMonth() + 1; // number month
  const year = date.getFullYear();

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthShort = monthNames[date.getMonth()];

  // ---- SHORT FORMAT → 19 Nov ----
  if (format === "short") {
    return `${day} ${monthShort}`;
  }

  // ---- FULL FORMAT → 19-11-2025 ----
  if (format === "full") {
    return `${day}-${String(month).padStart(2, "0")}-${year}`;
  }
}
