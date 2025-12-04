"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { apiRequest } from "../utils/apiRequest";
import { toast } from "react-toastify";
import { UserProfileData } from "../types/user";
import {toastError} from "@/app/lib/toast";

interface UserProfileState {
  userProfileData: UserProfileData | null;
  setUserProfileData: React.Dispatch<React.SetStateAction<UserProfileData | null>>;
}

const defaultState: UserProfileState = {
  userProfileData: null,
  setUserProfileData: () => {},
};

const UserProfileContext = createContext<UserProfileState>(defaultState);

interface UserProfileProviderProps {
  children: ReactNode;
}

export const UserProfileProvider: React.FC<UserProfileProviderProps> = ({
  children,
}) => {
  const [userProfileData, setUserProfileData] =
    useState<UserProfileData | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await apiRequest("GET", "/profile");
        if (response?.status == 200) {
          setUserProfileData(response.data as unknown as UserProfileData);
        } else {
          setUserProfileData(null);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        toastError("Something went wrong!");
        setUserProfileData(null);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <UserProfileContext.Provider
      value={{ setUserProfileData, userProfileData }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfileContext = () => {
  return useContext(UserProfileContext);
};
