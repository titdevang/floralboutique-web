export interface User {
    id: number,
    name: string;
    email: string
}

export interface Address {
    id: number,
    address: string,
    city: string,
    state: string,
    country: string,
    postalCode: string,
    phone: string

}

export interface DeliveryAddress {
    id?: number | null;
    title: "Mr." | "Ms." | "Mrs." | "Dr." | "Mx." | string;
    recipientName: string;
    recipientMobile: string;
    recipientAltMobile?: string;
    recipientEmail?: string;

    flatOrHouseNo: string;
    streetOrArea: string;
    landmark?: string;
    pinCode: string;
    googleMapLink?: string;

    dontCallRecipient: boolean;
    addressType: "Home" | "Office" | "Other";
}
export interface UserProfileData {
  address: Address[];
  name: string;
  phone: string;
  photo: string;
  email: string;
  password: string;
  confirmPassword: string;
}