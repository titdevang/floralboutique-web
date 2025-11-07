import React, { useEffect, useRef, useState } from "react";
import InputField from "@/app/components/common/fields/InputField";
import ButtonLoder from "@/app/components/ui/loader/ButtonLoder";
import {toast} from "react-toastify";

type OTPVerifyProps = {
    length?: number;
    onSuccess?: (otp: string) => void;
    onFailure?: (otp: string) => void;
    verifyOtpApi?: (otp: string) => Promise<boolean>;
    handleResend: () => void;
};

const defaultVerify = async (otp: string) => {
    await new Promise((r) => setTimeout(r, 900)); // simulate network
    return otp === "123456";
};

export default function OTPVerify({
                                      length = 6,
                                      onSuccess,
                                      onFailure,
                                      verifyOtpApi = defaultVerify,
                                      handleResend
                                  }: OTPVerifyProps) {
    const [values, setValues] = useState<string[]>(Array(length).fill(""));
    const inputsRef = useRef<HTMLInputElement[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [resendTimer, setResendTimer] = useState<number>(30);
    const [canResend, setCanResend] = useState(false);

    useEffect(() => {
        inputsRef.current = inputsRef.current.slice(0, length);
    }, [length]);

    useEffect(() => {
        // start countdown when component mounts or when timer resets
        if (resendTimer <= 0) {
            setCanResend(true);
            return;
        }
        setCanResend(false);
        const t = setInterval(() => setResendTimer((s) => s - 1), 1000);
        return () => clearInterval(t);
    }, [resendTimer]);

    const focusInput = (idx: number) => {
        const el = inputsRef.current[idx];
        if (el) el.focus();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
        const raw = e.target.value;
        const val = raw.replace(/[^0-9]/g, "");
        if (!val) {
            updateValue("", idx);
            return;
        }

        if (val.length === 1) {
            updateValue(val, idx);
            // move focus next
            if (idx < length - 1) focusInput(idx + 1);
        } else {
            const chars = val.split("").slice(0, length - idx);
            const next = [...values];
            for (let i = 0; i < chars.length; i++) {
                next[idx + i] = chars[i];
            }
            setValues(next);
            const nextFocus = Math.min(length - 1, idx + chars.length - 1);
            focusInput(nextFocus + 1 <= length - 1 ? nextFocus + 1 : nextFocus);
        }
    };

    const updateValue = (val: string, idx: number) => {
        setValues((prev) => {
            const next = [...prev];
            next[idx] = val;
            return next;
        });
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
        const key = e.key;
        const target = e.target as HTMLInputElement;
        if (key === "Backspace") {
            if (target.value === "") {
                // move to previous
                if (idx > 0) {
                    updateValue("", idx - 1);
                    focusInput(idx - 1);
                }
            } else {
                // clear current
                updateValue("", idx);
            }
        } else if (key === "ArrowLeft") {
            if (idx > 0) focusInput(idx - 1);
        } else if (key === "ArrowRight") {
            if (idx < length - 1) focusInput(idx + 1);
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, idx: number) => {
        e.preventDefault();
        const paste = e.clipboardData.getData("text").replace(/[^0-9]/g, "");
        if (!paste) return;
        const chars = paste.split("").slice(0, length - idx);
        setValues((prev) => {
            const next = [...prev];
            for (let i = 0; i < chars.length; i++) {
                next[idx + i] = chars[i];
            }
            return next;
        });
        const focusIdx = Math.min(length - 1, idx + chars.length);
        focusInput(focusIdx);
    };

    const currentOtp = values.join("");
    const isComplete = values.every((v) => v !== "");

    const handleSubmit = async () => {
        if (!isComplete) {
            toast.error("Please enter the full 6-digit code.");
            return;
        }
        setIsLoading(true);
        try {
            const ok = await verifyOtpApi(currentOtp);
            if (ok) {
                toast.success("OTP verified successfully!");
                onSuccess?.(currentOtp);
            } else {
                toast.error("Invalid OTP. Please try again.");
                onFailure?.(currentOtp);
            }
        } catch (err) {
            toast.error("Verification failed. Network or server error.");
            console.error(err);
            onFailure?.(currentOtp);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCodeResend = () => {
        if (!canResend) return;
        handleResend()
        toast.success("A new OTP has been sent.");
        setResendTimer(30);
        setCanResend(false);
        setValues(Array(length).fill(""));
        setTimeout(() => focusInput(0), 50);
    };

    return (
        <div className="max-w-md w-full mx-auto p-6 bg-white rounded-2xl shadow-md">

            <div className="flex flex-col items-center gap-4">
                <div className="flex gap-2">
                    {Array.from({ length }).map((_, i) => (
                        <InputField
                            key={i}
                            ref={(el) => {
                                if (el) inputsRef.current[i] = el;
                            }}
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            maxLength={1}
                            value={values[i]}
                            onChange={(e) => handleChange(e, i)}
                            onKeyDown={(e) => handleKeyDown(e, i)}
                            onPaste={(e) => handlePaste(e, i)}
                            aria-label={`Digit ${i + 1}`}
                            className=""
                        />
                    ))}
                </div>

                {/*{message && <div className="text-sm text-center">{message}</div>}*/}

                <div className="flex flex-col items-center gap-3 w-full">
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="w-full bg-primary text-white h-10 font-bold text-sm hover:bg-hov-primary transition duration-500 disabled:opacity-50"
                    >
                        {isLoading ? <ButtonLoder/> : "Verify"}
                    </button>

                    <button
                        type="button"
                        onClick={handleCodeResend}
                        disabled={!canResend}
                        className=""
                    >
                        {canResend ? "Resend code" : `Resend in ${resendTimer}s`}
                    </button>
                </div>
            </div>
        </div>
    );
}
