// "use client";

// import Link from "next/link";
// import React from "react";
// import { toast } from "sonner";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { useRouter } from "next/navigation";

// import { TUser } from "@/src/types";
// import { useSignupMutation } from "@/src/redux/featuresApi/auth";

// const SignUpPage = () => {
//   const router = useRouter();
//   const [signUp] = useSignupMutation();

//   const {
//     handleSubmit,
//     reset,
//     register,
//     formState: { errors },
//   } = useForm<TUser>();

//   const onSubmit: SubmitHandler<TUser> = async (data) => {
//     try {
//       console.log("Registration Data:", data);

//       // Create FormData instance
//       const formData = new FormData();
//       formData.append("name", data.name);
//       formData.append("email", data.email);
//       formData.append("phone", data.phone);
//       formData.append("password", data.password);
//       formData.append("address", data.address);
//       formData.append("role", "user"); // Add role

//       const user = await signUp(formData).unwrap();
//       console.log("User data:", user);
//       toast.success("Registration Successful");
//       router.push("/login");

//       // Reset the form fields after submission
//       reset();
//     } catch (error) {
//       toast.error("Registration Failed");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-16 p-8 shadow-lg rounded-lg bg-white">
//       <h2 className="text-3xl font-semibold text-center mb-6 text-gray-700">
//         Create an Account
//       </h2>

//       <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
//         <div>
//           <label
//             htmlFor="name"
//             className="block text-sm font-medium text-gray-600"
//           >
//             Name
//           </label>
//           <input
//             id="name"
//             {...register("name", { required: "Name is required" })}
//             placeholder="Enter your name"
//             className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           {errors.name && (
//             <span className="text-red-500">{errors.name.message}</span>
//           )}
//         </div>

//         <div>
//           <label
//             htmlFor="email"
//             className="block text-sm font-medium text-gray-600"
//           >
//             Email
//           </label>
//           <input
//             id="email"
//             type="email"
//             {...register("email", { required: "Email is required" })}
//             placeholder="Enter your email"
//             className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           {errors.email && (
//             <span className="text-red-500">{errors.email.message}</span>
//           )}
//         </div>

//         <div>
//           <label
//             htmlFor="phone"
//             className="block text-sm font-medium text-gray-600"
//           >
//             Phone Number
//           </label>
//           <input
//             id="phone"
//             {...register("phone", { required: "Phone Number is required" })}
//             placeholder="Enter your phone number"
//             className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           {errors.phone && (
//             <span className="text-red-500">{errors.phone.message}</span>
//           )}
//         </div>

//         <div>
//           <label
//             htmlFor="password"
//             className="block text-sm font-medium text-gray-600"
//           >
//             Password
//           </label>
//           <input
//             id="password"
//             type="password"
//             {...register("password", { required: "Password is required" })}
//             placeholder="Enter your password"
//             className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           {errors.password && (
//             <span className="text-red-500">{errors.password.message}</span>
//           )}
//         </div>

//         <div>
//           <label
//             htmlFor="address"
//             className="block text-sm font-medium text-gray-600"
//           >
//             Address
//           </label>
//           <textarea
//             id="address"
//             {...register("address")}
//             placeholder="Enter your address"
//             className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 transition-colors"
//         >
//           Register
//         </button>
//       </form>

//       <div className="text-center mt-6">
//         <span className="text-sm text-gray-600">
//           Already have an account?{" "}
//           <Link href="/login" className="text-blue-500 hover:underline">
//             Login here
//           </Link>
//         </span>
//       </div>
//     </div>
//   );
// };

// export default SignUpPage;


// "use client";

// import Link from "next/link";
// import React from "react";
// import { toast } from "sonner";
// import { useForm } from "react-hook-form";
// import { useRouter } from "next/navigation";
// import { useRegistrationMutation, useSignupMutation } from "@/src/redux/featuresApi/auth"; // Ensure this path is correct
// import { TErrorResponse } from "@/src/types";

// // Define form values type
// interface FormValues {
//   name: string;
//   email: string;
//   password: string;
//   phone: string;
//   address: string;
//   image: File | null;
// }

// const SignUpPage = () => {
//   const router = useRouter();
//   const [signup] = useSignupMutation();

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm<FormValues>();

