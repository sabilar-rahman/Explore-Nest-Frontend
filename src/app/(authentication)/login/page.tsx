"use client";
// import { useLoginMutation } from "@/src/redux/features/auth";
// import { setUser, TUser } from "@/src/redux/features/auth/authSlice";

import { TErrorResponse } from "@/src/types";
import { verifyToken } from "@/src/utils/VerifyToken";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "@/src/redux/featuresApi/auth";
import { setUser, TUser } from "@/src/redux/featuresApi/auth/authSlice";
import { useAppDispatch } from "@/src/redux/hooks";

type TSignInValue = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Initialize useForm for react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignInValue>();

  const onSubmit = async (values: TSignInValue) => {
    const toastId = toast.loading("Login processing");
    try {
      const res = await login(values).unwrap();
      let user = verifyToken(res.token) as TUser;
      user.name = res.data.name;
      user.image = res.data.image;
      dispatch(setUser({ user: user, token: res.token }));
      localStorage.setItem("token", res.token);
      toast.success("Logged in", { id: toastId, duration: 2000 });
      router.push("/");
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
      <div className="p-8 m-5 rounded-lg shadow-lg w-full max-w-md space-y-6">
        {/* Login Header */}
        <h1 className="text-3xl font-semibold text-center mb-6">
          Log in to your account
        </h1>

        {/* React Hook Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", { required: "Email is required" })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password", { required: "Password is required" })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-blue-600 text-white hover:bg-blue-700"
          >
            Log In
          </Button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-400 mt-5">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
        {/* <p className="text-center text-sm text-gray-400 mt-5">
          Forget your password?{" "}
          <Link href="/recover" className="text-blue-500 hover:underline">
            Recover now!
          </Link>
        </p> */}
      </div>
    </div>
  );
};

export default LoginPage;
