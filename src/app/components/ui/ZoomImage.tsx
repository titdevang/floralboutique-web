import { ZoomImageProps } from "@/app/types/ZoomImage";
import Image from "next/image";
import { useState, useEffect } from "react";

const ZoomImage: React.FC<ZoomImageProps> = ({ src, alt }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [imgSrc, setImgSrc] = useState(src);
  const isMobileSize = 786
  const placeholderImg = "/assets/images/placeholder.jpg";

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setPosition({ x, y });
  };

  useEffect(() => {
    setImgSrc(src);
    setIsZoomed(false);
  }, [src]);
  
  return (
    <div
      className={`relative aspect-square overflow-hidden ${isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`}
      onClick={() => !isZoomed ? (window.innerWidth < isMobileSize) ? setIsZoomed(false) : setIsZoomed(true) : setIsZoomed(false)}
      // onMouseEnter={}
      // onMouseLeave={() => setIsZoomed(false)}
      onMouseMove={handleMouseMove}
    >
      <Image
        src={imgSrc}
        alt={alt}
        fill
        className="object-contain transition-transform duration-200 ease-out"
        onError={() => setImgSrc(placeholderImg)}
        style={{
          transform: isZoomed ? "scale(2)" : "scale(1)",
          transformOrigin: `${position.x}% ${position.y}%`,
        }}
      />
    </div>
  );
}

export default ZoomImage;