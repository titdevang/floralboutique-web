"use client";

import React, { useCallback, useEffect } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import {ProductPhoto} from "@/app/types/Product";

interface Props {
    product: any;
    mainImage: string;
    setMainImage: (url: string) => void;
    setProductGalleryOpen?: (open: boolean) => void;
}

const MobileImageSlider = ({ product, mainImage, setMainImage, setProductGalleryOpen }: Props) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });

    // When slide changes → update main image
    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        const index = emblaApi.selectedScrollSnap();
        setMainImage(product.photos[index].imageUrl);
    }, [emblaApi, product.photos, setMainImage]);

    // When user clicks dot → scroll carousel
    const scrollTo = (index: number) => {
        if (emblaApi) emblaApi.scrollTo(index);
        setMainImage(product.photos[index].imageUrl);
    };

    useEffect(() => {
        if (!emblaApi) return;
        emblaApi.on("select", onSelect);
    }, [emblaApi, onSelect]);

    return (
        <>
            {/* Mobile slider */}
            <div onClick={() => setProductGalleryOpen?.(true)} className="overflow-hidden lg:hidden" ref={emblaRef}>
                <div className="flex">
                    {product.photos.map((photo: ProductPhoto, index: number) => (
                        <div key={index} className="flex-[0_0_100%]">
                            <div className="relative w-full h-[300px] overflow-hidden">
                                <Image
                                    src={photo.imageUrl}
                                    alt={photo.altTag ?? product.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mobile Dots */}
            <div className="flex lg:hidden justify-center gap-3">
                {product.photos.map((photo: ProductPhoto, index: number) => (
                    <button
                        key={index}
                        onClick={() => scrollTo(index)}
                        className={`h-2 w-2 rounded-full transition-transform ${
                            mainImage === photo.imageUrl
                                ? "bg-primary scale-125"
                                : "bg-gray opacity-50"
                        }`}
                    ></button>
                ))}
            </div>
        </>
    );
};

export default MobileImageSlider;
