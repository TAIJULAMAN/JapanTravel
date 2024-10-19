import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { FaCcAmazonPay } from "react-icons/fa";
import {
  bookingUpdate,
  deleteBooking,
  findAllBookings,
} from "../common/api/bookingApi";
import toast from "react-hot-toast";
import Pagination from "../Sharred/Pagination";
import { IoMdEye } from "react-icons/io";
import { Link } from "react-router-dom";

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingsPerPage] = useState(10);
  const [error, setError] = useState(null);
  const [refetch, setRefetch] = useState(true);
  console.log(bookings);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await findAllBookings();
        setBookings(response.result);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch bookings");
        setLoading(false);
      }
      setRefetch(false);
    };
    if (refetch) {
      fetchBookings();
    }
  }, [refetch]);

  const handleBookingUpdate = async (bookingId, updateKey, value) => {
    const updatedData = {};
    if (updateKey === "payment_status") {
      updatedData.payment_status = value;
    }
    if (updateKey === "booking_status") {
      updatedData.booking_status = value;
    }
    try {
      await bookingUpdate(bookingId, updatedData);
      setRefetch(true);
      toast.success("Booking payment status updated successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (userId) => {
    if (!userId) {
      toast.error("User ID is not provided");
      return;
    }

    try {
      await deleteBooking(userId);
      setRefetch(true);
      toast.success("Booking deleted successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Pagination logic
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = bookings.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="flex justify-between py-6">
        <p className="text-3xl font-semibold text-[#a04747]">All Bookings</p>
      </div>

      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-500">
          <thead className="text-xl text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                SL
              </th>
              <th scope="col" className="px-6 py-3">
                User Name
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Booking Status{" "}
              </th>
              <th scope="col" className="px-6 py-3">
                Country From{" "}
              </th>
              <th scope="col" className="px-6 py-3">
                Payment Status{" "}
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentBookings.length > 0 ? (
              currentBookings.map((booking, index) => (
                <tr
                  key={booking?.booking_id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-xl font-medium"
                >
                  <td className="px-6 py-4">{index + 1}</td>

                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                    {booking?.first_name} {booking?.last_name}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                    {booking?.phone}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 text-center dark:text-white">
                    {booking?.booking_status}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                    {booking?.country}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 text-center dark:text-white">
                    {booking?.payment_status}
                  </td>
                  <td className="px-6 py-4 flex justify-center items-center gap-3 hover:cursor-pointer">
                    <MdDelete
                      onClick={() => {
                        handleDelete(booking?.booking_id);
                      }}
                      className="text-3xl text-red-600"
                    />
                    {booking?.payment_status !== "paid" && (
                      <FaCcAmazonPay
                        className="text-3xl text-green-600"
                        onClick={(e) => {
                          e.preventDefault();
                          handleBookingUpdate(
                            booking?.booking_id,
                            "payment_status",
                            "paid"
                          );
                        }}
                      />
                    )}
                    <IoCheckmarkDoneCircle
                      className="text-3xl text-green-600"
                      onClick={(e) => {
                        e.preventDefault();
                        handleBookingUpdate(
                          booking?.booking_id,
                          "booking_status",
                          "confirmed"
                        );
                      }}
                    />
                    <MdCancel
                      className="text-3xl text-red-600"
                      onClick={(e) => {
                        e.preventDefault();
                        handleBookingUpdate(
                          booking?.booking_id,
                          "booking_status",
                          "cancelled"
                        );
                      }}
                    />
                    <Link to={`/dashboard/booking/${booking?.booking_id}`}>
                      <IoMdEye className="text-3xl hover:text-green-600" />
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

      {/* Pagination */}
      {bookings.length > 0 && (
        <div className="mt-8 flex justify-end p-4">
          <Pagination
            usersPerPage={bookingsPerPage}
            totalUsers={bookings.length}
            currentPage={currentPage}
            paginate={paginate}
          />
        </div>
      )}
    </div>
  );
};

export default AllBookings;
