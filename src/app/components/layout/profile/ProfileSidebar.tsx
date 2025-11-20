"use client";

import React, { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import SvgIcon from "../../ui/SvgIcon";
import { useUserProfileContext } from "@/app/context/UserProfileContext";
import { useAuth } from "@/app/context/AuthContext";

const menuItems = [
  { name: "Dashboard", icon: "home.svg", href: "/dashboard" },
  { name: "Purchase History", icon: "history.svg", href: "/purchase-history" },
  {
    name: "Approved Refunds",
    icon: "refund.svg",
    href: "/sent-refund-request",
  },
  // { name: "Wishlist", icon: "wishlist.svg", href: "/wishlists" },
  { name: "My Wallet", icon: "wallet.svg", href: "/wallet" },
  { name: "Manage Profile", icon: "manage-profile.svg", href: "/profile" },
];

const ProfileSidebar = () => {
  const pathname = usePathname();
  const { userProfileData } = useUserProfileContext();
  const { logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleToggle = () => setMobileOpen(!mobileOpen);
  const handleClose = () => setMobileOpen(false);

  return (
    <>
      <div className=" lg:hidden items-center justify-between px-2 mb-4 bg-primary w-fit text-white sticky top-0 z-40">
        <button
          onClick={handleToggle}
          aria-label="Toggle sidebar"
          className=" rounded-md"
        >
          <SvgIcon
            name={"userProfileMenu.svg"}
            width={40}
            height={40}
            localImage={"userProfileMenu.svg"}
            fill="currentColor"
          />
        </button>
      </div>

      <div
        className={`fixed lg:static top-0 left-0 h-full lg:h-auto bg-white border border-gray-light z-50 lg:z-0 
          transform transition-transform duration-300 ease-in-out
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          w-[260px] lg:w-full lg:max-w-[280px] flex flex-col justify-between p-6`}
      >
        {/* User Info */}
        {!userProfileData ? (
          <div className="text-center animate-pulse">
            <div className="relative w-16 h-16 mx-auto rounded-full bg-gray overflow-hidden mb-4" />
            <div className="h-4 w-32 mx-auto bg-gray rounded mb-2" />
            <div className="h-3 w-24 mx-auto bg-gray rounded" />
          </div>
        ) : (
          <div className="text-center">
            <div className="relative w-16 h-16 mx-auto rounded-full bg-gray-light overflow-hidden mb-4">
              <Image
                src={
                  userProfileData?.photo || "/assets/images/avatar-place.png"
                }
                alt="avatar"
                fill
              />
            </div>
            <h2 className="font-semibold">{userProfileData?.name}</h2>
            <p className="font-light text-gray-dark">
              {userProfileData?.phone}
            </p>
          </div>
        )}

        <div className="border-b border-gray-light my-4"></div>

        {/* Menu */}
        <nav className="flex-1 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={handleClose}
              className={`flex items-center gap-3 px-4 py-3 rounded-[25px] transition-colors duration-300 ${
                pathname.startsWith(item.href)
                  ? "bg-soft-secondary-base font-medium"
                  : "hover:bg-soft-secondary-base"
              }`}
            >
              <SvgIcon
                name={item.icon}
                width={16}
                height={16}
                localImage={item.icon}
                fill="currentColor"
              />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="border-b border-gray-light my-4"></div>

        {/* Sign Out */}
        <button
          onClick={() => {
            logout();
            handleClose();
          }}
          className="w-full py-2 bg-primary text-white rounded-[25px] hover:bg-hov-primary transition-colors"
        >
          Sign Out
        </button>
      </div>

      {/* --- Mobile Overlay --- */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 lg:hidden z-40"
          onClick={handleClose}
        />
      )}
    </>
  );
};

export default ProfileSidebar;
