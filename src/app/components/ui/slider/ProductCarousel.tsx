"use client";
import { useCallback, useEffect, useState } from "react";
import ProductCard from "../card/ProductCard";
import { ProductsProps } from "@/app/types/Product";
import SliderButton from "../button/SliderButton";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType } from "embla-carousel";
import ProductCardSkeleton from "../loader/ProductCardSkeletion";

const ProductCarousel: React.FC<ProductsProps> = ({
  products,
  categoryName,
}) => {
  // Initialize Embla
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });

  // Track prev/next availability
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

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
      {/* Embla container */}
      {products.length === 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {Array.from({ length: 12 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      )}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {products.map((product, index) => (
            <div
              key={index}
              className="flex-[0_0_65%] sm:flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_25%]"
            >
              <ProductCard product={product} categoryName={categoryName} />
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

export default ProductCarousel;
