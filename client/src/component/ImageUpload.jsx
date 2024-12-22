import React, { useState, useRef } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Swal from "sweetalert2";
import axios from "axios";

const ImageUploaderWithCrop = ({ setImageData ,selectedImage,setSelectedImage }) => {
  // const [selectedImage, setSelectedImage] = useState(null); // Base64 image data
  const [crop, setCrop] = useState({ unit: "%", width: 75, height: 75, aspect: 1, x: 12.5, y: 12.5 }); // Increased crop size

  const [completedCrop, setCompletedCrop] = useState(null); // Holds the completed crop data
  const imageRef = useRef(null); // Reference to the image element

  // Handles image file selection and converts it to base64
  const handlePhotoFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result); // Store the base64 image data
      };
      reader.readAsDataURL(file); // Convert file to base64
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please select a valid image file!",
      });
    }
  };

  // Called when the image is loaded, sets the crop area based on image dimensions
  const onImageLoad = () => {
    if (imageRef.current) {
      const { naturalWidth, naturalHeight } = imageRef.current;
      setCrop((prevCrop) => ({
        ...prevCrop,
        width: naturalWidth > 800 ? 75 : 50, // Adjust based on image size
        height: naturalHeight > 800 ? 75 : 50, // Adjust based on image size
        aspect: naturalWidth / naturalHeight,
      }));
    }
  };
  

  // Updates the crop state as the user drags the crop area
  const onCropChange = (newCrop) => {
    setCrop(newCrop);
  };

  // This is triggered when cropping is completed (after the user finishes selecting the crop area)
  const onCropComplete = (newCrop) => {
    setCompletedCrop(newCrop);
  };

  // Function to get the cropped image as a Blob
  const getCroppedImage = async (crop) => {
    if (!imageRef.current || !crop.width || !crop.height) return null;

    const canvas = document.createElement("canvas");
    const scaleX = imageRef.current.naturalWidth / imageRef.current.width;
    const scaleY = imageRef.current.naturalHeight / imageRef.current.height;

    canvas.width = crop.width;
    canvas.height = crop.height;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(
      imageRef.current,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, "image/jpeg");
    });
  };

  // Upload the cropped image
  const handleUpload = async () => {
    if (!completedCrop) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please crop the image first!",
      });
      return;
    }

    const croppedBlob = await getCroppedImage(completedCrop);
    if (!croppedBlob) return;

    const formData = new FormData();
    formData.append("file", croppedBlob);

    Swal.fire({
      title: "Uploading...",
      text: "Please wait while we upload your image.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await axios.post(
        "https://api.cardpro.co.in/image/upload", // Replace with your image upload API
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      Swal.close();

      if (response.data.success) {

        const { public_id, url } = response.data.thumbnailImage;
        setImageData({ publicId: public_id, url: url });
        Swal.fire({
          icon: "success",
          title: "Uploaded!",
          text: "Image uploaded successfully!",
        });
      }
    } catch (error) {
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: "Something went wrong. Please try again later.",
      });
    }
  };

  return (
    <div>
      <label
        htmlFor="dropzone-file"
        className="flex items-center px-3 py-3 mx-auto mt-6 text-center border-2 border-dashed rounded-lg cursor-pointer"
      >
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={handlePhotoFileSelect}
        />
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
        <h2 className="mx-3 text-gray-400">Upload Your Image</h2>
      </label>

      {selectedImage && (
        <div className="mt-4 ">
          <ReactCrop
            src={selectedImage}
            crop={crop}
            onChange={onCropChange}
            onComplete={onCropComplete}
            minWidth={100} // Minimum crop width
            minHeight={100} // Minimum crop height
          >
            <img
              ref={imageRef}
              src={selectedImage}
              onLoad={onImageLoad}
              alt="Crop Preview"
            />
          </ReactCrop>
          <p
            onClick={handleUpload}
            className="mt-4 px-4 py-2 cursor-pointer bg-blue-500 text-white rounded"
          >
            Upload
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageUploaderWithCrop;
