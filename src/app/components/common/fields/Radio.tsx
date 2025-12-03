"use client";

import React, { forwardRef, InputHTMLAttributes, ReactNode, useId } from "react";
import { cn } from "@/app/lib/utils";

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: ReactNode;
    error?: string;
    helperText?: string;
    className?: string;
    labelClassName?: string;
    checked: boolean;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(
    (
        { label, error, helperText, className, labelClassName, checked, onChange, id, ...props },
        ref
    ) => {
        const autoId = useId();
        const inputId = id || autoId;

        return (
            <div className="flex flex-col gap-1">
                <label
                    htmlFor={inputId}
                    onClick={(e) => e.stopPropagation()}
                    className={cn(
                        "flex items-center gap-2 cursor-pointer select-none touch-manipulation",
                        labelClassName
                    )}
                >
                    <input
                        ref={ref}
                        id={inputId}
                        type="radio"
                        checked={checked}
                        onChange={onChange}
                        className={cn(
                            "transition-all duration-200 peer accent-primary",
                            className
                        )}
                        {...props}
                    />

                    {label && <span className="text-sm">{label}</span>}
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
