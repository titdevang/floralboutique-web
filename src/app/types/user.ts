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
  address_1: string;
  address_2: string;
  address_3?: string;
  googleMapLink?: string;

  dontCallRecipient: boolean;

  addressType: "Home" | "Office" | "Other";
  address?: string;
  city_id?: string;
  country_id?: string;
  postalCode: string;
  receiverName: string;
  receiverEmail: string;
  receiverAltPhone: string;
  senderName?: string;
  senderPhone?: string;
  state_id?: string;
  receiverPhone: string;
  city?: string;
  state?: string;
  country?: string;
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