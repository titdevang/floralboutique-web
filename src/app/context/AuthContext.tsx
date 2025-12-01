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
  userAuthenticated: boolean | undefined;
  setUserAuthenticated: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  login: (token: string, user: string) => void;
  logout: () => void;
  authUserName: string;
  setAuthUserName: React.Dispatch<React.SetStateAction<string>>;
  setLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
  loginModal: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userAuthenticated, setUserAuthenticated] = useState<
    boolean | undefined
  >(undefined);
  const [authUserName, setAuthUserName] = useState("");
  const [loginModal, setLoginModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Example: Check if user info exists in localStorage
    const storedUser = Cookies.get("token");
    const storedUserName = localStorage.getItem("authUserName");
    if (storedUser) {
      setUserAuthenticated(true);
    } else {
      setUserAuthenticated(false);
    }
    if(storedUserName) {
      setAuthUserName(storedUserName);
    } else {
      setAuthUserName('')
    }
  }, []);

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (event.data?.type === "GoogleAuth") {
        const token = event.data.token;
        const name = event.data.name;

        if (token) {
          login(token, name);
          router.push("/");
        }
      }
    };

    window.addEventListener("message", handler);

    return () => window.removeEventListener("message", handler);
  }, []);


  const login = (token: string, user: string) => {
    setUserAuthenticated(true);
    setAuthUserName(user);
    Cookies.set("token", token);
    localStorage.setItem("authUserName", user);
    Cookies.remove("guest_token");
  };

  const logout = () => {
    setUserAuthenticated(false);
    Cookies.remove("token");
    localStorage.removeItem("authUserName");
      router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{
        userAuthenticated,
        setUserAuthenticated,
        login,
        logout,
        authUserName,
        setAuthUserName,
        setLoginModal,
        loginModal
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
