"use client";
import Image from "next/image";
import React from "react";
import Badge from "../ui/Badge";
import Search from "../ui/Search";
import Tooltip from "../ui/Tooltip";
import Link from "next/link";
import HeaderMenu from "../ui/HeaderMenu";
import MobileSearch from "../ui/MobileSearch";
import { useHeaderMenuItem } from "@/app/context/HeaderMenuItemContext";
import MobileHeaderMenu from "../ui/MobileHeaderMenu";
import { useCart } from "@/app/context/CartContext";
import UserProfileButton from "../ui/button/UserProfileButton";
import SvgIcon from "../ui/SvgIcon";
import CartDropdownButton from "@/app/components/ui/button/CartDropdownButton";
import Location from "../section/modal/Location";

const Navbar = () => {
  const { menuItems, navbarSticky } = useHeaderMenuItem();
  const { cartData } = useCart();

  const uniqueProductsCount = cartData.length;

  return (
    <div
      className={`${
        navbarSticky ? "sticky top-0 z-50 w-full" : ""
      } bg-soft-peach`}
    >
      <div className="w-full hidden md:flex items-center justify-between px-20 py-1">
        <div className="w-full flex items-center gap-4">
          <div className="mt-10">
            <HeaderMenu menuItems={menuItems} />
          </div>
          <div>
            <div className="relative w-28 h-24">
              <Link href={"/"}>
                <Image
                  src={"/assets/images/floralboutique.png"}
                  alt="floralboutique"
                  fill
                  style={{ objectFit: "contain" }}
                  priority
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-10 w-full">
          {/* ----------- search ---------- */}
          <div className="lg:w-[40%] lg:flex-none">
            <Search />
          </div>
          <div className="flex items-center gap-7">
            {/* ------------wishlist------------- */}
            {/*  <div>*/}

            {/*<Tooltip text="Wishlist">*/}
            {/*  <Link href={"/"} className="relative">*/}
            {/*    <SvgIcon*/}
            {/*      name={"wishlist.svg"}*/}
            {/*      localImage="wishlist.svg"*/}
            {/*      fill="currentColor"*/}
            {/*      className="text-primary"*/}
            {/*      width={25}*/}
            {/*      height={25}*/}
            {/*    />*/}
            {/*  </Link>*/}
            {/*</Tooltip>*/}
            {/*  </div>*/}

            {/* ---------------location------------- */}
              <div>
                <Location/>
              </div>

            {/* -------------cart---------------- */}
            <div>
              <div className="relative cursor-pointer">
                  <CartDropdownButton icon={"cart.svg"} />
                {/*<SvgIcon*/}
                {/*  name={"cart.svg"}*/}
                {/*  localImage="cart.svg"*/}
                {/*  fill="currentColor"*/}
                {/*  className="text-primary"*/}
                {/*  width={25}*/}
                {/*  height={25}*/}
                {/*/>*/}
                <Badge count={uniqueProductsCount} />
              </div>
            </div>
            {/* ----------------notification----------------------- */}
              <div className="relative cursor-pointer">
                <SvgIcon
                  name={"notification.svg"}
                  localImage="notification.svg"
                  fill="currentColor"
                  className="text-primary"
                  width={23}
                  height={23}
                />
                <Badge count={0} />
              </div>
            {/* --------------profile----------------------- */}
              <div>

            <UserProfileButton icon={"profile.svg"} />
              </div>

          </div>
        </div>
      </div>

      {/* -----------------------Mobile------------------------- */}
      <div className="w-full md:hidden flex items-center justify-between px-6 py-2 relative">
        <div className="w-full flex items-center gap-4">
          <div className="mt-10">
            <MobileHeaderMenu menuItems={menuItems} />
          </div>
        </div>
        <Link href={"/"} className="w-full relative">
          <Image
            src="/assets/images/floralboutique.png"
            alt="floralboutique"
            width={120}
            height={60}
            className="object-contain"
            priority
          />
        </Link>

        <div className="flex items-end justify-end w-full mt-8">
          <div className="flex items-center justify-end gap-2">
            {/* ------------Search------------- */}
            <MobileSearch />
            {/* -------------cart---------------- */}
            <div>
              <div className="relative cursor-pointer">
                  <CartDropdownButton icon={"cart.svg"} isMobile={true} />
                  <Badge count={uniqueProductsCount} />

                </div>

              {/*</div>*/}
            </div>
            {/* --------------profile----------------------- */}
                <UserProfileButton isMobile={true} icon={"mobile-profile.svg"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
