"use client";
import { currentUser, logoutUser } from "@/redux/actions/userAction";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Nav from "./components/Nav";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { user, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (!user) {
      dispatch(currentUser());
    }
  }, [user, dispatch]);

  const redirectToAddSchool = () => {
    if (!user) {
      router.push("./signin");
    }
    router.push("/Addschool");
  };

  const redirectToSchools = () => {
    if (!user) {
      router.push("./signin");
    }
    router.push("/SchoolList");
  };

  const redirectToAdddata = () => {
    if (!user) {
      router.push("./signin");
    }
    router.push("/Adddata");
  };

  const redirectToExcel = () => {
    if (user) {
      router.push("./signin");
    }
    router.push("/Addexcel");
  };

  const redirectToViewData = () => {
    if (user) {
      router.push("./signin");
    }
    router.push("/Viewdata");
  };

  const LogoutUser = () => {
    dispatch(logoutUser());
  };
  return (
    <>
      <Nav />
      {/* <section className="text-gray-700 body-font">
        <div className="container mx-auto flex px-5 py-10 sm:py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 mt-10 sm:mt-0 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900 mt-10 sm:mt-0">
              Empowering Education,
              <br className="hidden lg:inline-block" />
              One ID at a Time.
            </h1>
            <p className="mb-8 leading-relaxed">
              Welcome to our school ID card printing website. Easily create customized ID cards for students, faculty, and staff. Enhance security and foster belonging with our hassle-free solution. Join us in empowering education, one ID at a time.
            </p>
            <div className="flex justify-center">
              <Link href={"/SchoolSignin"} className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                School Sign in
              </Link>
              <Link href={"/Signin"} className="ml-4 inline-flex text-gray-700 bg-gray-200 border-0 py-2 px-6 focus:outline-none hover:bg-gray-300 rounded text-lg">
                Sign in
              </Link>
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <Image
              className="object-cover object-center rounded"
              alt="hero"
              src="/mainbf.avif"
              height={500}
              width={500}
            />
          </div>
        </div>
      </section>
      {user &&
        <section className="text-gray-700 body-font border-t border-gray-200">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
                All Features
              </h1>
            </div>
            <div className="flex flex-wrap -m-4">
              {user?.role != "school" &&
                <div className="xl:w-1/3 md:w-1/2 p-4" onClick={redirectToAddSchool}>
                  <div className="border border-gray-300 p-6 rounded-lg"  >
                    <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                      <Image height={50}
                        width={50} src="/Add School.PNG" alt="" />
                    </div>
                    <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                      Add School
                    </h2>
                    <p className="leading-relaxed text-base cursor-pointer">
                      Fingerstache flexitarian street art 8-bit waist co, subway tile
                      poke farm.
                    </p>
                  </div>
                </div>
              }
              {user?.role != "school" &&
                <div className="xl:w-1/3 md:w-1/2 p-4">
                  <div className="border border-gray-300 p-6 rounded-lg" onClick={redirectToSchools}>
                    <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                      >
                        <circle cx={6} cy={6} r={3} />
                        <circle cx={6} cy={18} r={3} />
                        <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12" />
                      </svg>
                    </div>
                    <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                      Schools
                    </h2>
                    <p className="leading-relaxed text-base cursor-pointer">
                      Fingerstache flexitarian street art 8-bit waist co, subway tile
                      poke farm.
                    </p>
                  </div>
                </div>
              }
              {user?.role != "school" &&
                <div className="xl:w-1/3 md:w-1/2 p-4">
                  <div className="border border-gray-300 p-6 rounded-lg" onClick={redirectToExcel}>
                    <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                        <circle cx={12} cy={7} r={4} />
                      </svg>
                    </div>
                    <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                      Import Data
                    </h2>
                    <p className="leading-relaxed text-base cursor-pointer">
                      Fingerstache flexitarian street art 8-bit waist co, subway tile
                      poke farm.
                    </p>
                  </div>
                </div>
              }

              <div className="xl:w-1/3 md:w-1/2 p-4">
                <div className="border border-gray-300 p-6 rounded-lg" onClick={redirectToAdddata}>
                  <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-6 h-6"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                      <circle cx={12} cy={7} r={4} />
                    </svg>
                  </div>
                  <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                    Add Data
                  </h2>
                  <p className="leading-relaxed text-base cursor-pointer">
                    Fingerstache flexitarian street art 8-bit waist co, subway tile
                    poke farm.
                  </p>
                </div>
              </div>
              <div className="xl:w-1/3 md:w-1/2 p-4">
                <div className="border border-gray-300 p-6 rounded-lg" onClick={redirectToViewData}>
                  <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-6 h-6"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                    </svg>
                  </div>
                  <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                    View Data
                  </h2>
                  <p className="leading-relaxed text-base cursor-pointer">
                    Fingerstache flexitarian street art 8-bit waist co, subway tile
                    poke farm.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>
      }
      <section className="text-gray-700 body-font border-t border-gray-200">
        <div className="container px-5 py-24 mx-auto">
          <div className="xl:w-1/2 lg:w-3/4 w-full mx-auto text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="inline-block w-8 h-8 text-gray-400 mb-8"
              viewBox="0 0 975.036 975.036"
            >
              <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z" />
            </svg>
            <p className="leading-relaxed text-lg">
              Welcome to Card Pro, your go-to destination for school ID card printing. Here, we seamlessly blend efficiency with security to meet the needs of educational institutions. Our platform provides a hassle-free solution for schools to craft personalized ID cards for students, faculty, and staff. With user-friendly templates and customization options, schools can swiftly generate professional ID cards tailored to their specifications. From bolstering campus security to nurturing a sense of belonging, Card Pro is committed to aiding the educational community in creating safer and more organized environments. Join us in our mission to empower education, one ID at a time..
            </p>
            <span className="inline-block h-1 w-10 rounded bg-indigo-500 mt-8 mb-6" />
            <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm">
              CARD PRO
            </h2>
            <p className="text-gray-500">ID CARD DATA PORTAL</p>
          </div>
        </div>
      </section> */}

      <div className="relative min-h-screen min-w-full overflow-hidden">
        <Image
          src="/bg.jpg"
          alt="Background"
          layout="fill"
          // objectFit="cover"
          quality={100}
          className="z-0 mt-[60px]"
        />
        <div className="relative z-10 flex  min-h-screen w-[80vw] pt-[60px] mx-auto">
          {!user && (
            <div className=" items-center justify-center flex w-full">
              <div className=" text-white p-4 flex min-w-[100%] flex-wrap flex-row    ">
                {/* Name */}
                <div className=" lg:w-[55%] md:w-[55%] w-full  mx-auto min-h-full lg:ml-[100px] md:ml-[100px]   flex-1 items-center justify-center mt-[13%]">
                  <h3 className="text-6xl font-bold my-1">
                    Card<span className=" text-yellow-400">Pro</span>
                  </h3>
                  <p className="text-2xl text-yellow-400 font-semibold">
                    Id Card Data Portal
                  </p>
                </div>
                {/* Content */}
                <div className=" lg:w-[40%] md:w-[40%] w-full font-normal mr-10 flex-1">
                  <ul>
                    <li className=" border-b border-white py-5 border-t text-xl">
                      <Link
                        href={"/"}
                        className="font-semibold  hover:text-white rounded-lg py-1.5 px-3 cursor-pointer"
                      >
                        Home
                      </Link>
                    </li>
                    <li className=" border-b border-white py-5 border-t text-xl">
                      <Link
                        href={"/Signin"}
                        className="font-semibold  hover:text-white rounded-lg py-1.5 px-3 cursor-pointer"
                      >
                        Distributor Login
                      </Link>
                    </li>

                    <li className=" border-b border-white py-5 border-t text-xl">
                      <Link
                        href={"/SchoolSignin"}
                        className="font-semibold  hover:text-white rounded-lg py-1.5 px-3 cursor-pointer"
                      >
                        School Login
                      </Link>
                    </li>

                    <li className=" border-b border-white py-5 border-t text-xl">
                      <Link
                        href={"/Signin"}
                        className="font-semibold  hover:text-white rounded-lg py-1.5 px-3 cursor-pointer"
                      >
                        About Us
                      </Link>
                    </li>
                    <li className=" border-b border-white py-5 border-t text-xl">
                      <Link
                        href={"/"}
                        className="font-semibold  hover:text-white rounded-lg py-1.5 px-3 cursor-pointer"
                      >
                        Contact Us
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {user && (
            <div className=" text-white flex items-center   min-w-full flex-col  justify-center mt-[150px] lg:-mt-[60px] md:-mt-[60px] ">
              {/* Name */}
              <div className=" mb-[20px] lg:hidden md:hidden">
              <h3 className="lg:text-[16px] text-[10px] font-bold ">
                    Card<span className=" text-yellow-400">Pro</span>
                  </h3>
                  <p className="text-[15px] text-yellow-400 font-semibold">
                    Id Card Data Portal
                  </p>
              </div>

              <div className=" flex justify-between w-full lg:px-5   ">
                <div className="mobile">
                  <h3 className="lg:text-[16px] text-[10px] font-bold ">
                    Card<span className=" text-yellow-400">Pro</span>
                  </h3>
                  <p className="text-[15px] text-yellow-400 font-semibold">
                    Id Card Data Portal
                  </p>
                </div>

                <div className=" flex items-center gap-1    text-[14px]" >
                  <p className="text-yellow-400">
                    {user?.role !== "school" ? "Distributor " : "School "}
                  </p>
                  {" :- "}

                  {user?.name ? user.name : user?.school?.name}
              
                </div>

                <div>
                  <Link
                    href={"/"}
                    className="font-semibold text-yellow-400  hover:text-white rounded-lg py-1.5 px-3 cursor-pointer"
                  >
                    Home 
                  </Link>
                </div>
              </div>

              {/* Links */}

              <div className=" my-[50px] w-full lg:px-10">
                <div className=" grid lg:grid-cols-3 w-full  place-content-between  gap-20">
                 {
                  user?.role != "school" && <div>
                    <Link
                      href={"/Addschool"}
                      className="text-2xl font-semibold  hover:text-white rounded-full min-w-full py-1.5 px-6 cursor-pointer bg-gray-900 bg-opacity-90"
                    >
                      Add School
                    </Link>
                  </div>
                 } 
                 {
                  user?.role != "school" && 
                  <div>
                    <Link
                      href={"/SchoolList"}
                      className="text-2xl font-semibold  hover:text-white rounded-full py-1.5 px-6 cursor-pointer bg-gray-900 bg-opacity-90"
                    >
                       School List
                    </Link>
                  </div>
                 }
            

                  {
                     user?.role != "school" && 
                     <div>
                    <Link
                      href={"/Addexcel"}
                      className="text-2xl font-semibold  hover:text-white rounded-full py-1.5 px-6 cursor-pointer bg-gray-900 bg-opacity-90"
                    >
                       Import Data
                    </Link>
                  </div>
                  }
               
                  <div>
                    <Link
                      href={"/Adddata"}
                      className="text-2xl font-semibold  hover:text-white rounded-full py-1.5 px-6 cursor-pointer bg-gray-900 bg-opacity-90"
                    >
                      Add Data Manually
                    </Link>
                  </div>
                  <div>
                    <Link
                      href={"/Viewdata"}
                      className="text-2xl font-semibold  hover:text-white rounded-full py-1.5 px-6 cursor-pointer bg-gray-900 bg-opacity-90"
                    >
                      View Data 
                    </Link>
                  </div>
                  <div>
                    <Link
                      href={"/"}
                      onClick={LogoutUser}
                      className="text-2xl font-semibold  hover:text-white rounded-full py-1.5 px-6 cursor-pointer bg-gray-900 bg-opacity-90 text-yellow-400"
                    >
                     Logout
                    </Link>
                  </div>



                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
