"use client";
import { useCallback, useEffect, useState } from "react";
import SliderButton from "../button/SliderButton";
import { ReviewProps } from "@/app/types/CustomerReview";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType } from "embla-carousel";
import ProcuctReviewCard from "@/app/components/ui/card/ProductReviewCard";

const ProductDetailCustomerReviewCarousel: React.FC<ReviewProps> = ({ review }) => {
  // Initialize Embla
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  // Update navigation buttons
  const updateButtons = useCallback((embla: EmblaCarouselType) => {
    setCanPrev(embla.canScrollPrev());
    setCanNext(embla.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    updateButtons(emblaApi);
    emblaApi.on("select", () => updateButtons(emblaApi));
    emblaApi.on("reInit", () => updateButtons(emblaApi));
  }, [emblaApi, updateButtons]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Embla Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {review.map((item, index) => (
            <div
              key={index}
              className="flex-[0_0_80%] sm:flex-[0_0_50%] md:flex-[0_0_45%] lg:flex-[0_0_35%] xl:flex-[0_0_25%] px-2"
            >
              <ProcuctReviewCard review={item} />
            </div>
          ))}
        </div>
      </div>

      {/* Custom navigation buttons */}
      <div>
          {canPrev && <SliderButton onClick={scrollPrev} disabled={!canPrev} event="prev"/>}
          {canNext && <SliderButton onClick={scrollNext} disabled={!canNext} event="next"/>}
      </div>
    </div>
  );
};

export default ProductDetailCustomerReviewCarousel;
