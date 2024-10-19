import { useEffect, useState } from "react";
import { getUserSingleBooking } from "../../common/api/bookingApi";
import { useParams } from "react-router-dom";
import moment from "moment";
import { findSingleDestination } from "../../common/api/destinationApi";

const SingleBookingDetails = () => {
  const [bookingInfo, setBookingInfo] = useState(null);
  console.log(bookingInfo);
  const [destinationName, setDestinationName] = useState(null);
  const params = useParams();

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const bookingInfo = await getUserSingleBooking(params?.id);
        setBookingInfo(bookingInfo?.result);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBookingDetails();
  }, [params.id]);

  useEffect(() => {
    const fetchDestinationName = async () => {
      if (bookingInfo?.destination_id) {
        try {
          const destination = await findSingleDestination(
            bookingInfo?.destination_id
          );
          setDestinationName(destination?.result?.name);
        } catch (err) {
          console.log(err);
        }
      }
    };

    fetchDestinationName();
  }, [bookingInfo?.destination_id]);

  return (
    <div className="min-h-screen pt-40 pb-20 px-[20px] md:px-[100px]">
      <main className="mx-auto px-[20px] md:px-[100px] pt-32 rounded-lg shadow-lg">
        {/* Booking and Payment Details Section */}
        <section className="mb-10">
          <h2 className="text-3xl font-semibold text-[#a04747] mb-4">
            {bookingInfo?.first_name} {bookingInfo?.last_name} Booking Details
          </h2>

          <table className="table-auto w-full mt-5 text-left border-collapse border border-gray-300">
            <tbody>
              <tr>
                <th className="border px-4 py-2 bg-gray-100">Booking id</th>
                <td className="border px-4 py-2">{bookingInfo?.booking_id}</td>
              </tr>
              <tr>
                <th className="border px-4 py-2 bg-gray-100">Email</th>
                <td className="border px-4 py-2">{bookingInfo?.email}</td>
              </tr>
              <tr>
                <th className="border px-4 py-2 bg-gray-100">Phone</th>
                <td className="border px-4 py-2">{bookingInfo?.phone}</td>
              </tr>
              <tr>
                <th className="border px-4 py-2 bg-gray-100">Destination</th>
                <td className="border px-4 py-2">{destinationName}</td>
              </tr>

              <tr>
                <th className="border px-4 py-2 bg-gray-100">
                  Trip Start Date
                </th>
                <td className="border px-4 py-2">
                  {moment(bookingInfo?.trip_starts).format("MMMM Do, YYYY")}
                </td>
              </tr>
              <tr>
                <th className="border px-4 py-2 bg-gray-100">Trip End Date</th>
                <td className="border px-4 py-2">
                  {moment(bookingInfo?.trip_ends).format("MMMM Do, YYYY")}
                </td>
              </tr>
              <tr>
                <th className="border px-4 py-2 bg-gray-100">Address</th>
                <td className="border px-4 py-2">{bookingInfo?.address}</td>
              </tr>
              <tr>
                <th className="border px-4 py-2 bg-gray-100">Total Days</th>
                <td className="border px-4 py-2">
                  {bookingInfo?.total_days} Days
                </td>
              </tr>
              <tr>
                <th className="border px-4 py-2 bg-gray-100">
                  Travel Companion
                </th>
                <td className="border px-4 py-2">
                  {bookingInfo?.travel_companion === "1" ? "Yes" : "No"}
                </td>
              </tr>
              <tr>
                <th className="border px-4 py-2 bg-gray-100">
                  Japanese Translator
                </th>
                <td className="border px-4 py-2">
                  {bookingInfo?.japaneese_translator === "1" ? "Yes" : "No"}
                </td>
              </tr>
              <tr>
                <th className="border px-4 py-2 bg-gray-100">
                  Servant Service
                </th>
                <td className="border px-4 py-2">
                  {bookingInfo?.servent_service === "1" ? "Yes" : "No"}
                </td>
              </tr>
              <tr>
                <th className="border px-4 py-2 bg-gray-100">Payment Status</th>
                <td className="border px-4 py-2">
                  {bookingInfo?.payment_status}
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {bookingInfo?.payment_status === "pending" && (
          <section className="mb-10">
            <h2 className="text-3xl font-semibold text-[#a04747] mb-4">
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
                  <th className="border px-4 py-2 bg-gray-100">
                    Branch Number
                  </th>
                  <td className="border px-4 py-2">251</td>
                </tr>
                <tr>
                  <th className="border px-4 py-2 bg-gray-100">
                    Account Number
                  </th>
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
        )}
      </main>
    </div>
  );
};

export default SingleBookingDetails;