"use client";

import {useAuth} from "@/app/context/AuthContext";
import Link from "next/link";
import HoverDropdownMenu, {MenuItem} from "../HoverDropdownMenu";
import SvgIcon from "../SvgIcon";
import {useRouter} from "next/navigation";
import DropdownMenu from "@/app/components/ui/DropdownMenu";

interface UserProfileButtonProps {
    icon?: string;
    isMobile?: boolean;
}

const UserProfileButton: React.FC<UserProfileButtonProps> = ({
                                                                 icon = "profile.svg",
                                                                 isMobile = false
                                                             }) => {
    const {userAuthenticated, logout} = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        router.push("/");
        logout();
    };

    const userMenuItems: MenuItem[] = [
        {name: "Dashboard", link: "/dashboard", icon: "/home.svg"},
        {
            name: "Purchase History",
            link: "/purchase-history",
            icon: "/history.svg",
        },
        {name: "My Wallet", link: "/wallet", icon: "/wallet.svg"},
        {name: "Logout", action: handleLogout, icon: "/logout.svg"},
    ];

    if (!userAuthenticated) {
        return (
          <Link href="/users/login" aria-label="Login" className="text-primary">
            <SvgIcon
              name={`login-${icon}`}
              width={25}
              height={25}
              localImage={icon}
              fill="currentColor"
            />
          </Link>
        );
    }

    return (
        <DropdownMenu
            items={userMenuItems}
            align="right"
            trigger={
                <button className="cursor-pointer">
                    <SvgIcon

                        name={icon + (isMobile ? "-mobile" : "")}
                        width={25}
                        height={25}
                        localImage={icon}
                        fill="currentColor"
                        className="text-primary"
                    />
                </button>
            }
            actionClassName="!text-hov-primary"
            linkClassName="hover:text-primary duration-300"
            isMobile={isMobile}
        />
    );
};

export default UserProfileButton;
