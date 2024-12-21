"use client";
import React, { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/redux/actions/userAction";
import Link from "next/link";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const router = useRouter();
  const dispatch = useDispatch();

  const { user, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      if(user?.isAdmin) {
        redirect("/Admin/Dashbord");
      }
      redirect("/");
    }
  }, [user]);

  const Submitsignin = (e) => {
    e.preventDefault();
    const data = { email, password };
    dispatch(loginUser(data));
  };

  return (
    <>
      <section className="bg-gradient-to-r from-blue-500 to-indigo-600 min-h-screen flex items-center justify-center pb-12 pt-5 px-6">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="flex justify-center mb-6">
            <Image className="h-24" src="/idcordlogo.jpg" alt="logo" height={550} width={350} />
          </div>

          <h1 className="text-3xl font-semibold text-center text-gray-900 dark:text-white mb-6">
            Sign in
          </h1>

          <form onSubmit={Submitsignin}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="name@company.com"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="••••••••"
                required
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600"
            >
              Sign In
            </button>

            <p className="text-sm text-center mt-4 text-gray-600 dark:text-gray-400">
              Don’t have an account?{" "}
              <Link href="/Signup" className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-500">
                Sign Up
              </Link>
            </p>
          </form>

          {/* Back to Home Button */}
          <div className="mt-6 text-center">
            <button
              onClick={() => router.push("/")}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Back to Home
            </button>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default Signin;
