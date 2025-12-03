export const formatDate = (date: Date) => {
    const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
    const monthName = date.toLocaleDateString("en-US", { month: "short" });
    const dayNumber = date.getDate();

    return `${dayName}, ${monthName} ${dayNumber}`;
};
