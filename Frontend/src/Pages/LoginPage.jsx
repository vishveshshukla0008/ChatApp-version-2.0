import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { EyeOff, MessageSquare } from "lucide-react";
import { MailCheck } from "lucide-react";
import { Key } from "lucide-react";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../Components/AuthImagePattern";
import { useAuthStore } from "../Store/UseStoreAuth";
import { LoaderCircle } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { isLoggingIn, login } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const user = {
      email: data.email,
      password: data.password,
    };
    login(data);
  };
  return (
    <div className=" portrait:h-[90vh] flex justify-center max-md:flex-wrap items-center bg-base-200  md:border-r-info-content">
      <div className="flex flex-col h-full p-3 items-center justify-center md:h-screen w-full">
        <div className="w-full h-full p-2 flex flex-col justify-center rounded-lg md:mt-0 sm:max-w-md xl:p-0">
          <div className="space-y-4 px-4 py-3">
            <div className="text-xl my-3 font-bold leading-tight tracking-tight max-md:mb-10 ">
              <MessageSquare className="mx-auto bg-primary/10 text-primary   size-12  p-2 mb-3 font-bold rounded-2xl" />
              <div className="flex flex-col items-center justify-center gap-1">
                <p className="text-center text-2xl font-bold ">Login</p>
                <p className="text-center text-gray-400 text-base font-light ">
                  Get started with your existing account
                </p>
              </div>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 md:space-y-6"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium"
                >
                  Your email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2 flex items-center">
                    <MailCheck className="text-base-content/40 size-5" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    className="border pl-10 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2"
                    placeholder="name@example.com"
                    required=""
                    {...register("email", {
                      required: "email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Invalid Email Syntax :",
                      },
                    })}
                  />
                </div>

                {errors.email && (
                  <p className="text-red-500 text-sm pt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium"
                >
                  Your Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2 flex items-center">
                    <Key className="text-base-content/40 size-5" />
                  </div>
                  <input
                    type={`${showPassword ? "text" : "password"}`}
                    id="password"
                    placeholder="••••••••"
                    className="border pl-10 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2"
                    required=""
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters long",
                      },
                    })}
                  />

                  <button
                    type="button"
                    className="absolute right-3 top-3 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {!showPassword ? (
                      <Eye className="size-4" />
                    ) : (
                      <EyeOff className="size-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm pt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border rounded"
                    {...register("terms", {
                      required: "You must accept the terms & conditions",
                    })}
                  />
                </div>

                {/* Terms and Conditions Label */}
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className={`font-light ${errors.terms ? "text-red-500" : ""
                      }`}
                  >
                    I agree to the{" "}
                    <a className="font-medium hover:underline" href="#">
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>

              <button
                disabled={isLoggingIn}
                type="submit"
                className="disabled:bg-base-300  w-full bg-primary cursor-pointer hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white"
              >
                {isLoggingIn ? (
                  <div className="flex items-center justify-center gap-10">
                    <LoaderCircle className="size-5 animate-spin" />
                    Loading...
                  </div>
                ) : (
                  "Login"
                )}
              </button>
              <p className="text-sm font-light text-center">
                Not have an account ?
                <Link to="/signup">
                  &nbsp;
                  <b className="font-medium underline text-blue-500">
                    Create Account
                  </b>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <div className="w-full h-full">
        <AuthImagePattern
          title="Join our community"
          desc="Connect with friends, share moments, and stay in touch  with your loved once "
        />
      </div>
      <div></div>
    </div>
  );
};

export default LoginPage;
