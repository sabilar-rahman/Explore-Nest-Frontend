"use client";

import Link from "next/link";
import React from "react";
import { toast } from "sonner";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useRegistrationMutation } from "@/src/redux/featuresApi/auth";
import { TErrorResponse } from "@/src/types";

// Define form values type
interface FormValues {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  image: File | null;
}

const initialValues: FormValues = {
  name: "",
  email: "",
  password: "",
  phone: "",
  address: "",
  image: null,
};

const SignUpPage = () => {
  const router = useRouter();
  const [createUser] = useRegistrationMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: initialValues,
  });

  const onSubmit = async (values: FormValues) => {
    const toastId = toast.loading("User creating");
    try {
      const formData = new FormData();
      const data = {
        name: values.name,
        email: values.email,
        password: values.password,
        phone: values.phone,
        address: values.address,
      };
      formData.append("data", JSON.stringify(data));
      if (values.image) {
        formData.append("image", values.image);
      }
      const res = await createUser(formData).unwrap();
      if (res.success) {
        router.push("/login");
        toast.success("Please sign in", { id: toastId, duration: 2000 });
      }
    } catch (error) {
      const err = error as TErrorResponse;
      toast.error(err.data.errorMessages[0].message || "Something went wrong", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 shadow-lg rounded-lg bg-white">
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-700">
        Create an Account
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600"
          >
            Name
          </label>
          <input
            id="name"
            {...register("name", { required: "Name is required" })}
            placeholder="Enter your name"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email", { required: "Email is required" })}
            placeholder="Enter your email"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-600"
          >
            Phone Number
          </label>
          <input
            id="phone"
            {...register("phone", { required: "Phone Number is required" })}
            placeholder="Enter your phone number"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.phone && (
            <span className="text-red-500">{errors.phone.message}</span>
          )}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password", { required: "Password is required" })}
            placeholder="Enter your password"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </div>

        {/* Address */}
        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-600"
          >
            Address
          </label>
          <textarea
            id="address"
            {...register("address")}
            placeholder="Enter your address"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Image Input */}
        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-600"
          >
            Profile Picture
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
            onChange={(e) => {
              const file = e.target.files ? e.target.files[0] : null;
              setValue("image", file);
            }}
          />
          {errors.image && (
            <span className="text-red-500">{errors.image.message}</span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 transition-colors"
        >
          Sign Up
        </button>
      </form>

      <div className="text-center mt-6">
        <span className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </span>
      </div>
    </div>
  );
};

export default SignUpPage;
