"use client";
import React, {useEffect, useState} from "react";
import SvgIcon from "../ui/SvgIcon";
import DropdownMenu from "../ui/DropdownMenu";
import {useUserProfileContext} from "@/app/context/UserProfileContext";
import {Address, DeliveryAddress} from "@/app/types/user";
import {useAddress} from "@/app/context/AddressContext";
import Modal from "@/app/components/ui/modal/modal";
import {toast} from "react-toastify";
import {apiRequest} from "@/app/utils/apiRequest";
import {ApiResponse} from "@/app/types/ApiRequest";
import AddAddressModal from "@/app/components/section/modal/AddAddressModal";

const ProfileAddressForm = () => {
    const [deleteModal, setDeleteModal] = useState<number | null>(null)
    const [addressModalOpen, setAddressModalOpen] = useState(false)
    const [address, setAddress] = useState<DeliveryAddress>({
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
        city_id: "",
        country_id: "",
        state_id: "",
    });
    const [addressMode, setAddressMode] = useState<"add" | "edit">("add")
    const {addresses, setAddresses} = useAddress()

    const handleDelete = async (id: number | null) => {
        const response = await apiRequest<ApiResponse>("DELETE", "/address/" + id);
        if (response?.status == 200) {
            setAddresses((prev) => prev.filter((item) => item.id !== id));
            toast.success(response.data?.message);
        }
    };

    const toggleForm = () => {
        setAddressMode("add");
        setAddress({
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
            city_id: "",
            country_id: "",
            state_id: "",
        })
        setAddressModalOpen(true);
    };

    const handleSaveAddress = async () => {
        setAddressModalOpen(false);
        try {
            const payload = {
                address_1: address.address_1,
                address_2: address.address_2,
                address_3: address.address_3,
                postal_code: address.postalCode,
                city_id: address.city_id,
                state_id: address.state_id,
                country_id: address.country_id,
                receiver_name: address.receiverName,
                receiver_email: address.receiverEmail,
                receiver_phone: address.receiverPhone,
                receiver_alt_mobile: address.receiverAltPhone,
                sender_name: address.senderName,
                sender_phone: address.senderPhone,
            };
            const response = await apiRequest<ApiResponse>(
                "POST",
                "/address",
                payload
            );
            if (response?.status === 201) {
                toast.success(response.data?.message);

                const newAddress = response.data as unknown as DeliveryAddress;

                setAddresses((prev) => [...prev, newAddress]);
            }

        } catch (error) {
            console.error(error)
        }
    }

    const handleUpdateAddress = async (id: number) => {
        if (!(addressMode == "edit") || !id) return;
        try {
            const payload = {
                address_1: address.address_1,
                address_2: address.address_2,
                address_3: address.address_3,
                postal_code: address.postalCode,
                city_id: address.city_id,
                state_id: address.state_id,
                country_id: address.country_id,
                receiver_name: address.receiverName,
                receiver_email: address.receiverEmail,
                receiver_phone: address.receiverPhone,
                receiver_alt_mobile: address.receiverAltPhone,
                sender_name: address.senderName,
                sender_phone: address.senderPhone,
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
                setAddress({
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
                    city_id: "",
                    country_id: "",
                    state_id: "",
                })
                setAddressModalOpen(false);
            }
        } catch (error) {
        }
    }

    return (
        <div className="">
            <AddAddressModal
                setModal={setAddressModalOpen}
                modal={addressModalOpen}
                formData={address}
                setFormData={setAddress}
                addressMode={addressMode}
                handleSaveFormData={addressMode == "add" ? handleSaveAddress : undefined}
                handleUpdateFormData={addressMode == "edit" ? handleUpdateAddress : undefined}
            />
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
                            onClick={() => {
                                handleDelete(deleteModal || null);
                                setDeleteModal(null);
                            }}
                            className="bg-primary px-3 py-2 hover:bg-hov-secondary-base rounded-sm text-white duration-300"
                        >
                            Yes, Remove
                        </button>
                    </div>
                </div>
            </Modal>
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
                                <p> {[
                                    address.address_1,
                                    address.address_2,
                                    address.address_3,
                                ]
                                    .filter(Boolean)
                                    .join(", ")}</p>
                                <p className="text-gray">Postal code:</p>
                                <p>{address.postalCode}</p>
                                <p className="text-gray">City:</p>
                                <p>{address.city}</p>
                                <p className="text-gray">State:</p>
                                <p>{address.state}</p>
                                <p className="text-gray">Country:</p>
                                <p>{address.country}</p>
                                <p className="text-gray">Phone:</p>
                                <p>{address.receiverPhone}</p>
                            </div>
                            <div className="flex space-x-2">
                                <DropdownMenu
                                    items={[
                                        {
                                            name: "Edit",
                                            action: () => {
                                                setAddress(address);
                                                setAddressMode("edit");
                                                setAddressModalOpen(true);
                                            },
                                        },
                                        {
                                            name: "Make This Default",
                                            action: () => console.log("Edit", address.id),
                                        },
                                        {
                                            name: "Delete",
                                            action: () => setDeleteModal(Number(address.id)),
                                        },
                                    ]}
                                    align="right"
                                    trigger={<button
                                        className="cursor-pointer bg-gray-light rounded-sm hover:bg-primary hover:text-white duration-500">⋮</button>}
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
