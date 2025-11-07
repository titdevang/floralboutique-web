"use client";
import { useState, useEffect } from "react";
import DesktopCarousel from "../ui/slider/DesktopCarousel";
import MobileCarousel from "../ui/slider/MobileCarousel";

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

export default function ResponsiveCarousel() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return <>{isDesktop ? <DesktopCarousel /> : <MobileCarousel />}</>;
}
