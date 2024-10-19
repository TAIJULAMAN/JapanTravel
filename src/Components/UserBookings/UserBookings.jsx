import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Pages/Auth/AuthProvider/AuthProvider";
import {  getUserBooking } from "../../common/api/bookingApi";
import moment from "moment";
import { Link } from "react-router-dom";
import { IoMdEye } from "react-icons/io";

const UserBookings = () => {
  const [userData, setUserData] = useState(null);

  const { user } = useContext(AuthContext);
  useEffect(() => {
    const fetchAttachments = async () => {
      try {
        const userInfo = await getUserBooking(user?.user_id);
        setUserData(userInfo?.result);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAttachments();
  }, [user?.user_id]);

  return (
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="min-w-full text-sm text-left text-gray-500">
            <thead className="text-xl text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  SL
                </th>
                <th scope="col" className="px-6 py-3">
                  Booking ID
                </th>
                {/* <th scope="col" className="px-6 py-3">
                  User Name
                </th> */}
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone
                </th>
                <th scope="col" className="px-6 py-3">
                  Booking Start{" "}
                </th>
                <th scope="col" className="px-6 py-3">
                  Booking End{" "}
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>

                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {userData?.length > 0 ? (
                userData?.map((booking, index) => (
                  <tr
                    key={booking?.booking_id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-xl font-medium"
                  >
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {booking?.booking_id}
                    </td>
                    {/* <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {booking?.first_name} {booking?.last_name}
                    </td> */}
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {booking?.email}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {booking?.phone}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {moment(booking?.trip_starts).format("MMMM Do, YYYY")}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {moment(booking?.trip_ends).format("MMMM Do, YYYY")}
                    </td>
                    <td className="px-6 py-4 text-center font-medium text-gray-900 dark:text-white">
                      {booking?.payment_status}
                    </td>

                    <td className="px-6 py-4 justify-center items-center flex gap-3 hover:cursor-pointer">
                     <Link 
                     to={`/singleBookingDetails/${booking?.booking_id}`}
                     >
                     <IoMdEye
                       className="text-3xl text-green-600"
                     />
                     </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-gray-500 py-6">
                    No Bookings Available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
  );
};

export default UserBookings;
