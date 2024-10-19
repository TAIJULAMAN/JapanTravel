import bcrypt from "bcryptjs";
import { useContext, useState } from "react";
import { AuthContext } from "../../Pages/Auth/AuthProvider/AuthProvider";
import { userPasswordUpdate } from "../../common/api/authApi";

export default function ChangePassword() {
  const { user } = useContext(AuthContext);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPasswordError, setCurrentPasswordError] = useState("");

  const validatePassword = (password) => {
    const uppercasePattern = /[A-Z]/;
    const numberPattern = /[0-9]/;
    const symbolPattern = /[^A-Za-z0-9]/;
    let error = "";

    if (!uppercasePattern.test(password)) {
      error = "Password must contain at least one uppercase letter.";
    } else if (!numberPattern.test(password)) {
      error = "Password must contain at least one number.";
    } else if (!symbolPattern.test(password)) {
      error = "Password must contain at least one special character.";
    } else if (password.length < 6) {
      error = "Password must be at least 6 characters long.";
    }

    return error;
  };

  const checkCurrentPassword = async () => {
    const passwordMatches = await bcrypt.compare(
      currentPassword,
      user?.password
    );
    return passwordMatches;
  };

  const handleContinue = async () => {
    if (!currentPassword) {
      setCurrentPasswordError("Current password is required.");
      return;
    }

    const passwordMatches = await checkCurrentPassword();

    if (passwordMatches) {
      setIsModalOpen(true);
      setCurrentPasswordError("");
    } else {
      setCurrentPasswordError("Incorrect current password.");
    }
  };

  // Handle new password change
  const handlePasswordChangeWithCurrent = async () => {
    if (!currentPassword || !newPassword) {
      setCurrentPasswordError(
        "Old password and new password fields are required."
      );
      return;
    }

    const passwordMatches = await checkCurrentPassword();

    if (!passwordMatches) {
      setCurrentPasswordError("Incorrect current password.");
      return;
    }

    const validationError = validatePassword(newPassword);
    if (validationError) {
      setPasswordError(validationError);
    } else {
      setPasswordError("");
      try {
        console.log({
          email: user?.email,
          currentPassword: currentPassword,
          newPassword: newPassword,
        });

        await userPasswordUpdate(user?.email, currentPassword, newPassword);
        alert("Password updated successfully!");
        setIsModalOpen(false);
      } catch (error) {
        console.error("Error updating password:", error);
        alert("Failed to update password: " + error.message);
      }
    }
  };
  return (
    // <div className="pt-32 h-screen px-[20px] md:w-1/2 md:px-[100px]">
    //   {/* Current Password Field */}
    //   <div className="mt-6 w-full">
    //     <label className="text-xl text-gray-800 mb-3 block">
    //       Current Password:
    //     </label>
    //     <input
    //       type="password"
    //       value={currentPassword}
    //       onChange={(e) => setCurrentPassword(e.target.value)}
    //       className="border p-2 w-full rounded"
    //     />
    //     {currentPasswordError && (
    //       <p className="text-red-500 mt-2">{currentPasswordError}</p>
    //     )}
    //   </div>
    //   <button
    //     className="bg-blue-500 text-white py-2 px-4 mt-4 rounded hover:bg-blue-600"
    //     onClick={handleContinue}
    //   >
    //     Continue
    //   </button>
    //   {/* Modal for Updating Password */}
    //   {isModalOpen && (
    //     <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
    //       <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
    //         <h3 className="text-2xl font-semibold mb-4">Update Password</h3>

    //         {/* Current Password */}
    //         <input
    //           type="password"
    //           placeholder="Current Password"
    //           value={currentPassword}
    //           onChange={(e) => setCurrentPassword(e.target.value)}
    //           className="border p-2 w-full rounded mb-3"
    //         />
    //         {currentPasswordError && (
    //           <p className="text-red-500">{currentPasswordError}</p>
    //         )}

    //         {/* New Password */}
    //         <input
    //           type="password"
    //           placeholder="New Password"
    //           value={newPassword}
    //           onChange={(e) => setNewPassword(e.target.value)}
    //           className="border p-2 w-full rounded mb-3"
    //         />
    //         {passwordError && <p className="text-red-500">{passwordError}</p>}

    //         <button
    //           className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
    //           onClick={handlePasswordChangeWithCurrent}
    //         >
    //           Update Password
    //         </button>
    //         <button
    //           className="bg-red-500 text-white py-2 px-4 ml-3 rounded hover:bg-red-600"
    //           onClick={() => setIsModalOpen(false)}
    //         >
    //           Cancel
    //         </button>
    //       </div>
    //     </div>
    //   )}
    // </div>
    <div className="pt-32 h-screen px-6 md:w-1/2 md:px-20 mx-auto">
      {/* Current Password Field */}
      <div className="mt-6 w-full">
        <label className="text-lg text-gray-800 mb-2 block">
          Current Password
        </label>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter your current password"
        />
        {currentPasswordError && (
          <p className="text-red-500 mt-2 text-sm">{currentPasswordError}</p>
        )}
      </div>

      <button
        className="bg-[#A04747] text-white py-2 px-6 mt-6 rounded hover:bg-[#c96161] transition-all duration-500 shadow-[#000022b6] shadow-md hover:shadow-[#000022b6] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        onClick={handleContinue}
      >
        Continue
      </button>

      {/* Modal for Updating Password */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md mx-auto">
            <h3 className="text-2xl font-semibold mb-4 text-center text-[#d94e4e]">
              Update Password
            </h3>

            {/* Current Password */}
            <div className="mb-4">
              <input
                type="password"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {currentPasswordError && (
                <p className="text-red-500 text-sm mt-2">
                  {currentPasswordError}
                </p>
              )}
            </div>

            {/* New Password */}
            <div className="mb-4">
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {passwordError && (
                <p className="text-red-500 text-sm mt-2">{passwordError}</p>
              )}
            </div>

            <div className="flex justify-end">
              <button
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-shadow duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                onClick={handlePasswordChangeWithCurrent}
              >
                Update Password
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 ml-4 rounded hover:bg-red-600 transition-shadow duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
