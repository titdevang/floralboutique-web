import React, { useEffect, useRef, useState } from "react";
import Select, {
  GroupBase,
  MultiValue,
  SingleValue,
  StylesConfig,
} from "react-select";
import makeAnimated from "react-select/animated";
import { CSSObject } from "@emotion/react";

interface SelectSingleProps<T> {
  label: string;
  name: string;
  placeholder?: string;
  value?: string | number;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  defaultValue?: string;
  options: T[];
  disabled?: boolean;
  getOptionLabel: (option: T) => string;
  getOptionValue: (option: T) => string | number;
  className?: string;
  optionShowSecondName?: keyof T;
  removeSelectedOptions?: boolean;
}

const SelectField = <T,>({
  label,
  name,
  value,
  onChange,
  options,
  error,
  getOptionLabel,
  getOptionValue,
  disabled = false,
  className = "",
  defaultValue,
  optionShowSecondName,
  removeSelectedOptions = true,
}: SelectSingleProps<T>) => {
  const [currentOption, setCurrentOption] = useState<T | null>();
  const animatedComponents = makeAnimated();
  const [showRightLabel, setShowRightLabel] = useState(false);
  useEffect(() => {
    function showRightLabel() {
      if (selectRef.current) {
        const rect = selectRef.current.getBoundingClientRect();
        if (rect.width < 270) {
          setShowRightLabel(false);
        } else {
          setShowRightLabel(true);
        }
      }
    }

    showRightLabel();

    window.addEventListener("resize", showRightLabel);
    window.addEventListener("scroll", showRightLabel);

    return () => {
      window.removeEventListener("resize", showRightLabel);
      window.removeEventListener("scroll", showRightLabel);
    };
  }, []);

  const colorStyles: StylesConfig<string | T, boolean, GroupBase<T>> = {
    control: (styles: CSSObject, { isFocused, isDisabled }) => ({
      ...styles,
      backgroundColor: isDisabled ? "#e9ecef" : "white",
      opacity: isDisabled ? 1 : styles.opacity,
      border: "1px solid #ddd",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#ddd",
      },

      "&:focus": {
        outline: "none", 
        boxShadow: "none",
      },
      color: "#35495e",
      fontSize: "13px",
      minHeight: "40px",
      borderRadius: "2px",
    }),
    input: (styles: CSSObject) => ({
      ...styles,
      fontSize: "13px",
      color: "#35495e",
    }),
    placeholder: (styles: CSSObject) => ({
      ...styles,
      fontSize: "13px",
      border: "none",
      whiteSpace: "nowrap",
    }),
    menuList: (styles: CSSObject) => ({
      ...styles,
      maxHeight: menuMaxHeight,
    }),
    menu: (styles: CSSObject) => ({
      ...styles,
      width: "max-content",
      minWidth: "100%",
      borderRadius: "2px",
    }),
    // option: (styles: CSSObject, { isFocused, isSelected }) => ({
    //   ...styles,
    //   backgroundColor: isFocused && isSelected ? "#ff6a6a" : isSelected ? "#f3f3f3" :isFocused ? "#41b883" : "white",
    //   color: isFocused && isSelected ? "white" : isSelected ? "#35495e" : isFocused ? "white" : "#35495e",
    //   fontSize: "15px",
    //   padding: "8px 15px",
    //   cursor: "pointer",
    //   fontWeight: isSelected ? "700" : "500",
    //   ":hover": {
    //     backgroundColor: isSelected ? "#ff6a6a" : "#41b883",
    //     color: isSelected ? "white" : "white",
    //     transitionDuration: "0.2s",
    //   },
    // }),
    menuPortal: (base: CSSObject) => ({
      ...base,
      zIndex: "99",
    }),

    option: (styles, { isFocused, isSelected }) => {
      let rightLabel = "";
      if (isSelected && isFocused && showRightLabel && removeSelectedOptions)
        rightLabel = "Press enter to remove";
      else if (isSelected && showRightLabel && removeSelectedOptions)
        rightLabel = "Selected";
      else if (isFocused && showRightLabel && removeSelectedOptions)
        rightLabel = "Press enter to select";

      return {
        ...styles,
        backgroundColor:
          isFocused && isSelected && removeSelectedOptions
            ? "#671945"
            : isSelected && removeSelectedOptions
            ? "#671945"
            : isFocused
            ? "#671945"
            : "white",
        color:
          isFocused && isSelected
            ? "white"
            : isSelected
            ? "#35495e"
            : isFocused
            ? "white"
            : "#35495e",
        fontSize: "15px",
        padding: "5px 15px",
        fontWeight: isSelected ? "700" : "400",
        cursor: "pointer",
        position: "relative",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        "::after": {
          content: `"${rightLabel}"`,
          fontSize: "12px",
          color: isSelected && !isFocused ? "#c0c0c0" : "white",
          opacity: rightLabel ? 1 : 0,
          transition: "opacity 0.2s",
          position: "absolute",
          right: "15px",
          top: "50%",
          transform: "translateY(-50%)",
          pointerEvents: "none",
          padding: "0px 0px 0px 20px",
        },
        ":hover": {
          backgroundColor: "#671945",
          color: "white",
          transitionDuration: "0.2s",
        },
      };
    },

    multiValue: (styles: CSSObject) => ({
      ...styles,
      backgroundColor: "#671945",
      color: "#fff",
      borderRadius: "6px",
    }),
    multiValueLabel: (styles: CSSObject) => ({
      ...styles,
      color: "#fff",
      padding: "0px",
    }),
    multiValueRemove: (styles: CSSObject) => ({
      ...styles,
      color: "#fff",
      cursor: "pointer",
      ":hover": {
        color: "#fff",
      },
    }),
    noOptionsMessage: (styles: CSSObject) => ({
      ...styles,
      color: "#7c91a8",
    }),
  };

  const selectRef = useRef<HTMLDivElement>(null);
  const [menuPlacement, setMenuPlacement] = useState<"top" | "bottom">(
    "bottom"
  );
  const [menuMaxHeight, setMenuMaxHeight] = useState<string>("60vh");

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  useEffect(() => {
    if (!value) {
      setCurrentOption(null);
      return;
    }

    const selected = options?.find(
      (option) => String(getOptionValue(option)) === String(value)
    );

    if (selected) {
      setCurrentOption(selected);
    }
  }, [value, options, getOptionValue]);

  const handleMenuOpen = () => {
    if (selectRef.current) {
      const rect = selectRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const spaceBelow = windowHeight - rect.bottom;
      const spaceAbove = rect.top;
      const margin = 20;

      if (spaceBelow < 300 && spaceAbove > spaceBelow) {
        setMenuPlacement("top");
        setMenuMaxHeight(`${spaceAbove - margin}px`);
      } else {
        setMenuPlacement("bottom");
        setMenuMaxHeight(`${spaceBelow - margin}px`);
      }
    }
  };

  const handleChange = (
    newValue: SingleValue<string | T> | MultiValue<string | T>
  ) => {
    if (!newValue || Array.isArray(newValue)) {
      const syntheticEvent = {
        target: {
          name,
          value: "",
        },
      } as unknown as React.ChangeEvent<HTMLSelectElement>;

      onChange(syntheticEvent);
      return;
    }

    const selectedOption = newValue as T;
    setCurrentOption(selectedOption);

    if (
      currentOption &&
      String(getOptionValue(currentOption)) ==
        String(getOptionValue(selectedOption)) &&
      removeSelectedOptions
    ) {
      setCurrentOption(null);
      onChange({
        target: { name, value: "" },
      } as React.ChangeEvent<HTMLSelectElement>);
    } else {
      onChange({
        target: { name, value: String(getOptionValue(selectedOption)) },
      } as React.ChangeEvent<HTMLSelectElement>);
    }
  };

  const selectedOption = options?.find(
    (option) => String(getOptionValue(option)) === String(value)
  );

  return (
    <div className={`${className} ${error ? "mb-2" : "mb-4"} `} ref={selectRef}>
      <div
        className={`flex group  ${error ? "border border-orange rounded" : ""}`}
      >
        <Select
          instanceId={name}
          name={name}
          value={defaultValue ?? selectedOption ?? currentOption}
          onChange={handleChange}
          options={options || []}
          isSearchable={!isMobile}
          isDisabled={disabled}
          components={animatedComponents}
          onMenuOpen={handleMenuOpen}
          placeholder={`Select ${label}`}
          styles={colorStyles}
          getOptionLabel={(option) => {
            if (typeof option === "string") return option;
            return `${getOptionLabel(option)} ${
              optionShowSecondName
                ? option[optionShowSecondName as keyof T]
                : ""
            }`;
          }}
          formatOptionLabel={(option) => {
            const label =
              typeof option === "string" ? option : getOptionLabel(option);
            const fullLabel =
              typeof option === "string"
                ? option
                : `${getOptionLabel(option)} ${
                    optionShowSecondName
                      ? option[optionShowSecondName as keyof T]
                      : ""
                  }`;

            if (label.toString().startsWith("Invalid")) {
              const restText = fullLabel.replace(/^Invalid\s*/, "");
              return (
                <span>
                  <span className={"text-orange uppercase px-1"}>Invalid</span>
                  {restText ? ` ${restText}` : ""}
                </span>
              );
            }

            return fullLabel;
          }}
          getOptionValue={(option) => {
            if (typeof option === "string") return option;
            return String(getOptionValue(option));
          }}
          menuPortalTarget={
            typeof window !== "undefined" ? document.body : null
          }
          menuPlacement={menuPlacement}
          hideSelectedOptions={false}
          noOptionsMessage={() => `List is empty.`}
          className="w-full"
        />
        {error && (
          <div
            className={`w-fit z-10 mt-3 h-fit bg-[#fda08b] p-1 rounded-full -ml-16 group-focus-within:invisible`}
          >
            {/* <MdOutlineSupport className={`text-[#db2d05] text-[10px]`} /> */}
          </div>
        )}
      </div>
      {error && <p className="text-orange text-[14px] mt-2">{error}</p>}
    </div>
  );
};

export default SelectField;
