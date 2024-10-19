import axiosInstance from "./HttpKit";

// upload attachment

export const uploadAttachment = async (formData) => {
  try {
    const response = await axiosInstance.post(
      "/api/attachments/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("An error occurred while uploading the attachment");
  }
};

//   get all attachment
export const getAllAttachments = async () => {
  try {
    const response = await axiosInstance.get("/api/attachments/all");
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("An error occurred while fetching all attachments");
  }
};

// get location attachment
export const getLocationAttachments = async (locationId) => {
  try {
    const response = await axiosInstance.get(
      `/api/attachments/location/${locationId}`
    );
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error(
          "An error occurred while fetching attachments for the location"
        );
  }
};

// get attachment details
export const getAttachmentDetails = async (attachmentId) => {
  try {
    const response = await axiosInstance.get(
      `/api/attachments/details/${attachmentId}`
    );
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("An error occurred while fetching attachment details");
  }
};

// deacttive all location attachments
export const deactivateAllLocationAttachments = async (locationId) => {
  try {
    const response = await axiosInstance.put(
      `/api/attachments/location/deactivate/${locationId}`
    );
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error(
          "An error occurred while deactivating all attachments for the location"
        );
  }
};

// deactive a location attachment
export const deactivateLocationAttachment = async (attachmentId) => {
  try {
    const response = await axiosInstance.put(
      `/api/attachments/deactivate/${attachmentId}`
    );
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("An error occurred while deactivating the attachment");
  }
};

// active all location attachment
export const activateAllLocationAttachments = async (locationId) => {
  try {
    const response = await axiosInstance.put(
      `/api/attachments/location/activate/${locationId}`
    );
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error(
          "An error occurred while activating all attachments for the location"
        );
  }
};

// active a location attachment
export const activateLocationAttachment = async (attachmentId) => {
  try {
    const response = await axiosInstance.put(
      `/api/attachments/activate/${attachmentId}`
    );
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("An error occurred while activating the attachment");
  }
};

// active deleteAllLocationAttachments
export const deleteAllLocationAttachments = async (locationId) => {
  try {
    const response = await axiosInstance.delete(
      `/api/attachments/location/delete/${locationId}`
    );
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error(
          "An error occurred while deleting all attachments for the location"
        );
  }
};

// active deleteLocationAttachment
export const deleteLocationAttachment = async (attachmentId) => {
  try {
    const response = await axiosInstance.delete(
      `/api/attachments/delete/${attachmentId}`
    );
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("An error occurred while deleting the attachment");
  }
};
