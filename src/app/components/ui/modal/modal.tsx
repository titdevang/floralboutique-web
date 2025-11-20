"use client";
import React, { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import SvgIcon from "@/app/components/ui/SvgIcon";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  className?: string;
  hideCloseButton?: boolean;
  titleClassName?: string;
  childrenClassName?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  className = "",
  hideCloseButton = false,
  titleClassName,
  childrenClassName,
}) => {
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
    if (isOpen) {
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
      className={`fixed inset-0 z-50 flex items-center justify-center px-4 transition-opacity duration-500 scroll-smooth ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
      aria-modal="true"
      role="dialog"
      onTransitionEnd={handleTransitionEnd}
    >
      <div
        className={`absolute inset-0 bg-black/50 transition-all duration-500 ${
          isMounted
            ? "backdrop-blur-[1px] opacity-100"
            : "backdrop-blur-none opacity-0"
        }`}
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      ></div>

      {/* Modal Box with pop & slide animation */}
      <div
        className={`relative bg-white rounded shadow-2xl w-full transform transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          animate ? "translate-y-0 opacity-100" : " translate-y-6 opacity-0"
        } ${className}`}
      >
        {/* Header */}
        {(title || !hideCloseButton) && (
          <div
            className={`flex items-center ${
              title ? "justify-between" : "justify-end"
            } p-3 `}
          >
            {title && (
              <h3 className={`${titleClassName} font-[500] text-[15px]`}>
                {title}
              </h3>
            )}
            {!hideCloseButton && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="p-2 rounded-full bg-gray text-white hover:bg-primary transition-colors duration-500"
              >
                <SvgIcon
                  name={"close.svg"}
                  width={15}
                  height={15}
                  localImage="close.svg"
                  fill="currentColor"
                />
              </button>
            )}
          </div>
        )}

        <div
          className={`${childrenClassName} p-5 overflow-y-auto max-h-[80vh] custom-scrollbar`}
        >
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
