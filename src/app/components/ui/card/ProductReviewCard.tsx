import React from "react";
import SvgIcon from "@/app/components/ui/SvgIcon";
import {ReviewCardProps} from "@/app/types/CustomerReview";

const ProcuctReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
    const initials = review.userName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();

    return (
        <div className="select-none bg-light h-full p-4 rounded-sm shadow-sm border border-gray-light w-full">
            <div className="flex items-start w-full gap-3">
                {/* Avatar Circle */}
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-initial-avtar text-white font-medium">
                    {initials}
                </div>

                <div className="flex-1">
                    {/* Name and Rating */}
                    <div className="flex flex-col">

                        <div className={"flex items-center flex-wrap"}>
                            <div className="flex text-warning pr-2">
                                {[...Array(5)].map((_, i) => (
                                    <SvgIcon
                                        key={i}
                                        name={"star.svg"}
                                        width={16}
                                        height={16}
                                        localImage={"star.svg"}
                                        fill={i < review.rating ? "#ffa707" : "#c3c3c5"}
                                    />
                                ))}
                            </div>
                            <p className="text-xs text-gray-dark">{review.timeAgo || "3 week ago"}</p>
                        </div>
                        <div>
                            <p className="text-primary">{review.userName}</p>
                        </div>
                    </div>

                    {/* Review text */}
                    <p className="text-xs md:text-sm mt-2 leading-snug line-clamp-3">{review.comment}</p>
                </div>
            </div>
        </div>
    );
};

export default ProcuctReviewCard;
