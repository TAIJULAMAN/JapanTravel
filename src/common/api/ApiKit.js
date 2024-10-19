import axiosInstance from "./HttpKit";

// Get all user
// complete
export const allUsers = async () => {
  try {
    const response = await axiosInstance.get("/api/users/all_users");

    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("An error occurred");
  }
};

// Get single user
export const getUser = async (userId) => {
  try {
    const response = await axiosInstance.get(`/api/users/user_data/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("An error occurred");
  }
};

// update user
export const userUpdate = async (userId, updatedData) => {
  try {
    const response = await axiosInstance.put(
      `/api/users/update_user/${userId}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("An error occurred");
  }
};

// update user image
export const userImageUpdate = async (userId, updatedImage) => {
  try {
    const response = await axiosInstance.put(
      `/api/users/upload_pp/${userId}`,
      updatedImage,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("An error occurred");
  }
};

// delete user
export const deleteUser = async (userId) => {
  if (!userId) {
    throw new Error("User ID is not provided");
  }

  try {
    const response = await axiosInstance.delete(
      `/api/users/delete_user/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error in deleteUser function:",
      error.response ? error.response.data : error.message
    );
    throw error.response ? error.response.data : new Error("An error occurred");
  }
};
