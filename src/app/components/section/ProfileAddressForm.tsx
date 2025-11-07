"use client";
import React, { useEffect, useState } from "react";
import SvgIcon from "../ui/SvgIcon";
import DropdownMenu from "../ui/DropdownMenu";
import { useUserProfileContext } from "@/app/context/UserProfileContext";
import { Address } from "@/app/types/user";

const ProfileAddressForm = () => {
      const { userProfileData } = useUserProfileContext();

  const [addresses, setAddresses] = useState<Address[]>([]);

  useEffect(()=>{
    if (userProfileData && userProfileData.address?.length > 0) {
      setAddresses(userProfileData.address);
    }
  },[userProfileData])

  const handleDeleteAddress = (id: number) => {
    setAddresses((prevAddresses) =>
      prevAddresses.filter((address) => address.id !== id)
    );
  };

  const toggleForm = () => {
    console.log("Toggle form");
  };

  return (
    <div className="">
      <h2 className="text-xl font-semibold mb-4">Address</h2>

      {/* Display address list */}
      {addresses.length === 0 ? (
        <p className="text-gray text-center">No address added yet.</p>
      ) : (
        <div className="space-y-4">
          {addresses.map((address) => (
            <div
              key={address.id}
              className="border border-gray-light p-4 flex justify-between items-center"
            >
              <div className="text-sm grid grid-cols-[max-content_1fr] gap-x-10 gap-y-2 font-light">
                <p className="text-gray">Address:</p>
                <p>{address.address}</p>
                <p className="text-gray">Postal code:</p>
                <p>{address.postalCode}</p>
                <p className="text-gray">City:</p>
                <p>{address.city}</p>
                <p className="text-gray">State:</p>
                <p>{address.state}</p>
                <p className="text-gray">Country:</p>
                <p>{address.country}</p>
                <p className="text-gray">Phone:</p>
                <p>{address.phone}</p>
              </div>
              <div className="flex space-x-2">
                <DropdownMenu
                  items={[
                    {
                      name: "Edit",
                      action: () => console.log("Edit", address.id),
                    },
                    {
                      name: "Make This Default",
                      action: () => console.log("Edit", address.id),
                    },
                    {
                      name: "Delete",
                      action: () => handleDeleteAddress(address.id),
                    },
                  ]}
                  align="right"
                  trigger={<button className="cursor-pointer bg-gray-light rounded-sm hover:bg-primary hover:text-white duration-500">⋮</button>}
                  actionClassName="hover:text-primary duration-300 font-light"
                />
                <span className="text-gray cursor-pointer"></span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 text-center">
        <button
          onClick={toggleForm}
          className="border border-gray-light w-full bg-light hover:bg-gray-light duration-500"
        >
          <div className="flex items-center flex-col py-4 font-semibold">
            <SvgIcon
              name="add.svg"
              width={25}
              height={25}
              localImage="add.svg"
              fill="currentColor"
            />
            <p className="text-sm">Add New Address</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ProfileAddressForm;
