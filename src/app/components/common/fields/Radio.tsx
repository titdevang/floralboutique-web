"use client";

import React, { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/app/lib/utils";

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: ReactNode;
    error?: string;
    helperText?: string;
    className?: string;
    labelClassName?: string;
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(
    ({ label, error, helperText, className, labelClassName, ...props }, ref) => {
        return (
            <div className="flex flex-col gap-1">
                <label
                    className={cn(
                        "flex items-center gap-2 cursor-pointer select-none touch-manipulation"
                    )}
                >
                    {/* Hidden native radio input */}
                    <input
                        ref={ref}
                        type="radio"
                        {...props}
                        className="peer hidden"
                    />

                        <div
                            className={cn(
                                "w-[20px] h-[20px] rounded-full border border-gray-dark flex-shrink-0",
                                "transition-all duration-150 ease-in-out",
                                "peer-checked:border-[5px] peer-checked:border-primary",
                                "peer-disabled:border-gray-light",
                                className
                            )}
                        ></div>

                    {label && (
                        <span className={`text-sm ${labelClassName}`}>{label}</span>
                    )}
                </label>

                {helperText && !error && (
                    <p className="text-xs text-gray-500 ml-7">{helperText}</p>
                )}
                {error && <p className="text-xs text-red-500 ml-7">{error}</p>}
            </div>
        );
    }
);

Radio.displayName = "Radio";
export default Radio;
