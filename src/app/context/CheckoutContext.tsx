"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { SenderDetail } from "../types/Types";
import { apiRequest } from "../utils/apiRequest";
import { UserProfileData } from "../types/user";


type CheckoutContextType = {
  setMessage: Dispatch<SetStateAction<string>>;
  setPaymentMethod: Dispatch<SetStateAction<string>>;
  setSenderDetails: Dispatch<SetStateAction<SenderDetail>>;
  message: string;
  paymentMethod: string;
  senderDetails: SenderDetail;
};

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export const CheckoutProvider = ({ children }: { children: ReactNode }) => {
    const [message, setMessage] = useState("")
    const [paymentMethod, setPaymentMethod] = useState("")
    const [senderDetails, setSenderDetails] = useState<SenderDetail>({
      name: "",
      email: "",
      phoneNumber: "",
      location: "",
    });

      useEffect(() => {
        const fetchUserProfile = async () => {
          try {
            const response = await apiRequest("GET", "/profile");
            if (response?.status == 200) {
              const detail = response.data as unknown as UserProfileData;
              // const defaultAddress = detail?.address?.find((item) => item.default === true);
                const defaultAddress = detail?.address?.[0];

                setSenderDetails({
                    name: detail?.name || "",
                    email: detail?.email || "",
                    phoneNumber: detail?.phone || "",
                    location: defaultAddress ? `${defaultAddress?.state}, ${defaultAddress?.country}` : "",
                });
            } else {
              setSenderDetails({
                name: "",
                email: "",
                phoneNumber: "",
                location: "",
              });
            }
          } catch (error) {
            console.error("Error fetching user profile:", error);
            setSenderDetails({
              name: "",
              email: "",
              phoneNumber: "",
              location: "",
            });
          }
        };
    
        fetchUserProfile();
      }, []);
 
  return (
    <CheckoutContext.Provider
      value={{
        setMessage,
        setPaymentMethod,
        setSenderDetails,
        message,
        paymentMethod,
        senderDetails,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => {
  const ctx = useContext(CheckoutContext);
  if (!ctx) throw new Error("useCheckout must be used inside CheckoutProvider");
  return ctx;
};
