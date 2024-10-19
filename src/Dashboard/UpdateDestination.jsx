import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import { updateDestination } from "../common/api/destinationApi";
import toast from "react-hot-toast";

const UpdateDestination = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [airport, setAirport] = useState("");
  const [description, setDescription] = useState("");

  const location = useLocation()?.state;
  const {
    name:existingName,
    airport: existinAirport,
    description: existingDescription,
  } = location;

  useEffect(() => {
    setName(existingName);
    setAirport(existinAirport);
    setDescription(existingDescription);
  }, [location, existinAirport, existingDescription, existingName]);

  const stripHtmlTags = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      name,
      description: stripHtmlTags(description),
      airport,
    };

    try {
      await updateDestination(id, updatedData);
      toast.success("Destination Updated Successfully!");
      navigate("/dashboard/alldestination");
    } catch (error) {
      console.error("Error updating destination:", error);
      toast.error("Error updating destination.");
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">
        Update Destination
      </h1>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Title"
            required
            value={name}
            defaultValue={existingName}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border border-gray-300 rounded-md w-full"
          />
          <input
            type="text"
            placeholder="Your Airport name"
            required
            defaultValue={existinAirport}
            value={airport}
            onChange={(e) => setAirport(e.target.value)}
            className="p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <ReactQuill
      
          theme="snow"
          defaultValue={existingDescription}
          onChange={setDescription}
          className="h-72 mb-12"
          placeholder="Write something..."
        />

        <button
          type="submit"
          className="px-4 py-2 bg-gradient-to-r bg-[#a04848] font-bold text-white rounded-md"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateDestination;
