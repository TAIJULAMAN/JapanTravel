import axiosInstance from "./HttpKit";

// Define your API endpoints and methods here

export const get_protection = async () => {
  try {
    const response = await axiosInstance.get("/api/set_protected");
    return response;
  } catch (error) {
    // Handle errors
    throw error.response ? error.response.data : new Error("An error occurred");
  }
};

// Example: API call to get all users
export const getUsers = async () => {
  try {
    const response = await axiosInstance.get("/users");
    return response.data;
  } catch (error) {
    // Handle errors
    throw error.response ? error.response.data : new Error("An error occurred");
  }
};

// Example: API call to get a specific user by ID
export const getUserById = async (id) => {
  try {
    const response = await axiosInstance.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("An error occurred");
  }
};

// Example: API call to create a new user
export const createUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/users", userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("An error occurred");
  }
};

// Example: API call to update user
export const updateUser = async (id, userData) => {
  try {
    const response = await axiosInstance.put(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("An error occurred");
  }
};

// Example: API call to delete a user by ID
export const deleteUser = async (id) => {
  try {
    const response = await axiosInstance.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("An error occurred");
  }
};
