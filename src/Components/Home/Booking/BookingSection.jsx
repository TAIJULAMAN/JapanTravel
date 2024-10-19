

import BookingAdventure from "./BookingAdventure";
import Doc from "../../Doc/Doc";
export const BookingSection = () => {
    const {nav3}=Doc()
  
  return (
    <div>
   
      <section
        className="relative h-[300px] md:h-[400px] bg-fixed bg-center bg-cover"
        style={{
            backgroundImage: `url(${nav3})`,
          }}
      >
        {/* <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className=" p-8 rounded-lg bg-white shadow-2xl -mt-64 md:-mt-96 max-sm:w-96 sm:w-2/4 md:w-3/4 lg:w-2/4 max-xl:w-2/4">
            <h1 className="text-3xl font-bold mb-4">BOOK <span className="text-red-600">NOW</span> </h1>
            <p className="mb-4">
            Explore the wonder through japan.


            </p>
            <form>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="relative">
      <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
      <input
        type="text"
        placeholder="Enter Destination"
        className="pl-10 pr-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-red-500 transition-colors w-full"
      />
    </div>
    <div className="relative">
      <FaUser className="absolute left-3 top-3 text-gray-400" />
      <input
        type="text"
        placeholder="No. of People"
        className="pl-10 pr-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-red-500 transition-colors w-full"
      />
    </div>
    <div className="relative">
      <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
      <input
        type="date"
        placeholder="Checkin Date"
        className="pl-10 pr-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-red-500 transition-colors w-full"
      />
    </div>
    <div className="relative">
      <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
      <input
        type="date"
        placeholder="Checkout Date"
        className="pl-10 pr-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-red-500 transition-colors w-full"
      />
    </div>
  </div>
  <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
    INQUIRE NOW
  </button>
</form>
          </div>
        </div> */}
      </section>

      <BookingAdventure/>
    </div>
  );
};
