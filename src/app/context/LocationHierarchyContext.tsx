"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { apiRequest } from "../utils/apiRequest";
import { Cities } from "../types/Types";

interface LocationHierarchyType {
  countries: Cities[];
  states: Cities[];
  cities: Cities[];
  setCountries: (data: Cities[]) => void;
  setStates: (data: Cities[]) => void;
  setCities: (data: Cities[]) => void;

  selectCountry: (countryId: number) => void;
  selectState: (stateId: number) => void;
}

const LocationHierarchyContext = createContext<LocationHierarchyType | null>(
  null
);

export const LocationHierarchyProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [countries, setCountries] = useState<Cities[]>([]);
  const [states, setStates] = useState<Cities[]>([]);
  const [cities, setCities] = useState<Cities[]>([]);

  const [selectedCountryId, setSelectedCountryId] = useState<number | null>(
    null
  );
  const [selectedStateId, setSelectedStateId] = useState<number | null>(null);

  const getCountryStateCity = async () => {
    try {
      const response = await apiRequest("GET", "/country/state/city");

      if (response?.data && response.status == 200) {
        setCountries((response?.data as { data: Cities[] })?.data);
      }
    } catch (error) {
      console.error("Failed to fetch country-state-city data", error);
    }
  };

  useEffect(() => {
    getCountryStateCity();
  }, []);

  // Country selected → load states
  const selectCountry = (countryId: number) => {
    setSelectedCountryId(countryId);

    const country = countries.find((c) => c.id == countryId);

    // API uses "state" (not states)
    setStates((country as unknown as { state: Cities[]})?.state || []);

    // Reset cities
    setCities([]);
    setSelectedStateId(null);
  };

  // State selected → load cities
  const selectState = (stateId: number) => {
    setSelectedStateId(stateId);

    const state = states.find((s) => s.id == stateId);

    // API uses "cities" (not city)
    setCities((state as unknown as { cities: Cities[] })?.cities || []);
  };

  return (
    <LocationHierarchyContext.Provider
      value={{
        countries,
        states,
        cities,
        setCountries,
        setStates,
        setCities,
        selectCountry,
        selectState,
      }}
    >
      {children}
    </LocationHierarchyContext.Provider>
  );
};

export const useLocationHierarchy = () => {
  const context = useContext(LocationHierarchyContext);
  if (!context)
    throw new Error(
      "useLocationHierarchy must be used within LocationHierarchyProvider"
    );
  return context;
};
