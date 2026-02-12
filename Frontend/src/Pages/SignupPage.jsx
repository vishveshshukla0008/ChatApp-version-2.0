import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MessageSquare } from "lucide-react";
import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";
import { User } from "lucide-react";
import { MailCheck } from "lucide-react";
import { Key } from "lucide-react";
import { RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import { useAuthStore } from "../Store/UseStoreAuth";
import AuthImagePattern from "../Components/AuthImagePattern";
import toast from "react-hot-toast";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { isSigningUp, signup } = useAuthStore();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const user = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
    };
    signup(user);
  };

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  return (
    <>
      <div className="outer flex justify-center items-center max-md:flex-wrap w-full">
        <div className="form-section bg-base-200 scroll-smooth w-full h-[110vh] portrait:h-screen md:w-full">
          <section className="h-full flex items-center justify-center md:w-full">
            <div className="flex flex-col h-full p-3 items-center justify-center md:h-screen w-full">
              <div className="w-full h-full p-2 flex flex-col justify-center rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                <div className="space-y-4 px-4 py-3">
                  <div className="text-xl my-3 font-bold leading-tight tracking-tight max-md:mb-10 ">
                    <MessageSquare className="mx-auto bg-primary/10 size-12 text-primary p-2 mb-3 font-bold rounded-2xl" />
                    <div className="flex flex-col items-center justify-center gap-1">
                      <p className="text-center text-2xl font-bold ">
                        Create Account
                      </p>
                      <p className="text-center text-gray-400 text-base font-light ">
                        Get started with your free account
                      </p>
                    </div>
                  </div>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4 md:space-y-6"
                  >
                    <div>
                      <label
                        htmlFor="fullname"
                        className="block mb-2 text-sm font-medium"
                      >
                        Your Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-2 flex items-center">
                          <User className="text-base-content/40 size-5" />
                        </div>
                        <input
                          type="text"
                          id="fullname"
                          className="border pl-10 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
                          placeholder="John doe"
                          required=""
                          {...register("fullname", {
                            required: "Name is required",
                          })}
                        />
                      </div>
                      {errors.fullname && (
                        <p className="text-red-500 text-sm pt-1">
                          {errors.fullname.message}
                        </p>
                      )}
                    </div>
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
                          className="border pl-10 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
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
                        Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-2 flex items-center">
                          <Key className="text-base-content/40 size-5" />
                        </div>
                        <input
                          type={`${showPassword ? "text" : "password"}`}
                          id="password"
                          placeholder="••••••••"
                          className="border pl-10 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
                          required=""
                          {...register("password", {
                            required: "Password is required",
                            minLength: {
                              value: 8,
                              message:
                                "Password must be at least 8 characters long",
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
                    <div>
                      <label
                        htmlFor="confirm-password"
                        className="block mb-2 text-sm font-medium"
                      >
                        Confirm password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-2 flex items-center">
                          <RotateCcw className="text-base-content/40 size-5" />
                        </div>
                        <input
                          type="password"
                          id="confirm-password"
                          placeholder="••••••••"
                          className="pl-10 border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
                          required=""
                          {...register("confirmPassword", {
                            required: "Confirm Password is required",
                            validate: (value) =>
                              confirmPassword === password ||
                              "confirm password must be same",
                          })}
                        />
                      </div>

                      {errors.confirmPassword && (
                        <p className="text-red-500 pt-1">
                          {errors.confirmPassword.message}
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
                      disabled={isSigningUp}
                      type="submit"
                      className="w-full bg-primary cursor-pointer hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white"
                    >
                      {isSigningUp ? (
                        <div className="flex items-center justify-center gap-10">
                          <LoaderCircle className="size-5 animate-spin" />
                          Loading...
                        </div>
                      ) : (
                        "Create Account"
                      )}
                    </button>
                    <p className="text-sm font-light text-center">
                      Already have an account ?
                      <Link to="/login">
                        <b className="font-medium text-blue-500 underline">&nbsp;Sign in</b>
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="w-full h-screen">
          <AuthImagePattern
            title="Join our community"
            desc="Connect with friends, share moments, and stay in touch  with your loved once "
          />
        </div>
      </div>
    </>
  );
};

export default SignupPage;
