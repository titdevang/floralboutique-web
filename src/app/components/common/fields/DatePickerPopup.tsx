"use client";

import { useState, useRef, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import Modal from "../../ui/modal/modal";
import {formatDate} from "@/app/lib/formatDate";

interface Props {
  onChange?: (date: string) => void;
}

export default function DatePickerPopup({ onChange }: Props) {
  const [selected, setSelected] = useState<Date | undefined>();
  const [open, setOpen] = useState(false);

  const popupRef = useRef<HTMLDivElement>(null);

  const handleSelect = (date: Date | undefined) => {
    setSelected(date);
      const formattedValue = date
        ? `${date.getDate().toString().padStart(2, "0")}-${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${date.getFullYear()}`
        : "";
    if (formattedValue) onChange?.(formattedValue);
    setOpen(false);
  };

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  return (
    <div className="w-full h-full">
      <button
        type="button"
        className="h-full w-full"
        onClick={() => setOpen(true)}
      >
        <span>{selected ? formatDate(selected) : "Select Date"}</span>
      </button>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        className="!max-w-fit"
      >
        <div ref={popupRef} className="mt-[-10px]">
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={handleSelect}
            fixedWeeks
            disabled={{
              before: tomorrow,
            }}
          />
        </div>
      </Modal>
    </div>
  );
}
