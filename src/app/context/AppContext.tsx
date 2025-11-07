'use client'
import React, { createContext, useContext, useState, ReactNode } from "react";

interface AppState {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  pageNotFound: boolean;
  setPageNotFound: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultState: AppState = {
  loading: false,
  setLoading: () => {},
  pageNotFound: false,
  setPageNotFound: () => {},
};

const AppContext = createContext<AppState>(defaultState);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [pageNotFound, setPageNotFound] = useState(false);

  return (
    <AppContext.Provider value={{ setLoading, loading, setPageNotFound, pageNotFound }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
