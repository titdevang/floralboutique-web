"use client";

import React, { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/app/lib/utils";
import SvgIcon from "@/app/components/ui/SvgIcon";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: ReactNode;
    error?: string;
    helperText?: string;
    className?: string;
    labelClassName?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    ({ label, error, helperText, className, labelClassName, ...props }, ref) => {
        return (
            <div className="flex flex-col gap-1">
                <label
                    className={cn(
                        "flex items-center gap-2.5 cursor-pointer select-none touch-manipulation"
                    )}
                >
                    <input
                        type="checkbox"
                        ref={ref}
                        {...props}
                        className="peer hidden"
                    />

                    {/* Visible Checkbox Box */}
                    <div className={cn("peer-disabled:bg-[#e9ecef] peer-disabled:cursor-not-allowed peer-disabled:opacity-50 peer-checked:!text-white peer-disabled:text-[#e9ecef] text-white h-[18px] w-[18px] flex items-center justify-center rounded border bg-white border-gray-dark peer-checked:border-primary peer-checked:!bg-primary transition duration-300",
                        className
                    )}>
                        <div className="text-[10px] flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#fff"><path d="m400-296.11-165.5-165.5 63.89-63.89L400-423.89 661.61-685.5l63.89 63.89L400-296.11Z"/></svg>
                        </div>
                    </div>

                    {label && (
                        <span
                            className={cn(
                                "text-sm text-gray-800 transition-colors group-hover:text-primary",
                                labelClassName
                            )}
                        >
              {label}
            </span>
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

Checkbox.displayName = "Checkbox";
export default Checkbox;
