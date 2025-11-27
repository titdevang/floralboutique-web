"use client";
import { cn } from "@/app/lib/utils";
import React, { InputHTMLAttributes, forwardRef } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  className?: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, helperText, className, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1">
        {label && (
          <label htmlFor={props.id} className="font-medium">
            {label}
          </label>
        )}

        <input
          ref={ref}
          {...props}
          className={cn(
            "w-full disabled:opacity-85 disabled:cursor-default placeholder:text-primary border border-gray-light px-3 py-3 focus:border-1 focus:border-primary focus:ring-0 focus:outline-none transition duration-500",
            error
              ? "border-hov-primary focus:border-hov-primary"
              : "border-gray",
            className
          )}
        />

        {helperText && !error && (
          <p className="text-xs text-gray-500">{helperText}</p>
        )}

        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

InputField.displayName = "InputField";
export default InputField;
