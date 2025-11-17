import React from "react";
import Select from "../../common/fields/Select";
import SelectField from "../../common/fields/SelectField";

interface PerPageOption {
  label: string;
  value: number;
}

interface PerPageListProps {
  perPageLength: number;
  setPerPageLength: (value: number) => void;
}

const PerPageList: React.FC<PerPageListProps> = ({
  perPageLength,
  setPerPageLength,
}) => {

  const options: PerPageOption[] = [
    { label: "10", value: 10 },
    { label: "25", value: 25 },
    { label: "50", value: 50 },
    { label: "100", value: 100 },
  ];

   const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
     const selected = Number(e.target.value);
     if (selected === perPageLength) return;
       setPerPageLength(selected);
   };

  return (
    <div className="mt-6 w-[90px]">
      <SelectField<PerPageOption>
        label="Rows per page"
        name="perPageLength"
        value={perPageLength}
        onChange={handleChange}
        options={options}
        getOptionLabel={(option) => option.label}
        getOptionValue={(option) => option.value}
        removeSelectedOptions={false}
      />
    </div>
  );
};

export default PerPageList;
