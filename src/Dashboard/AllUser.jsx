import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { allUsers, deleteUser } from "../common/api/ApiKit";
import Pagination from "../Sharred/Pagination";
import toast from "react-hot-toast";

const AllUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await allUsers();
        setUsers(response.result);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch users");
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = async (userId) => {
    if (!userId) {
      toast.error("User ID is not provided");
      return;
    }

    try {
      await deleteUser(userId);

      setUsers(users.filter((user) => user.user_id !== userId));

      toast.success("User deleted successfully!");
    } catch (error) {
      console.error("Failed to delete user:", error);

      toast.error("Failed to delete user");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="flex justify-between py-6">
        <p className="text-3xl font-semibold text-[#a04747]">All Users</p>
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
                User Email
              </th>
              <th scope="col" className="px-6 py-3">
                User Mobile
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, index) => (
              <tr
                key={user?.user_id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-xl font-medium"
              >
                <td className="px-6 py-4">{index + 1}</td>

                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  {`${user?.firstName} ${user?.lastName}`}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  {user?.email}
                </td>
                <td className="px-6 py-4 font-medium dark:text-white text-gray-900">
                  {user?.phoneNumber}
                </td>
                <td className="px-6 py-4 flex gap-3 hover:underline hover:cursor-pointer">
                  <MdDelete
                    className="text-3xl hover:text-red-600"
                    onClick={() => {
                      handleDelete(user?.user_id);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-end p-4">
        <Pagination
          usersPerPage={usersPerPage}
          totalUsers={users.length}
          currentPage={currentPage}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default AllUser;
