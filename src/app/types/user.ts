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
  flatOrHouseNo: string;
  streetOrArea: string;
  landmark?: string;
  googleMapLink?: string;

  dontCallRecipient: boolean;

  addressType: "Home" | "Office" | "Other";
  address?: string;
  city?: string;
  country?: string;
  postalCode: string;
  receiverName: string;
  receiverEmail: string;
  receiverAltMobile: string;
  senderName?: string;
  senderPhone?: string;
  state?: string;
  receiverMobile: string;
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