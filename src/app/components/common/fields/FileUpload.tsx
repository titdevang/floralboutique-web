"use client";
import { cn } from "@/app/lib/utils";
import React, { InputHTMLAttributes, forwardRef } from "react";

interface FileUploadProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  className?: string;
  onFileSelect?: (file: File | null) => void;
}

const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
  ({ label, error, helperText, className, onFileSelect, ...props }, ref) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null;
      onFileSelect?.(file); // trigger custom callback if provided
      props.onChange?.(e); // still trigger normal onChange if provided
    };

    return (
      <div className="w-full flex flex-col gap-1">
        {label && (
          <label htmlFor={props.id} className="font-medium">
            {label}
          </label>
        )}

        <input
          type="file"
          ref={ref}
          {...props}
          onChange={handleFileChange}
          className={cn(
            "file:mr-4 file:py-1 file:text-xs file:px-4 file:border-0 file:bg-primary file:text-white hover:file:bg-hov-primary file:cursor-pointer",
            "block w-full text-sm placeholder:text-primary border border-gray-light px-3 py-2 focus:border-1 focus:border-primary focus:ring-0 focus:outline-none transition duration-500",
            error
              ? "border-hov-primary focus:border-hov-primary"
              : "border-gray",
            className
          )}
        />

        {helperText && !error && (
          <p className="text-xs text-gray">{helperText}</p>
        )}

        {error && <p className="text-xs text-hov-primary">{error}</p>}
      </div>
    );
  }
);

FileUpload.displayName = "FileUpload";
export default FileUpload;
