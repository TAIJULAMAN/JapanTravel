import { useContext, useState } from "react";
import { AuthContext } from "../../Pages/Auth/AuthProvider/AuthProvider";
import { FaPlus } from "react-icons/fa"; // Import Plus icon for image upload
import { userImageUpdate } from "../../common/api/ApiKit";
import toast from "react-hot-toast";
import config from "../../config/config";
import { userProfile } from "../../common/api/authApi";

export default function ProfileDetails() {
  const { user, dispatch } = useContext(AuthContext);
  const [selectedImage, setSelectedImage] = useState(null); // State to hold the uploaded image
  // Function to handle image upload

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result); // Set image preview
      };
      reader.readAsDataURL(file); // Read file as data URL to preview
    }
    const form = new FormData();

    form.append("image", file);
    const res = await userImageUpdate(user?.user_id, form);
    if (res.success) {
      const profileData = await userProfile();
      toast.success("Image uploaded successfully");
      // Dispatch the login action
      dispatch({ type: "LOGIN", payload: profileData.result });
    } else {
      toast.error("Image upload failed");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-white shadow-2xl rounded-lg w-full max-w-xl mx-auto p-8 md:p-12 transition-transform duration-500 hover:scale-105 hover:shadow-lg">
      <div className="relative flex items-center justify-center p-4">
        {/* Display the uploaded image or a placeholder */}
        <img
          className="w-32 h-32 rounded-full border-4 border-gray-200 shadow-md object-cover"
          src={
            selectedImage
              ? selectedImage
              : user?.profileImg
              ? `${config.apiUrl}/${user?.profileImg}`
              : "https://via.placeholder.com/150"
          }
          alt="Profile"
        />

        {/* Plus icon to trigger file input */}
        <label
          htmlFor="image-upload"
          className="absolute bottom-7 right-5 cursor-pointer"
        >
          <FaPlus className="text-white bg-[#d94e4e] p-2 rounded-full text-2xl" />
        </label>
        <input
          id="image-upload"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleImageUpload}
        />
      </div>

      {/* Profile Details */}
      <div className="mt-5 space-y-4 text-start w-full">
        <p className="text-lg font-medium text-gray-900">
          First Name:
          <span className="ml-2 text-gray-600">{user?.firstName || "N/A"}</span>
        </p>
        <p className="text-lg font-medium text-gray-900">
          Last Name:
          <span className="ml-2 text-gray-600">{user?.lastName || "N/A"}</span>
        </p>
        <p className="text-lg font-medium text-gray-900">
          Email:
          <span className="ml-2 text-gray-600">{user?.email || "N/A"}</span>
        </p>
        <p className="text-lg font-medium text-gray-900">
          Phone:
          <span className="ml-2 text-gray-600">
            {user?.phoneNumber || "N/A"}
          </span>
        </p>
      </div>
    </div>
  );
}
