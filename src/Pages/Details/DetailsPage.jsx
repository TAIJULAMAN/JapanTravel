import { FaMapMarkerAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getLocationById } from "../../common/api/locationApi";
import config from "../../config/config";
import toast from "react-hot-toast";
import { getLocationAttachments } from "../../common/api/attachmentApi";
import { getAllLocationsVideoById } from "../../common/api/locationVideoApi";

const DetailsPage = () => {
  const navigate = useNavigate();
  const [currentLocation, setCurrentLocation] = useState({});
  const [attachments, setAttachments] = useState(null);
  const [videos, setVideos] = useState(null);
  console.log(videos);
  const [, setLoading] = useState(true);

  const params = useParams();
  const { apiUrl } = config;

  useEffect(() => {
    const fetchLocationById = async () => {
      try {
        const response = await getLocationById(params?.id);
        setCurrentLocation(response?.result);
        setLoading(false);
      } catch (err) {
        toast.error(err.message || "Failed to fetch users");
        setLoading(false);
      }
    };
    fetchLocationById();
  }, [params.id]);

  useEffect(() => {
    const fetchLocationAttachmentById = async () => {
      try {
        const response = await getLocationAttachments(params?.id);
        setAttachments(response?.result);
        setLoading(false);
      } catch (err) {
        toast.error(err.message || "Failed to fetch users");
        setLoading(false);
      }
    };
    fetchLocationAttachmentById();
  }, [params.id]);

  useEffect(() => {
    const fetchLocationVideoById = async () => {
      try {
        const response = await getAllLocationsVideoById(params?.id);
        setVideos(response?.result);
        // setAttachments(response?.result);
        setLoading(false);
      } catch (err) {
        toast.error(err.message || "Failed to fetch users");
        setLoading(false);
      }
    };
    fetchLocationVideoById();
  }, [params.id]);

  const {
    name = "Unknown Name",
    default_image = "default.jpg",
    description = "No description available.",
    hours = "Not available",
    address = "No address provided",
  } = currentLocation;

  const handleUser = () => {
    const userToken = localStorage.getItem("authToken");
    if (!userToken) navigate("/signin");
    else navigate("/booking");
  };

  return (
    <div className="bg-gray-100 py-10 px-[20px] md:px-[100px]">
      <div className="container mx-auto mt-16 md:mt-24">
        {/* Main grid container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left section with image and description */}
          <div className="lg:col-span-2   rounded-lg p-6">
            <h1 className="text-3xl font-bold mb-4">{name}</h1>

            {/* Image */}

            <img
              src={`${apiUrl}/${default_image}`}
              alt="Tokyu Plaza"
              className="w-full md:h-[450px] object-cover rounded-lg mb-4"
            />
          </div>

          {/* Right section with overview details */}
          <div className="  rounded-lg p-6 space-y-4  md:mt-12">
            <h2 className="text-2xl md:text-4xl font-semibold">Overview</h2>

            {/* Address */}
            <div className="text-gray-700 md:text-xl">
              <h3 className="font-semibold flex items-center gap-2 text-[#404040]">
                {" "}
                <FaMapMarkerAlt />
                Address:
              </h3>
              <p>{address}</p>
            </div>

            {/* Hours */}
            <div className=" font-semibold text-[#404040]">
              <h3 className="font-semibold text-xl">Hours:</h3>
              <p>{hours}</p>
            </div>
            <div className="mt-5 mr-7 md:mr-20  ">
              <button
                className="text-xl shadow-lg text-[#A04747] font-semibold hover:bg-[#A04747] hover:text-white  bg-white px-5 py-2 rounded-md transition duration-300 ease-in-out"
                onClick={handleUser}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>

        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {attachments?.map((pic) => (
              <img
                key={pic?.location_attachments_id}
                src={`${apiUrl}/${pic?.attachment_url}`}
                alt="Tokyu Plaza"
                className="md:w-[540px] md:h-[288px] object-cover  rounded-lg mb-4"
              />
            ))}
          </div>

          {videos?.length > 0 && (
            <div>
              <p className="text-xl font-semibold my-4">Videos</p>
              <div className="grid grid-cols-2 gap-6">
                {videos.map((vid) => (
                  <video
                    key={vid?.location_vids_id}
                    autoPlay
                    controls
                    loop
                    muted
                    src={`${apiUrl}/${vid?.vid_url}`}
                    className="w-full h-64 object-cover rounded-lg"
                  ></video>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <p className="text-gray-600 mb-4 md:px-6">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
