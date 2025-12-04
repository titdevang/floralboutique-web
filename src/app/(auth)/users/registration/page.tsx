"use client";

import Checkbox from "@/app/components/common/fields/Checkbox";
import InputField from "@/app/components/common/fields/InputField";
import ButtonLoder from "@/app/components/ui/loader/ButtonLoder";
import { apiRequest } from "@/app/utils/apiRequest";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import {toastError, toastSuccess} from "@/app/lib/toast";
import {ApiResponse} from "@/app/types/ApiRequest";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!formData.fullName) {
      toastError("Full Name is required.");
      return;
    }

    if (!formData.phone) {
      toastError("Phone Number is required.");
      return;
    }

     if (formData.phone.length != 10) {
       toastError("Mobile number is not valid");
       return;
     }

    if (!formData.password) {
      toastError("Password is required.");
      return;
    }

    if (!formData.confirmPassword) {
      toastError("Confirm Password is required.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toastError("Password and confirm password not match");
      return;
    }

    if (!formData.agree) {
      toastError("You must agree to the terms.");
      return;
    }

    setLoading(true);
    try {
      const response = await apiRequest<ApiResponse>("POST", "/register", formData);
      if (response?.status == 200) {
        toastSuccess(response.data?.message);
        setFormData({
          fullName: "",
          phone: "",
          password: "",
          confirmPassword: "",
          agree: false,
        });
      } else {
        toastError("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toastError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row border-0 lg:border border-gray-light w-full">
      <div className="w-full lg:w-1/2 h-64 sm:h-80 md:h-96 lg:h-auto relative">
        <Image
          src="https://floralboutique.in/uploads/all/kvsufIJPihbCxOfOf95XZMwkbyd1fW9fY12VlqCI.png"
          alt="Floral Background"
          fill
          className="object-cover"
        />
      </div>

      {/* Right Form Section */}
      <div className="lg:mt-0 mt-[-35px] md:mt-[-50px] z-10 bg-white flex flex-col justify-center items-center w-full lg:w-1/2 px-6 sm:px-10 py-8 lg:py-20 lg:rounded-none rounded-t-[40px]">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex flex-col items-center">
            <Image
              src="/assets/images/floralboutique.png"
              alt="Floral Boutique"
              width={150}
              height={80}
              className="mb-4"
            />
            <h2 className="text-center text-2xl text-primary font-bold">
              CREATE AN ACCOUNT.
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Full Name */}
            <InputField
              type="text"
              label="Full Name"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
            />

            {/* Phone */}
            <div>
              <InputField
                type="text"
                label="Phone Number"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div>
              <div className="relative mt-1">
                <InputField
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 bottom-3.5  hover:text-primary duration-300"
                >
                  {!showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <div className="relative mt-1">
                <InputField
                  type={showConfirmPassword ? "text" : "password"}
                  label="Confirm Password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 bottom-3.5 hover:text-primary duration-300"
                >
                  {!showConfirmPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-start">
              <Checkbox
                id="agree"
                name="agree"
                type="checkbox"
                label={
                  <p className="font-medium">
                    By signing up you agree to our{" "}
                    <Link
                      href="/terms"
                      className="text-primary hover:underline duration-500"
                    >
                      terms and conditions
                    </Link>
                  </p>
                }
                checked={formData.agree}
                onChange={handleChange}
              />
            </div>
            {/* Button */}
            <div className="py-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white h-10 font-bold text-sm hover:bg-hov-primary transition duration-500 disabled:opacity-50"
              >
                {loading ? <ButtonLoder /> : "Create Account"}
              </button>
            </div>

            {/* Message */}
            {message && <p className="text-center mt-2">{message}</p>}

            {/* Footer */}
            <div className="text-center mt-2">
              Already have an account?{" "}
              <Link
                href="/users/login"
                className="text-primary hover:underline font-semibold pl-1 duration-500 underline-offset-4 text-sm"
              >
                Log In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
