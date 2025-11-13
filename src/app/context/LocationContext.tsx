"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import Cookies from "js-cookie";

type LocationContextType = {
  selectPincode: string;
  setSelectPincode: React.Dispatch<React.SetStateAction<string>>;
};

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
    const [selectPincode, setSelectPincode] = useState("");

  useEffect(() => {
    const getLastVisitLocation = Cookies.get("lastVisitPincode");
    if (getLastVisitLocation) {
        setSelectPincode(getLastVisitLocation);
    } else {
      setSelectPincode("");
    }
  }, []);

  return (
    <LocationContext.Provider
      value={{
        setSelectPincode,
        selectPincode,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const ctx = useContext(LocationContext);
  if (!ctx) throw new Error("useLocation must be used inside LocationProvider");
  return ctx;
};
