import axiosInstance from "./HttpKit";

// create Destination
// complete
export const createDestination = async (destinationData) => {
    try {
    
      const response = await axiosInstance.post('/api/destinations/create', destinationData);
      
      
      return response.data;
    } catch (error) {
     
      throw error.response ? error.response.data : new Error('An error occurred while creating the destination');
    }
  };

//   find All Destination
//   complete
  export const findAllDestination = async () => {
    try {
     
      const response = await axiosInstance.get('/api/destinations/all');

      return response.data;
    } catch (error) {

      throw error.response ? error.response.data : new Error('An error occurred while fetching destinations');
    }
  };


//   find Single Destinationn
//   complete
export const findSingleDestination = async (destinationId) => {
    try {
 
      const response = await axiosInstance.get(`/api/destinations/details/${destinationId}`);
      
    
      return response.data;
    } catch (error) {
   
      throw error.response ? error.response.data : new Error('An error occurred while fetching the destination');
    }
  };

//   update a destionation
// complete
export const updateDestination = async (id, updatedData) => {
    try {
     
      const response = await axiosInstance.put(`/api/destinations/update/${id}`, updatedData);
      

      return response.data;
    } catch (error) {
   
      throw error.response ? error.response.data : new Error('An error occurred while updating the destination');
    }
  };


//   delete a destination
//   complete
export const deleteDestination = async (destinationid) => {
    try {
      
      const response = await axiosInstance.delete(`/api/destinations/delete/${destinationid}`);
      
 
      return response.data;
    } catch (error) {

      throw error.response ? error.response.data : new Error('An error occurred while deleting the destination');
    }
  };