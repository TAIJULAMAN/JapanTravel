import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userNewBooking } from "../../common/api/bookingApi";
import { findAllDestination } from "../../common/api/destinationApi";
import Doc from "./../../Components/Doc/Doc";
import { userProfile } from "../../common/api/authApi";
import toast from "react-hot-toast";

const Booking = () => {
  const { bird_art } = Doc();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    destination: "",
    checkIn: "",
    checkOut: "",
    totalPersons: "",
    totalDays: "",
     servent_service: null,
    japaneese_translator: null,
    travel_companion: null,
  });
  const [destinations, setDestinations] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await findAllDestination();
        if (Array.isArray(response?.result)) {
          const formattedDestinations = response?.result?.map((item) => ({
            id: item.destination_id,
            name: item.name,
            locations: item.locations,
          }));
          setDestinations(formattedDestinations);
        } else {
          console.error("Expected response to be an array but got:", response);
        }
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
    };

    fetchDestinations();
  }, []);

  const getCurrentusers = async () => {
    const user = await userProfile();
    setCurrentUser(user?.result);
  };
  useEffect(() => {
    getCurrentusers();
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "radio") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value === "yes" ? true : false,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      address: "Dhaka, Bangladesh",
      booking_status: "pending",
      country: "Bangladesh",
      destination_id: formData.destination,
      email: formData.email,
      first_name: formData.firstName,
      last_name: formData.lastName,
      phone: formData.phone,
      trip_ends: new Date(formData.checkOut).toISOString(),
      trip_starts: new Date(formData.checkIn).toISOString(),
      user_id: currentUser?.user_id,
      total_persons: formData.totalPersons,
      total_days: formData.totalDays,
      servent_service: formData. servent_service,
    japaneese_translator: formData.japaneese_translator,
      travel_companion: formData.travel_companion,
    };

    try {
      await userNewBooking(bookingData);
      toast.success("Your Booking is Successful!");
      navigate("/bookingDetails");
    } catch (error) {
      console.error("Booking failed:", error);
    }
  };

  return (
    <div className="pt-20 pb-0">
      <div
        className="relative  bg-cover bg-center"
        style={{ backgroundImage: `url(${bird_art})` }}
      >
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative z-10 flex items-center justify-center md:justify-end md:pr-52 md:py-20">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Make Your Reservation
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* First Name and Last Name */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Enter your first name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A04747]"
                  />
                </div>
                <div>
                  <label className="block text-gray-600">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Enter your last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A04747]"
                  />
                </div>
              </div>

              {/* Email and Phone Number */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A04747]"
                  />
                </div>
                <div>
                  <label className="block text-gray-600">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A04747]"
                  />
                </div>
              </div>

              {/* Destination */}
              <div>
                <label className="block text-gray-600">Your Destination</label>
                <select
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A04747]"
                >
                  <option value="" disabled>
                    Select a destination
                  </option>
                  {destinations.map((dest) => (
                    <option key={dest.id} value={dest.id}>
                      {dest.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Check-in and Check-out Dates */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600">Check in</label>
                  <input
                    type="date"
                    name="checkIn"
                    value={formData.checkIn}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A04747]"
                  />
                </div>
                <div>
                  <label className="block text-gray-600">Check out</label>
                  <input
                    type="date"
                    name="checkOut"
                    value={formData.checkOut}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A04747]"
                  />
                </div>
              </div>

              {/* Total Persons */}
              <div>
                <label className="block text-gray-600">Total People</label>
                <input
                  type="number"
                  name="totalPersons"
                  placeholder="Enter total number of people"
                  value={formData.totalPersons}
                  onChange={handleChange}
                  min="1"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A04747]"
                />
              </div>

              {/* Total Days */}
              <div>
                <label className="block text-gray-600">Total Days</label>
                <input
                  type="number"
                  name="totalDays"
                  placeholder="Enter total number of days"
                  value={formData.totalDays}
                  onChange={handleChange}
                  min="1"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A04747]"
                />
              </div>

              {/* Travel Guide */}
              <div className="flex justify-between">
                <label className="block text-gray-600">Travel Guide</label>
                <div className="flex gap-5">
                  <div className="flex">
                    <input
                      type="radio"
                      name="servent_service"
                      value="yes"
                      checked={formData.servent_service === true}
                      onChange={handleChange}
                      className="w-4"
                    />
                    <label className="text-sm ml-4">Yes</label>
                  </div>
                  <div className="flex">
                    <input
                      type="radio"
                      name="servent_service"
                      value="no"
                      checked={formData.servent_service === false}
                      onChange={handleChange}
                      className="w-4"
                    />
                    <label className="text-sm ml-4">No</label>
                  </div>
                </div>
              </div>

              {/* Travel Helper */}
              <div className="flex justify-between">
                <label className="block text-gray-600">Travel Helper</label>
                <div className="flex gap-5">
                  <div className="flex">
                    <input
                      type="radio"
                      name="japaneese_translator"
                      value="yes"
                      checked={formData.japaneese_translator === true}
                      onChange={handleChange}
                      className="w-4"
                    />
                    <label className="text-sm ml-4">Yes</label>
                  </div>
                  <div className="flex">
                    <input
                      type="radio"
                      name="japaneese_translator"
                      value="no"
                      checked={formData.japaneese_translator === false}
                      onChange={handleChange}
                      className="w-4"
                    />
                    <label className="text-sm ml-4">No</label>
                  </div>
                </div>
              </div>

              {/* Travel Companion */}
              <div className="flex justify-between">
                <label className="block text-gray-600">Travel Companion</label>
                <div className="flex gap-5">
                  <div className="flex">
                    <input
                      type="radio"
                      name="travel_companion"
                      value="yes"
                      checked={formData.travel_companion === true}
                      onChange={handleChange}
                      className="w-4"
                    />
                    <label className="text-sm ml-4">Yes</label>
                  </div>
                  <div className="flex">
                    <input
                      type="radio"
                      name="travel_companion"
                      value="no"
                      checked={formData.travel_companion === false}
                      onChange={handleChange}
                      className="w-4"
                    />
                    <label className="text-sm ml-4">No</label>
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-[#A04747] text-white py-2 px-4 rounded-md hover:bg-[#A04747] focus:outline-none focus:ring-2 focus:ring-[#A04747]"
                >
                  Book Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
