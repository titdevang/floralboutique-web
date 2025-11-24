"use client";
import React from "react";
import InputField from "@/app/components/common/fields/InputField";
import {DeliveryAddress} from "@/app/types/user";

interface UsershippingInfoProps {
    formData: DeliveryAddress,
    setFormData: React.Dispatch<React.SetStateAction<DeliveryAddress>>;
}

const UsershippingInfo: React.FC<UsershippingInfoProps> = ({setFormData, formData}) => {

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prevData: DeliveryAddress) => ({
            ...prevData,
            [name]: value,
        })) as unknown as DeliveryAddress;
    };

    return (
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Shipping Information */}
        <div className="lg:w-full p-6">
          <div className="space-y-4">
            <div>
              <h5 className={"font-semibold"}>Receiver&#39;s Contact</h5>
            </div>
            <div className={"pl-4 space-y-4"}>
              <div className={"flex gap-4"}>
                <InputField
                  // label="Recipient Name"
                  name="receiverName"
                  value={formData.receiverName}
                  onChange={handleInputChange}
                  placeholder="*Recipient Name"
                  required
                />
                <InputField
                  // label="Recipient Email"
                  name="receiverEmail"
                  type="email"
                  value={formData.receiverEmail}
                  onChange={handleInputChange}
                  placeholder="Recipient Email"
                  required
                />
              </div>
              <div className={"flex gap-4"}>
                <InputField
                  // label="Recipient Mobile"
                  name="receiverMobile"
                  type="text"
                  value={formData.receiverMobile}
                  onChange={handleInputChange}
                  placeholder="Recipient Mobile"
                  required
                />
                <InputField
                  // label="Recipient Alt Mobile"
                  name="receiverAltMobile"
                  type="text"
                  value={formData.receiverAltMobile}
                  onChange={handleInputChange}
                  placeholder="Recipient Alt Mobile"
                  required
                />
              </div>
            </div>

            <div>
              <h5 className={"font-semibold"}>Receiver&#39;s Address</h5>
            </div>
            <div className={"pl-4 space-y-4"}>
              <div className={"flex gap-4"}>
                <InputField
                  // label="*Flat No, Tower No, House No"
                  name="flatOrHouseNo"
                  value={formData.flatOrHouseNo}
                  onChange={handleInputChange}
                  placeholder="*Flat No, Tower No, House No"
                  required
                />
                <InputField
                  // label="*Apartment, Street, Area, Sector"
                  name="streetOrArea"
                  value={formData.streetOrArea}
                  onChange={handleInputChange}
                  placeholder="*Apartment, Street, Area, Sector"
                  required
                />
              </div>
              <div className={"flex gap-4"}>
                <InputField
                  // label="Landmark"
                  name="landmark"
                  value={formData.landmark}
                  onChange={handleInputChange}
                  placeholder="Landmark"
                  required
                />
                <InputField
                  // label="*Pin Code"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  placeholder="*Pin Code"
                  required
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default UsershippingInfo;