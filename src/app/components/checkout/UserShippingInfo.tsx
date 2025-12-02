"use client";
import React, { useEffect, useState } from "react";
import InputField from "@/app/components/common/fields/InputField";
import SelectField from "../common/fields/SelectField";
import { DeliveryAddress } from "@/app/types/user";
import { useLocationHierarchy } from "@/app/context/LocationHierarchyContext";

interface UsershippingInfoProps {
  formData: DeliveryAddress;
  setFormData: React.Dispatch<React.SetStateAction<DeliveryAddress>>;
  handleUpdateFormData?: (id: number) => Promise<void>;
  handleSaveFormData?: () => Promise<void>;
  setAddNewAddress?: React.Dispatch<React.SetStateAction<boolean>>;
}

const UsershippingInfo: React.FC<UsershippingInfoProps> = ({
  setFormData,
  formData,
  handleUpdateFormData,
  handleSaveFormData,
  setAddNewAddress,
}) => {
  const { countries, states, cities, selectCountry, selectState } =
    useLocationHierarchy();

  useEffect(() => {
    if (!countries.length) return;

    if (formData.country_id) {
      selectCountry(Number(formData.country_id));
    }
  }, [formData.country_id]);

  useEffect(() => {
    if (!states.length) return;

    if (formData.state_id) {
      selectState(Number(formData.state_id));
    }
  }, [formData.state_id]);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (name: string, value: any) => {
    console.log({ formData });
    
    switch (name) {
      case "receiverName":
        if (!value) return "*Recipient name is required";
        break;
      case "receiverEmail":
        if (!value) return "*Recipient email is required";
        break;
      case "receiverPhone":
        if (!value) return "*Mobile is required";
        if (!/^\d{10}$/.test(value))
          return "Enter valid 10-digit mobile number";
        break;
      case "address_1":
        if (!value) return "*Address Line 1 required";
        break;
      case "address_2":
        if (!value) return "*Address Line 2 required";
        break;
      case "postalCode":
        if (!value) return "*Pincode required";
        if (!/^\d{6}$/.test(value)) return "Enter valid 6-digit pincode";
        break;
      case "country_id":
        if (!value) return "*Please select country";
        break;
      case "state_id":
        if (!value) return "*Please select state";
        break;
      case "city_id":
        if (!value) return "*Please select city";
        break;
    }
    return "";
  };

  // -----------------------------
  // VALIDATE ALL FIELDS ON SUBMIT
  // -----------------------------
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    console.log({ formData });

    Object.keys(formData).forEach((key) => {
      const msg = validateField(key, (formData as any)[key]);
      if (msg) newErrors[key] = msg;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // true = valid
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevData: DeliveryAddress) => ({
      ...prevData,
      [name]: value,
    })) as unknown as DeliveryAddress;

    if (name === "country") {
      setFormData((prev) => ({ ...prev, state_id: "", city_id: "" }));
    }
    if (name === "state") {
      setFormData((prev) => ({ ...prev, city_id: "" }));
    }
    const errorMessage = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: errorMessage }));
  };

  const handleSubmit = () => {
    const isValid = validateForm();
    if (!isValid) return;

    if (handleSaveFormData) {
      handleSaveFormData();
    } else if (handleUpdateFormData) {
      
      handleUpdateFormData?.(Number(formData.id));
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="lg:w-full md:p-6 p-2">
        <div className="space-y-4">
          <div>
            <h5 className="font-semibold">Receiver&#39;s Contact</h5>
          </div>
          <div className="pl-4 grid md:grid-cols-2 gap-4">
              <InputField
                name="receiverName"
                value={formData.receiverName}
                onChange={handleInputChange}
                placeholder="*Recipient Name"
                error={errors.receiverName}
              />
              <InputField
                name="receiverEmail"
                type="email"
                value={formData.receiverEmail}
                onChange={handleInputChange}
                placeholder="Recipient Email"
                error={errors.receiverEmail}
              />
              <InputField
                name="receiverPhone"
                type="text"
                value={formData.receiverPhone}
                onChange={handleInputChange}
                placeholder="Recipient Mobile"
                error={errors.receiverPhone}
              />
              <InputField
                name="receiverAltPhone"
                type="text"
                value={formData.receiverAltPhone}
                onChange={handleInputChange}
                placeholder="Recipient Alt Mobile"
                error={errors.receiverAltPhone}
              />
          </div>

          <div>
            <h5 className="font-semibold">Receiver&#39;s Address</h5>
          </div>
          <div className="pl-4 grid md:grid-cols-2 gap-4">
            <InputField
              type="text"
              name="address_1"
              value={formData.address_1}
              onChange={handleInputChange}
              placeholder="*Flat No, Tower No, House No"
              error={errors.address_1}
            />
            <InputField
              type="text"
              name="address_2"
              value={formData.address_2}
              onChange={handleInputChange}
              placeholder="*Apartment, Street, Area, Sector"
              error={errors.address_2}
            />
            <InputField
              type="text"
              name="address_3"
              value={formData.address_3 || ""}
              onChange={handleInputChange}
              placeholder="Landmark"
            />
            <SelectField
              label="Country"
              name="country_id"
              value={formData.country_id}
              onChange={handleInputChange}
              options={countries}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              error={errors.country_id}
            />
            <SelectField
              label="State"
              name="state_id"
              value={formData.state_id}
              onChange={handleInputChange}
              options={states}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              disabled={!states.length}
              error={errors.state_id}
            />
            <SelectField
              label="City"
              name="city_id"
              value={formData.city_id}
              onChange={handleInputChange}
              options={cities}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              disabled={!cities.length}
              error={errors.city_id}
            />
            <InputField
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleInputChange}
              placeholder="*Pin Code"
              error={errors.postalCode}
            />
          </div>

          {handleUpdateFormData && (
            <div className="text-end">
              <button
                onClick={() => handleSubmit()}
                className="bg-primary text-white px-3 py-1.5 rounded-sm hover:bg-hov-primary duration-300"
              >
                Update
              </button>
            </div>
          )}
          {handleSaveFormData && (
            <div className="flex items-center justify-between px-6">
              <button
                onClick={() => setAddNewAddress?.(false)}
                className="bg-primary text-white px-3 py-1.5 rounded-sm hover:bg-hov-primary duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-primary text-white px-3 py-1.5 rounded-sm hover:bg-hov-primary duration-300"
              >
                Save & Deliver here
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsershippingInfo;
