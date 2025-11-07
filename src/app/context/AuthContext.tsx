"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";

type AuthContextType = {
  userAuthenticated: boolean;
  setUserAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  login: (token: string, user: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userAuthenticated, setUserAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    // Example: Check if user info exists in localStorage
    const storedUser = Cookies.get("token");
    if (storedUser) {
      setUserAuthenticated(true);
    } else {
      setUserAuthenticated(false);
    }
  }, []);

  const login = (token: string, user: string) => {
    setUserAuthenticated(true);
    // setAuthUserName(user);
    Cookies.set("token", token);
    localStorage.setItem("authUserName", user);
  };

  const logout = () => {
    setUserAuthenticated(false);
    Cookies.remove("token");
    localStorage.removeItem("authUserName");
      router.push("/");
  };

  return (
    <AuthContext.Provider value={{userAuthenticated,setUserAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
