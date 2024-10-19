import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { deleteLocation, getAllLocations } from "../common/api/locationApi";
import UserPagination from "../Sharred/Pagination";
import { getAllAttachments } from "../common/api/attachmentApi";

const AllLocation = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [locationsPerPage] = useState(10);
  const [error, setError] = useState(null);
  const [refetch, setRefetch] = useState(true);
  const [, setAttachments] = useState(null);

  useEffect(() => {
    if (refetch) {
      const fetchLocations = async () => {
        try {
          const response = await getAllLocations();

          setLocations(response.result);
          setLoading(false);
          setRefetch(false);
        } catch (err) {
          setError(err.message || "Failed to fetch bookings");
          setLoading(false);
        }
      };

      const fetchAttachments = async () => {
        try {
          const response = await getAllAttachments();
          setAttachments(response);
        } catch (error) {
          console.error("Failed to fetch attachments", error);
        }
      };

      fetchLocations();
      fetchAttachments();
    }
  }, [refetch]);

  const handleDelete = async (id) => {
    try {
      await deleteLocation(id);
      setLocations((prevLocations) =>
        prevLocations.filter((location) => location.id !== id)
      );
      setRefetch(true);
    } catch (error) {
      console.error("Error deleting location:", error);
    }
  };

  // Pagination logic
  const indexOfLastLocation = currentPage * locationsPerPage;
  const indexOfFirstLocation = indexOfLastLocation - locationsPerPage;
  const currentLocations = locations.slice(
    indexOfFirstLocation,
    indexOfLastLocation
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-5 justify-between py-5">
        <p className="text-3xl font-semibold text-[#a04747]">All Locations</p>
        <Link to="/dashboard/createlocation">
          <button className="hover:bg-[#a04747] hover:text-white text-[#a04747] w-36 h-12 rounded-lg font-bold bg-white shadow-lg">
            Add Location
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-500">
          <thead className="text-xl text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                SL
              </th>
              <th scope="col" className="px-6 py-3">
                Location Name
              </th>
              
              <th scope="col" className="px-6 py-3">
                Address
              </th>
              <th scope="col" className="px-6 py-3">
                Hours
              </th>
              
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentLocations.length > 0 ? (
              currentLocations.map((location, index) => (
                <tr
                  key={location.location_id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-xl font-medium"
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">
                    <p>{location?.name}</p>
                  </td>
                  
                  <td className="px-6 py-4 font-medium dark:text-white">
                    {location?.address}
                  </td>
                  <td className="px-6 py-4 font-medium dark:text-white">
                    {location?.hours}
                  </td>
                  
                  <td className="px-6 py-4 flex gap-3 hover:underline hover:cursor-pointer">
                    <div>
                      <MdDelete
                        className="text-3xl hover:text-red-500"
                        onClick={() => handleDelete(location?.location_id)}
                      />
                    </div>
                    <div>
                      <Link
                        to={`/dashboard/updatelocation/${location?.location_id}`}
                        state={location}
                      >
                        <FaEdit className="text-3xl hover:text-teal-500" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-6">
                  No Locations Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {locations?.length > 0 && (
        <div className="mt-8 flex justify-end p-4">
          <UserPagination
           
            usersPerPage={locationsPerPage}
          totalUsers={locations?.length}
          currentPage={currentPage}
          paginate={paginate}
          />
        </div>
      )}
    </div>
  );
};

export default AllLocation;
