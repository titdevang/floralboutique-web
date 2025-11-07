"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import InputField from "../common/fields/InputField";
import { toast } from "react-toastify";
import { useUserProfileContext } from "@/app/context/UserProfileContext";
import FileUpload from "../common/fields/FileUpload";

type FormErrors = {
  name?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
};

const ProfileBasicInfoForm = () => {
  const { userProfileData } = useUserProfileContext();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    photo: null as File | string | null,
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (userProfileData) {
      setFormData(() => ({
        name: userProfileData.name,
        phone: userProfileData.phone,
        photo: userProfileData.photo,
        password: "",
        confirmPassword: "",
      }));
    }
  }, [userProfileData]);

  // State for error messages
  const [errors, setErrors] = useState<FormErrors>({
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    validateField(name, value);
  };

  const handleFileChange = (file: File | null) => {
    setFormData((prevData) => ({
      ...prevData,
      photo: file,
    }));
    // You can add validation for the file here if needed
    // For example, checking file size or type
  };

  const validateField = (name: string, value: string) => {
    const newErrors: FormErrors = { ...errors };

    switch (name) {
      case "name":
        newErrors.name = !value.trim() ? "Name is required" : "";
        break;
      case "phone":
        newErrors.phone =
          !value.trim() || value.length < 10
            ? "Valid phone number is required"
            : "";
        break;
      case "password":
        newErrors.password =
          value.length > 0 && value.length < 6
            ? "Password must be at least 6 characters"
            : "";
        if (formData.confirmPassword && value !== formData.confirmPassword) {
          newErrors.confirmPassword = "Passwords do not match";
        } else {
          newErrors.confirmPassword = "";
        }
        break;
      case "confirmPassword":
        newErrors.confirmPassword =
          formData.password !== value ? "Passwords do not match" : "";
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.phone.trim() || formData.phone.length < 10) {
      newErrors.phone = "Valid phone number is required";
    }

    // Only validate password fields if a new password is being entered
    if (formData.password) {
      if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      toast.success("Form submitted successfully!");
    }
  };

  return (
    <div className="">
      <h2 className="text-xl font-semibold mb-4">Basic Info</h2>

      <form onSubmit={handleSubmit} method="POST">
        <div className="mb-4">
          <InputField
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            error={errors.name}
          />
        </div>

        {/* Phone Field */}
        <div className="mb-4">
          <InputField
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Your Phone"
            error={errors.phone}
          />
        </div>

        {/* Photo Upload Field */}
        <div className="mb-4">
          <label
            htmlFor="photo"
            className="block text-sm font-medium text-gray-700"
          >
            Photo
          </label>
           <FileUpload
            id="photo"
            name="photo"
            onFileSelect={handleFileChange}
            placeholder="Photo"
          />
        </div>

        {/* Password Fields */}
        <div className="mb-4">
          {/* Password Field */}
          <InputField
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="New Password"
            error={errors.password}
          />
        </div>

        <div className="mb-4">
          <InputField
            type="password"
            id="confirm-password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            error={errors.confirmPassword}
          />
        </div>

        {/* Update Profile Button */}
        <div className="text-end">
          <button
            type="submit"
            className="bg-primary text-white p-3 rounded-sm hover:bg-hov-primary focus:outline-none duration-500"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileBasicInfoForm;
