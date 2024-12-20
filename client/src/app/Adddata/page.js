"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Nav from "../components/Nav";
import { Disclosure } from "@headlessui/react";
import { addStaff, addStudent } from "@/redux/actions/userAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { redirect, useRouter } from "next/navigation";
import axios from "axios";
import Swal from 'sweetalert2';

const Adddata = () => {
  const { user, schools, error } = useSelector((state) => state.user);
  const [currSchool, setCurrSchool] = useState("");
  const [currRole, setCurrRole] = useState("");
  const [husbandName, setHusbandName] = useState("");
  const [name, setName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [dob, setDob] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [section, setSection] = useState("");
  const [session, setSession] = useState("");
  const [admissionNo, setAdmissionNo] = useState("");
  const [busNo, setBusNo] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [studentID, setStudentID] = useState("");
  const [aadharNo, setAadharNo] = useState("");
  const [ribbionColour, setRibbionColour] = useState("");
  const [routeNo, setRouteNo] = useState("");
  const [photoName, setPhotoName] = useState("");
  const [modeOfTransport, setmodeOfTransport] = useState("");
  const [qualification, setQualification] = useState("");
  const [designation, setDesignation] = useState("");
  const [staffType, setStaffType] = useState("");
  const [doj, setDoj] = useState("");
  const [udiseCode, setudiseCode] = useState("");
  const [schoolName, setschoolName] = useState("");
  const [dispatchNo, setdispatchNo] = useState("");
  const [dateOfissue, setdateOfissue] = useState("");
  const [ihrmsNo, setihrmsNo] = useState("");
  const [uid, setUid] = useState("");
  const [beltNo, setbeltNo] = useState("");
  const [staffID, setstaffID] = useState("");
  const dispatch = useDispatch();
  const [loginSchool, setloginSchool] = useState(false);
  const [adharNo, setAdharNo] = useState("");
  const [licenceNo, setLicenceNo] = useState("");
  const [idNo, setIdNo] = useState("");
  const [house, setHouse] = useState("");
  const [batch, setBatch] = useState("");
  const [panCardNo, setPanCardNo] = useState("");
  const [jobStatus, setJobStatus] = useState("");
  const [extraField1, setExtraField1] = useState("");
  const [extraField2, setExtraField2] = useState("");
  const [imageData, setImageData] = useState({ publicId: "", url: "" }); // State to store only public_id and url

  const [validUpTo, setValidUpTo] = useState("");
  const [course, setCourse] = useState("");

  const [regNo, setRegNo] = useState("");


  const handlePhotoFileSelect = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (!file) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please select an image first!',
      });
      return;
    }
  
    const formData = new FormData();
    formData.append("file", file);
  
    // Show loading alert
    Swal.fire({
      title: 'Uploading...',
      text: 'Please wait while we upload your image.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  
    try {
      const response = await axios.post(
        "https://testid.mahitechnocrafts.in/image/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      // Hide loading alert
      Swal.close();
  
      if (response.data.success) {
        const { public_id, url } = response.data.thumbnailImage;
        setImageData({ publicId: public_id, url: url });
  
        Swal.fire({
          icon: 'success',
          title: 'Uploaded!',
          text: 'Image uploaded successfully!',
        });
      }
    } catch (error) {
      console.error(error);
  
      // Hide loading alert and show error message
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: 'Upload Failed',
        text: 'Something went wrong. Please try again later.',
      });
    }
  };
  

  useEffect(() => {
    if (!user) {
      redirect("/");
    }
    if (user?.role == "school") {
      console.log(user.school);
      setCurrSchool(user.school);
      setloginSchool(true);
    }
  }, [user]);

  const handleRoleSelect = (e) => {
    e.preventDefault();
    setCurrRole(e.target.value);
    console.log(e.target.value);
  };

  const handleSchoolSelect = (e) => {
    // console.log("school change ni")
    const school = schools?.find((school) => school._id == e.target.value);
    console.log(school);
    console.log(school?.requiredFields);

    setCurrSchool(school);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    console.log("enter");
    // Create an empty object to store form data
    const formData = {
      name,
    };

    // Add values to formData only if they are not empty
    if (fatherName) formData.fatherName = fatherName;
    if (motherName) formData.motherName = motherName;
    if (dob) formData.dob = dob;
    if (contact) formData.contact = contact;
    if (email) formData.email = email;
    if (address) formData.address = address;
    if (rollNo) formData.rollNo = rollNo;
    if (studentClass) formData.class = studentClass;
    if (section) formData.section = section;
    if (session) formData.session = session;
    if (admissionNo) formData.admissionNo = admissionNo;
    if (busNo) formData.busNo = busNo;
    if (bloodGroup) formData.bloodGroup = bloodGroup;
    if (studentID) formData.studentID = studentID;
    if (aadharNo) formData.aadharNo = aadharNo;
    if (ribbionColour) formData.ribbionColour = ribbionColour;
    if (routeNo) formData.routeNo = routeNo;
    if (photoName) formData.photoName = photoName;

    // Add missing fields
    if (house) formData.houseName = house;
    if (validUpTo) formData.validUpTo = validUpTo;
    if (course) formData.course = course;
    if (batch) formData.batch = batch;
    if (idNo) formData.idNo = idNo;
    if (regNo) formData.regNo = regNo;
    if (extraField1) formData.extraField1 = extraField1;
    if (extraField2) formData.extraField2 = extraField2;

    if (imageData.publicId) formData.publicId = imageData.publicId;
    if (imageData.url) formData.url = imageData.url;
    // Add other student schema fields here

    // Log formData
    console.log(formData);

    // Dispatch action to add student with formData
    console.log(currSchool?._id);
    const response = await dispatch(addStudent(formData, currSchool._id));
    console.log(response);

    if (response == "successfully Register") {
      toast.success(response, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // Clear all form values after dispatching the form
      setHusbandName("");
      setName("");
      setFatherName("");
      setMotherName("");
      setDob("");
      setContact("");
      setEmail("");
      setAddress("");
      setRollNo("");
      setStudentClass("");
      setSection("");
      setSession("");
      setAdmissionNo("");
      setBusNo("");
      setBloodGroup("");
      setStudentID("");
      setAadharNo("");
      setRibbionColour("");
      setRouteNo("");
      setPhotoName("");
      setmodeOfTransport("");
      setQualification("");
      setDesignation("");
      setStaffType("");
      setDoj("");
      setudiseCode("");
      setschoolName("");
      setdispatchNo("");
      setdateOfissue("");
      setihrmsNo("");
      setUid("");
      setbeltNo("");
      setstaffID("");
      setloginSchool(false);  // For boolean values
      setLicenceNo("");
      setIdNo("");
      setHouse("");
      setBatch("");
      setPanCardNo("");
      setJobStatus("");
      setExtraField1("");
      setExtraField2("");
      setImageData({ publicId: "", url: "" }); // Resetting the image data to an empty state
      setValidUpTo("");
      setCourse("");
      setRegNo("");
      
    } else {
      toast.error(response, {
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

  const handleStaffFormSubmit = async (e) => {
    e.preventDefault();

    // Create an empty object to store form data
    const formData = {};

    // Add values to formData only if they are not empty
    if (name) formData.name = name;
    if (fatherName) formData.fatherName = fatherName;
    if (husbandName) formData.husbandName = husbandName;
    if (dob) formData.dob = dob;
    if (contact) formData.contact = contact;
    if (email) formData.email = email;
    if (address) formData.address = address;
    if (qualification) formData.qualification = qualification;
    if (designation) formData.designation = designation;
    if (staffType) formData.staffType = staffType;
    if (doj) formData.doj = doj;
    if (uid) formData.udiseCode = uid;
    if (staffID) formData.staffID = staffID;
    if (bloodGroup) formData.bloodGroup = bloodGroup;
    if (dispatchNo) formData.dispatchNo = dispatchNo;
    if (dateOfissue) formData.dateOfissue = dateOfissue;
    if (ihrmsNo) formData.ihrmsNo = ihrmsNo;
    if (beltNo) formData.beltNo = beltNo;
    if (schoolName) formData.schoolName = schoolName;
    
    if (jobStatus) formData.jobStatus = jobStatus;
    if (licenceNo) formData.licenceNo = licenceNo;
    if (panCardNo) formData.panCardNo = panCardNo;
    if (adharNo) formData.adharNo = adharNo;
    if (idNo) formData.idNo = idNo;
    if (extraField1) formData.extraField1 = extraField1;
    if (extraField2) formData.extraField2 = extraField2;
    // Add other staff fields here
    if (imageData.publicId) formData.publicId = imageData.publicId;
    if (imageData.url) formData.url = imageData.url;
    // Log formData
    console.log(formData);

    // Dispatch action to add staff with formData
    const response = await dispatch(addStaff(formData, currSchool._id));
    if (response == "successfully Register") {
      toast.success(response, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setHusbandName("");
      setName("");
      setFatherName("");
      setMotherName("");
      setDob("");
      setContact("");
      setEmail("");
      setAddress("");
      setRollNo("");
      setStudentClass("");
      setSection("");
      setSession("");
      setAdmissionNo("");
      setBusNo("");
      setBloodGroup("");
      setStudentID("");
      setAadharNo("");
      setRibbionColour("");
      setRouteNo("");
      setPhotoName("");
      setmodeOfTransport("");
      setQualification("");
      setDesignation("");
      setStaffType("");
      setDoj("");
      setudiseCode("");
      setschoolName("");
      setdispatchNo("");
      setdateOfissue("");
      setihrmsNo("");
      setUid("");
      setbeltNo("");
      setstaffID("");
      setloginSchool(false);  // For boolean values
      setLicenceNo("");
      setIdNo("");
      setHouse("");
      setBatch("");
      setPanCardNo("");
      setJobStatus("");
      setExtraField1("");
      setExtraField2("");
      setImageData({ publicId: "", url: "" }); // Resetting the image data to an empty state
      setValidUpTo("");
      setCourse("");
      setRegNo("");
      
    } else {
      toast.error(response, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    // Clear all form values after dispatching the form
  };

  return (
    <>
      <Nav />
      <section className="bg-white dark:bg-gray-900 py-10">
        <div className="container flex flex-col items-center justify-center  px-6 mx-auto">
          <div className="flex items-center justify-center mt-6">
            <a
              href="#"
              className="pb-4 font-medium text-center text-2xl text-gray-800 capitalize border-b-2 border-blue-500 dark:border-blue-400 dark:text-white"
            >
              Add Students
            </a>
          </div>
          {!loginSchool && schools?.length !== 0 && (
            <form className="mt-6 w-full max-w-md" onSubmit={handleFormSubmit}>
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
                  value={currSchool._id}
                  className="mt-1 h-10 px-3 border block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">Select School</option>
                  {schools?.map((school) => (
                    <option key={school?._id} value={school?._id}>
                      {school.name}
                    </option>
                  ))}
                </select>
              </div>
            </form>
          )}
          {!loginSchool && schools?.length === 0 && (
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
          {currRole === "student" && (
            <div className="w-[320px]">
              <form action="mt-3 w-[320px] " onSubmit={handleFormSubmit}>
                <h3 className="text-center text-xl py-3 border-b-2 mb-4 border-indigo-500">
                  Add Student
                </h3>

                <div className="mb-4 w-[320px]">
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Student Name"
                    className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>
                {currSchool?.requiredFields?.includes("Father's Name") && (
                  <div className="mb-4">
                    <input
                      type="text"
                      id="fatherName"
                      value={fatherName}
                      placeholder="Father Name"
                      onChange={(e) => setFatherName(e.target.value)}
                      className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                )}
                {currSchool?.requiredFields?.includes("Mother's Name") && (
                  <div className="mb-4">
                    <input
                      type="text"
                      id="motherName"
                      value={motherName}
                      placeholder="Mother's Name"
                      onChange={(e) => setMotherName(e.target.value)}
                      className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                )}
                {currSchool?.requiredFields?.includes("Date of Birth") && (
                  <div className="mb-4">
                    <input
                      type="text"
                      id="dob"
                      value={dob}
                      placeholder="Date of Birth"
                      onChange={(e) => setDob(e.target.value)}
                      className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                )}
                {currSchool?.requiredFields?.includes("Contact No.") && (
                  <div className="mb-4">
                    <input
                      type="text"
                      id="contact"
                      value={contact}
                      placeholder="Contact"
                      onChange={(e) => setContact(e.target.value)}
                      className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                )}
                {currSchool?.requiredFields?.includes("Address") && (
                  <div className="mb-4">
                    <input
                      type="text"
                      id="address"
                      value={address}
                      placeholder="Address"
                      onChange={(e) => setAddress(e.target.value)}
                      className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                )}
                {currSchool?.requiredFields?.includes("Class") && (
                  <div className="mb-4">
                    <input
                      type="text"
                      id="class"
                      value={studentClass}
                      placeholder="Class"
                      onChange={(e) => setStudentClass(e.target.value)}
                      className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                )}
                {currSchool?.requiredFields?.includes("Section") && (
                  <div className="mb-4">
                    <input
                      type="text"
                      id="section"
                      value={section}
                      placeholder="Section"
                      onChange={(e) => setSection(e.target.value)}
                      className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                )}
                {currSchool?.requiredFields?.includes("Session") && (
                  <div className="mb-4">
                    <input
                      type="text"
                      id="session"
                      value={session}
                      placeholder="Session"
                      onChange={(e) => setSession(e.target.value)}
                      className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                )}
                {currSchool?.requiredFields?.includes("Student ID") && (
                  <div className="mb-4">
                    <input
                      type="text"
                      id="session"
                      value={studentID}
                      placeholder="Student ID"
                      onChange={(e) => setStudentID(e.target.value)}
                      className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                )}
                {currSchool?.requiredFields?.includes("Roll No.") && (
                  <div className="mb-4">
                    <input
                      type="text"
                      id="rollNo"
                      value={rollNo}
                      placeholder="Roll No."
                      onChange={(e) => setRollNo(e.target.value)}
                      className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                )}
                {currSchool?.requiredFields?.includes("Admission No.") && (
                  <div className="mb-4">
                    <input
                      type="text"
                      id="admissionNo"
                      value={admissionNo}
                      placeholder="Admission No."
                      onChange={(e) => setAdmissionNo(e.target.value)}
                      className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                )}
                
                {currSchool?.requiredFields?.includes("Aadhar No.") && (
                  <div className="mb-4">
                    <input
                      type="text"
                      id="aadharNo"
                      value={aadharNo}
                      placeholder="Aadhar No."
                      onChange={(e) => setAadharNo(e.target.value)}
                      className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                )}
                {/* Blood Group */}
                {currSchool?.requiredFields?.includes("Blood Group") && (
                  <div className="mb-4">
                    <input
                      type="text"
                      id="bloodGroup"
                      value={bloodGroup}
                      placeholder="Blood Group"
                      onChange={(e) => setBloodGroup(e.target.value)}
                      className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                )}
                {currSchool?.requiredFields?.includes("Ribbon Colour") && (
                  <div className="mb-4">
                    <input
                      type="text"
                      id="ribbonColour"
                      value={ribbionColour}
                      placeholder="Ribbon Colour"
                      onChange={(e) => setRibbionColour(e.target.value)}
                      className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                )}
                {currSchool?.requiredFields?.includes("House Name") && (
                  <div className="mb-4">
                    <input
                      type="text"
                      id="houseName"
                      value={house}
                      placeholder="House Name"
                      onChange={(e) => setHouse(e.target.value)}
                      className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                )}
                {currSchool?.requiredFields?.includes("Route No.") && (
                  <div className="mb-4">
                    <input
                      type="text"
                      id="routeNo"
                      value={routeNo}
                      placeholder="Route No."
                      onChange={(e) => setRouteNo(e.target.value)}
                      className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                )}
                {currSchool?.requiredFields?.includes("Valid Up To") && (
                  <div className="mb-4">
                    <input
                      type="text"
                      id="validUpTo"
                      value={validUpTo}
                      placeholder="Valid Up To"
                      onChange={(e) => setValidUpTo(e.target.value)}
                      className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                )}

                {currSchool?.requiredFields?.includes("Course") && (
                  <div className="mb-4">
                    <input
                      type="text"
                      id="course"
                      value={course}
                      placeholder="Course"
                      onChange={(e) => setCourse(e.target.value)}
                      className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                )}
                {currSchool?.requiredFields?.includes("Batch") && (
                  <div className="mb-4">
                    <input
                      type="text"
                      id="Batch"
                      value={batch}
                      placeholder="Batch"
                      onChange={(e) => setBatch(e.target.value)}
                      className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                )}

                {currSchool?.requiredFields?.includes("ID No.") && (
                  <div className="mb-4">
                    <input
                      type="text"
                      id="idNo"
                      value={idNo}
                      placeholder="ID No."
                      onChange={(e) => setIdNo(e.target.value)}
                      className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                )}

                {currSchool?.requiredFields?.includes("Reg. No.") && (
                  <div className="mb-4">
                    <input
                      type="text"
                      id="regNo"
                      value={regNo}
                      placeholder="Reg. No."
                      onChange={(e) => setRegNo(e.target.value)}
                      className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                )}

                {currSchool?.requiredFields?.includes("Extra Field-1") && (
                  <div className="mb-4">
                    <input
                      type="text"
                      id="extraField1"
                      value={extraField1}
                      placeholder="Extra Field-1"
                      onChange={(e) => setExtraField1(e.target.value)}
                      className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                )}

                {currSchool?.requiredFields?.includes("Extra Field-2") && (
                  <div className="mb-4">
                    <input
                      type="text"
                      id="extraField2"
                      value={extraField2}
                      placeholder="Extra Field-2"
                      onChange={(e) => setExtraField2(e.target.value)}
                      className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                )}

                {/* {currSchool?.requiredFields?.includes("Mode of Transport") && (
                  <div className="mb-4">
                    <input
                      type="text"
                      id="modeOfTransport"
                      value={modeOfTransport}
                      placeholder="Mode Of Transport"
                      onChange={(e) => setmodeOfTransport(e.target.value)}
                      className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                )} */}
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
                  <h2 className="mx-3 text-gray-400">Student Profile Photos</h2>
                  <input
                    id="dropzone-file"
                    type="file"
                    className=""
                    multiple
                    onChange={handlePhotoFileSelect}
                  />
                </label>

                {/* Repeat above pattern for other fields */}
                {/* Add input fields for other student schema fields */}
                {/* Add a submit button */}
                <button
                  type="submit"
                  className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Add Student
                </button>
              </form>
            </div>
          )}
        </div>
        {currRole === "staff" && (
          <div className="w-[320px] m-auto ">
            <form action="mt-3 w-[320px]" onSubmit={handleStaffFormSubmit}>
              <h3 className="text-center text-xl py-3 border-b-2 mb-4 border-indigo-500">
                Add Staff
              </h3>
              <div className="mb-4">
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Staff Name"
                  className="mt-1 block h-10 px-3 border w-80 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              {currSchool?.requiredFieldsStaff?.includes("Father's Name") && (
                <div className="mb-4">
                  <input
                    type="text"
                    id="fatherName"
                    value={fatherName}
                    placeholder="Father's Name"
                    onChange={(e) => setFatherName(e.target.value)}
                    className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              )}
              {currSchool?.requiredFieldsStaff?.includes("Husband's Name") && (
                <div className="mb-4">
                  <input
                    type="text"
                    id="husbandName"
                    value={husbandName}
                    placeholder="Husband's Name"
                    onChange={(e) => setHusbandName(e.target.value)}
                    className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              )}
              {currSchool?.requiredFieldsStaff?.includes("Date of Birth") && (
                <div className="mb-4">
                  <input
                    type="text"
                    id="dob"
                    value={dob}
                    placeholder="Date of Birth"
                    onChange={(e) => setDob(e.target.value)}
                    className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              )}
              {currSchool?.requiredFieldsStaff?.includes("Contact No.") && (
                <div className="mb-4">
                  <input
                    type="text"
                    id="contact"
                    value={contact}
                    placeholder="Contact"
                    onChange={(e) => setContact(e.target.value)}
                    className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              )}
              {currSchool?.requiredFieldsStaff?.includes("E-mail") && (
                <div className="mb-4">
                  <input
                    type="text"
                    id="email"
                    value={email}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              )}
              {currSchool?.requiredFieldsStaff?.includes("Address") && (
                <div className="mb-4">
                  <input
                    type="text"
                    id="address"
                    value={address}
                    placeholder="Address"
                    onChange={(e) => setAddress(e.target.value)}
                    className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              )}
              {currSchool?.requiredFieldsStaff?.includes("Qualification") && (
                <div className="mb-4">
                  <input
                    type="text"
                    id="qualification"
                    value={qualification}
                    placeholder="Qualification"
                    onChange={(e) => setQualification(e.target.value)}
                    className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              )}
              {currSchool?.requiredFieldsStaff?.includes("Designation") && (
                <div className="mb-4">
                  <input
                    type="text"
                    id="designation"
                    value={designation}
                    placeholder="Designation"
                    onChange={(e) => setDesignation(e.target.value)}
                    className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              )}

              {currSchool?.requiredFieldsStaff?.includes("Date of Joining") && (
                <div className="mb-4">
                  <input
                    type="text"
                    id="doj"
                    value={doj}
                    placeholder="Date of Joining"
                    onChange={(e) => setDoj(e.target.value)}
                    className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              )}
              {currSchool?.requiredFieldsStaff?.includes("Staff Type") && (
                <div className="mb-4">
                  <input
                    type="text"
                    id="staffType"
                    value={staffType}
                    placeholder="Staff Type"
                    onChange={(e) => setStaffType(e.target.value)}
                    className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              )}
              {/* {currSchool?.requiredFieldsStaff?.includes("UID No.") && (
                <div className="mb-4">
                  <input
                    type="text"
                    id="uid"
                    value={uid}
                    placeholder="UID"
                    onChange={(e) => setUid(e.target.value)}
                    className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              )} */}

              {/* Remanin */}

              {currSchool?.requiredFieldsStaff?.includes("Staff ID") && (
                <div className="mb-4">
                  <input
                    type="text"
                    id="uid"
                    value={staffID}
                    placeholder="Staff ID"
                    onChange={(e) => setstaffID(e.target.value)}
                    className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              )}
              {currSchool?.requiredFieldsStaff?.includes("UDISE Code") && (
                <div className="mb-4">
                  <input
                    type="text"
                    id="uid"
                    value={uid}
                    placeholder="UDISE Code"
                    onChange={(e) => setUid(e.target.value)}
                    className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              )}
              {currSchool?.requiredFieldsStaff?.includes("Job Status") && (
                <div className="mb-4">
                  <input
                    type="text"
                    id="uid"
                    value={jobStatus}
                    placeholder="Job Status"
                    onChange={(e) => setJobStatus(e.target.value)}
                    className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              )}
              {currSchool?.requiredFieldsStaff?.includes("Office Name") && (
                <div className="mb-4">
                  <input
                    type="text"
                    id="uid"
                    value={schoolName}
                    placeholder="Office Name"
                    onChange={(e) => setschoolName(e.target.value)}
                    className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              )}
              {currSchool?.requiredFieldsStaff?.includes("Blood Group") && (
                <div className="mb-4">
                  <input
                    type="text"
                    id="bloodGroup"
                    value={bloodGroup}
                    placeholder="Blood Group"
                    onChange={(e) => setBloodGroup(e.target.value)}
                    className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              )}
              {currSchool?.requiredFieldsStaff?.includes("Dispatch No.") && (
                <div className="mb-4">
                  <input
                    type="text"
                    id="uid"
                    value={dispatchNo}
                    placeholder="Dispatch No."
                    onChange={(e) => setdispatchNo(e.target.value)}
                    className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              )}
              {currSchool?.requiredFieldsStaff?.includes("Date of Issue") && (
                <div className="mb-4">
                  <input
                    type="text"
                    id="uid"
                    value={dateOfissue}
                    placeholder="Date of Issue"
                    onChange={(e) => setdateOfissue(e.target.value)}
                    className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              )}
              {currSchool?.requiredFieldsStaff?.includes("IHRMS No.") && (
                <div className="mb-4">
                  <input
                    type="text"
                    id="uid"
                    value={ihrmsNo}
                    placeholder="IHRMS No."
                    onChange={(e) => setihrmsNo(e.target.value)}
                    className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              )}
              {currSchool?.requiredFieldsStaff?.includes("Belt No.") && (
                <div className="mb-4">
                  <input
                    type="text"
                    id="uid"
                    value={beltNo}
                    placeholder="Belt No."
                    onChange={(e) => setbeltNo(e.target.value)}
                    className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              )}
              {currSchool?.requiredFieldsStaff?.includes("Aadhar Card No.") && (
                <div className="mb-4">
                  <input
                    type="text"
                    id="adharNo"
                    value={adharNo}
                    placeholder="Adhar No. (UID)"
                    onChange={(e) => setAdharNo(e.target.value)}
                    className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              )}

              {/* Licence No */}
              {currSchool?.requiredFieldsStaff?.includes("Licence No.") && (
                <div className="mb-4">
                  <input
                    type="text"
                    id="licenceNo"
                    value={licenceNo}
                    placeholder="Licence No."
                    onChange={(e) => setLicenceNo(e.target.value)}
                    className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              )}

              {/* ID No */}
              {currSchool?.requiredFieldsStaff?.includes("ID No.") && (
                <div className="mb-4">
                  <input
                    type="text"
                    id="idNo"
                    value={idNo}
                    placeholder="ID No."
                    onChange={(e) => setIdNo(e.target.value)}
                    className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              )}

              {/* PAN Card No */}
              {currSchool?.requiredFieldsStaff?.includes("PAN Card No.") && (
                <div className="mb-4">
                  <input
                    type="text"
                    id="panCardNo"
                    value={panCardNo}
                    placeholder="PAN Card No."
                    onChange={(e) => setPanCardNo(e.target.value)}
                    className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              )}

              {/* Extra Field 1 */}
              {currSchool?.requiredFieldsStaff?.includes("Extra Field 1") && (
                <div className="mb-4">
                  <input
                    type="text"
                    id="extraField1"
                    value={extraField1}
                    placeholder="Extra Field 1"
                    onChange={(e) => setExtraField1(e.target.value)}
                    className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              )}

              {/* Extra Field 2 */}
              {currSchool?.requiredFieldsStaff?.includes("Extra Field 2") && (
                <div className="mb-4">
                  <input
                    type="text"
                    id="extraField2"
                    value={extraField2}
                    placeholder="Extra Field 2"
                    onChange={(e) => setExtraField2(e.target.value)}
                    className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              )}
              {/* Repeat above pattern for other fields */}
              {/* Add a submit button */}

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
                <h2 className="mx-3 text-gray-400">Satff Profile Photos</h2>
                <input
                  id="dropzone-file"
                  type="file"
                  className=""
                  multiple
                  onChange={handlePhotoFileSelect}
                />
              </label>
              <button
                type="submit"
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Add Staff
              </button>
            </form>
          </div>
        )}
      </section>
    </>
  );
};

export default Adddata;
