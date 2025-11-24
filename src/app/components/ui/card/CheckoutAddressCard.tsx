"use client";

import React, {useEffect, useState} from "react";
import SvgIcon from "@/app/components/ui/SvgIcon";
import UsershippingInfo from "@/app/components/checkout/UserShippingInfo";
import { DeliveryAddress } from "@/app/types/user";
import { useAddress } from "@/app/context/AddressContext";
import { apiRequest } from "@/app/utils/apiRequest";
import { useCart } from "@/app/context/CartContext";
import { Product } from "@/app/types/Product";

interface CheckoutAddressListProps {
 product: Product;
}
const CheckoutAddressList: React.FC<CheckoutAddressListProps> = ({product}) => {
    const { addresses, setAddresses } = useAddress()

    const [selectedId, setSelectedId] = useState<number>(1);
    const [editAddress, setEditAddress] = useState<DeliveryAddress | null>()
    const [addNewAddress, setAddNewAddress] = useState<boolean>(false)
    const [addressData, setAddressData] = useState<DeliveryAddress>({
      id: null,
      receiverName: "",
      receiverEmail: "",
      receiverMobile: "",
      receiverAltMobile: "",
      flatOrHouseNo: "",
      streetOrArea: "",
      postalCode: "",
      dontCallRecipient: false,
      addressType: "Home",
    });

    const { addToCart } = useCart();

    const handleSelect = async(id: number | null) => {
        setSelectedId(id || 1);
        console.log("=======");
        
        try {
            const payload = {
              ...product,
              address_id: id
            };
            addToCart(payload);
        } catch (error) {
            
        }
        setEditAddress(null)
    };

    const handleDelete = (id: number | null) => {
        setAddresses((prev) => prev.filter((item) => item.id !== id));
    };

    const handleEdit = (id: number | null) => {
        setAddNewAddress(false)
        const address = addresses?.find((a) => a.id === id);
        if(address && address?.id == editAddress?.id) {
            setEditAddress(null)
            return;
        }
        if (address) {
            setEditAddress(address)
        }
    };

    const handleAddNew = () => {
        setAddNewAddress(!addNewAddress)
        setEditAddress(null)
        setAddressData({
          id: null,
          receiverName: "",
          receiverEmail: "",
          receiverMobile: "",
          receiverAltMobile: "",
          flatOrHouseNo: "",
          streetOrArea: "",
          postalCode: "",
          dontCallRecipient: false,
          addressType: "Home",
        });
    };

    return (
      <div className=" w-full ">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className=" text-sm font-semibold text-[#6b573f]">
            {!addresses?.length ? "" : "Select Address"}
          </h2>
          {!!addresses.length && (
            <button
              onClick={handleAddNew}
              className="border border-[#6b573f] text-[#6b573f] hover:bg-[#6b573f] hover:text-white px-4 py-1.5 rounded-full font-medium transition"
            >
              Add New Address
            </button>
          )}
        </div>

        {/* Address Cards */}
        <div className="space-y-4">
          {addresses?.map((addr) => (
            <div
              key={addr.id}
              className={`rounded-lg p-4 transition border-[#823c64]/40 border  ${
                selectedId === addr.id
                  ? "bg-[#f9efec] shadow-sm"
                  : " border-transparent"
              }`}
            >
              <div className={`flex items-start justify-between`}>
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="address"
                    checked={selectedId === addr.id}
                    onChange={() => handleSelect(addr.id || null)}
                    className="mt-1 accent-[#823c64] w-4 h-4 cursor-pointer"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[#4a2b25]">
                        {addr.receiverName}
                      </span>
                      <span className="text-sm text-[#823c64] font-medium">
                        {addr.addressType}
                      </span>
                    </div>
                    <p className="text-sm mt-1">
                      {addr.address}, {addr.city}, {addr.postalCode},{" "}
                      {addr.state && `${addr.state}, `}, {addr.country}
                    </p>
                    <p className="text-sm">Mobile: {addr.receiverMobile}</p>
                  </div>
                </div>

                {/* Icons */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleEdit(addr.id || null)}
                    className="text-primary hover:text-[#6b573f]"
                  >
                    <SvgIcon
                      name={"edit.svg"}
                      width={18}
                      height={18}
                      fill={"currentColor"}
                      localImage={"edit.svg"}
                    />
                  </button>
                  <button
                    onClick={() => handleDelete(addr.id || null)}
                    className="text-[#823c64] hover:text-[#6b573f]"
                  >
                    <SvgIcon
                      name={"delete.svg"}
                      width={18}
                      height={18}
                      fill={"currentColor"}
                      localImage={"delete.svg"}
                    />
                  </button>
                </div>
              </div>
              {editAddress?.id === addr.id && (
                <div
                  className={`${
                    selectedId === addr.id ? "" : "border"
                  } border-[#823c64]/40 rounded-lg mt-4`}
                >
                  <UsershippingInfo
                    formData={editAddress as DeliveryAddress}
                    setFormData={
                      setEditAddress as React.Dispatch<
                        React.SetStateAction<DeliveryAddress>
                      >
                    }
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        {(addNewAddress || !addresses.length) && (
          <div
            className={
              "rounded-lg mt-4 p-4 transition border-[#823c64]/40 border"
            }
          >
            <UsershippingInfo
              formData={addressData}
              setFormData={setAddressData}
            />
            <div className="flex items-center justify-between px-6">
              <button onClick={()=>setAddNewAddress(false)} className="bg-primary text-white px-3 py-1.5 rounded-sm hover:bg-hov-primary duration-300">
                Cancel
              </button>
              <button className="bg-primary text-white px-3 py-1.5 rounded-sm hover:bg-hov-primary duration-300">
                Save & Deliver here
              </button>
            </div>
          </div>
        )}
      </div>
    );
}

export default CheckoutAddressList