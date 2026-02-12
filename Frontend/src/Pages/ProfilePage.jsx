import React, { useState, useRef, useEffect } from "react";
import { Camera, User, Mail } from "lucide-react";
import { useAuthStore } from "../Store/UseStoreAuth";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
const ProfilePage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const { authUser, isUpdatingProfile, updateProfile, checkAuth } = useAuthStore();

  // Cropping states :
  const [crop, setCrop] = useState({ aspect: 1 / 1 });
  const [croppedImage, setCroppedImage] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const imgRef = useRef(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setImageSrc(reader.result); 
    };
  };

  // Handle crop completion
  const handleCropComplete = (crop) => {
    if (imgRef.current && crop.width && crop.height) {
      const croppedImageUrl = getCroppedImg(imgRef.current, crop);
      setCroppedImage(croppedImageUrl); // Set the cropped image
    }
  };

  // Handle crop change
  const handleCropChange = (newCrop) => {
    setCrop(newCrop);
  };

  // Convert cropped image to base64
  const getCroppedImg = (image, crop) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return canvas.toDataURL("image/jpeg");
  };
  const saveCroppedImage = async () => {
    if (croppedImage) {
      setSelectedImage(croppedImage);
      setImageSrc(null);
      await updateProfile({ profilePic: croppedImage });
    }
  };


  return (
    <div className="outer mt-2 max-md:p-5 portrait:pt-3 flex flex-col items-center gap-6">
      <div className="information-section bg-base-200 md:pb-6 h-fit rounded-xl  max-md:w-full w-[50%] flex flex-col items-center">
        <h3 className=" text-center text-xl font-bold text-primary my-5">Profile</h3>
        <p className="my-1 text-center">Your Profile Information</p>
        <div className="my-2 flex justify-center w-full">
          <div
            className={`w-40 h-40 relative rounded-full border-white border-3 ${isUpdatingProfile ? "animate-bounce pointer-events-none" : ""
              }`}
          >
            <img
              className="w-full h-full object-cover mx-auto rounded-full"
              src={
                selectedImage ||
                (authUser?.profilePic && authUser.profilePic.trim() !== ""
                  ? authUser.profilePic
                  : "/assets/user.jpg")
              }
              alt="Profile"
            />
            <div className="absolute right-0 active:bg-primary-content bottom-4 bg-base-200 p-2 outline outline-primary rounded-full">
              <label htmlFor="file-input">
                <Camera className="text-primary  cursor-pointer" />
              </label>
              <input
                type="file"
                id="file-input"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
              />
            </div>
          </div>
        </div>
        <p className={`text-center ${isUpdatingProfile ? "text-blue-500 font-bold animate-pulse text-2xl" : ""}`}>
          {imageSrc
            ? "Please crop the image"
            : (isUpdatingProfile ? "Updating..." : "Click the camera icon to update your photo")}
        </p>
        {/* Image Cropping Section */}
        {imageSrc && (
          <div className="mt-4 flex flex-col gap-3 w-full items-center">
            <ReactCrop className=""
              crop={crop}
              onChange={handleCropChange}
              onComplete={handleCropComplete}
            >
              <img
                ref={imgRef}
                src={imageSrc}
                alt="Crop me"
                style={{ maxWidth: "100%", maxHeight: "300px" }}
              />
            </ReactCrop>
            <button
              onClick={saveCroppedImage}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Save Cropped Image
            </button>
          </div>
        )}
        {/* Other Information section */}
        <div className="bg-red-5 w-full flex gap-3 flex-col items-center justify-center max-md:p-4">
          <div className="w-1/2 max-md:w-full">
            <div className="flex items-center gap-2 self-start my-2">
              <User className="size-5 text-primary" />
              <span>Full name</span>
            </div>
            <div className="h-9 w-full max-md:w-full border-1 flex items-center rounded-lg px-3 text-primary border-primary">
              {authUser?.fullname || ""}
            </div>
          </div>
          <div className="w-1/2 max-md:w-full">
            <div className="flex items-center border-primary gap-2 self-start my-2">
              <Mail className="size-5 text-primary" />
              <span>Email Address</span>
            </div>
            <div className="h-9 w-full max-md:w-full border-1 flex items-center rounded-lg px-3 text-primary border-primary">
              {authUser?.email || ""}
            </div>
          </div>
        </div>
      </div>

      {/* Account Information Card */}
      <div className="w-[50%] max-md:w-full rounded-lg p-6 flex flex-col gap-5 bg-base-200">
        <div className="text-xl font-bold text-primary">Account Information</div>
        <div className="font-semibold items-center text-lg text-primary flex justify-between mb-1">
          <p>Member Since</p>
          <p className="text-sm ">{authUser.createdAt}</p>
        </div>
        <hr className="text-base-300" />
        <div className="flex justify-between">
          <div>Account Status</div>
          <div className="text-green-500 font-bold">Active</div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
