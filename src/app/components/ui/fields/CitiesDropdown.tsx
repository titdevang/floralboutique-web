import React from "react";
import Select, { Option } from "../../common/fields/Select";
import Cookies from "js-cookie";
import { useLocation } from "@/app/context/LocationContext";

interface CitiesDropdownProps {
  isBlink?: boolean;
  dropdownClassName?: string;
  options: any[];
  optionLable: string;
  optionValue: string;
}

const CitiesDropdown: React.FC<CitiesDropdownProps> = ({
  isBlink = false,
  dropdownClassName,
  options,
  optionLable,
  optionValue,
}) => {
  const {
    selectCities,
    setSelectCities,
    setSelectCitieName,
    setSelectPincode,
  } = useLocation();

  const handleCities = (value: string, label: string) => {
    setSelectCities(value);
    Cookies.set("lastVisitCities", value);
    setSelectCitieName(label);
    Cookies.set("lastVisitCitiesName", label);
    setSelectPincode("");
    Cookies.remove("lastVisitPincode");
  };

  const formattedOptions: Option[] = options.map((item) => ({
    label: item[optionLable],
    value: item[optionValue],
  }));

  const selectedOption = formattedOptions.find(
    (item) => (item as {value: string}).value == selectCities
  );

  return (
    <div
      className={`w-full mx-auto mt-6 border-[#dfdfe6] border rounded p-1 shadow-lg transition ${
        isBlink ? "animate-shadow-blink" : ""
      }`}
    >
      <div className="flex gap-5">
        <div className="w-fit text-[14px] bg-[#d1d1d1] px-6 py-3">INDIA</div>

        <Select
          options={formattedOptions}
          selected={selectedOption}
          onChange={(selection) =>
            handleCities(
              (selection as { value: string }).value,
              (selection as { label: string }).label
            )
          }
          placeholder="Select Cities"
          dropdownClassName={dropdownClassName}
        />
      </div>
    </div>
  );
};

export default CitiesDropdown;
