"use client";
import { useAuth } from "@/app/context/AuthContext";
import { useCheckout } from "@/app/context/CheckoutContext";
import React from "react";

const UserContactInfo = () => {

    const { senderDetails } = useCheckout()

    return (
      <div
        className={
          "bg-white rounded-[40px] md:space-y-0 space-y-4 md:flex items-center justify-between py-10 px-6"
        }
      >
        <div className={"flex items-center gap-4 w-full"}>
          <div className={"bg-primary w-10 h-10"}>
            <p
              className={
                "text-white flex items-center justify-center h-full text-md"
              }
            >
              1
            </p>
          </div>
          {senderDetails.name ? (
            <div>
              <p className={"text-md"}>{senderDetails.name}</p>
            </div>
          ) : (
            <p className={"h-6 w-24 bg-gray rounded-sm animate-pulse"}></p>
          )}
        </div>
        <div
          className={
            "flex items-center w-full justify-center md:justify-end gap-4"
          }
        >
        {senderDetails.name ? (
        <div>
            <p>{senderDetails.email}</p>
        </div>
        ) : (
            <p className={"h-4 w-44 bg-gray rounded-sm animate-pulse"}></p>
        )}
          {senderDetails.name ? (
            <div>
              <p>{senderDetails.phoneNumber}</p>
            </div>
          ) : (
            <p className={"h-4 w-24 bg-gray rounded-sm animate-pulse"}></p>
          )}
        </div>
      </div>
    );
};

export default UserContactInfo;