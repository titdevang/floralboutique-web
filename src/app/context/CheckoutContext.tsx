"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { SenderDetail } from "../types/Types";


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
