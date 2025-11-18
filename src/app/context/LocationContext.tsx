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
  setSelectCities: React.Dispatch<React.SetStateAction<string>>;
  selectCities: string;
  setSelectCitieName: React.Dispatch<React.SetStateAction<string>>;
  selectCitieName: string;
};

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
    const [selectPincode, setSelectPincode] = useState("");
    const [selectCities, setSelectCities] = useState("");
    const [selectCitieName, setSelectCitieName] = useState("");

  useEffect(() => {
    const getLastVisitLocation = Cookies.get("lastVisitPincode");
    const getLastVisitCities = Cookies.get("lastVisitCities");
    const getLastVisitCitieName = Cookies.get("lastVisitCitiesName");
    if (getLastVisitLocation) {
        setSelectPincode(getLastVisitLocation);
    } else {
      setSelectPincode("");
    }
      if (getLastVisitCities) {
        setSelectCities(getLastVisitCities);
      } else {
        setSelectCities("");
      }
        if (getLastVisitCitieName) {
          setSelectCitieName(getLastVisitCitieName);
        } else {
          setSelectCitieName("");
        }
  }, []);

  return (
    <LocationContext.Provider
      value={{
        setSelectPincode,
        selectPincode,
        setSelectCities,
        selectCities,
        selectCitieName,
        setSelectCitieName
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
