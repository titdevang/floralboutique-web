import React from "react";

interface SliderButtonProps {
  onClick: React.MouseEventHandler<HTMLDivElement>;
  disabled: boolean;
  event: "next" | "prev";
  className?: string;
}

const SliderButton: React.FC<SliderButtonProps> = ({
  onClick,
  disabled,
  event,
  className,
}) => {
  const baseClasses =
    "absolute z-10 top-1/2 -translate-y-1/2 bg-primary font-semibold text-white shadow rounded-tl-xl rounded-br-xl flex items-center justify-center";

  const sizeClasses =
    "w-[24px] h-[24px] md:w-[15px] md:h-[60px] md:text-lg ";

  return (
    <div
      onClick={onClick}
      aria-label={event === "prev" ? "Previous slide" : "Next slide"}
      className={`${baseClasses} ${sizeClasses} ${
        event === "prev" ? "left-4" : "right-4"
      } ${className} lg:flex hidden cursor-pointer`}
    >
      {event === "prev" ? "‹" : "›"}
    </div>
  );
};

export default SliderButton;
