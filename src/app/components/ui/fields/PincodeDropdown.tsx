import React, { useEffect } from "react";
import Select from "../../common/fields/Select";
import Cookies from "js-cookie";
import { useLocation } from "@/app/context/LocationContext";

interface PincodeDropdownProps {
  isBlink?: boolean;
  dropdownClassName?: string;
}

const PincodeDropdown: React.FC<PincodeDropdownProps> = ({
  isBlink = false,
  dropdownClassName,
}) => {
  const pincodes = ["560001", "560002", "560003", "560004"];

  const { selectPincode, setSelectPincode } = useLocation()

  const handlePincode = (pincode: string) => {
    setSelectPincode(pincode);
    Cookies.set("lastVisitPincode", pincode);
  };
console.log({ selectPincode });

  return (
    <div
      className={`w-full mx-auto mt-6 border-[#dfdfe6] border rounded p-1 shadow-lg transition ${
        isBlink ? "animate-shadow-blink" : ""
      }`}
    >
      {/* Country & Pincode Selection */}
      <div className="flex gap-5">
        <div className="w-fit text-[14px] bg-[#d1d1d1] px-6 py-3">INDIA</div>
        <Select
          options={pincodes}
          selected={selectPincode}
          onChange={(selection) =>
            handlePincode((selection as { value: string }).value)
          }
          placeholder="Select pincode"
          dropdownClassName={dropdownClassName}
        />
      </div>
    </div>
  );
};

export default PincodeDropdown
