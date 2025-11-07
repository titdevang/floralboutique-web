import React from "react";

interface SliderButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
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
    "absolute z-10 top-1/2 -translate-y-1/2 bg-primary font-bold text-white shadow rounded-tl-xl rounded-br-xl flex items-center justify-center";

  const sizeClasses =
    "w-[24px] h-[24px] md:w-[40px] md:h-[40px] md:text-lg ";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={event === "prev" ? "Previous slide" : "Next slide"} 
      className={`${baseClasses} ${sizeClasses} ${
        event === "prev" ? "left-4" : "right-4"
      } ${className} lg:flex hidden`}
    >
      {event === "prev" ? "‹" : "›"}
    </button>
  );
};

export default SliderButton;
