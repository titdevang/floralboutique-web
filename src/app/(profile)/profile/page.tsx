"use client";
import React, { useEffect, useState } from "react";
import InputField from "@/app/components/common/fields/InputField";
import ProfileAddressForm from "@/app/components/section/ProfileAddressForm";
import ProfileBasicInfoForm from "@/app/components/section/ProfileBasicInfoForm";
import WarningMessage from "@/app/components/ui/WarningMessage";
import { useUserProfileContext } from "@/app/context/UserProfileContext";

const Page = () => {
  const { userProfileData } = useUserProfileContext();

  const [email, setEmail] = useState("");

  useEffect(() => {
    if (userProfileData) {
      setEmail(userProfileData.email);
    }
  }, [userProfileData]);
  
  return (
    <div className="space-y-6">
      {/* Basic Info */}
      <div className="border border-gray-light p-3 md:p-6">
        <ProfileBasicInfoForm />
      </div>
      <div className="border border-gray-light p-3 md:p-6">
        <ProfileAddressForm />
      </div>
      <div>
        <WarningMessage
          message={`<b>Note:</b> Email not updated. Please update your email to receive order invoices.`}
          type="warning"
        />
      </div>
      <div className="border border-gray-light p-3 md:p-6">
        <h2 className="text-xl font-semibold mb-6">Change your email</h2>
        <div>
          <div className="mb-4 flex items-center gap-3">
            <label className="w-1/6">Your Email</label>
            <InputField
              type="text"
              id="name"
              name="name"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
