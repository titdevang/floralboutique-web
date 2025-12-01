import React, { useState } from "react";
import InputField from "../common/fields/InputField";
import { SenderDetail } from "@/app/types/Types";
import PhoneInput from "react-phone-input-2";
import IntlPhoneInput from "../common/fields/PhoneInput";
import { useCheckout } from "@/app/context/CheckoutContext";

const SenderDetails = () => {
  const [editMode, setEditMode] = useState(false);
    const { setSenderDetails, senderDetails } = useCheckout();

  const [formData, setFormData] = useState<SenderDetail>({
    name: senderDetails.name,
    email: senderDetails.email,
    phoneNumber: senderDetails.phoneNumber,
    location: senderDetails.location,
  });

  // Generic input handler for InputField components
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

      setFormData((prev: SenderDetail) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Phone input handler
  const handlePhoneChange = (value: string) => {
      setFormData((prev) => ({
      ...prev,
      phoneNumber: value,
    }));
  };

  const handleSaveSenderDetails = () => {
      setSenderDetails(formData);
      setEditMode(false);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-[15px]">Sender's Details</h4>
        {!editMode && (
          <div>
            <button
              type="button"
              onClick={() => setEditMode(true)}
              className="border border-primary rounded px-4 py-1 text-primary"
            >
              Edit
            </button>
          </div>
        )}
        {editMode && (
          <div className="space-x-2">
            <button
              type="button"
              onClick={() => {
                  setEditMode(false);
                  setFormData(senderDetails);
              }}
              className="border border-gray-dark rounded px-4 py-1 text-gray-dark"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveSenderDetails}
              className="border border-primary rounded px-4 py-1 text-primary"
            >
              Save
            </button>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        <InputField
          type="text"
          // label="Name"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          disabled={!editMode}
          className="disabled:border-none"
        />

        <InputField
          type="email"
          // label="Email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          disabled={!editMode}
          className="disabled:border-none"
        />

        <IntlPhoneInput
          value={formData.phoneNumber}
          onChange={handlePhoneChange}
          disabled={!editMode}
        />

        <InputField
          type="text"
          // label="Location"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          disabled={!editMode}
          className="disabled:border-none"
        />
      </div>
    </div>
  );
};

export default SenderDetails;
