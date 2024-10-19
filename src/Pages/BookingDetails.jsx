import { useContext, useEffect, useState } from "react";
import Whatsapp from "./../Social/WhatsApp";
import { AuthContext } from "./Auth/AuthProvider/AuthProvider";
import moment from "moment";
import { getUserBooking } from "../common/api/bookingApi";
import { Link } from "react-router-dom";
import { IoMdEye } from "react-icons/io";

const BookingDetails = () => {
  const [userData, setUserData] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchAttachments = async () => {
      try {
        const userInfo = await getUserBooking(user?.user_id);
        setUserData(userInfo?.result);
        console.log(userInfo);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAttachments();
  }, [user?.user_id]);

  return (
    <div className="pt-32 ">
      {/* user Information */}
      <div className="pb-10 px-[20px] md:px-[100px]">
        <div className="flex justify-between py-6">
          <p className="text-3xl font-semibold text-[#a04747]">My Bookings</p>
        </div>

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
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {booking?.payment_status}
                    </td>

                    <td className="px-6 py-4 flex justify-center gap-3 hover:cursor-pointer">
                      <Link to={`/singleBookingDetails/${booking?.booking_id}`}>
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
      </div>
      {/* Main Content */}
      <main className=" mx-auto px-[20px] md:px-[100px]  pt-32 bg-white rounded-lg shadow-lg">
        {/* Booking and Payment Details Section */}
        <section className="mb-10">
          <h2 className="text-3xl font-semibold text-[#a04747] mb-4 ">
            Booking & Payment Details
          </h2>
          <p>
            Please use the following bank details to complete your booking
            payment:
          </p>
          <table className="table-auto w-full mt-5 text-left border-collapse border border-gray-300">
            <tbody>
              <tr>
                <th className="border px-4 py-2 bg-gray-100">Bank Name</th>
                <td className="border px-4 py-2">KEIYO BANK (京葉銀行)</td>
              </tr>
              <tr>
                <th className="border px-4 py-2 bg-gray-100">Bank Code</th>
                <td className="border px-4 py-2">0522</td>
              </tr>
              <tr>
                <th className="border px-4 py-2 bg-gray-100">Branch Number</th>
                <td className="border px-4 py-2">251</td>
              </tr>
              <tr>
                <th className="border px-4 py-2 bg-gray-100">Account Number</th>
                <td className="border px-4 py-2">7806251</td>
              </tr>
              <tr>
                <th className="border px-4 py-2 bg-gray-100">
                  Account Holder Name
                </th>
                <td className="border px-4 py-2">
                  SUMIYA ENTERPRISE COMPANY LIMITED <br />
                  Representative Director: AKTER SUMIYA
                  (スマイヤエンタープライズ株式会社 代表取締役 アクタスマイヤ)
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Contact Us Section */}
        <section className="mb-10">
          <h2 className="text-3xl font-semibold text-[#a04747] mb-4">
            Contact Us
          </h2>
          <p>
            If you have any questions regarding your booking, feel free to reach
            out to us at:
          </p>
          <ul className="list-disc ml-5 mt-3">
            <li>
              Email:
              <a
                href="mailto:sumiyaenterprise85@gmail.com"
                className="text-blue-500"
              >
                {" "}
                sumiyaenterprise85@gmail.com
              </a>
            </li>
            <li>
              Phone:
              <a href="tel:+818041364488" className="text-blue-500">
                {" "}
                +818079624964
              </a>
            </li>
            <li>
              <p>
                <strong>WhatsApp:</strong>
                +818041364488
              </p>
            </li>
          </ul>
        </section>

        {/* Thank You Message */}
        <section className="text-center mt-10">
          <h3 className="text-xl ">
            Thank you for choosing{" "}
            <span className="font-semibold">JAPAN TRAVEL AGENCY & TOUR!</span>
          </h3>
          <p className="mt-3">
            We look forward to making your travel experience unforgettable.
          </p>
        </section>
      </main>
      <Whatsapp />
    </div>
  );
};

export default BookingDetails;
