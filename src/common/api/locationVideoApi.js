import axiosInstance from "./HttpKit";

//   video upload
export const uploadLocationVideo = async (locationVideo) => {
    try {
      const response = await axiosInstance.post(
        "/api/location_vids/upload",
        locationVideo,{
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
      );
      return response.data;
    } catch (error) {
      throw error.response
        ? error.response.data
        : new Error("An error occurred while creating the location");
    }
  };


  export const getAllLocationsVideo = async () => {
    try {
      const response = await axiosInstance.get("/api/location_vids/all_videos");
      return response.data;
    } catch (error) {
      throw error.response
        ? error.response.data
        : new Error("An error occurred while fetching all locations");
    }
  };

  export const getAllLocationsVideoById = async (id) => {
    try {
      const response = await axiosInstance.get(`/api/location_vids/location/${id}`);
      return response.data;
    } catch (error) {
      throw error.response
        ? error.response.data
        : new Error("An error occurred while fetching the location details");
    }
  };

  export const deleteLocationVideo = async (id) => {
    try {
      const response =  await axiosInstance.delete(`/api/location_vids/video/${id}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('An error occurred while deleting the attachment');
    }
  };
 

//   export const deleteAllLocationAttachments = async (locationId) => {
//     try {
//       const response = await axiosInstance.delete(`/api/attachments/location/delete/${locationId}`);
//       return response.data;
//     } catch (error) {
//       throw error.response ? error.response.data : new Error('An error occurred while deleting all attachments for the location');
//     }
//   };