//   const onSubmit = async (values: FormValues) => {
//     const toastId = toast.loading("Creating user...");
//     try {
//       const formData = new FormData();
//       const data = {
//         name: values.name,
//         email: values.email,
//         password: values.password,
//         phone: values.phone,
//         address: values.address,
//       };

//       // Append data and image file to FormData
//       formData.append("data", JSON.stringify(data));
//       if (values.image) {
//         formData.append("image", values.image);
//       }

//       // Call the signup API
//       const res = await signup(formData).unwrap();

//       // Check response and redirect
//       if (res.success) {
//         toast.success("Account created successfully. Please sign in.", { id: toastId, duration: 2000 });
//         router.push("/login");
//       } else {
//         toast.error(res.message || "Something went wrong", { id: toastId, duration: 2000 });
//       }
//     } catch (error) {
//       const err = error as TErrorResponse;
//       toast.error(err.data?.errorMessages[0]?.message || "Something went wrong", {
//         id: toastId,
//         duration: 2000,
//       });
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-16 p-8 shadow-lg rounded-lg bg-white">
//       <h2 className="text-3xl font-semibold text-center mb-6 text-gray-700">
//         Create an Account
//       </h2>

//       <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
//         {/* Name */}
//         <div>
//           <label htmlFor="name" className="block text-sm font-medium text-gray-600">
//             Name
//           </label>
//           <input
//             id="name"
//             {...register("name", { required: "Name is required" })}
//             placeholder="Enter your name"
//             className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           {errors.name && <span className="text-red-500">{errors.name.message}</span>}
//         </div>

//         {/* Email */}
//         <div>
//           <label htmlFor="email" className="block text-sm font-medium text-gray-600">
//             Email
//           </label>
//           <input
//             id="email"
//             type="email"
//             {...register("email", { required: "Email is required" })}
//             placeholder="Enter your email"
//             className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           {errors.email && <span className="text-red-500">{errors.email.message}</span>}
//         </div>

//         {/* Phone */}
//         <div>
//           <label htmlFor="phone" className="block text-sm font-medium text-gray-600">
//             Phone Number
//           </label>
//           <input
//             id="phone"
//             {...register("phone", { required: "Phone Number is required" })}
//             placeholder="Enter your phone number"
//             className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           {errors.phone && <span className="text-red-500">{errors.phone.message}</span>}
//         </div>

//         {/* Password */}
//         <div>
//           <label htmlFor="password" className="block text-sm font-medium text-gray-600">
//             Password
//           </label>
//           <input
//             id="password"
//             type="password"
//             {...register("password", { required: "Password is required" })}
//             placeholder="Enter your password"
//             className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           {errors.password && <span className="text-red-500">{errors.password.message}</span>}
//         </div>

//         {/* Address */}
//         <div>
//           <label htmlFor="address" className="block text-sm font-medium text-gray-600">
//             Address
//           </label>
//           <textarea
//             id="address"
//             {...register("address")}
//             placeholder="Enter your address"
//             className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         {/* Image Input */}
//         <div>
//           <label htmlFor="image" className="block text-sm font-medium text-gray-600">
//             Profile Picture
//           </label>
//           <input
//             id="image"
//             type="file"
//             accept="image/*"
//             className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
//             onChange={(e) => {
//               const file = e.target.files ? e.target.files[0] : null;
//               setValue("image", file); // Set image value in the form state
//             }}
//           />
//           {errors.image && <span className="text-red-500">{errors.image.message}</span>}
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 transition-colors"
//         >
//           Sign Up
//         </button>
//       </form>

//       <div className="text-center mt-6">
//         <span className="text-sm text-gray-600">
//           Already have an account?{" "}
//           <Link href="/login" className="text-blue-500 hover:underline">
//             Login here
//           </Link>
//         </span>
//       </div>
//     </div>
//   );
// };

// export default SignUpPage;

// "use client";
// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { useSignupMutation } from '@/src/redux/featuresApi/auth';
// import { toast } from 'sonner';
// import { useRouter } from 'next/navigation';

// interface FormValues {
//   name: string;
//   email: string;
//   password: string;
//   phone: string;
//   address: string;
//   image: File | null;
// }

// const RegistrationForm: React.FC = () => {
//   const router = useRouter();
//   const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormValues>();
//   const [registration, { isLoading, error }] = useSignupMutation();

