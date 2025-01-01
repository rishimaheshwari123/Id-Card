"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Nav from "../components/Nav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  aadExcel,
  aadExcelstaff,
  submitStudentPhotos,
} from "@/redux/actions/userAction";
import axios from "../../../axiosconfig";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";

const Addexcel = () => {
  const { schools } = useSelector((state) => state.user);
  const [currSchool, setCurrSchool] = useState("");
  let [currRole, setCurrRole] = useState("");
   const dispatch = useDispatch();
  let currentExcel = {};
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [headings, setHeadings] = useState([]); // State to store Excel headings

  const [fileName, setFileName] = useState(""); // State to store file name

  const[schoolData,setSchoolData] = useState(null)
  const [mapping, setMapping] = useState({});

  const handleRoleSelect = (e) => {
    setCurrRole(e.target.value);
  };

  const handleSchoolSelect = (e) => {
    setCurrSchool(e.target.value);
    console.log(e.target.value)
    const schoolId = e.target.value;
    if (schoolId) {
      // Fetch school data by schoolId from backend
      axios
        .get(`user/getschool/${schoolId}`)
        .then((response) => {
          setSchoolData(response.data.data); // Update the state with fetched data
          console.log(response.data.data)
        })
        .catch((err) => {
          console.log("Error fetching school data"); // Handle error if request fails
        });
    }

  };

  const handleExcelFileSelect = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    console.log(file);
    currentExcel = file;

    setFileName(file);

    const reader = new FileReader();

      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // Extract rows as an array
        setHeadings(jsonData[0]); // First row contains headings
        console.log(jsonData[0])
      };
      reader.readAsArrayBuffer(file);

    // Your file handling logic here
  };
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitExcel = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Set loading state to true when function is called

    // Show loading toast with a specific toastId
    const toastId = toast.loading("Uploading...", { toastId: "uploadToast" });
    const customField = {
      PhotoNo: mapping["PhotoNo."] || "", // Use the mapping for "PhotoNo."
    };
  
    // Generate dynamic fields based on the required fields and the mapping
    const mappedData = schoolData?.requiredFields.reduce((acc, field) => {
      // Only add the field if there's a heading available in the mapping
      if (mapping[field]) {
        acc[field] = mapping[field]; // Set the key as the field name, and value as the mapped heading
      } else {
        acc[field] = ""; // Default empty if no mapping found
      }
      return acc;
    }, {});
  
    // Combine custom fields with the dynamic field mappings
    const finalMappedData = { ...customField, ...mappedData };
    console.log(finalMappedData);

    try {
      console.log(fileName);
      console.log(currRole);

      let response;

      // Check conditions for 'student' and 'staff'
      if (fileName && currRole === "student") {
        response = await dispatch(aadExcel(fileName, currSchool,finalMappedData));
      } else if (fileName && currRole === "staff") {
        response = await dispatch(aadExcelstaff(fileName, currSchool));
      } else {
        // If no file or school is selected, show an error toast and stop the loading toast
        toast.update(toastId, {
          render: "No File or School Selected",
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
        return;
      }

      // Update the loading toast to a success toast once the response is received
      toast.update(toastId, {
        render: response,
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
    } catch (error) {
      // If there's an error, update the loading toast to an error toast
      toast.update(toastId, {
        render: "Something went wrong!",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    } finally {
      setIsLoading(false); // Set loading state to false after operation
    }
  };

  const handlePhotoFileSelect = (e) => {
    e.preventDefault();
    const files = Array.from(e.target.files); // Convert FileList to an array
    setSelectedPhotos((prevPhotos) => [...prevPhotos, ...files]); // Update state
    console.log([...selectedPhotos, ...files]);
  };

  const handleSubmitnowfuntiion = async (event) => {
    event.preventDefault();

    
    // Show loading alert
    Swal.fire({
      title: "Uploading photos...",
      text: "Please wait while your photos are being uploaded.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const formData = new FormData();
    console.log("Selected photos:", selectedPhotos); // Log selectedPhotos array
    let message;
    selectedPhotos.forEach((file, index) => {
      // Append each file with a unique key based on its index
      formData.append(`file`, file);
    });

    // Log FormData entries
    for (const pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    try {
      let response = "Successfully Uploaded";

      if (currRole === "student") {
        response = await axios.post(
          `/user/student/avatars/${currSchool}`,
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
              authorization: `${localStorage.getItem("token")}`,
            },
          }
        );
        message = `Uploaded ${response.data.students.length} Photo`;
      } else if (currRole === "staff") {
        response = await axios.post(
          `/user/staff/avatars/${currSchool}`,
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
              authorization: `${localStorage.getItem("token")}`,
            },
          }
        );
        message = `Uploaded ${response.data.staffs.length} Photo`;
      }

      console.log(response.data.staffs);

      // Close loading alert and show success message
      Swal.fire({
        icon: "success",
        title: "Upload Successful",
        text: message,
        timer: 5000,
        timerProgressBar: true,
      });

      // setSelectedPhotos([]);
    } catch (error) {
      console.error("Error uploading photos:", error);

      // Close loading alert and show error message
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: "Failed to upload photos. Please try again.",
        timer: 5000,
        timerProgressBar: true,
      });
    }
  };


  const handleInputChange = (field, value) => {
    if (!field) {
      console.error("Invalid field provided for input change.");
      return;
    }
  
    setMapping((prev) => ({
      ...prev,
      [field]: value
    }));
  
    console.log(`Field "${field}" updated to value: "${value}"`);
  };
  
  

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Include custom PhotoNo. in the mapped data
    const customField = {
      field: "PhotoNo.",
      heading: mapping["PhotoNo."] || "", // Use the mapping for PhotoNo.
      value: mapping["PhotoNo."] || "" // Set value (if needed, adjust logic)
    };
  
    // Map required fields dynamically
    const mappedData = schoolData?.requiredFields?.map((field) => ({
      field,
      heading: mapping[field] || "", // Map heading based on user selection
      value: mapping[field] || "" // Add value (if needed)
    }));
  
    // Combine custom field with dynamic fields
    const finalMappedData = [customField, ...mappedData];
  
    console.log("Form Submission Data:", finalMappedData);
  
    // Submit this data to your backend or API
  };
  
  
  return (
    <>
      <Nav />
      <section className="bg-white dark:bg-gray-900 py-10 h-[100vh]">
        <div className="container flex flex-col items-center justify-center min-h-screen px-6 mx-auto">
          <div className="flex items-center justify-center mt-6">
            <a
              href="#"
              className="pb-4 font-medium text-center text-2xl text-gray-800 capitalize border-b-2 border-blue-500 dark:border-blue-400 dark:text-white"
            >
              Add Data With Excel
            </a>
          </div>
          {schools?.length !== 0 && (
            <form className="mt-6 w-full max-w-md">
              <div className="mb-4">
                <label
                  htmlFor="school"
                  className="block text-md text-center font-medium text-gray-700"
                >
                  Select School
                </label>
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
            </form>
          )}
          {schools?.length === 0 && (
            <h4 className="text-center text-2xl py-2 px-5 text-red-500">
              Please add a School
            </h4>
          )}
          <form className="mt-3 w-full max-w-md">
            <div className="mb-4">
              <label
                htmlFor="Role"
                className="block text-md text-center font-medium text-gray-700"
              >
                Select Role
              </label>
              <select
                id="Role"
                onChange={handleRoleSelect}
                value={currRole}
                className="mt-1 block h-10 border px-3 w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">Select Role</option>
                <option value="student">Student</option>
                <option value="staff">Staff</option>
              </select>
            </div>
          </form>
          {currRole && currSchool && (
            <form className="mt-6 w-full max-w-md" >
              <label
                htmlFor="excelFile"
                className="flex items-center px-3 py-3 mx-auto mt-6 text-center border-2 border-dashed rounded-lg cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-gray-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
                {fileName ? (
                  <p className="mt-2 text-sm text-gray-600 text-center">
                    Selected File:{" "}
                    <span className="font-medium">{fileName.name}</span>
                  </p>
                ) : (
                  <h2 className="mx-3 text-gray-400">Excel File</h2>
                )}
                <input
                  id="excelFile"
                  type="file"
                  className="hidden"
                  accept=".xls, .xlsx"
                  onChange={handleExcelFileSelect}
                />
              </label>

              <div className="flex justify-center p-5">
  {headings.length > 0 && currRole == 'student' &&  (
    <div className="w-full max-w-2xl bg-gray-100 p-6 rounded-lg shadow-md">
      {/* Custom Field for PhotoNo. */}
      <div className="mb-4">
        <label htmlFor="photoNo" className="block text-lg font-medium mb-2">PhotoNo.:</label>
        <select
          id="photoNo"
          name="PhotoNo"
          onChange={(e) => handleInputChange("PhotoNo.", e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a heading</option>
          {headings.map((head, idx) => (
            <option key={idx} value={head}>
              {head}
            </option>
          ))}
        </select>
      </div>

      {/* Dynamically Rendered Fields */}
      {schoolData?.requiredFields?.map((field, index) => (
        <div className="mb-4" key={index}>
          <label htmlFor={field} className="block text-lg font-medium mb-2">{field}:</label>
          <select
            id={field}
            name={field}
            onChange={(e) => handleInputChange(field, e.target.value)}
            value={mapping[field] || ""}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a heading</option>
            {headings.map((head, idx) => (
              <option key={idx} value={head}>
                {head}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  )}
</div>




              {fileName !== "" && (
                <div className="mt-6">
                  <button 
                  onClick={handleSubmitExcel}
                  className="w-full px-6 py-3 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                    Add Excel
                  </button>
                </div>
              )}
            </form>
          )}
          {currRole && currSchool && (
            <form
              className="mt-6 w-full max-w-md"
              onSubmit={handleSubmitnowfuntiion}
            >
              <label
                htmlFor="dropzone-file"
                className="flex items-center px-3 py-3 mx-auto mt-6 text-center border-2 border-dashed rounded-lg cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-gray-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
                <h2 className="mx-3 text-gray-400">
                  {currRole === "student"
                    ? "Student Profile Photos"
                    : "Staff Profile Photos"}
                </h2>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  multiple
                  onChange={handlePhotoFileSelect}
                />
              </label>
              {selectedPhotos?.length !== 0 && (
                <div className="mt-6">
                  <button className="w-full px-6 py-3 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                    Add Photos
                  </button>
                </div>
              )}
            </form>
          )}
        </div>
      </section>
    </>
  );
};

export default Addexcel;
