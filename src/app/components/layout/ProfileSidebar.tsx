"use client";

import React from "react";
import Image from "next/image";
import {usePathname} from "next/navigation";
import Link from "next/link";
import SvgIcon from "../ui/SvgIcon";
import {useUserProfileContext} from "@/app/context/UserProfileContext";
import {useAuth} from "@/app/context/AuthContext";

const menuItems = [
    {name: "Dashboard", icon: "home.svg", href: "/dashboard"},
    {
        name: "Purchase History",
        icon: "history.svg",
        href: "/purchase-history",
    },
    {
        name: "Approved Refunds",
        icon: "refund.svg",
        href: "/sent-refund-request",
    },
    {name: "Wishlist", icon: "wishlist.svg", href: "/wishlists"},
    {name: "My Wallet", icon: "wallet.svg", href: "/wallet"},
    {
        name: "Manage Profile",
        icon: "manage-profile.svg",
        href: "/profile",
    },
];

const ProfileSidebar = () => {
    const pathname = usePathname();
    const {userProfileData} = useUserProfileContext()
    const { logout } = useAuth()
    return (
        <div
            className="w-full hidden max-w-[280px] rounded-sm border border-gray-light p-6 md:flex flex-col justify-between h-auto gap-6">
            {/* User Info */}
            {!userProfileData ? <div className="text-center animate-pulse">
                    <div className="relative w-16 h-16 mx-auto rounded-full bg-gray overflow-hidden mb-4"/>

                    <div className="h-4 w-32 mx-auto bg-gray rounded mb-2"/>

                    <div className="h-3 w-24 mx-auto bg-gray rounded"/>
                </div> :
                <div className="text-center">
                    <div className=" relative w-16 h-16 mx-auto rounded-full bg-gray-light overflow-hidden mb-4">
                        <Image src={userProfileData?.photo || "/assets/images/avatar-place.png"} alt="avatar" fill/>
                    </div>
                    <h2 className="font-semibold">{userProfileData?.name}</h2>
                    <p className="">{userProfileData?.phone}</p>
                </div>
            }

            <div className="border-b border-gray-light"></div>
            {/* Menu */}
            <nav className="flex-1 space-y-1">
                {menuItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-[25px] transition-colors duration-300
                ${
                            pathname === item.href
                                ? "bg-soft-secondary-base font-medium"
                                : " hover:bg-soft-secondary-base"
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
            <div className="border-b border-gray-light"></div>

            {/* Sign Out */}
            <button onClick={logout} className="w-full py-2 bg-primary text-white rounded-[25px] hover:bg-hov-primary transition-colors">
                Sign Out
            </button>
        </div>
    );
};

export default ProfileSidebar;