//   const onSubmit = async (values: FormValues) => {
//     try {
//       // Prepare FormData for file upload
//       const formData = new FormData();
//       const { image, ...data } = values; // Destructure to separate the image

//       // Append data to FormData
//       formData.append("data", JSON.stringify(data)); // Append other fields
//       if (image) {
//         formData.append('image', image); // Append image if present
//       }

//       const res = await registration(formData).unwrap();
//       if (res.success) {
//         toast.success("Account created successfully. Please sign in.");
//         router.push("/login");
//       } else {
//         toast.error("Something went wrong");
//       }
//     } catch (err) {
//       toast.error("Something went wrong");
//       console.error("Registration error:", err); // Log the error for debugging
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <div>
//         <label>Name</label>
//         <input {...register('name', { required: 'Name is required' })} />
//         {errors.name && <span>{errors.name.message}</span>}
//       </div>
//       <div>
//         <label>Email</label>
//         <input type="email" {...register('email', { required: 'Email is required' })} />
//         {errors.email && <span>{errors.email.message}</span>}
//       </div>
//       <div>
//         <label>Password</label>
//         <input type="password" {...register('password', { required: 'Password is required' })} />
//         {errors.password && <span>{errors.password.message}</span>}
//       </div>
//       <div>
//         <label>Phone</label>
//         <input {...register('phone', { required: 'Phone number is required' })} />
//         {errors.phone && <span>{errors.phone.message}</span>}
//       </div>
//       <div>
//         <label>Address</label>
//         <input {...register('address', { required: 'Address is required' })} />
//         {errors.address && <span>{errors.address.message}</span>}
//       </div>
//       <div>
//         <label>Image</label>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => {
//             const file = e.target.files?.[0] || null;
//             setValue('image', file); // Set the selected file
//           }}
//         />
//         {errors.image && <span>{errors.image.message}</span>}
//       </div>
//       <button type="submit" disabled={isLoading}>
//         {isLoading ? 'Registering...' : 'Register'}
//       </button>
//     </form>
//   );
// };

// export default RegistrationForm;


"use client";
import FormikInput from "@/src/components/formik/FormikInput";
import { useRegistrationMutation } from "@/src/redux/featuresApi/auth";

import { TErrorResponse } from "@/src/types";
import { Button } from "@nextui-org/button";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Define form values type
interface FormValues {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  Image: File | null;
}

const initialValues: FormValues = {
  name: "",
  email: "",
  password: "",
  phone: "",
  address: "",
  Image: null,
};

const Registration = () => {
  const router = useRouter();
  const [createUser] = useRegistrationMutation();
  const handleSubmit = async (values: FormValues) => {
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
      if (values.Image) {
        formData.append("Image", values.Image);
      }
      const res = await createUser(formData).unwrap();
      if (await res.success) {
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
    <div className="flex items-center justify-center min-h-screen">
      <div className=" p-8 m-5 rounded-lg shadow-lg w-full max-w-md space-y-6">
        {/* Registration Header */}
        <h1 className="text-2xl font-bold text-center mb-6">
          Create ExploreNest account
        </h1>

        {/* Formik Form */}
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ setFieldValue }) => (
            <Form className="space-y-5">
              
              {/* Name */}
              <FormikInput name="name" label="Enter Your Name Here"  type=" text" />
              

              {/* Email */}
              <FormikInput name="email" label="Enter Your Email" type=" email" />

              {/* Password */}
              <FormikInput name="password" label="Enter Your Password" type=" password" />

              {/* Phone */}
              <FormikInput name="phone" label="Enter Your Phone" type="tel" />

              {/* Address */}
              <FormikInput name="address" label="Enter Your Address"  isTextArea={true}  />

              {/* File Input for Image */}
              <div className="space-y-1">
                <label
                  htmlFor="Image"
                  className="block font-medium text-gray-700"
                >
                  Profile Picture
                </label>
                <input
                  accept="image/*"
                  id="Image"
                  type="file"
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                  onChange={(e) => {
                    const file = e.target.files ? e.target.files[0] : null;
                    setFieldValue("Image", file);
                  }}
                />
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full bg-blue-600 text-white">
                Sign up
              </Button>
            </Form>
          )}
        </Formik>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-5">
          Already Have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>





  );
};

export default Registration;

