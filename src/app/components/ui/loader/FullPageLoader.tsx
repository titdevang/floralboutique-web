import React, { useState, useEffect } from "react";

interface FullPageLoaderProps {
    isLoading: boolean;
}

const FullPageLoader: React.FC<FullPageLoaderProps> = ({ isLoading }) => {
    const [isMounted, setIsMounted] = useState<boolean>(isLoading);
    const [opacityClass, setOpacityClass] = useState<string>(
        isLoading ? "opacity-100" : "opacity-0"
    );

    useEffect(() => {
        if (isLoading) {
            setIsMounted(true);
            requestAnimationFrame(() => {
                setOpacityClass("opacity-100");
            });
        } else {
            setOpacityClass("opacity-0");
            const timer = setTimeout(() => {
                setIsMounted(false);
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [isLoading]);

    if (!isMounted) {
        return null;
    }

    return (
        <div
            id="customFullPageLoader"
            className={`h-[70vh] w-full flex justify-center items-center  transition-opacity duration-1000 backdrop-blur-[0.7px] bg-opacity-60 ${opacityClass} ${
                opacityClass === "!opacity-0" ? "!pointer-events-none" : ""
            }`}
        >
            <div className={`loader-container`}>
                <div className="loader flex gap-0.5">
                    <div className="rect1"></div>
                    <div className="rect2"></div>
                    <div className="rect3"></div>
                    <div className="rect4"></div>
                    <div className="rect5"></div>
                </div>
            </div>
        </div>
    );
};

export default FullPageLoader;
