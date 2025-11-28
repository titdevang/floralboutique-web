"use client";
import React, { useEffect } from "react";
import InputField from "@/app/components/common/fields/InputField";
import SelectField from "../common/fields/SelectField";
import { DeliveryAddress } from "@/app/types/user";
import { useLocationHierarchy } from "@/app/context/LocationHierarchyContext";

interface UsershippingInfoProps {
  formData: DeliveryAddress;
  setFormData: React.Dispatch<React.SetStateAction<DeliveryAddress>>;
  handleUpdateFormData?: (id: number) => Promise<void>;
}

const UsershippingInfo: React.FC<UsershippingInfoProps> = ({
  setFormData,
  formData,
  handleUpdateFormData,
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
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="lg:w-full p-6">
        <div className="space-y-4">
          <div>
            <h5 className="font-semibold">Receiver&#39;s Contact</h5>
          </div>
          <div className="pl-4 space-y-4">
            <div className="flex gap-4">
              <InputField
                name="receiverName"
                value={formData.receiverName}
                onChange={handleInputChange}
                placeholder="*Recipient Name"
                required
              />
              <InputField
                name="receiverEmail"
                type="email"
                value={formData.receiverEmail}
                onChange={handleInputChange}
                placeholder="Recipient Email"
                required
              />
            </div>
            <div className="flex gap-4">
              <InputField
                name="receiverPhone"
                type="text"
                value={formData.receiverPhone}
                onChange={handleInputChange}
                placeholder="Recipient Mobile"
                required
              />
              <InputField
                name="receiverAltPhone"
                type="text"
                value={formData.receiverAltPhone}
                onChange={handleInputChange}
                placeholder="Recipient Alt Mobile"
              />
            </div>
          </div>

          <div>
            <h5 className="font-semibold">Receiver&#39;s Address</h5>
          </div>
          <div className="pl-4 grid grid-cols-2 gap-4">
            <InputField
              type="text"
              name="address_1"
              value={formData.address_1}
              onChange={handleInputChange}
              placeholder="*Flat No, Tower No, House No"
              required
            />
            <InputField
              type="text"
              name="address_2"
              value={formData.address_2}
              onChange={handleInputChange}
              placeholder="*Apartment, Street, Area, Sector"
              required
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
            />
            <InputField
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleInputChange}
              placeholder="*Pin Code"
              required
            />
          </div>

          {handleUpdateFormData && (
            <div className="text-end">
              <button
                onClick={() => handleUpdateFormData?.(Number(formData.id))}
                className="bg-primary text-white px-3 py-1.5 rounded-sm hover:bg-hov-primary duration-300"
              >
                Update
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsershippingInfo;
