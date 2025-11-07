"use client";
import React from "react";
import Link from "next/link";
import ImageWithFallback from "../ui/fields/ImageWithFallback";
import { useHomeItem } from "@/app/context/HomeItemContext";
import Skeleton from "../ui/loader/SkeletonCard";
import { useAppContext } from "@/app/context/AppContext";

const HeaderCategoryMenu = () => {
  const { headerCategoryMenu } = useHomeItem();
  const { loading } = useAppContext();

  if (!headerCategoryMenu.length || loading) {
    return <Skeleton height="h-20" />;
  }

  return (
    <div className="w-full flex justify-center">
      <div className="lg:flex hidden items-center border border-primary rounded-2xl px-6 py-4 shadow-sm">
        {headerCategoryMenu?.map((item, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center px-4 text-primary cursor-pointer hover:text-primary transition">
              <Link href={item.link} className="flex flex-col items-center">
                <div className="w-14 h-14 mb-2 relative">
                  <ImageWithFallback
                    src={item.logo?.replace(
                      "https://floralboutique.in/assets/WebsiteIcons/",
                      "/assets/images/"
                    )}
                    alt={"category"}
                    fill
                    className="object-contain rounded-lg"
                    sizes="56px"
                  />
                </div>
                <span className="font-semibold text-center">
                  {item.label}
                </span>
              </Link>
            </div>
            {index < headerCategoryMenu?.length - 1 && (
              <div className="h-[70%] w-px bg-primary mx-2"></div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="lg:hidden flex w-full">
        <div className="flex flex-wrap justify-center gap-2 gap-y-4 w-full ">
          {headerCategoryMenu?.map((item, index) => (
            <Link href={item.link} key={index} className="flex justify-center">
              <div className="flex flex-col items-center justify-center bg-[#fceae5] rounded-xl p-2 shadow-sm hover:shadow-md transition cursor-pointer w-[100px]">
                <div className="w-10 h-10 mb-2 relative">
                  <ImageWithFallback
                    src={item.logo?.replace(
                      "https://floralboutique.in/assets/WebsiteIcons/",
                      "/assets/images/"
                    )}
                    alt={"category"}
                    fill
                    className="object-contain rounded-lg"
                    sizes="56px"
                  />
                </div>
                <span className="text-[10px] text-center text-primary px-1">
                  {item.label}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeaderCategoryMenu;