"use client";

import InputField from "@/app/components/common/fields/InputField";
import ButtonLoder from "@/app/components/ui/loader/ButtonLoder";
import { apiRequest } from "@/app/utils/apiRequest";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showEmailField, setShowEmailField] = useState(false);

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

    if (!formData.phone || !formData.email) {
      if (!formData.email && showEmailField) {
        toast.error("Email is required.");
        return;
      } else if (!formData.phone && !showEmailField) {
        toast.error("Phone Number is required.");
        return;
      }
    }

    if (formData.phone.length != 10) {
      toast.error("Mobile number is not valid");
      return;
    }

    setLoading(true);
    try {
      const response = await apiRequest("POST", "/login", formData);
      if (response?.status == 200) {
        toast.success("Account created successfully!");
        setFormData({
          phone: "",
          email: "",
        });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row border-0 lg:border border-gray-light w-full">
      <div className="w-full lg:w-1/2 h-64 sm:h-80 md:h-96 lg:h-auto relative">
        <Image
          src="https://floralboutique.in/uploads/all/IAhKAFq9j2vtIdh0CHsEv2cbbspBppp6hURO7RnI.png"
          alt="Floral Background"
          fill
          className="object-cover"
        />
      </div>

      {/* Right Form Section */}
      <div className="lg:mt-0 mt-[-35px] md:mt-[-50px] z-10 bg-white flex flex-col justify-center items-center w-full lg:w-1/2 px-6 sm:px-10 py-8 lg:py-20 lg:rounded-none rounded-t-[40px]">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex flex-col items-center gap-4">
            <Image
              src="/assets/images/floralboutique.png"
              alt="Floral Boutique"
              width={200}
              height={80}
            />
            <h2 className="text-center text-2xl text-primary font-bold uppercase">
              Forgot password?
            </h2>
            <p className=" text-center">
              Enter your email address or phone number to recover your password.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Phone */}
            <div>
              {!showEmailField ? (
                <InputField
                  type="text"
                  label="Phone Number"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              ) : (
                <InputField
                  type="email"
                  label="Email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
              )}
              <p className="text-end pt-1">
                <span
                  onClick={() => setShowEmailField(!showEmailField)}
                  className="cursor-pointer italic text-primary underline"
                >
                  *
                  {showEmailField
                    ? "Use Phone Number Instead"
                    : "Use Email Instead"}
                </span>
              </p>
            </div>
            {/* Button */}
            <div className="py-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary uppercase text-white h-10 font-bold text-sm hover:bg-hov-primary transition duration-500 disabled:opacity-50"
              >
                {loading ? <ButtonLoder /> : "Reset"}
              </button>
            </div>

            {/* Message */}
            {message && <p className="text-center mt-2">{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
