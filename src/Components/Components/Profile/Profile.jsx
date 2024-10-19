import { useState } from "react";
import ProfileDetails from "../../ProfileDetails/ProfileDetails";
import UserBookings from "../../UserBookings/UserBookings";
const Profile = () => {
  const [activeTab, setActiveTab] = useState("Profile Details");

  return (
    <div className="bg-white pt-40 pb-20 px-[20px] md:px-[100px]">
      {/* Tabs */}
      <ul className="flex bg-gray-100">
        <li
          onClick={() => setActiveTab("Profile Details")}
          className={`tab w-full text-center text-base py-3 px-6 cursor-pointer ${
            activeTab === "Profile Details"
              ? "text-white font-bold bg-[#d94e4e]"
              : "text-gray-600 font-semibold"
          }`}
        >
          Profile Details
        </li>
        <li
          onClick={() => setActiveTab("Bookings")}
          className={`tab w-full text-center text-base py-3 px-6 cursor-pointer ${
            activeTab === "Bookings"
              ? "text-white font-bold bg-[#d94e4e]"
              : "text-gray-600 font-semibold"
          }`}
        >
          Bookings
        </li>
      </ul>

      {/* Tab Content */}
      <div className="mt-10">
        {activeTab === "Profile Details" && (
          <div id="Profile Details" className="tab-content">
            <h1 className="text-4xl font-bold text-[#d94e4e] pb-10 text-center">
              Profile Details
            </h1>
            <ProfileDetails />
          </div>
        )}
        {activeTab === "Bookings" && (
          <div id="Bookings" className="tab-content">
            <h1 className="text-4xl font-bold text-[#d94e4e] pb-10 text-center">
              Booking Details
            </h1>
            <UserBookings />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
