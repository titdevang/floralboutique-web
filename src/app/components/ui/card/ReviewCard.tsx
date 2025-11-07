import { ReviewCardProps } from "@/app/types/CustomerReview";
import Image from "next/image";
import Link from "next/link";
import SvgIcon from "@/app/components/ui/SvgIcon";

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="flex-shrink-0 md:p-2 select-none h-[260px]">
      <Link
        href={"/"}
        className="bg-[#fceae5] select-none rounded-xl p-4 h-full flex flex-col"
      >
        <div className="bg-primary text-white rounded-xl p-4 flex flex-col justify-center items-center h-full space-y-1">
          {/* Name */}
          <h2 className="md:text-lg font-semibold text-center truncate">
            {review.userName}
          </h2>

          {/* Profile Image */}
          <div>
            <Image
              src="/assets/images/defualt-floralboutique.webp"
              alt={review.userName}
              width={80}
              height={80}
              className="rounded-full border-4 border-white object-cover w-[50px] h-[50px] md:w-[80px] md:h-[80px]"
            />
          </div>

          {/* Review Text */}
          <p className=" text-xs md:text-sm underline underline-offset-2 leading-relaxed text-center line-clamp-2">
            {review.comment}
          </p>

          {/* Rating */}
          <div className="flex justify-center items-center gap-1">
            <span className="text-white text-sm font-medium">
              {review.rating}
            </span>
            <div className="text-warning text-lg flex items-center justify-center ">
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
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ReviewCard;
