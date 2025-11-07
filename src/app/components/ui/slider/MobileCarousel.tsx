"use client";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType } from "embla-carousel";
import Link from "next/link";
import ImageWithFallback from "../fields/ImageWithFallback";
import SliderButton from "../button/SliderButton";

const mobileSliderImages = [
  {
    image: "/assets/images/slider1-mobile.webp",
    link: "/category/1",
    alt: "slider1",
  },
  {
    image: "/assets/images/slider2-mobile.webp",
    link: "/category/2",
    alt: "slider2",
  },
  {
    image: "/assets/images/slider1-mobile.webp",
    link: "/category/3",
    alt: "slider3",
  },
];

export default function MobileCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateButtons = useCallback((embla: EmblaCarouselType) => {
    setCanPrev(embla.canScrollPrev());
    setCanNext(embla.canScrollNext());
    setSelectedIndex(embla.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    updateButtons(emblaApi);
    emblaApi.on("select", () => updateButtons(emblaApi));
  }, [emblaApi, updateButtons]);

  return (
    <div className="relative overflow-hidden rounded-2xl aspect-[3/1]">
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
          {mobileSliderImages.map((slide, index) => (
            <div key={index} className="flex-[0_0_100%] h-full">
              <Link href={slide.link} className="block h-full w-full">
                <div className="relative w-full h-full">
                  <ImageWithFallback
                    src={slide.image}
                    alt={slide.alt}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
        {scrollSnaps.map((_, index) => (
          <div
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`h-2 w-2 rounded-full ${
              index === selectedIndex
                ? "bg-primary scale-110"
                : "bg-gray opacity-65"
            }`}
          />
        ))}
      </div>

      <SliderButton
        onClick={() => emblaApi?.scrollPrev()}
        disabled={!canPrev}
        event="prev"
      />
      <SliderButton
        onClick={() => emblaApi?.scrollNext()}
        disabled={!canNext}
        event="next"
      />
    </div>
  );
}
