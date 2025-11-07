"use client";

import React, {useState} from "react";
import SvgIcon from "@/app/components/ui/SvgIcon";
import UsershippingInfo from "@/app/components/checkout/UserShippingInfo";
import { DeliveryAddress } from "@/app/types/user";

const CheckoutAddressList = () => {
    const [addresses, setAddresses] = useState<DeliveryAddress[]>([
        {
            id: 1,
            title: "Mr.",
            recipientName: "John Doe",
            recipientMobile: "1234567890",
            recipientAltMobile: "0987654321",
            recipientEmail: "john.doe@example.com",
            flatOrHouseNo: "123",
            streetOrArea: "Main Street",
            landmark: "Near Park",
            pinCode: "123456",
            googleMapLink: "https://maps.google.com/?q=123 Main Street",
            dontCallRecipient: false,
            addressType: "Home",
        },
        {
            id: 2,
            title: "Ms.",
            recipientName: "Jane Smith",
            recipientMobile: "1122334455",
            recipientAltMobile: "5544332211",
            recipientEmail: "jane.smith@example.com",
            flatOrHouseNo: "45",
            streetOrArea: "Oak Avenue",
            landmark: "Opposite Mall",
            pinCode: "654321",
            googleMapLink: "https://maps.google.com/?q=45 Oak Avenue",
            dontCallRecipient: true,
            addressType: "Office",
        },
    ]);

    const [selectedId, setSelectedId] = useState<number>(1);
    const [editAddress, setEditAddress] = useState<DeliveryAddress | null>()
    const [addNewAddress, setAddNewAddress] = useState<boolean>(false)
    const [addressData, setAddressData] = useState<DeliveryAddress>({
        title: "",
        recipientName: "",
        recipientMobile: "",
        flatOrHouseNo: "",
        streetOrArea: "",
        pinCode: "",
        dontCallRecipient: false,
        addressType: "Home",
    })

    const handleSelect = (id: number | null) => {
        setSelectedId(id || 1);
        setEditAddress(null)
    };

    const handleDelete = (id: number | null) => {
        setAddresses((prev) => prev.filter((item) => item.id !== id));
    };

    const handleEdit = (id: number | null) => {
        const address = addresses.find((a) => a.id === id);
        if(address && address?.id == editAddress?.id) {
            setEditAddress(null)
            return;
        }
        if (address) {
            setEditAddress(address)
        }
    };

    // useEffect(() => {
    //     if(editAddress) {
    //         setAddresses((prev) =>
    //             prev.map((item) => (item.id === editAddress.id ? editAddress : item))
    //         );
    //     }
    // }, [editAddress]);
    const handleAddNew = () => {
        setAddNewAddress(!addNewAddress)
        setAddressData({
            id: null,
            title: "",
            recipientName: "",
            recipientMobile: "",
            flatOrHouseNo: "",
            streetOrArea: "",
            pinCode: "",
            dontCallRecipient: false,
            addressType: "Home",
        })
    };

    return (
        <div className=" w-full ">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-[#6b573f]">Select Address</h2>
                <button
                    onClick={handleAddNew}
                    className="border border-[#6b573f] text-[#6b573f] hover:bg-[#6b573f] hover:text-white px-4 py-1.5 rounded-full text-sm font-medium transition"
                >
                    Add New Address
                </button>
            </div>

            {/* Address Cards */}
            <div className="space-y-4">
                {addresses.map((addr) => (
                    <div key={addr.id} className={`rounded-lg p-4 transition border-[#823c64]/40 border  ${
                        selectedId === addr.id
                            ? "bg-[#f9efec] shadow-sm"
                            : " border-transparent"
                    }`}>
                        <div
                            className={`flex items-start justify-between`}
                        >
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
                                    {addr.title} {addr.recipientName}
                                  </span>
                                        <span className="text-sm text-[#823c64] font-medium">
                                      {addr.addressType}
                                    </span>
                                    </div>
                                    <p className="text-sm mt-1">{addr.flatOrHouseNo}, {addr.streetOrArea}, {addr.landmark && `${addr.landmark}, `}{addr.pinCode}</p>
                                    <p className="text-sm">
                                        Mobile: {addr.recipientMobile} {addr.recipientAltMobile && `${addr.recipientAltMobile}`}
                                    </p>
                                </div>
                            </div>

                            {/* Icons */}
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => handleEdit(addr.id || null)}
                                    className="text-[#823c64] hover:text-[#6b573f]"
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
                        {
                            editAddress?.id === addr.id && (
                                <UsershippingInfo formData={editAddress as DeliveryAddress} setFormData={setEditAddress as React.Dispatch<React.SetStateAction<DeliveryAddress>>} />
                            )
                        }
                    </div>
                ))}
            </div>
            {addNewAddress && <div className={"rounded-lg mt-4 p-4 transition border-[#823c64]/40 border"}>
                <UsershippingInfo formData={addressData} setFormData={setAddressData}/>
            </div>}
        </div>
    );
}

export default CheckoutAddressList