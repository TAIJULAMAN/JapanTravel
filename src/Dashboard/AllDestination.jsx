import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
import {
  deleteDestination,
  findAllDestination,
} from "../common/api/destinationApi";
import UserPagination from "../Sharred/Pagination";
import toast from "react-hot-toast";

const AllDestination = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [destinationsPerPage] = useState(10);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const data = await findAllDestination();
        setDestinations(data?.result);
        setLoading(false);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  // Destination Delete Handler
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this destination?"
    );
    if (confirmDelete) {
      try {
        await deleteDestination(id);
        toast.success("Delete Successful!");
        setDestinations(
          destinations.filter(
            (destination) => destination.destination_id !== id
          )
        );
      } catch (error) {
        console.error("Error deleting destination:", error);
      }
    }
  };

  const indexOfLastDestination = currentPage * destinationsPerPage;
  const indexOfFirstDestination = indexOfLastDestination - destinationsPerPage;
  const currentDestinations = destinations?.slice(
    indexOfFirstDestination,
    indexOfLastDestination
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-5 justify-between py-5">
        <p className="text-3xl font-semibold text-[#a04747]">
          All Destinations
        </p>
        <Link to="/dashboard/createdestination">
          <button className="hover:bg-[#a04747] hover:text-white text-[#a04747] w-36 h-12 rounded-lg font-bold bg-white shadow-lg">
            Add Destination
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
                Destination Name
              </th>
              <th scope="col" className="px-6 py-3">
                Destination Location
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentDestinations?.map((post, index) => (
              <tr
                key={post?._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-xl font-medium"
              >
                <td className="px-6 py-4">
                  {indexOfFirstDestination + index + 1}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  <Link to={`/details/${post?._id}`}>{post?.name}</Link>
                </td>
                <td className="px-6 py-4 font-medium dark:text-white">
                  {post?.airport}
                </td>
                <td className="px-6 py-4 font-medium dark:text-white">
                  {post?.description}
                </td>
                <td className="px-6 py-4 flex gap-3">
                  <MdDelete
                    className="text-3xl hover:text-red-500 cursor-pointer"
                    onClick={() => handleDelete(post?.destination_id)}
                  />
                  <Link

                    to={`/dashboard/updatedestination/${post?.destination_id}`}
                    state={post}
                  >
                    <FaEdit className="text-3xl hover:text-teal-500" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 flex justify-end p-4">
        <UserPagination
          usersPerPage={destinationsPerPage}
          totalUsers={destinations?.length}
          currentPage={currentPage}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default AllDestination;
