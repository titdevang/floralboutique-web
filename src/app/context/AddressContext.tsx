"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { DeliveryAddress } from "../types/user";
import { apiRequest } from "../utils/apiRequest";

type AddressContextType = {
  addresses: DeliveryAddress[];
  setAddresses: React.Dispatch<React.SetStateAction<DeliveryAddress[]>>;
};

const AddressContext = createContext<AddressContextType | undefined>(undefined);

export const AddressProvider = ({ children }: { children: ReactNode }) => {
 const [addresses, setAddresses] = useState<DeliveryAddress[]>([]);

      useEffect(()=>{
          const fetchAddresses = async() =>{
              try {
                  const response = await apiRequest('GET', '/address')
                  if(response?.status == 200) {
                    console.log(response.data);
                    
                      setAddresses(response.data as DeliveryAddress[])
                  }
              } catch (error) {
                  
              }
          }
          fetchAddresses();
      },[])

  return (
    <AddressContext.Provider
      value={{
        setAddresses,
        addresses
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => {
  const ctx = useContext(AddressContext);
  if (!ctx) throw new Error("useAddress must be used inside AddressProvider");
  return ctx;
};
