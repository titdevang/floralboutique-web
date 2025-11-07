"use client"
import { TooltipProps } from "@/app/types/Tooltip";
import { useState } from "react";

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      <div
        className={`absolute top-full mt-2 left-1/2 transform -translate-x-1/2 
          bg-black text-white text-sm rounded py-1 px-2
          transition-opacity duration-300 ${
            visible ? "opacity-100" : "opacity-0"
          }
        `}
      >
        {text}
        <div className="absolute top-[-4px] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black rotate-45"></div>
      </div>
    </div>
  );
};

export default Tooltip;
