"use client";

import Image, { ImageProps } from "next/image";
import { useState, useEffect } from "react";

type ImageWithFallbackProps = ImageProps & {
  fallbackSrc?: string;
};

export default function ImageWithFallback({
  src,
  fallbackSrc = "/assets/images/placeholder.jpg",
  alt,
  ...rest
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState<string>(fallbackSrc);

  useEffect(() => {
    if (!src) return;

    const img = new window.Image();
    img.src = src as string;

    img.onload = () => {
      setImgSrc(src as string);
    };

    img.onerror = () => {
      setImgSrc(fallbackSrc);
    };

    return () => {
      
    };
  }, [src, fallbackSrc]);

  return (
    <Image
      {...rest}
      src={imgSrc}
      alt={alt || ""}
    />
  );
}
