"use client";

import {MenuItem} from "../HoverDropdownMenu";
import SvgIcon from "../SvgIcon";
import {useRouter} from "next/navigation";
import CartDropdownMenu from "@/app/components/ui/CartDropdownMenu";

interface CartDropdownButtonProps {
    icon?: string;
    isMobile?: boolean
}

const CartDropdownButton: React.FC<CartDropdownButtonProps> = ({
                                                                   icon = "cart.svg",
                                                                   isMobile = false
                                                               }) => {
    const router = useRouter();

    const handleLogout = () => {
        router.push("/");
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

    return (
      <CartDropdownMenu
        items={userMenuItems}
        align="right"
        trigger={
          <button type="button" aria-label="Cart" className="cursor-pointer !">
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
      />
    );
};

export default CartDropdownButton;
