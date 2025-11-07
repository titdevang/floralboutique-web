"use client";
import React, {useCallback, useEffect, useState} from "react";
import {createPortal} from "react-dom";
import SvgIcon from "@/app/components/ui/SvgIcon";

interface BottomToUpModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
}

const BottomToUpModal: React.FC<BottomToUpModalProps> = ({ isOpen, onClose, children, className }) => {
    const [isMounted, setIsMounted] = useState(false);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
            setTimeout(() => setAnimate(true), 100);
        } else {
            setAnimate(false);
        }
    }, [isOpen]);

    const handleTransitionEnd = () => {
        if (!animate && !isOpen) setIsMounted(false);
    };

    useEffect(() => {
        if(isOpen) {

            document.body.style.overflow = isOpen ? "hidden" : "";
            return () => {
                document.body.style.overflow = "";
            };
        }

    }, [isOpen]);

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) onClose();
        },
        [isOpen, onClose]
    );

    useEffect(() => {
        if (isMounted) {
            window.addEventListener("keydown", handleKeyDown);
        }
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isMounted, handleKeyDown]);

    if (!isMounted) return null;

    return createPortal(
        <div
            className={`fixed inset-0 z-40 flex flex-col items-center justify-end bg-black/40 transition-opacity duration-300 ${
                isOpen ? "opacity-100" : "opacity-0"
            }`}
            aria-modal="true"
            role="dialog"
            onTransitionEnd={handleTransitionEnd}
        >
            <div
                className={`transition-all duration-500 ${
                    isMounted ? "backdrop-blur-sm opacity-100" : "backdrop-blur-none opacity-0"
                }`}
                onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                }}
            ></div>

            {/* Modal Box with pop & slide animation */}
            <button
                onClick={() => onClose()}
                className={`bg-dark rounded-full text-white  p-2 mb-1 transform transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]  ${
                    animate
                        ? "translate-y-0 opacity-100"
                        : " translate-y-6 opacity-0"
                } `}
            >
                <SvgIcon
                    name={'close.svg'}
                    width={20}
                    height={20}
                    localImage="close.svg"
                    fill="currentColor"
                    className={"text-white"}
                />
            </button>
            <div
                className={`relative bg-white rounded-t-[25px] shadow-2xl w-full transform transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] 
                ${
                    animate
                        ? "translate-y-0 opacity-100"
                        : " translate-y-6 opacity-0"
                } 
                ${className}`}
            >

                <div className="py-2 overflow-y-auto max-h-[90vh] custom-scrollbar">
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
};

export default BottomToUpModal;
