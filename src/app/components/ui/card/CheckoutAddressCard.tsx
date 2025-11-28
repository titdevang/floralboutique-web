"use client";

import React, { useEffect, useState } from "react";
import SvgIcon from "@/app/components/ui/SvgIcon";
import UsershippingInfo from "@/app/components/checkout/UserShippingInfo";
import { DeliveryAddress } from "@/app/types/user";
import { useAddress } from "@/app/context/AddressContext";
import { apiRequest } from "@/app/utils/apiRequest";
import { useCart } from "@/app/context/CartContext";
import { Product } from "@/app/types/Product";
import Radio from "../../common/fields/Radio";
import { toast } from "react-toastify";
import { ApiResponse } from "@/app/types/ApiRequest";
import Modal from "../modal/modal";

interface CheckoutAddressListProps {
  product: Product;
}
const CheckoutAddressList: React.FC<CheckoutAddressListProps> = ({
  product,
}) => {
  const { addresses, setAddresses } = useAddress();
  const { updateQuantity } = useCart();

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [editAddress, setEditAddress] = useState<DeliveryAddress | null>();
  const [addNewAddress, setAddNewAddress] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<number | null>(null)
  const [addressData, setAddressData] = useState<DeliveryAddress>({
    receiverName: "",
    receiverEmail: "",
    receiverPhone: "",
    receiverAltPhone: "",
    address_1: "",
    address_2: "",
    address_3: "",
    postalCode: "",
    dontCallRecipient: false,
    addressType: "Home",
  });

  const handleSelect = async (addr: DeliveryAddress) => {
    setSelectedId(addr.id || 1);

    try {
      const payload = {
        ...product,
        address: addr,
      };
      updateQuantity(payload);
    } catch (error) {}
    setEditAddress(null);
  };

  const handleDelete = async (id: number | null) => {
    const response = await apiRequest<ApiResponse>("DELETE", "/address/" + id);
    if (response?.status == 200) {
      setAddresses((prev) => prev.filter((item) => item.id !== id));
      toast.success(response.data?.message);
    }
  };

  const handleEdit = (id: number | null) => {
    setAddNewAddress(false);
    const address = addresses?.find((a) => a.id === id);
    if (address && address?.id == editAddress?.id) {
      setEditAddress(null);
      return;
    }
    if (address) {
      setEditAddress(address);
    }
  };

  const handleAddNew = () => {
    setAddNewAddress(!addNewAddress);
    setEditAddress(null);
    setAddressData({
      receiverName: "",
      receiverEmail: "",
      receiverPhone: "",
      receiverAltPhone: "",
      address_1: "",
      address_2: "",
      address_3: "",
      postalCode: "",
      dontCallRecipient: false,
      addressType: "Home",
    });
  };

  useEffect(() => {
    if (product.address.id) {
      setSelectedId(product.address.id);
    }
  }, [product]);

  const handleSaveAddress = async () => {
    try {
      const payload = {
        address_1: addressData.address_1,
        address_2: addressData.address_2,
        address_3: addressData.address_3,
        postal_code: addressData.postalCode,
        city_id: addressData.city_id,
        state_id: addressData.state_id,
        country_id: addressData.country_id,
        receiverName: addressData.receiverName,
        senderName: addressData.senderName,
        senderPhone: addressData.senderPhone,
      };
      const response = await apiRequest<ApiResponse>(
        "POST",
        "/address",
        payload
      );
      if (response?.status === 201) {
        toast.success(response.data?.message);

        const newAddress = response.data.data as unknown as DeliveryAddress;

        setAddresses((prev) => [...prev, newAddress]);
        setAddNewAddress(false);
      }

    } catch (error) {}
  };

  const handleUpdateAddress = async (id: number) => {
    if (!editAddress || !id) return;
      try {
        const payload = {
          address_1: editAddress.address_1,
          address_2: editAddress.address_2,
          address_3: editAddress.address_3,
          postal_code: editAddress.postalCode,
          city_id: addressData.city_id,
          state_id: addressData.state_id,
          country_id: addressData.country_id,
          receiverName: editAddress.receiverName,
          receiver_email: editAddress.receiverEmail,
          receiver_phone: editAddress.receiverPhone,
          receiver_alt_mobile: editAddress.receiverAltPhone,
          sender_name: editAddress.senderName,
          sender_phone: editAddress.senderPhone,
        };
        const response = await apiRequest<ApiResponse>(
          "PUT",
          "/address/" + id,
          payload
        );
        if (response?.status === 200) {
          toast.success(response.data?.message);
          const newAddress = response.data as unknown as DeliveryAddress;
          setAddresses((prev) =>
            prev.map((addr) => (addr.id == id ? newAddress : addr))
          );
          setEditAddress(null);
        }
      } catch (error) {}
  };

  return (
    <div className=" w-full ">
      {/* Header */}

      <Modal
        isOpen={!!deleteModal}
        onClose={() => setDeleteModal(null)}
        title="Are you want to Remove?"
        titleClassName="text-center w-full"
        className="max-w-sm"
      >
        <div className="text-center space-y-4">
          {/* <p>Are you want to Remove?</p> */}
          <div className=" space-x-4">
            <button
              type="button"
              onClick={() => setDeleteModal(null)}
              className="bg-gray px-3 py-2 hover:bg-hov-primary rounded-sm text-white duration-300"
            >
              No
            </button>
            <button
              type="button"
              onClick={() => {handleDelete(deleteModal || null); setDeleteModal(null)}}
              className="bg-primary px-3 py-2 hover:bg-hov-secondary-base rounded-sm text-white duration-300"
            >
              Yes, Remove
            </button>
          </div>
        </div>
      </Modal>
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
      {(addNewAddress || !addresses.length) && (
        <div
          className={
            "rounded-lg my-4 p-4 transition border-[#823c64]/40 border"
          }
        >
          <UsershippingInfo
            formData={addressData}
            setFormData={setAddressData}
          />
          <div className="flex items-center justify-between px-6">
            <button
              onClick={() => setAddNewAddress(false)}
              className="bg-primary text-white px-3 py-1.5 rounded-sm hover:bg-hov-primary duration-300"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveAddress}
              className="bg-primary text-white px-3 py-1.5 rounded-sm hover:bg-hov-primary duration-300"
            >
              Save & Deliver here
            </button>
          </div>
        </div>
      )}
      {/* Address Cards */}
      <div className="space-y-4">
        {addresses?.map((addr, index) => {
          return (
            <div
              key={index}
              className={`rounded-lg p-4 transition border-[#823c64]/40 hover:border-primary duration-300 border  ${
                selectedId == addr?.id ? "bg-[#f9efec] shadow-sm" : ""
              }`}
            >
              <div
                onClick={() => handleSelect(addr)}
                className={`flex items-start justify-between cursor-pointer`}
              >
                <div className="flex items-start gap-3">
                  <Radio
                    type="radio"
                    name="address"
                    checked={Number(selectedId) == Number(addr.id)}
                    onChange={() => handleSelect(addr)}
                    className="!w-4 !h-4 cursor-pointer mt-1"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[#4a2b25]">
                        {addr.receiverName || "dd"}
                      </span>
                      <span className="text-sm text-[#823c64] font-medium">
                        {addr.addressType}
                      </span>
                    </div>
                    <p className="text-sm mt-1">
                      {[
                        addr.address_1,
                        addr.address_2,
                        addr.address_3,
                        addr.city,
                        addr.postalCode,
                        addr.state,
                        addr.country,
                      ]
                        .filter(Boolean)
                        .join(", ")}
                    </p>

                    <p className="text-sm">Mobile: {addr.receiverPhone}</p>
                  </div>
                </div>

                {/* Icons */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => {
                      handleEdit(addr.id || null);
                      e.stopPropagation();
                    }}
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
                    onClick={(e) => {
                      setDeleteModal(Number(addr.id));
                      e.stopPropagation();
                    }}
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
                    handleUpdateFormData={handleUpdateAddress}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CheckoutAddressList;
