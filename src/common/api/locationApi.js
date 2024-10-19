import axiosInstance from "./HttpKit";

// create location
// complete
export const createLocation = async (locationData) => {
  try {
    const response = await axiosInstance.post(
      "/api/locations/new",
      locationData
    );
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("An error occurred while creating the location");
  }
};
// get all location
// complete
export const getAllLocations = async () => {
  try {
    const response = await axiosInstance.get("/api/locations/all");
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("An error occurred while fetching all locations");
  }
};

// get all location by id
// complete
export const getLocationById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/locations/details/${id}`);
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("An error occurred while fetching the location details");
  }
};

// update location
// complete
export const updateLocation = async (id, locationData) => {
  try {
    const response = await axiosInstance.put(
      `/api/locations/update/${id}`,
      locationData
    );
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("An error occurred while updating the location");
  }
};

// delete location
// complete
export const deleteLocation = async (id) => {
  try {
    const response = await axiosInstance.delete(`/api/locations/remove/${id}`);
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("An error occurred while deleting the location");
  }
};


// Default Image Update

export const updateLocationDefaultImage = async (id, locationData) => {
    try {
      const response = await axiosInstance.put(
        `/api/locations/update_image/${id}`,
        locationData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
      );
      return response.data;
    } catch (error) {
      throw error.response
        ? error.response.data
        : new Error("An error occurred while updating default image.");
    }
  };


