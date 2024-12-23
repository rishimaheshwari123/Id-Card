"use client";
import React, { useState, useEffect } from "react";
import Nav from "../../../components/Nav";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  currentUser,
  editStudent,
  updateSchool,
} from "@/redux/actions/userAction";
import { RiContactsBook2Line } from "react-icons/ri";
import { FaRegAddressCard } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../../../../../axiosconfig";
import Image from "next/image";
import Swal from "sweetalert2";
import ImageUploaderWithCrop from "@/component/ImageUpload";

const EditStudent = ({ params }) => {
  const [currSchool, setcurrschool] = useState();
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
  const [modeOfTransport, setmodeOfTransport] = useState("");
  const [ID, setID] = useState("");
  const [houseName, setHouseName] = useState("");
  const [validUpTo, setValidUpTo] = useState("");
  const [course, setCourse] = useState("");
  const [batch, setBatch] = useState("");
  const [idNo, setIdNo] = useState("");
  const [regNo, setRegNo] = useState("");
  const [extraField1, setExtraField1] = useState("");
  const [extraField2, setExtraField2] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); // Base64 image data

  const [imageData, setImageData] = useState({ publicId: "", url: "" }); // State to store only public_id and url

  const router = useRouter();
  const dispatch = useDispatch();
  const StudentlId = params ? params?.id : null; // Assuming you have a route

  // Assuming you have stored the school data in your Redux store
  const { user, schools, error } = useSelector((state) => state.user);

  useEffect(() => {
    const studentId = params ? params.id : null;
    const factchstudent = async () => {
      const config = () => {
        return {
          headers: {
            authorization: localStorage.getItem("token") || "", // Ensure token is always a string
          },
          withCredentials: true,
        };
      };
      const response = await axios.get(`/user/student/${studentId}`, config());
      const temuser = response.data.student;
      console.log(temuser);
      if (temuser) {
        setID(temuser?._id);
        setName(temuser?.name);
        setFatherName(temuser?.fatherName);
        setMotherName(temuser?.motherName);
        setDob(temuser?.dob);
        setContact(temuser?.contact);
        setEmail(temuser?.email);
        setAddress(temuser?.address);
        setRollNo(temuser?.rollNo);
        setStudentClass(temuser?.class);
        setSection(temuser?.section);
        setSession(temuser?.session);
        setAdmissionNo(temuser?.admissionNo);
        setBusNo(temuser?.busNo);
        setBloodGroup(temuser?.bloodGroup);
        setStudentID(temuser?.studentID);
        setAadharNo(temuser?.aadharNo);
        setRibbionColour(temuser?.ribbionColour);
        setRouteNo(temuser?.routeNo);
        setHouseName(temuser?.houseName);
        setImageData({
          publicId: temuser?.avatar?.publicId,
          url: temuser?.avatar?.url,
        });

        if (temuser?.validUpTo) {
          const formatDate = (date) => {
            const d = new Date(date);
            const day = String(d.getDate()).padStart(2, "0");
            const month = String(d.getMonth() + 1).padStart(2, "0");
            const year = d.getFullYear();
            return `${day}/${month}/${year}`;
          };
          setValidUpTo(formatDate(temuser.validUpTo)); // Format and set the date
        } else {
          setValidUpTo("");
        }
        setCourse(temuser?.course);
        setBatch(temuser?.batch);
        setIdNo(temuser?.idNo);
        setRegNo(temuser?.regNo);
        setExtraField1(temuser?.extraField1);
        setExtraField2(temuser?.extraField2);
      }
      if (user?.role == "school") {
        setcurrschool(user?.school);
      } else {
        let school = schools?.find((school) => school?._id == temuser?.school);
        console.log(school);
        setcurrschool(school);
      }
    };
    factchstudent();
  }, [user]);


   const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("submit");
    Swal.fire({
      title: "Please wait...",
      text: "Updating student data...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    const formData = { name };
    formData.avatar = imageData;
  
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
    if (houseName) formData.houseName = houseName;
    if (validUpTo) formData.validUpTo = validUpTo;
    if (course) formData.course = course;
    if (batch) formData.batch = batch;
    if (idNo) formData.idNo = idNo;
    if (regNo) formData.regNo = regNo;
    if (extraField1) formData.extraField1 = extraField1;
    if (extraField2) formData.extraField2 = extraField2;
  
    console.log(formData);
    console.log(ID);
    console.log(StudentlId, "param");
  
    // Show loading alert
   
  
    // Dispatch action to add student with formData
    const response = await dispatch(editStudent(formData, ID));
    console.log(response);
  
    if (response === "Student updated successfully") {
      setSelectedImage(null);
  
      // Show success alert with two buttons
      Swal.fire({
        icon: "success",
        title: "Student Updated Successfully",
        
      })
      router.push("/Viewdata");
    } else {
      // Show error alert
      Swal.fire({
        icon: "error",
        title: "Error",
        text: response,
        timer: 5000,
        showConfirmButton: false,
        toast: true,
        position: "top-end",
      });
    }
  };
  



  
  return (
    <>
      <Nav />
      <section className="bg-white dark:bg-gray-900 py-10 w-full flex justify-center items-center pt-16 ">
        <div className="w-[320px]">
          <form action="mt-3 w-[320px]" onSubmit={handleFormSubmit}>
            <h3 className="text-center text-xl py-3 border-b-2 mb-4 border-indigo-500">
              Edit Student
            </h3>
            <div className="w-full flex justify-center items-center flex-col">
              <Image
                src={imageData.url}
                className="w-[100px]"
                height={550}
                width={550}
                alt="logo"
              />
                        <ImageUploaderWithCrop setImageData={setImageData}  setSelectedImage={setSelectedImage} selectedImage={selectedImage} />

              
            </div>
            <div className="mb-4 w-[320px]">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Student Name
              </label>

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
                <label
                  htmlFor="fatherName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Father Name
                </label>
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
                <label
                  htmlFor="motherName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mothers Name
                </label>
                <input
                  type="text"
                  id="motherName"
                  value={motherName}
                  placeholder="Mothers Name"
                  onChange={(e) => setMotherName(e.target.value)}
                  className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            )}
            {currSchool?.requiredFields?.includes("Date of Birth") && (
              <div className="mb-4">
                <label
                  htmlFor="dob"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date of Birth
                </label>
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
                <label
                  htmlFor="contact"
                  className="block text-sm font-medium text-gray-700"
                >
                  Contact
                </label>
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
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address
                </label>
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
                <label
                  htmlFor="class"
                  className="block text-sm font-medium text-gray-700"
                >
                  Class
                </label>
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
                <label
                  htmlFor="section"
                  className="block text-sm font-medium text-gray-700"
                >
                  Section
                </label>
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
            {currSchool?.requiredFields?.includes("Roll No.") && (
              <div className="mb-4">
                <label
                  htmlFor="rollNo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Roll No.
                </label>
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
                <label
                  htmlFor="admissionNo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Admission No.
                </label>
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

            {currSchool?.requiredFields?.includes("Session") && (
                  <div className="mb-4">
                  <label
                  htmlFor="admissionNo"
                  className="block text-sm font-medium text-gray-700"
                >
            Session
                </label>
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
                  <label
                  htmlFor="admissionNo"
                  className="block text-sm font-medium text-gray-700"
                >
        Student ID
                </label>
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
            {currSchool?.requiredFields?.includes("Aadhar No.") && (
              <div className="mb-4">
                <label
                  htmlFor="aadharNo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Aadhar No.
                </label>
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
            {currSchool?.requiredFields?.includes("Blood Group") && (
              <div className="mb-4">
                <label
                  htmlFor="bloodGroup"
                  className="block text-sm font-medium text-gray-700"
                >
                  Blood Group
                </label>
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
                <label
                  htmlFor="ribbonColour"
                  className="block text-sm font-medium text-gray-700"
                >
                  Ribbon Colour
                </label>
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
            {currSchool?.requiredFields?.includes("Route No.") && (
              <div className="mb-4">
                <label
                  htmlFor="routeNo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Route No.
                </label>
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

            {/* Repeat this pattern for other fields */}

            {currSchool?.requiredFields?.includes("House Name") && (
              <div className="mb-4">
                <label
                  htmlFor="houseName"
                  className="block text-sm font-medium text-gray-700"
                >
                  House Name
                </label>
                <input
                  type="text"
                  id="houseName"
                  value={houseName}
                  placeholder="House Name"
                  onChange={(e) => setHouseName(e.target.value)}
                  className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            )}
            {currSchool?.requiredFields?.includes("Valid Up To") && (
              <div className="mb-4">
                <label
                  htmlFor="validUpTo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Valid Up To
                </label>
                <input
                  type="text"
                  id="validUpTo"
                  value={validUpTo}
                  placeholder="DD/MM/YYYY"
                  onChange={(e) => setValidUpTo(e.target.value)}
                  className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            )}
            {currSchool?.requiredFields?.includes("Course") && (
              <div className="mb-4">
                <label
                  htmlFor="course"
                  className="block text-sm font-medium text-gray-700"
                >
                  Course
                </label>
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
                <label
                  htmlFor="batch"
                  className="block text-sm font-medium text-gray-700"
                >
                  Batch
                </label>
                <input
                  type="text"
                  id="batch"
                  value={batch}
                  placeholder="Batch"
                  onChange={(e) => setBatch(e.target.value)}
                  className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            )}
            {currSchool?.requiredFields?.includes("ID No.") && (
              <div className="mb-4">
                <label
                  htmlFor="idNo"
                  className="block text-sm font-medium text-gray-700"
                >
                  ID No.
                </label>
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
                <label
                  htmlFor="regNo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Reg No.
                </label>
                <input
                  type="text"
                  id="regNo"
                  value={regNo}
                  placeholder="Reg No."
                  onChange={(e) => setRegNo(e.target.value)}
                  className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            )}
            {currSchool?.requiredFields?.includes("Extra Field-1") && (
              <div className="mb-4">
                <label
                  htmlFor="extraField1"
                  className="block text-sm font-medium text-gray-700"
                >
                  Extra Field 1
                </label>
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
            {currSchool?.requiredFields?.includes("Extra Field-1") && (
              <div className="mb-4">
                <label
                  htmlFor="extraField2"
                  className="block text-sm font-medium text-gray-700"
                >
                  Extra Field 2
                </label>
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

            <div className="w-full flex justify-center items-center">
              <button
                type="submit"
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default EditStudent;
