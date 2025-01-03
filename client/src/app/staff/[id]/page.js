'use client'
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"; // Correct hook for query parameters
import axios from "../../../../axiosconfig";
import Swal from "sweetalert2";
import Image from "next/image";
import ImageUploaderWithCrop from "@/component/ImageUpload";
import { useDispatch } from "react-redux";
import { editStaff } from "@/redux/actions/userAction";

function Page({params}) {
  const searchParams = useSearchParams(); // Get query parameters
  const [error, setError] = useState(null); // State to track errors
  const [currSchool, setcurrschool] = useState();


  const [name, setName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [husbandName, setHusbandName] = useState("");
  const [dob, setDob] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [qualification, setQualification] = useState("");
  const [designation, setDesignation] = useState("");
  const [staffType, setStaffType] = useState("");
  const [doj, setDoj] = useState("");
  const [uid, setUid] = useState("");
  const [staffID, setStaffID] = useState("");
  const [udiseCode, setUdiseCode] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [dispatchNo, setDispatchNo] = useState("");
  const [dateOfIssue, setDateOfIssue] = useState("");
  const [ihrmsNo, setIhrmsNo] = useState("");
  const [beltNo, setBeltNo] = useState("");
  const [photoName, setPhotoName] = useState("");

  const [licenceNo, setLicenceNo] = useState("");
  const [idNo, setIdNo] = useState("");
  const [jobStatus, setJobStatus] = useState("");
  const [panCardNo, setPanCardNo] = useState("");
  const [aadharCardNo, setAadharCardNo] = useState("");
  const [extraField1, setExtraField1] = useState("");
  const [extraField2, setExtraField2] = useState("");
  const [id, setID] = useState();
  const [imageData, setImageData] = useState({ publicId: "", url: "" }); // State to store only public_id and url
  const [selectedImage, setSelectedImage] = useState(null); // Base64 image data


  const dispatch = useDispatch();


  const schoolId = searchParams.get("schoolid"); // Access query param

  useEffect(() => {
    if (schoolId) {
      // Fetch school data by schoolId from backend
      axios
        .get(`user/getschool/${schoolId}`)
        .then((response) => {
          setcurrschool(response.data.data); // Update the state with fetched data
        })
        .catch((err) => {
          setError("Error fetching school data"); // Handle error if request fails
        });
    }
  }, [schoolId]); // Re-run effect when schoolId changes

  useEffect(() => {
    const staffId = params ? params.id : null;
    const factchstudent = async () => {
      const config = () => {
        return {
          headers: {
            authorization: localStorage.getItem("token") || "", // Ensure token is always a string
          },
          withCredentials: true,
        };
      };
      const response = await axios.get(`/user/staff/${staffId}`, config());
      const staffData = response.data.staff;
      if (staffData) {
        setName(staffData?.name);
        setFatherName(staffData?.fatherName);
        setHusbandName(staffData?.husbandName);
        setDob(staffData?.dob);
        setContact(staffData?.contact);
        setEmail(staffData?.email);
        setAddress(staffData?.address);
        setQualification(staffData?.qualification);
        setDesignation(staffData?.designation);
        setStaffType(staffData.staffType);
        setDoj(staffData?.doj);
        setUid(staffData?.uid);
        setStaffID(staffData?.staffID);
        setUdiseCode(staffData?.udiseCode);
        setSchoolName(staffData?.schoolName);
        setBloodGroup(staffData?.bloodGroup);
        setDispatchNo(staffData?.dispatchNo);
        setDateOfIssue(staffData?.dateOfissue);
        setIhrmsNo(staffData?.ihrmsNo);
        setBeltNo(staffData?.beltNo);
        setPhotoName(staffData?.photoName);
        setID(staffData?._id);
        setImageData({
          publicId: staffData?.avatar?.publicId,
          url: staffData?.avatar?.url,
        });
        setLicenceNo(staffData?.licenceNo); // New field
        setIdNo(staffData?.idNo); // New field
        setJobStatus(staffData?.jobStatus); // New field
        setPanCardNo(staffData?.panCardNo); // New field
        setAadharCardNo(staffData?.adharNo); // New field
        setExtraField1(staffData?.extraField1); // New field
        setExtraField2(staffData?.extraField2); // New field
      }
   
    };
    factchstudent();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("call");
    try {
         // Show loading alert
         Swal.fire({
          title: "Please wait...",
          text: "Updating staff data...",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        const shareUpdate = "true"
      const formData = {shareUpdate};
  
      // Add non-empty fields to formData
      formData.avatar = imageData;
  
      if (name) formData.name = name.trim();
      if (fatherName) formData.fatherName = fatherName.trim();
      if (husbandName) formData.husbandName = husbandName.trim();
      if (dob) formData.dob = dob.trim();
      if (contact) formData.contact = contact.trim();
      if (email) formData.email = email.trim();
      if (address) formData.address = address.trim();
      if (qualification) formData.qualification = qualification.trim();
      if (designation) formData.designation = designation.trim();
      if (staffType) formData.staffType = staffType.trim();
      if (doj) formData.doj = doj.trim();
      if (uid) formData.uid = uid.trim();
      if (staffID) formData.staffID = staffID.trim();
      if (udiseCode) formData.udiseCode = udiseCode.trim();
      if (schoolName) formData.schoolName = schoolName.trim();
      if (bloodGroup) formData.bloodGroup = bloodGroup.trim();
      if (dispatchNo) formData.dispatchNo = dispatchNo.trim();
      if (dateOfIssue) formData.dateOfIssue = dateOfIssue.trim();
      if (ihrmsNo) formData.ihrmsNo = ihrmsNo.trim();
      if (beltNo) formData.beltNo = beltNo.trim();
      if (licenceNo) formData.licenceNo = licenceNo.trim();
      if (idNo) formData.idNo = idNo.trim();
      if (jobStatus) formData.jobStatus = jobStatus.trim();
      if (panCardNo) formData.panCardNo = panCardNo.trim();
      if (aadharCardNo) formData.adharNo = aadharCardNo.trim();
      if (extraField1) formData.extraField1 = extraField1.trim();
      if (extraField2) formData.extraField2 = extraField2.trim();
      console.log(formData);
      console.log(id);
  
   
  
      const response = await dispatch(editStaff(formData, id));
      if (response === "Staff updated successfully") {
        setSelectedImage(null);
  
        // Show success alert with two buttons
        Swal.fire({
          icon: "success",
          title: "Staff Updated Successfully",
         
        })
    

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
    } catch (error) {
      // Show error alert for unexpected errors
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
        timer: 5000,
        showConfirmButton: false,
        toast: true,
        position: "top-end",
      });
    }
  };

  return <div>


<section className="bg-white dark:bg-gray-900 py-10 w-full flex justify-center items-center pt-16 ">
        <div className="w-[320px]">
          <form action="mt-3 w-[320px]" onSubmit={handleFormSubmit}>
            <h3 className="text-center text-xl py-3 border-b-2 mb-4 border-indigo-500">
              Edit Staff
            </h3>
            <div className="mb-4">
              <div className="w-full flex justify-center items-center flex-col">
                <Image
                  src={imageData.url}
                  className="w-[100px]"
                  height={550}
                  width={550}
                  alt="logo"
                />
                <ImageUploaderWithCrop
                  setImageData={setImageData}
                  setSelectedImage={setSelectedImage}
                  selectedImage={selectedImage}
                />
              </div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Staff Name
              </label>
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
                  placeholder="Father's Name"
                  onChange={(e) => setFatherName(e.target.value)}
                  className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            )}
            {currSchool?.requiredFieldsStaff?.includes("Husband's Name") && (
              <div className="mb-4">
                <label
                  htmlFor="husbandName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Husaband Name
                </label>
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
                <label
                  htmlFor="dob"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date Of Birth
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
            {currSchool?.requiredFieldsStaff?.includes("Contact No.") && (
              <div className="mb-4">
                <label
                  htmlFor="contact"
                  className="block text-sm font-medium text-gray-700"
                >
                  Contact No.
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
            {currSchool?.requiredFieldsStaff?.includes("E-mail") && (
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  E-mail
                </label>
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
            {currSchool?.requiredFieldsStaff?.includes("Qualification") && (
              <div className="mb-4">
                <label
                  htmlFor="qualification"
                  className="block text-sm font-medium text-gray-700"
                >
                  Qualification
                </label>
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
                <label
                  htmlFor="designation"
                  className="block text-sm font-medium text-gray-700"
                >
                  Designation
                </label>
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
            {currSchool?.requiredFieldsStaff?.includes("Staff Type") && (
              <div className="mb-4">
                <label
                  htmlFor="staffType"
                  className="block text-sm font-medium text-gray-700"
                >
                  Staff Type
                </label>
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
            {currSchool?.requiredFieldsStaff?.includes("Date of Joining") && (
              <div className="mb-4">
                <label
                  htmlFor="doj"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date of Joining
                </label>
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

            {/* Remanin */}

            {currSchool?.requiredFieldsStaff?.includes("Staff ID") && (
              <div className="mb-4">
                <label
                  htmlFor="staffId"
                  className="block text-sm font-medium text-gray-700"
                >
                  Staff ID
                </label>
                <input
                  type="text"
                  id="staffId"
                  value={staffID}
                  placeholder="Staff ID"
                  onChange={(e) => setStaffID(e.target.value)}
                  className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            )}
            {currSchool?.requiredFieldsStaff?.includes("UDISE Code") && (
              <div className="mb-4">
                <label
                  htmlFor="uid"
                  className="block text-sm font-medium text-gray-700"
                >
                  UDISE Code
                </label>
                <input
                  type="text"
                  id="uid"
                  value={udiseCode}
                  placeholder="UID Code"
                  onChange={(e) => setUdiseCode(e.target.value)}
                  className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            )}
            {currSchool?.requiredFieldsStaff?.includes("Office Name") && (
              <div className="mb-4">
                <label
                  htmlFor="schoolName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Office Name
                </label>
                <input
                  type="text"
                  id="schoolName"
                  value={schoolName}
                  placeholder="Office Name"
                  onChange={(e) => setSchoolName(e.target.value)}
                  className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            )}
            {currSchool?.requiredFieldsStaff?.includes("Blood Group") && (
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
            {currSchool?.requiredFieldsStaff?.includes("Dispatch No.") && (
              <div className="mb-4">
                <label
                  htmlFor="dispatchNo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Dispatch No.
                </label>
                <input
                  type="text"
                  id="dispatchNo"
                  value={dispatchNo}
                  placeholder="Dispatch No."
                  onChange={(e) => setDispatchNo(e.target.value)}
                  className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            )}
            {currSchool?.requiredFieldsStaff?.includes("Date of Issue") && (
              <div className="mb-4">
                <label
                  htmlFor="dateOfIssue"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date of Issue.
                </label>
                <input
                  type="text"
                  id="dateOfIssue"
                  value={dateOfIssue}
                  placeholder="Date of Issue"
                  onChange={(e) => setDateOfIssue(e.target.value)}
                  className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            )}
            {currSchool?.requiredFieldsStaff?.includes("IHRMS No.") && (
              <div className="mb-4">
                <label
                  htmlFor="ihrmsNo"
                  className="block text-sm font-medium text-gray-700"
                >
                  IHRMS No.
                </label>
                <input
                  type="text"
                  id="ihrmsNo"
                  value={ihrmsNo}
                  placeholder=""
                  onChange={(e) => setIhrmsNo(e.target.value)}
                  className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            )}
            {currSchool?.requiredFieldsStaff?.includes("Belt No.") && (
              <div className="mb-4">
                <label
                  htmlFor="beltNo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Belt No.
                </label>
                <input
                  type="text"
                  id="beltNo"
                  value={beltNo}
                  placeholder="Belt No."
                  onChange={(e) => setBeltNo(e.target.value)}
                  className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            )}

            {/* Repeat above pattern for other fields */}

            {/* Licence No. */}
            {currSchool?.requiredFieldsStaff?.includes("Licence No.") && (
              <div className="mb-4">
                <label
                  htmlFor="licenceNo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Licence No.
                </label>
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

            {/* ID No. */}
            {currSchool?.requiredFieldsStaff?.includes("ID No.") && (
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

            {/* Job Status */}
            {currSchool?.requiredFieldsStaff?.includes("Job Status") && (
              <div className="mb-4">
                <label
                  htmlFor="jobStatus"
                  className="block text-sm font-medium text-gray-700"
                >
                  Job Status
                </label>
                <input
                  type="text"
                  id="jobStatus"
                  value={jobStatus}
                  placeholder="Job Status"
                  onChange={(e) => setJobStatus(e.target.value)}
                  className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            )}

            {/* PAN Card No. */}
            {currSchool?.requiredFieldsStaff?.includes("PAN Card No.") && (
              <div className="mb-4">
                <label
                  htmlFor="panCardNo"
                  className="block text-sm font-medium text-gray-700"
                >
                  PAN Card No.
                </label>
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

            {/* Aadhar Card No. */}
            {currSchool?.requiredFieldsStaff?.includes("Aadhar Card No.") && (
              <div className="mb-4">
                <label
                  htmlFor="aadharCardNo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Aadhar Card No.
                </label>
                <input
                  type="text"
                  id="aadharCardNo"
                  value={aadharCardNo}
                  placeholder="Aadhar Card No."
                  onChange={(e) => setAadharCardNo(e.target.value)}
                  className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            )}

            {/* Extra Field 1 */}
            {currSchool?.requiredFieldsStaff?.includes("Extra Field 1") && (
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

            {/* Extra Field 2 */}
            {currSchool?.requiredFieldsStaff?.includes("Extra Field 2") && (
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

            {/* Add a submit button */}
            <button
              type="submit"
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Staff
            </button>
          </form>
        </div>
      </section>
  </div>;
}

export default Page;
