import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  updateLocation,
  updateLocationDefaultImage,
} from "../common/api/locationApi";
import toast from "react-hot-toast";
import {
  deleteLocationAttachment,
  getLocationAttachments,
  uploadAttachment,
} from "../common/api/attachmentApi";
import config from "../config/config";
import { ImCross } from "react-icons/im";
import { AiOutlinePlus } from "react-icons/ai";
import {
  deleteLocationVideo,
  getAllLocationsVideoById,
  uploadLocationVideo,
} from "../common/api/locationVideoApi";
import { FaSpinner } from "react-icons/fa";

function UpdateLocation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [openTime, setOpenTime] = useState("");
  const [description, setDescription] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [destination, setDestination] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [defaultImage, setDefaultImage] = useState(null);
  const [file, setFile] = useState(null);
  const [attachment, setAttatchment] = useState(null);
  const [videos, setVideos] = useState(null);
  const [loading, setLoading] = useState(false);
  const [getVideo, setGetVideo] = useState(true);
  const [getAllAttachments, setGetAllAttachments] = useState(true);
  const { apiUrl } = config;
  const location = useLocation()?.state;
  const [newAttachment, setNewAttachment] = useState(null);
  const [attachmentPreview, setAttatchmentsPreview] = useState(null);

  const {
    name: existingName,
    address: existingAddress,
    openTime: existingOpenTime,
    closeTime: existingCloseTime,
    description: existingDescription,
  } = location;

  useEffect(() => {
    if (location?.default_image) {
      setDefaultImage(location?.default_image);
    }
  }, [location?.default_image]);

  const handleImageChange = (e) => {
    const selectedFile = e.target?.files[0];

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(selectedFile);
      setFile(selectedFile);
    }
  };

  const handleVideoUpload = async (e) => {
    const videoFile = e.target.files[0];
    console.log(videoFile);
    if (videoFile) {
      setLoading(true);
      const formData = new FormData();
      formData.append("video", videoFile);
      formData.append("location_id", location?.location_id);
      try {
        const response = await uploadLocationVideo(formData);
        console.log(response);

        toast.success("Video uploaded successfully!");
        setLoading(false);
      } catch (error) {
        toast.error(error);
      }
      setGetVideo(true);
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("attachment", file);
    try {
      const response = await updateLocationDefaultImage(id, formData);
      if (response?.result?.location_id) {
        setDefaultImage(response?.result?.default_image);
        toast.success("Image uploaded successfully!");
      }

      console.log("Photo uploaded", response);
    } catch (error) {
      toast.error("Failed to upload image.", error);
    } finally {
      setSelectedImage(null);
    }
  };

  const handleNewAttachment = (e) => {
    const selectedFile = e.target?.files[0];

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAttatchmentsPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
      setNewAttachment(selectedFile);
    }
  };

  const handleUploadAttachment = async () => {
    const formData = new FormData();
    formData.append("image", newAttachment);
    formData.append("location_id", id);
    try {
      const response = await uploadAttachment(formData);
      if (response?.success) {
        toast.success("Attachment uploaded successfully!");
      }
    } catch (error) {
      toast.error("Failed to upload image.", error);
    } finally {
      setGetAllAttachments(true);
      setAttatchmentsPreview(null);
    }
  };

  useEffect(() => {
    const fetchAttachments = async () => {
      try {
        const photos = await getLocationAttachments(id);

        setAttatchment(photos?.result);
      } catch (err) {
        if(err.message)
        toast.error("Error getting attachments");
      } finally {
        setGetAllAttachments(false);
      }
    };
    if (getAllAttachments) fetchAttachments();
  }, [id, getAllAttachments]);

  useEffect(() => {
    setName(existingName);
    setAddress(existingAddress);
    setOpenTime(existingOpenTime);
    setCloseTime(existingCloseTime);
    setDescription(existingDescription);
  }, [
    location,
    existingName,
    existingCloseTime,
    existingOpenTime,
    existingAddress,
    existingDescription,
  ]);

  //   fetch video
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const videos = await getAllLocationsVideoById(id); // Fetch videos by location ID
        setVideos(videos?.result); // Update the state with fetched videos
      } catch (err) {
        console.log("Error fetching videos: ", err);
      }
      setGetVideo(false); // Only fetch videos once to save performance
    };
    if (getVideo) fetchVideos();
  }, [id, getVideo]);

  const stripHtmlTags = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const locationData = {
      name,
      address,
      openTime,
      closeTime,
      description: stripHtmlTags(description),
    };

    try {
      await updateLocation(id, locationData);
      setIsLoading(true);
      toast.success("Location updated successfully!");
      navigate("/dashboard/allocation");
    } catch (error) {
      console.error("Error updating location:", error);
      toast.error("Error updating location.");
    }
  };

  const handleRemoveAttachment = async (attachmentId) => {
    try {
      await deleteLocationAttachment(attachmentId);
      setAttatchment((prevAttachments) =>
        prevAttachments.filter(
          (photo) => photo.location_attachments_id !== attachmentId
        )
      );
      toast.success(`Attachment deleted successfully.`);
    } catch (error) {
      console.error("Error deleting the attachment:", error);
    }
  };
  const handleRemoveVideo = async (videoId) => {
    try {
      await deleteLocationVideo(videoId);
      setVideos((prevVideos) =>
        prevVideos.filter((vid) => vid?.location_vids_id !== videoId)
      );

      toast.success("Video deleted successfully.");
    } catch (error) {
      console.error("Error deleting the video: ", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 max-w-4xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold text-[#a04747]">
        Update Location
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            type="text"
            id="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <SelectField
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            options={destination?.result}
            placeholder="Select a Destination"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            type="text"
            id="address"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            type="time"
            id="openTime"
            label="Open Time"
            value={openTime}
            onChange={(e) => setOpenTime(e.target.value)}
          />
          <InputField
            type="time"
            id="closeTime"
            label="Close Time"
            value={closeTime}
            onChange={(e) => setCloseTime(e.target.value)}
          />
        </div>

        <ReactQuill
          theme="snow"
          value={description}
          onChange={(value) => setDescription(value)}
          placeholder="Write something..."
          className="h-72 mb-12"
        />

        <button
          type="submit"
          className={`px-4 py-2 font-bold text-white rounded-md shadow-2xl ${
            isLoading
              ? "bg-gray-400"
              : "bg-gradient-to-r bg-[#c75f5f] hover:bg-[#a04747]"
          }`}
          disabled={isLoading || location === null}
        >
          {isLoading ? "Publishing..." : "Publish"}
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3   gap-20 pt-10 pb-5">
        <div className="">
          <img
            src={`${apiUrl}/${defaultImage}`}
            alt="Default Image"
            className="w-full h-64 object-cover rounded-lg shadow-md"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="relative border-4 border-[#a04747] border-dotted p-3 my-5 w-64 h-64 flex flex-col justify-center items-center rounded-lg cursor-pointer">
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Selected"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className="text-gray-400 flex flex-col justify-center items-center ">
                <AiOutlinePlus className="text-6xl" />
                <p className="mt-2">Click to upload</p>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleImageChange}
            />
          </div>
        </div>
      </div>

      <div className="w-full mb-5">
        <button
          onClick={handleUpload}
          className="bg-[#c75f5f] hover:bg-[#a04747] text-white px-4 py-2 rounded-md font-semibold w-full "
        >
          Upload Image
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {attachment?.map((photo, idx) => (
          <div
            key={photo?.location_attachments_id}
            className="relative w-full h-64 mt-5 overflow-hidden rounded-lg shadow-lg"
          >
            <button
              onClick={() =>
                handleRemoveAttachment(photo?.location_attachments_id)
              }
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center transition duration-200"
            >
              <ImCross />
            </button>
            <img
              src={`${apiUrl}/${photo?.attachment_url}`}
              alt={`Attachment ${idx}`}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:">
        <div className="relative border-4 border-[#a04747] border-dotted p-3 my-5 w-64 h-64 flex flex-col justify-center items-center rounded-lg cursor-pointer">
          {attachmentPreview ? (
            <img
              src={attachmentPreview}
              alt="Selected"
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <div className="text-gray-400 flex flex-col justify-center items-center ">
              <AiOutlinePlus className="text-6xl" />
              <p className="mt-2">Click to upload</p>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleNewAttachment}
          />
        </div>
      </div>

      <div className="w-full flex justify-center mb-5">
        <button
          onClick={handleUploadAttachment}
          className="bg-[#c75f5f] hover:bg-[#a04747] text-white px-4 py-2 rounded-md font-semibold w-full "
        >
          Upload Image
        </button>
      </div>

      {/* video upload section */}
      <p className="text-xl font-semibold ">Upload Video</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
        <div className="relative border-4 border-[#a04747] border-dotted p-3 my-5 w-64 h-64 flex flex-col justify-center items-center rounded-lg cursor-pointer">
          <div className="text-gray-400 flex flex-col justify-center items-center">
            {loading ? (
              <>
                <FaSpinner className="animate-spin text-6xl" />
              </>
            ) : (
              <>
                {" "}
                <AiOutlinePlus className="text-6xl" />
              </>
            )}

            <p className="mt-2">
              {loading ? "Uploading Video" : `Click to upload`}
            </p>
          </div>
          <input
            type="file"
            accept="video/*"
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleVideoUpload}
          />
        </div>
        {videos?.map((vid) => (
          <div
            key={vid?.location_vids_id}
            className="relative w-full h-64 mt-5 overflow-hidden rounded-lg shadow-lg"
          >
            <button
              onClick={() => handleRemoveVideo(vid?.location_vids_id)} // Call handleRemoveVideo on button click
              className=""
            >
              <ImCross className="text-red-500" />
            </button>
            <video
              autoPlay
              controls
              loop
              muted
              src={`${apiUrl}/${vid?.vid_url}`}
              className="w-full h-64 object-cover rounded-lg"
            ></video>
          </div>
        ))}
      </div>
    </div>
  );
}

const InputField = ({ type, id, placeholder, value, onChange, label }) => (
  <div>
    {label && (
      <label htmlFor={id} className="block mb-2">
        {label}
      </label>
    )}
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="border border-gray-300 rounded p-2 w-full"
    />
  </div>
);

const SelectField = ({ id, value, onChange, options, placeholder }) => (
  <div>
    <select
      id={id}
      value={value}
      onChange={onChange}
      className="border border-gray-300 rounded p-2 w-full"
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options &&
        options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
    </select>
  </div>
);

export default UpdateLocation;
