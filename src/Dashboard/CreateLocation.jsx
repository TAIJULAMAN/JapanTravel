/* eslint-disable no-unused-vars */
import { useState, useEffect} from "react";
import ReactQuill from "react-quill";
import { findAllDestination } from "../common/api/destinationApi";
import { BASE_URL } from "../common/constant/constant";
import axios from "axios";

const CreateLocation = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [website, setWebsite] = useState("");
  const [openTime, setOpenTime] = useState("");
  const [description, setDescription] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const [destination, setDestination] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const data = await findAllDestination();
        setDestinations(data);
      } catch (error) {
        setError("Failed to fetch destinations");
        console.error("Error fetching destinations:", error);
      }
    };
    fetchDestinations();
  }, []);

  
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(files);
  };


  const stripTags = (input) => {
    return input.replace(/<\/?[^>]+(>|$)/g, "");
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData();

    // Append text fields to formData
    formData?.append("name", name);
    formData?.append("phone", phone);
    formData?.append("address", address);
    formData?.append("email", "");
    formData?.append("website", website);
    formData?.append("hours", `${openTime}am-${closeTime}pm`);

    
    const cleanDescription = stripTags(description);
    formData?.append("description", cleanDescription);

    formData?.append("destination_id", destination);

    selectedImages?.forEach((image) => {
      formData?.append("attachments", image);
    });

    try {
      const response = await axios.post(
        `${BASE_URL}/api/locations/new`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (!response?.data?.success) {
        throw new Error("Error uploading data");
      }

   
      alert("Location created successfully!");

      setName("");
      setPhone("");
      setAddress("");
      setOpenTime("");
      setDescription("");
      setCloseTime("");
      setDestination("");
      setSelectedImages([]);
    } catch (error) {
      setError("Failed to create location");
      console.error("Error creating location:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold text-[#a04747]">
        Create a Location
      </h1>

      {/* Display error message if any */}
      {error && <p className="text-red-600 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Title and Destination */}
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
            options={destinations?.result}
            placeholder="Select a Destination"
          />
        </div>

        {/* Other input fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* <InputField
            type="text"
            id="phone"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required={false}
          /> */}
          <InputField
            type="text"
            id="address"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          {/* <InputField
            type="website"
            id="website"
            placeholder="Website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            required={false}
          /> */}
        </div>

        {/* Open and Close Time */}
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

        {/* Image upload section */}
        <div className=" items-center border-4 border-[#a04747] border-dotted p-3">
          <input
            multiple
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className=" p-2 border w-full border-gray-300 rounded-md"
          />
         
        </div>

        {/* ReactQuill for description */}
        <ReactQuill
        theme="snow"
          value={description}
          onChange={(value) => setDescription(value)}
          placeholder="Write something..."
          className="h-72 mb-12"
        />

        {/* Publish button */}
        <button
          type="submit"
          className={`px-4 py-2 font-bold text-white rounded-md shadow-2xl ${
            isLoading
              ? "bg-gray-400"
              : "bg-gradient-to-r bg-[#c75f5f] hover:bg-[#a04747]"
          }`}
          disabled={isLoading || destination === null ? true : false}
        >
          {isLoading ? "Publishing..." : "Publish"}
        </button>
      </form>
    </div>
  );
};

// InputField component for reuse
const InputField = ({ type, id, placeholder, value, onChange, label }) => (
  <div className="flex flex-col">
    {label && (
      <label htmlFor={id} className="mb-2 font-medium">
        {label}
      </label>
    )}
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      value={value || ''}
     
      onChange={onChange}
      className="p-2 border border-gray-300 rounded-md w-full"
      required
    />
  </div>
);

// SelectField component for reuse
const SelectField = ({ id, value, onChange, options, placeholder }) => {
  return (
    <select
      id={id}
      value={value ?? ""}
      onChange={onChange}
      className="p-2 border border-gray-300 rounded-md w-full"
    >
      <option value="">{placeholder}</option>
      {options?.length > 0 ? (
        options?.map((option) => (
          <option key={option?.name} value={option?.destination_id}>
            {option?.name}
          </option>
        ))
      ) : (
        <option disabled>No destinations available</option>
      )}
    </select>
  );
};

export default CreateLocation;
