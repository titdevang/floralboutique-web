"use client";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType } from "embla-carousel";
import Link from "next/link";
import { useHomeItem } from "@/app/context/HomeItemContext";
import ImageWithFallback from "../fields/ImageWithFallback";
import SliderButton from "../button/SliderButton";

export default function DesktopCarousel() {
  const { sliderImages } = useHomeItem();
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
    <div className="relative overflow-hidden rounded-2xl aspect-[16/5]">
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
          {sliderImages.map((slide, index) => (
            <div key={index} className="flex-[0_0_100%] h-full">
              <Link href={slide.link} className="block h-full w-full">
                <div className="relative w-full h-full">
                  <ImageWithFallback
                    src={slide.image}
                    alt={slide.alt || "Slider"}
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
