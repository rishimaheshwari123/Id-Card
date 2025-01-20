"use client";

import React, { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import axios from "../../../axiosconfig";
import Swal from "sweetalert2";

const StudentPhotoCapture = ({ setCroppedPhoto, aspectRatio }) => {
  const [photo, setPhoto] = useState(null);
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const cropperRef = useRef(null);
  const [cameraFacingMode, setCameraFacingMode] = useState("environment"); 
  const [isCameraAccessible, setIsCameraAccessible] = useState(true);
  const webcamRef = useRef(null);

  useEffect(() => {
    const requestCameraPermission = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });
        setIsCameraAccessible(true);
      } catch (error) {
        setIsCameraAccessible(false);
        Swal.fire({
          title: "Camera Permission Denied",
          text: "Please enable camera access in your browser settings to capture photos.",
          icon: "error",
        });
      }
    };
    requestCameraPermission();
  }, []);

  const handleCaptureClick = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setPhoto(imageSrc);
      setIsCropModalOpen(true);
    }
  };

  const handleCrop = () => {
    if (cropperRef.current && cropperRef.current.cropper) {
      const croppedDataUrl = cropperRef.current.cropper.getCroppedCanvas().toDataURL();
      setCroppedPhoto(croppedDataUrl);
      setIsCropModalOpen(false);
    }
  };

  const handleCameraSwitch = () => {
    setCameraFacingMode((prevMode) => (prevMode === "user" ? "environment" : "user"));
  };

  if (!isCameraAccessible) {
    return (
      <div className="text-center">
        <p className="text-red-500">Camera access is blocked. Please enable camera access to use the feature.</p>
      </div>
    );
  }

  return (
    <div className="text-center">
      <Webcam
        ref={webcamRef}
        audio={false}
        className="rounded-lg border border-gray-300 shadow-lg"
        screenshotFormat="image/jpeg"
        videoConstraints={{
          facingMode: cameraFacingMode,
        }}
      />
      <div className="mt-4 flex justify-center gap-4">
        <button
          onClick={handleCaptureClick}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
        >
          Capture Photo
        </button>
        <button
          onClick={handleCameraSwitch}
          className="px-6 py-2 bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-700"
        >
          Switch Camera
        </button>
      </div>

      {isCropModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-11/12 max-w-lg">
            <h3 className="text-xl font-semibold mb-4">Crop Your Photo</h3>
            <Cropper
              src={photo}
              className="w-full h-64 rounded border"
              initialAspectRatio={aspectRatio}
              aspectRatio={aspectRatio}
              guides={false}
              ref={cropperRef}
            />
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => setIsCropModalOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleCrop}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Crop & Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const StudentDisplay = () => {
  const [students, setStudents] = useState([]);
  const [currentStudentIndex, setCurrentStudentIndex] = useState(0);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [croppedPhoto, setCroppedPhoto] = useState(null);
  const [studentClass, setStudentClass] = useState("");
  const [stuSection, setSection] = useState("");
  const [stuCourse, setCourse] = useState("");
  const [aspectRatio, setAspectRatio] = useState(1);

  const handleAspectRatioChange = (e) => {
    const selectedRatio = e.target.value === "passport" ? 1.34 : 1;
    setAspectRatio(selectedRatio);
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const vendor = query.get("vendor");
    const className = query.get("class");
    const section = query.get("section");
    const course = query.get("course");

    if (className) setStudentClass(className);
    if (section) setSection(section);
    if (course) setCourse(course);

    if (vendor) {
      axios
        .get(`/user/students/no-photo/${vendor}?studentClass=${studentClass}&section=${stuSection}&course=${stuCourse}`)
        .then((response) => setStudents(response.data))
        .catch((error) => console.error("Error fetching students:", error));
    }
  }, [currentStudentIndex]);

  const handlePhotoCaptured = (photoUrl) => setCapturedPhoto(photoUrl);

  const handleNextStudent = () => {
    setCurrentStudentIndex((prevIndex) => (prevIndex + 1) % students.length);
    setCroppedPhoto(null);
  };

  const handlePreviousStudent = () => {
    setCurrentStudentIndex((prevIndex) => (prevIndex - 1 + students.length) % students.length);
    setCroppedPhoto(null);
  };

  const handleUpdatePhoto = async (studentId) => {
    if (croppedPhoto) {
      Swal.fire({
        title: "Uploading...",
        text: "Please wait while the image is being uploaded.",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      try {
        const formData = new FormData();
        const response = await fetch(croppedPhoto);
        const blob = await response.blob();
        formData.append("file", new File([blob], "photo.jpg"));

        const uploadResponse = await axios.post("/image/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        Swal.close();

        if (uploadResponse.data.success) {
          const { public_id, url } = uploadResponse.data.thumbnailImage;

          await axios.put(`/user/students/${studentId}/avatar`, {
            publicId: public_id,
            url: url,
          });
        }
      } catch (error) {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Upload Failed",
          text: "Failed to upload or update the image. Please try again later.",
        });
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "No Image Selected",
        text: "Please capture a photo before uploading.",
      });
    }
  };

  if (students.length === 0) {
    return (
      <div className="text-center mt-8 text-gray-600">
        <p>No students without photos.</p>
      </div>
    );
  }

  const currentStudent = students[currentStudentIndex];
  const upcomingStudents = students.slice(currentStudentIndex + 1, currentStudentIndex + 4);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 w-11/12 max-w-md">
        <h2 className="text-2xl font-bold">{currentStudent?.name}</h2>
        <div className="flex w-full justify-center mt-4">
          <img src={currentStudent?.avatar.url} alt="" className="h-[100px]" />
          <div className="ml-4 text-start">
            {currentStudent?.class && (
              <p>
                <span className="text-xl font-semibold">Class:</span> {currentStudent?.class}
              </p>
            )}
            {currentStudent?.section && (
              <p>
                <span className="text-xl font-semibold">Section:</span> {currentStudent?.section}
              </p>
            )}
          </div>
        </div>
        <p className="text-gray-600 mt-2">
          School: {currentStudent?.school?.name}
        </p>
        <select onChange={handleAspectRatioChange} className="mt-4 p-2 border rounded w-full">
          <option value="passport">Passport</option>
          <option value="square">Square</option>
        </select>
        <StudentPhotoCapture setCroppedPhoto={setCroppedPhoto} aspectRatio={aspectRatio} />

        {croppedPhoto && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Cropped Photo Preview:</h3>
            <img
              src={croppedPhoto}
              alt="Cropped Preview"
              className="mt-2 rounded-lg border"
            />
            <button
              onClick={() => handleUpdatePhoto(currentStudent._id)}
              className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700"
            >
              Update Photo
            </button>
          </div>
        )}
        <div className="mt-4">
          <h4 className="font-semibold">Upcoming Students:</h4>
          <ul>
            {upcomingStudents.map((student, index) => (
              <li key={index}>{student.name}</li>
            ))}
          </ul>
        </div>
        <div className="flex justify-between mt-6">
          <button
            onClick={handlePreviousStudent}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-700"
          >
            Previous Student
          </button>
          <button
            onClick={handleNextStudent}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
          >
            Next Student
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentDisplay;
