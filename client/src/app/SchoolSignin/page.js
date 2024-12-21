"use client";
import React, { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { loginSchool } from "@/redux/actions/userAction";
import Link from "next/link";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SchoolSignin = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const router = useRouter();
  const dispatch = useDispatch();

  const { user, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      if (user?.isAdmin) {
        redirect("/Admin/Dashboard");
      }
      redirect("/");
    }
  }, [user]);

  const Submitsignin = (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    dispatch(loginSchool(data));
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  }, [error]);

  return (
    <>
      <section className="bg-gradient-to-r from-blue-500 to-indigo-600 min-h-screen flex items-center justify-center py-12">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg dark:bg-gray-800 p-8">
          <div className="text-center mb-8">
            <Image
              className="h-24 mx-auto mb-4"
              src="/idcordlogo.jpg"
              alt="Logo"
              height={50}
              width={450}
            />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white border-b-2 border-indigo-600 pb-3">
              School Sign In
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Please sign in to your account
            </p>
          </div>

          <form className="space-y-6" onSubmit={Submitsignin}>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="name@company.com"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="••••••••"
                required
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg text-sm px-5 py-2.5 focus:ring-4 focus:outline-none focus:ring-indigo-300 transition-colors"
              >
                Sign In
              </button>
            </div>
            
          </form>
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

      {/* Toast notifications */}
      <ToastContainer />
    </>
  );
};

export default SchoolSignin;
