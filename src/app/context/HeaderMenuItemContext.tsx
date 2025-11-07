"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { HeaderMenuItem } from "../types/Navbar";
import { apiRequest } from "../utils/apiRequest";
import { ApiResponse } from "../types/ApiRequest";

interface HeaderMenuItemContextType {
  menuItems: HeaderMenuItem[];
  setMenuItems: (items: HeaderMenuItem[]) => void;
  navbarSticky: boolean;
  headerLogo: string;
}

const HeaderMenuItemContext = createContext<
  HeaderMenuItemContextType | undefined
>(undefined);

export const HeaderMenuItemProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [menuItems, setMenuItems] = useState<HeaderMenuItem[]>([]);
  const [navbarSticky, setNavbarSticky] = useState(false);
  const [headerLogo, setHeaderLogo] = useState("");

  useEffect(() => {
    const fetchHeaderItems = async () => {
      try {
        const response = await apiRequest<ApiResponse>("GET", `/header-items`);
        if (response?.status == 200) {
          setMenuItems(response.data.categories);
          setNavbarSticky(response.data.stickyHeader);
          setHeaderLogo(response.data.headerLogo);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchHeaderItems();
  }, []);

  return (
    <HeaderMenuItemContext.Provider value={{ menuItems, setMenuItems, navbarSticky, headerLogo}}>
      {children}
    </HeaderMenuItemContext.Provider>
  );
};

export const useHeaderMenuItem = () => {
  const context = useContext(HeaderMenuItemContext);
  if (!context) {
    throw new Error(
      "useHeaderMenuItem must be used within a HeaderMenuItemProvider"
    );
  }
  return context;
};
