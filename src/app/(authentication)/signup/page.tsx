// "use client";

// import Link from "next/link";
// import React from "react";
// import { toast } from "sonner";
// import { useForm, Controller } from "react-hook-form";
// import { useRouter } from "next/navigation";
// import { useRegistrationMutation } from "@/src/redux/featuresApi/auth";
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

// const initialValues: FormValues = {
//   name: "",
//   email: "",
//   password: "",
//   phone: "",
//   address: "",
//   image: null,
// };

// const SignUpPage = () => {
//   const router = useRouter();
//   const [createUser] = useRegistrationMutation();

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm<FormValues>({
//     defaultValues: initialValues,
//   });

//   const onSubmit = async (values: FormValues) => {
//     const toastId = toast.loading("User creating");
//     try {
//       const formData = new FormData();
//       const data = {
//         name: values.name,
//         email: values.email,
//         password: values.password,
//         phone: values.phone,
//         address: values.address,
//       };
//       formData.append("data", JSON.stringify(data));
//       if (values.image) {
//         formData.append("image", values.image);
//       }
//       const res = await createUser(formData).unwrap();
//       if (res.success) {
//         router.push("/login");
//         toast.success("Please sign in", { id: toastId, duration: 2000 });
//       }
//       console.log(createUser);
//     } catch (error) {
//       const err = error as TErrorResponse;
//       toast.error(err.data.errorMessages[0].message || "Something went wrong", {
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

//         {/* Email */}
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

//         {/* Phone */}
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

//         {/* Password */}
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

//         {/* Address */}
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

//         {/* Image Input */}
//         <div>
//           <label
//             htmlFor="image"
//             className="block text-sm font-medium text-gray-600"
//           >
//             Profile Picture
//           </label>
//           <input
//             id="image"
//             type="file"
//             accept="image/*"
//             className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
//             onChange={(e) => {
//               const file = e.target.files ? e.target.files[0] : null;
//               setValue("image", file);
//             }}
//           />
//           {errors.image && (
//             <span className="text-red-500">{errors.image.message}</span>
//           )}
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

"use client";

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

"use client";
import React from 'react';
import { useForm } from 'react-hook-form';
import { useSignupMutation } from '@/src/redux/featuresApi/auth';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface FormValues {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  image: File | null;
}

const RegistrationForm: React.FC = () => {
  const router = useRouter();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormValues>();
  const [registration, { isLoading, error }] = useSignupMutation();

  const onSubmit = async (values: FormValues) => {
    try {
      // Prepare FormData for file upload
      const formData = new FormData();
      const { image, ...data } = values; // Destructure to separate the image

      // Append data to FormData
      formData.append("data", JSON.stringify(data)); // Append other fields
      if (image) {
        formData.append('image', image); // Append image if present
      }

      const res = await registration(formData).unwrap();
      if (res.success) {
        toast.success("Account created successfully. Please sign in.");
        router.push("/login");
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.error("Registration error:", err); // Log the error for debugging
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name</label>
        <input {...register('name', { required: 'Name is required' })} />
        {errors.name && <span>{errors.name.message}</span>}
      </div>
      <div>
        <label>Email</label>
        <input type="email" {...register('email', { required: 'Email is required' })} />
        {errors.email && <span>{errors.email.message}</span>}
      </div>
      <div>
        <label>Password</label>
        <input type="password" {...register('password', { required: 'Password is required' })} />
        {errors.password && <span>{errors.password.message}</span>}
      </div>
      <div>
        <label>Phone</label>
        <input {...register('phone', { required: 'Phone number is required' })} />
        {errors.phone && <span>{errors.phone.message}</span>}
      </div>
      <div>
        <label>Address</label>
        <input {...register('address', { required: 'Address is required' })} />
        {errors.address && <span>{errors.address.message}</span>}
      </div>
      <div>
        <label>Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0] || null;
            setValue('image', file); // Set the selected file
          }}
        />
        {errors.image && <span>{errors.image.message}</span>}
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
};

export default RegistrationForm;
