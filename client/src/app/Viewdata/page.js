"use client";
import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import { useSelector } from "react-redux";
import axios from "../../../axiosconfig";
import JSZip from "jszip";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";
import Swal from "sweetalert2";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import {
  FaFileExport,
  FaImages,
  FaCheck,
  FaArrowLeft,
  FaUserCheck,
  FaUserTimes,
} from "react-icons/fa";

const Viewdata = () => {
  const { user, schools, error } = useSelector((state) => state.user);
  const [currSchool, setCurrSchool] = useState("");
  const [currRole, setCurrRole] = useState("");
  const [status, setstatus] = useState("");
  const [submitted, setsubmited] = useState(false);
  const [students, setstudents] = useState(null);
  const [staffs, setstaffs] = useState(null);
  const [showChatBox, setShowChatBox] = useState(false);
  const [studentIds, setStudentIds] = useState([]);
  const [staffIds, setStaffIds] = useState([]);
  const [showFilterBox, setShowFilterBox] = useState(false);
  const [loginSchool, setloginSchool] = useState(false);
  const [classValue, setClassValue] = useState("");
  const [sectionValue, setSectionValue] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setError] = useState("");

  const [studentData, setStudentData] = useState([]);
  const [staffData, setStaffData] = useState([]);

  useEffect(() => {
    console.log(user);
    if (!user) {
      redirect("/");
    }
    if (user?.role == "school") {
      console.log(user?.school);
      setCurrSchool(user?.school?._id);
      setloginSchool(true);
    }
  }, [user]);

  // Function to handle selection of a student
  const handleStudentSelect = (studentId) => {
    // Check if the studentId is already in the array
    if (studentIds.includes(studentId)) {
      // If yes, remove it from the array
      setStudentIds(studentIds.filter((id) => id !== studentId));
    } else {
      // If not, add it to the array
      console.log(studentIds);
      setStudentIds([...studentIds, studentId]);
    }
  };

  const handleStaffSelect = (staffId) => {
    // Check if the studentId is already in the array
    if (staffIds.includes(staffId)) {
      // If yes, remove it from the array
      setStaffIds(staffIds.filter((id) => id !== staffId));
    } else {
      // If not, add it to the array
      setStaffIds([...staffIds, staffId]);
    }
  };

  const config = () => {
    return {
      headers: {
        authorization: localStorage.getItem("token") || "", // Ensure token is always a string
      },
      withCredentials: true,
    };
  };

  const modeToPending = async (e) => {
    e.preventDefault();
    if (currRole == "student") {
      const response = await axios.post(
        `/user/student/change-status/pending/${currSchool}?`,
        { studentIds },
        config()
      );
      fatchStudent(e);
    }
    if (currRole == "staff") {
      const response = await axios.post(
        `/user/staff/change-status/pending/${currSchool}?`,
        { staffIds },
        config()
      );
      fatchStaff(e);
    }
  };

  const modeToReadytoprint = async (e) => {
    e.preventDefault();
    if (currRole == "student") {
      const response = await axios.post(
        `/user/student/change-status/readyto/${currSchool}?`,
        { studentIds },
        config()
      );
      fatchStudent(e);
    }
    if (currRole == "staff") {
      const response = await axios.post(
        `/user/staff/change-status/readyto/${currSchool}?`,
        { staffIds },
        config()
      );
      fatchStaff(e);
    }
  };

  const modeToPrinted = async (e) => {
    e.preventDefault();
    if (currRole == "student") {
      const response = await axios.post(
        `/user/student/change-status/printed/${currSchool}?`,
        { studentIds },
        config()
      );
      fatchStudent(e);
    }
    if (currRole == "staff") {
      const response = await axios.post(
        `/user/staff/change-status/printed/${currSchool}?`,
        { staffIds },
        config()
      );
      fatchStaff(e);
    }
  };

  const searchUsers = async () => {
    const response = await axios.post(`/admin/users`, null, config());
    setUsers(response?.data?.users);
    console.log(response?.data?.users);
  };

  useEffect(() => {
    if (currRole && currSchool && status) {
      handleFormSubmit(false);
    }
  }, [currRole, currSchool, status]);

  const handleRoleSelect = (e) => {
    setCurrRole(e.target.value);
    console.log("Selected Role:", e.target.value);
  };

  const handleStatusSelect = (e) => {
    setstatus(e.target.value);
    console.log("Selected Status:", e.target.value);
  };

  const handleSchoolSelect = (e) => {
    setCurrSchool(e.target.value);
    console.log("Selected School:", e.target.value);
  };

  // Function to toggle chat box visibility
  const toggleChatBox = () => {
    setShowChatBox(!showChatBox);
  };

  const fatchStudent = async (e) => {
    if (e) e.preventDefault();
    const response = await axios.post(
      `/user/students/${currSchool}?status=${status}`,
      null,
      config()
    );
    setstudents(response?.data?.students);
    console.log(response?.data?.students);
    setStudentData(response?.data?.students);
    if (response?.data?.students?.length < 0) {
      toast.error("No Students Added", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const fatchStaff = async (e) => {
    if (e) e.preventDefault();
    const response = await axios.post(
      `/user/staffs/${currSchool}?status=${status}`,
      null,
      config()
    );
    setstaffs(response?.data?.staff);
    setStaffData(response?.data?.staff);
    console.log(response?.data?.staff);
  };

  const handleFormSubmit = async (e) => {
    if (e) e.preventDefault();

    setLoading(true); // Start the loading spinner
    resetState(); // Reset state for students and staff

    try {
      // Determine endpoint and error messages dynamically based on role
      const isStudent = currRole === "student";
      const endpoint = isStudent
        ? `/user/students/${currSchool}?status=${status}`
        : `/user/staffs/${currSchool}?status=${status}`;
      const noDataMessage = isStudent
        ? "No students found for the provided school ID"
        : "No staff found for the provided school ID";
      const toastMessage = isStudent
        ? "No Students Added In This School"
        : "No Staff Member Added In This School";

      // Make the API request
      const response = await axios.post(endpoint, null, config());

      // Handle "No data found" scenario
      if (response?.data?.message === noDataMessage) {
        toast.error(toastMessage, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setError(noDataMessage);
        resetState(); // Reset state again for safety
        return;
      }

      // Update state based on role
      if (isStudent) {
        setstudents(response?.data?.students || []);
        setStudentData(response?.data?.students || []);
      } else {
        setstaffs(response?.data?.staff || []);
        setStaffData(response?.data?.staff || []);
      }
      setsubmited(true); // Mark form as submitted
    } catch (error) {
      console.error("Error during API request:", error);
      toast.error("An error occurred while processing your request.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      resetState(); // Reset state on error
    } finally {
      setLoading(false); // End the loading spinner
    }
  };

  // Helper function to reset state
  const resetState = () => {
    setstudents([]);
    setStudentData([]);
    setstaffs([]);
    setStaffData([]);
  };

  const downloadExcel = async () => {
    try {
      if (currRole == "student") {
        try {
          const response = await axios.get(
            `/user/excel/data/${currSchool}?status=${status}`,
            {
              headers: {
                authorization: `${localStorage.getItem("token")}`,
              },
              responseType: "blob", // Set response type to blob for file download
            }
          );

          const url =
            window.URL.createObjectURL(new Blob([response.data])) || null;
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "Student_Data.xlsx");
          document.body.appendChild(link);
          link.click();
        } catch (error) {
          toast.error("Error downloading Excel file:", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }
      if (currRole == "staff") {
        try {
          const response = await axios.get(
            `/user/staff/excel/data/${currSchool}?status=${status}`,
            {
              headers: {
                authorization: `${localStorage.getItem("token")}`,
              },
              responseType: "blob", // Set response type to blob for file download
            }
          );

          const url =
            window.URL.createObjectURL(new Blob([response.data])) || null;
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "Student_Data.xlsx");
          document.body.appendChild(link);
          link.click();
        } catch (error) {
          toast.error("Error downloading Excel file:", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }
    } catch (error) {
      console.error("Error downloading Excel file:", error);
    }
  };

  // const downloadStudentAvatars = async () => {
  //   try {
  //     console.log("downlod image");
  //     // Make a POST request to the backend route that fetches student avatars
  //     const response = await axios.post(
  //       `/user/student/images/${currSchool}`,
  //       { status },
  //       config()
  //     );
  //     const { studentImages } = response.data;
  //     const zip = new JSZip();

  //     // Iterate over each image URL
  //     studentImages.forEach((imageUrl, index) => {
  //       // Fetch each image
  //       fetch(imageUrl)
  //         .then((response) => response.blob())
  //         .then((blob) => {
  //           // Add each image to the zip file
  //           zip.file(`image_${index}.jpg`, blob);
  //         });
  //     });

  //     // Generate the zip file asynchronously
  //     zip.generateAsync({ type: "blob" }).then((blob) => {
  //       // Trigger the download of the zip file
  //       const link = document.createElement("a");
  //       link.href = URL.createObjectURL(blob);
  //       link.download = "student_images.zip";
  //       link.click();
  //     });
  //   } catch (error) {
  //     console.error("Error downloading student avatars:", error);
  //     // Handle error
  //   }
  // };

  const downloadImages = async () => {
    try {
      // Show SweetAlert2 loading popup
      const swalInstance = Swal.fire({
        title: "Downloading...",
        text: "Please wait while the avatars are being downloaded.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading(); // Show loading spinner
        },
      });

      let response;

      if (currRole == "student") {
        response = await axios.post(
          `/user/student/images/${currSchool}`,
          { status },
          {
            ...config(),
            responseType: "blob", // Ensure response is a blob
          }
        );
      }
      if (currRole == "staff") {
        response = await axios.post(
          `/user/staff/images/${currSchool}`,
          { status },
          {
            ...config(),
            responseType: "blob", // Ensure response is a blob
          }
        );
      }

      // Extract filename from response headers
      const contentDisposition = response.headers["content-disposition"];
      const filenameMatch = contentDisposition?.match(/filename="(.+)"/);
      const filename = filenameMatch ? filenameMatch[1] : "avatars.zip";

      // Create and trigger download of the ZIP file
      const blob = new Blob([response.data], { type: "application/zip" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();

      // Close the SweetAlert2 loading popup after successful download
      Swal.fire({
        icon: "success",
        title: "Download Complete",
        text: `The avatars have been successfully downloaded as ${filename}`,
      });
    } catch (error) {
      // Handle error and show SweetAlert2 error popup
      console.error("Error downloading avatars:", error);
      Swal.fire({
        icon: "error",
        title: "Download Failed",
        text: "An error occurred while downloading the avatars.",
      });
    }
  };

  const downloadImage = async (imageUrl) => {
    try {
      // const response = await axios.get(imageUrl, {
      //   responseType: "blob",
      // });

      // const blob = new Blob([response?.data], {
      //   type: response.headers["content-type"],
      // });
      const url = window.URL.createObjectURL(new Blob([imageUrl])) || null;
      const a = document.createElement("a");
      a.href = url;
      a.download = imageUrl.split("/").pop();
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    }
  };

  const redirectToStudentEdit = (id) => {
    router.push(`/Viewdata/edit/${id}`);
  };
  const deleteStudent = async (id) => {
    // Show loading Swal
    Swal.fire({
      title: "Deleting...",
      text: "Please wait while the student is being deleted.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      // Perform the delete request
      const response = await axios.post(
        `/user/delete/student/${id}?`,
        {},
        config()
      );

      // Handle success
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "The student was successfully deleted.",
          confirmButtonText: "OK",
        });
      }

      const response2 = await axios.post(
        `/user/students/${currSchool}?status=${status}`,
        null,
        config()
      );
      setstudents(response2?.data?.students);
      console.log(response2?.data?.students);
      setStudentData(response2?.data?.students);
    } catch (error) {
      // Handle error
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to delete the student. Please try again later.",
        confirmButtonText: "OK",
      });
    }
  };
  const deleteStaff = async (id) => {
    // Show loading Swal
    Swal.fire({
      title: "Deleting...",
      text: "Please wait while the student is being deleted.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      // Perform the delete request
      const response = await axios.post(
        `/user/delete/staff/${id}?`,
        {},
        config()
      );

      // Handle success
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "The Staff was successfully deleted.",
          confirmButtonText: "OK",
        });
      }

      const response2 = await axios.post(
        `/user/staffs/${currSchool}?status=${status}`,
        null,
        config()
      );
      setstaffs(response2?.data?.staff);
      setStaffData(response2?.data?.staff);
    } catch (error) {
      // Handle error
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to delete the student. Please try again later.",
        confirmButtonText: "OK",
      });
    }
  };

  const redirectToStaffEdit = (id) => {
    router.push(`/Viewdata/staffedit/${id}`);
  };

  const [filterActive, setFilterActive] = useState(false);
  const filterStudent = (e) => {
    e.preventDefault();

    if (filterActive) {
      setstudents(studentData);
      setFilterActive(false);
      return;
    }
    const filtered = studentData.filter(
      (student) =>
        student?.class.replace(/\./g, "").toLowerCase() ===
          classValue.toLowerCase() &&
        student?.section.replace(/\./g, "").toLowerCase() ===
          sectionValue.toLowerCase()
    );
    setFilterActive(true);
    setstudents(filtered);
  };

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query, currentRole) => {
    setSearchQuery(query);
  
    let filtered = [];
  
    if (currRole === "student") {
      filtered = studentData.filter((student) => {
        return (
          student.name.toLowerCase().includes(query.toLowerCase()) ||
          (student.fatherName &&
            student.fatherName.toLowerCase().includes(query.toLowerCase())) ||
          (student.email &&
            student.email.toLowerCase().includes(query.toLowerCase())) ||
          (student.rollNo &&
            student.rollNo.toLowerCase().includes(query.toLowerCase())) ||
          (student.class &&
            student.class.toLowerCase().includes(query.toLowerCase())) ||
          (student.admissionNo &&
            student.admissionNo.toLowerCase().includes(query.toLowerCase())) ||
          (student.contact &&
            student.contact.toLowerCase().includes(query.toLowerCase())) ||
          (student.section &&
            student.section.toLowerCase().includes(query.toLowerCase())) ||
          (student.session &&
            student.session.toLowerCase().includes(query.toLowerCase()))
        );
      });
    } else if (currRole === "staff") {
      filtered = staffData.filter((staff) => {
        return (
          staff.name.toLowerCase().includes(query.toLowerCase()) ||
          (staff.fatherName &&
            staff.fatherName.toLowerCase().includes(query.toLowerCase())) ||
          (staff.husbandName &&
            staff.husbandName.toLowerCase().includes(query.toLowerCase())) ||
          (staff.email &&
            staff.email.toLowerCase().includes(query.toLowerCase())) ||
          (staff.contact &&
            staff.contact.toLowerCase().includes(query.toLowerCase())) ||
          (staff.qualification &&
            staff.qualification.toLowerCase().includes(query.toLowerCase())) ||
          (staff.designation &&
            staff.designation.toLowerCase().includes(query.toLowerCase())) ||
          (staff.staffType &&
            staff.staffType.toLowerCase().includes(query.toLowerCase())) ||
          (staff.doj &&
            staff.doj.toLowerCase().includes(query.toLowerCase())) ||
          (staff.staffID &&
            staff.staffID.toLowerCase().includes(query.toLowerCase())) ||
          (staff.uid &&
            staff.uid.toLowerCase().includes(query.toLowerCase())) ||
          (staff.schoolName &&
            staff.schoolName.toLowerCase().includes(query.toLowerCase())) ||
          (staff.bloodGroup &&
            staff.bloodGroup.toLowerCase().includes(query.toLowerCase())) ||
          (staff.panCardNo &&
            staff.panCardNo.toLowerCase().includes(query.toLowerCase()))
        );
      });
    }
  
    // Set the filtered data based on role
    if (currRole === "student") {
      setstudents(filtered);
    } else if (currRole === "staff") {
      setstaffs(filtered);
    }
  };
  

  const [isAllSelected, setIsAllSelected] = useState(false); // State to track selection

  const selectAllStudents = () => {
    if (isAllSelected) {
      // Clear all selections
      setStudentIds([]);
      setStaffIds([]);
    } else {
      // Select all based on current role
      if (currRole === "student") {
        const allStudentIds = students.map((student) => student._id);
        setStudentIds(allStudentIds);
      }

      if (currRole === "staff") {
        const allStaffIds = staffs.map((staff) => staff._id);
        setStaffIds(allStaffIds);
      }
    }
    setIsAllSelected(!isAllSelected); // Toggle the state
  };

  const deletHandler = async () => {
    if (currRole == "student") {
      // Check if the studentIds array is empty
      if (studentIds.length === 0) {
        Swal.fire("No students selected!", "", "warning");
        return;
      }

      // Show loading alert
      Swal.fire({
        title: "Deleting...",
        text: "Please wait while we process your request.",
        icon: "info",
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      try {
        const response = await axios.post(
          `/user/students/delete/${currSchool}?`,
          { studentIds },
          config()
        );
        fatchStudent();
        // Show success alert after successful deletion
        Swal.fire("Success!", "Students deleted successfully.", "success");
      } catch (error) {
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    }

    if (currRole == "staff") {
      // Check if the staffIds array is empty
      if (staffIds.length === 0) {
        Swal.fire("No staff selected!", "", "warning");
        return;
      }

      // Show loading alert
      Swal.fire({
        title: "Deleting...",
        text: "Please wait while we process your request.",
        icon: "info",
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      try {
        const response = await axios.post(
          `/user/staffs/delete/${currSchool}?`,
          { staffIds },
          config()
        );
        fatchStaff();
        // Show success alert after successful deletion
        Swal.fire("Success!", "Staff deleted successfully.", "success");
      } catch (error) {
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    }
  };

  useEffect(() => {
    const savedSchool = localStorage.getItem("currSchool");
    const savedRole = localStorage.getItem("currRole");
    const savedStatus = localStorage.getItem("status");

    if (savedSchool) setCurrSchool(savedSchool);
    if (savedRole) setCurrRole(savedRole);
    if (savedStatus) setstatus(savedStatus);
  }, []);

  // Update localStorage whenever values change
  useEffect(() => {
    if (currSchool) localStorage.setItem("currSchool", currSchool);
    if (currRole) localStorage.setItem("currRole", currRole);
    if (status) localStorage.setItem("status", status);
  }, [currSchool, currRole, status]);
  return (
    <div>
      <Nav />

      <section className="bg-white dark:bg-gray-900 py-10 ">
        {!submitted && (
          <div className="container flex flex-col items-center justify-center px-6 mx-auto">
            <div className="flex items-center justify-center mt-6">
              <a
                href="#"
                className="pb-4 font-medium text-center text-2xl text-gray-800 capitalize border-b-2 border-blue-500 dark:border-blue-400 dark:text-white"
              >
                View Data
              </a>
            </div>
          </div>
        )}

        <div className="container flex flex-col items-center mt-6 justify-center px-6 mx-auto">
          {user && (
            <form
              className="mt-6 w-full flex justify-between flex-wrap"
              onSubmit={handleFormSubmit}
            >
              {/* School Dropdown */}
              {!loginSchool && (
                <div className="mb-4">
                  <select
                    id="school"
                    onChange={handleSchoolSelect}
                    value={currSchool}
                    className="mt-1 h-10 px-3 border block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="">Select School</option>
                    {schools?.map((school) => (
                      <option key={school._id} value={school._id}>
                        {school.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Role Selection Buttons */}
              <div className="mb-4 flex space-x-4">
                <button
                  type="button"
                  onClick={() => setCurrRole("student")}
                  className={`px-4 py-1 rounded-md font-medium ${
                    currRole === "student"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  Student
                </button>
                <button
                  type="button"
                  onClick={() => setCurrRole("staff")}
                  className={`px-4 py-1 rounded-md font-medium ${
                    currRole === "staff"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  Staff
                </button>
              </div>

              {/* Status Selection Buttons */}
              <div className="mb-4 flex space-x-4">
                <button
                  type="button"
                  onClick={() => setstatus("Panding")}
                  className={`px-3 py-1 rounded-md font-medium ${
                    status === "Panding"
                      ? "bg-green-600 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  Pending
                </button>
                <button
                  type="button"
                  onClick={() => setstatus("Ready to print")}
                  className={`px-3 py-1 rounded-md font-medium ${
                    status === "Ready to print"
                      ? "bg-green-600 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  Ready to Print
                </button>
                <button
                  type="button"
                  onClick={() => setstatus("Printed")}
                  className={`px-2 py-1 rounded-md font-medium ${
                    status === "Printed"
                      ? "bg-green-600 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  Printed
                </button>
              </div>
            </form>
          )}

          {!loginSchool && schools?.length === 0 && (
            <h4 className="text-center text-2xl py-2 px-5 text-red-500">
              Please add a School
            </h4>
          )}
        </div>

        {loading && (
          <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="spinner"></div>
          </div>
        )}

        {!submitted && (
          <div className="flex justify-center items-center  bg-gray-50">
            <div className="bg-yellow-100 text-yellow-700 p-8 rounded-lg border-l-8 border-yellow-600 shadow-xl mx-auto max-w-md">
              <p className="font-semibold text-lg text-center leading-relaxed">
                Please select a School Role and Status.
              </p>
            </div>
          </div>
        )}
        {submitted && currRole == "student" && students?.length === 0 && (
          <div className="text-red-600 font-semibold text-center mt-4 p-4 bg-red-100 border-l-4 border-red-500 shadow-md rounded-lg">
            {errorMsg}
          </div>
        )}
        {submitted && currRole == "staff" && staffs?.length === 0 && (
          <div className="text-red-600 font-semibold text-center mt-4 p-4 bg-red-100 border-l-4 border-red-500 shadow-md rounded-lg">
            {errorMsg}
          </div>
        )}

        {submitted &&(
          <div className="container mx-auto px-16 ">
            <h1 className="text-center text-2xl pb-10 font-semibold text-gray-800">
             {currRole == "student" ? "Students" :"Staff"} 
            </h1>
            <div className="flex items-center max-w-md mx-auto bg-gray-100 rounded-lg shadow-md overflow-hidden">
              <span className="flex items-center justify-center px-4 text-gray-500">
                <FaSearch />
              </span>
              <input
                type="text"
                placeholder={currRole == "student" ? "Search students..." :"Search Staff"}
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        )}

        {submitted && students?.length > 0 && (
          <div className="container mx-auto px-16 ">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {students?.map((student) => (
                <div
                  key={student?._id}
                  className={`shadow-md p-4 rounded-md border w-full bg-indigo-50 ${
                    studentIds.includes(student._id)
                      ? "border-blue-500"
                      : "border-indigo-50"
                  }`}
                  onClick={() => handleStudentSelect(student._id)}
                >
                  <div className="flex justify-center mb-2">
                    {/* Display student avatar */}
                    {/* <Image
                    height={80}
                    width={80}
                    src={student?.avatar?.url}
                    alt={student?.name}
                    className="w-20 h-20 rounded-full"
                    ></Image> */}
                    <Image
                      height={50}
                      width={50}
                      src={student?.avatar?.url}
                      alt={student?.name}
                      className="w-20 h-20 "
                    />
                    {/* <Image
                      
                    /> */}
                  </div>
                  {/* Render student card resembling ID card */}
                  <h2 className="text-lg font-medium text-gray-700 text-center py-2">
                    {student?.name}
                  </h2>
                  {student?.fatherName && (
                    <h6 className="text-gray-700">
                      Fathers Name: {student?.fatherName}
                    </h6>
                  )}
                  {student?.motherName && (
                    <p className="text-gray-700">
                      Mothers Name: {student?.motherName}
                    </p>
                  )}
                  {student?.dob && (
                    <p className="text-gray-700">
                      Date of Birth: {student?.dob}
                    </p>
                  )}
                  {student?.contact && (
                    <p className="text-gray-700">Contact: {student?.contact}</p>
                  )}
                  {student?.email && (
                    <p className="text-gray-700">Email: {student?.email}</p>
                  )}
                  {student?.address && (
                    <p className="text-gray-700">Address: {student?.address}</p>
                  )}
                  {student?.rollNo && (
                    <p className="text-gray-700">Roll No.: {student?.rollNo}</p>
                  )}
                  {student?.class && (
                    <p className="text-gray-700">Class: {student?.class}</p>
                  )}
                  {student?.section && (
                    <p className="text-gray-700">Section: {student?.section}</p>
                  )}
                  {student?.session && (
                    <p className="text-gray-700">Session: {student?.session}</p>
                  )}
                  {student?.admissionNo && (
                    <p className="text-gray-700">
                      Admission No.: {student?.admissionNo}
                    </p>
                  )}
                  {student?.busNo && (
                    <p className="text-gray-700">Bus No.: {student?.busNo}</p>
                  )}
                  {student?.bloodGroup && (
                    <p className="text-gray-700">
                      Blood Group: {student?.bloodGroup}
                    </p>
                  )}
                  {student?.studentID && (
                    <p className="text-gray-700">
                      Student ID: {student?.studentID}
                    </p>
                  )}
                  {student?.aadharNo && (
                    <p className="text-gray-700">
                      Aadhar No.: {student?.aadharNo}
                    </p>
                  )}
                  {student?.ribbionColour && (
                    <p className="text-gray-700">
                      Ribbon Colour: {student?.ribbionColour}
                    </p>
                  )}
                  {student?.routeNo && (
                    <p className="text-gray-700">
                      Route No.: {student?.routeNo}
                    </p>
                  )}
                  {student?.photoNameUnuiq && (
                    <p className="text-gray-700">
                      Photo Unique No.: {student?.photoNameUnuiq}
                    </p>
                  )}

                  {student?.houseName && (
                    <p className="text-gray-700">
                      House Name: {student?.houseName}
                    </p>
                  )}
                  {student?.validUpTo && (
                    <p className="text-gray-700">
                      Valid Up To: {student?.validUpTo}
                    </p>
                  )}
                  {student?.course && (
                    <p className="text-gray-700">Course: {student?.course}</p>
                  )}
                  {student?.batch && (
                    <p className="text-gray-700">Batch: {student?.batch}</p>
                  )}
                  {student?.idNo && (
                    <p className="text-gray-700">ID No.: {student?.idNo}</p>
                  )}
                  {student?.regNo && (
                    <p className="text-gray-700">Reg. No.: {student?.regNo}</p>
                  )}
                  {student?.extraField1 && (
                    <p className="text-gray-700">
                      Extra Field-1: {student?.extraField1}
                    </p>
                  )}
                  {student?.extraField2 && (
                    <p className="text-gray-700">
                      Extra Field-2: {student?.extraField2}
                    </p>
                  )}

                  <div className="w-full flex justify-center items-center mt-2">
                    {status === "Panding" && (
                      <>
                        {/* Edit Button */}
                        <button
                          onClick={() => redirectToStudentEdit(student._id)}
                          className="flex items-center px-5 py-1 bg-indigo-600 text-white m-2 rounded-md hover:bg-indigo-700"
                        >
                          <FaEdit className="mr-2" />
                          Edit
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => deleteStudent(student._id)}
                          className="flex items-center px-5 py-1 bg-red-600 text-white m-2 rounded-md hover:bg-red-700"
                        >
                          <FaTrashAlt className="mr-2" />
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {submitted && staffs?.length > 0 && (
          <div className="container mx-auto">
        
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {staffs?.map((staff) => (
                <div
                  key={staff?._id}
                  className={`shadow-md p-4 rounded-md border w-full bg-indigo-50 ${
                    staffIds.includes(staff._id)
                      ? "border-blue-500"
                      : "border-indigo-50"
                  }`}
                  onClick={() => handleStaffSelect(staff._id)}
                  // onClick={() => console.log("hello")}
                >
                  <div className="flex justify-center mb-2">
                    <Image
                      height={50}
                      width={50}
                      src={staff?.avatar?.url}
                      alt={staff?.name}
                      className="w-20 h-20"
                    />
                  </div>
                  <h2 className="text-lg font-medium text-gray-700 text-center py-2">
                    {staff?.name}
                  </h2>
                  {staff?.fatherName && (
                    <p className="text-gray-700">
                      Father&apos;s Name: {staff?.fatherName}
                    </p>
                  )}
                  {staff?.husbandName && (
                    <p className="text-gray-700">
                      Husband&apos;s Name: {staff?.husbandName}
                    </p>
                  )}
                  {staff?.photoNameUnuiq && (
                    <p className="text-gray-700">
                      Photo Unique No.: {staff?.photoNameUnuiq}
                    </p>
                  )}
                  {staff?.dob && (
                    <p className="text-gray-700">Date of Birth: {staff?.dob}</p>
                  )}
                  {staff?.contact && (
                    <p className="text-gray-700">Contact: {staff?.contact}</p>
                  )}
                  {staff?.email && (
                    <p className="text-gray-700">Email: {staff?.email}</p>
                  )}
                  {staff?.address && (
                    <p className="text-gray-700">Address: {staff?.address}</p>
                  )}
                  {staff?.qualification && (
                    <p className="text-gray-700">
                      Qualification: {staff?.qualification}
                    </p>
                  )}
                  {staff?.designation && (
                    <p className="text-gray-700">
                      Designation: {staff?.designation}
                    </p>
                  )}
                  {staff?.staffType && (
                    <p className="text-gray-700">
                      Staff Type: {staff?.staffType}
                    </p>
                  )}
                  {staff?.doj && (
                    <p className="text-gray-700">
                      Date of Joining: {staff?.doj}
                    </p>
                  )}
                  {staff?.uid && (
                    <p className="text-gray-700">UID: {staff?.uid}</p>
                  )}
                  {staff?.staffID && (
                    <p className="text-gray-700">Staff ID: {staff?.staffID}</p>
                  )}
                  {staff?.udiseCode && (
                    <p className="text-gray-700">
                      UDISE Code: {staff?.udiseCode}
                    </p>
                  )}
                  {staff?.schoolName && (
                    <p className="text-gray-700">
                      School Name: {staff?.schoolName}
                    </p>
                  )}
                  {staff?.bloodGroup && (
                    <p className="text-gray-700">
                      Blood Group: {staff?.bloodGroup}
                    </p>
                  )}
                  {staff?.dispatchNo && (
                    <p className="text-gray-700">
                      Dispatch No.: {staff?.dispatchNo}
                    </p>
                  )}
                  {staff?.dateOfissue && (
                    <p className="text-gray-700">
                      Date of Issue: {staff?.dateOfissue}
                    </p>
                  )}
                  {staff?.ihrmsNo && (
                    <p className="text-gray-700">IHRMS No.: {staff?.ihrmsNo}</p>
                  )}
                  {staff?.beltNo && (
                    <p className="text-gray-700">Belt No.: {staff?.beltNo}</p>
                  )}
                  {staff?.licenceNo && (
                    <p className="text-gray-700">
                      Licence No.: {staff?.licenceNo}
                    </p>
                  )}
                  {staff?.idNo && (
                    <p className="text-gray-700">ID No.: {staff?.idNo}</p>
                  )}
                  {staff?.jobStatus && (
                    <p className="text-gray-700">
                      Job Status: {staff?.jobStatus}
                    </p>
                  )}
                  {staff?.panCardNo && (
                    <p className="text-gray-700">
                      PAN Card No.: {staff?.panCardNo}
                    </p>
                  )}
                  {staff?.adharNo && (
                    <p className="text-gray-700">
                      Addhar Card No.: {staff?.adharNo}
                    </p>
                  )}
                  {staff?.extraField1 && (
                    <p className="text-gray-700">
                      Extra Field 1: {staff?.extraField1}
                    </p>
                  )}
                  {staff?.extraField2 && (
                    <p className="text-gray-700">
                      Extra Field 2: {staff?.extraField2}
                    </p>
                  )}
                  {/* Add more staff details as required */}
                  <div className="w-full flex justify-center items-center mt-2">
                    {status === "Panding" && (
                      <>
                        {/* Edit Button */}
                        <button
                          onClick={() => redirectToStaffEdit(staff._id)}
                          className="flex items-center px-5 py-1 bg-indigo-600 text-white m-2 rounded-md hover:bg-indigo-700"
                        >
                          <FaEdit className="mr-2" />
                          Edit
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => deleteStaff(staff._id)}
                          className="flex items-center px-5 py-1 bg-red-600 text-white m-2 rounded-md hover:bg-red-700"
                        >
                          <FaTrashAlt className="mr-2" />
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
      <div>
        {/* Chat Box Button */}
        {submitted && (
          <button
  className={`fixed bottom-4 left-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full shadow-lg ${!showChatBox ? 'button-bounce' : ''}`}
  onClick={toggleChatBox}
>
  More
</button>

        )}

        {/* List of Buttons in Chat Box */}

        {showChatBox && (
          <div className="fixed bottom-16 left-4 flex flex-col gap-3">
            {!user.school && (
              <>
                <button
                  className={`flex items-center gap-2 ${
                    isAllSelected
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-blue-600 hover:bg-blue-700"
                  } text-white py-2 px-4 rounded-lg shadow-lg`}
                  onClick={selectAllStudents}
                >
                  {isAllSelected ? <FaUserTimes /> : <FaUserCheck />}
                  {isAllSelected ? "Unselect All" : "Select All"}
                </button>
                <button
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg shadow-lg"
                  onClick={deletHandler}
                >
                  <FaTrashAlt /> Delete Selected
                </button>
              </>
            )}

            {/* Pending status */}
            {status === "Panding" && (
              <>
                {(user?.exportExcel || user?.school?.exportExcel) && (
                  <button
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg shadow-lg"
                    onClick={downloadExcel}
                  >
                    <FaFileExport /> Export Excel
                  </button>
                )}
                {(user?.exportImage || user?.school?.exportImages) && (
                  <button
                    className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg shadow-lg"
                    onClick={downloadImages}
                  >
                    <FaImages /> Export Images
                  </button>
                )}
                {user?.school && (
                  <>
                    <button
                      className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-lg shadow-lg"
                      onClick={modeToReadytoprint}
                    >
                      <FaCheck /> Move to Ready
                    </button>
                  </>
                )}
              </>
            )}

            {/* Ready to Print status */}
            {status === "Ready to print" && (
              <>
                {!user.school && (
                  <button
                    className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg shadow-lg"
                    onClick={modeToPrinted}
                  >
                    <FaCheck /> Move to Printed
                  </button>
                )}
                {user.school && (
                  <button
                    className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg shadow-lg"
                    onClick={modeToPending}
                  >
                    <FaArrowLeft /> Move Back to Pending
                  </button>
                )}
                {(user?.exportExcel || user?.school?.exportExcel) && (
                  <button
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg shadow-lg"
                    onClick={downloadExcel}
                  >
                    <FaFileExport /> Export Excel
                  </button>
                )}
                {(user?.exportImage || user?.school?.exportImages) && (
                  <button
                    className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg shadow-lg"
                    onClick={downloadImages}
                  >
                    <FaImages /> Export Images
                  </button>
                )}
              </>
            )}

            {/* Printed status */}
            {status === "Printed" && (
              <>
                {(user?.exportExcel || user?.school?.exportExcel) && (
                  <button
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg shadow-lg"
                    onClick={downloadExcel}
                  >
                    <FaFileExport /> Export Excel
                  </button>
                )}
                {(user?.exportImage || user?.school?.exportImages) && (
                  <button
                    className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg shadow-lg"
                    onClick={downloadImages}
                  >
                    <FaImages /> Export Images
                  </button>
                )}
              </>
            )}
          </div>
        )}

        {submitted && currRole == "DUMMYYAHA(student)THA" && (
          <button
            className="px-5 py-2 bg-gray-500 text-white rounded-full fixed right-20 bottom-5  "
            onClick={() => setShowFilterBox(!showFilterBox)}
          >
            Filter
          </button>
        )}

        {showFilterBox && (
          <div className="flex flex-col fixed right-[55px] bottom-20 z-10 px-5 py-5 rounded-md ">
            <form onSubmit={filterStudent}>
              <input
                type="text"
                placeholder="Class"
                className=" w-20 block border py-1 px-3 my-1 border-gray-400 rounded-md"
                value={classValue}
                onChange={(e) => setClassValue(e.target.value)}
              />
              <input
                type="text"
                placeholder="Section"
                value={sectionValue}
                className=" w-20 block border py-1 px-3 my-1 border-gray-400 rounded-md"
                onChange={(e) => setSectionValue(e.target.value)}
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white px-5 py-1 rounded-full m-auto mt-2 "
              >
                {filterActive ? <p>Reset Filter</p> : <>Filter</>}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Viewdata;
