import axiosInstance from "./HttpKit";

// User New Booking
// complete
export const userNewBooking = async (bookingData) => {
  try {
    const response = await axiosInstance.post(
      "/api/bookings/book_new",
      bookingData
    );

    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("An error occurred while booking");
  }
};

// find All Bookings
// complete
export const findAllBookings = async () => {
  try {
    const response = await axiosInstance.get("/api/bookings/all_bookings");

    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("An error occurred while fetching bookings");
  }
};
// find Single Booking
// complete
export const getUserBooking = async (userId) => {
  try {
    const response = await axiosInstance.get(
      `/api/bookings/user_bookings/${userId}`
    );
    console.log(response);

    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("An error occurred while fetching booking details");
  }
};
// get Booking Data
// complete
export const getUserSingleBooking = async (bookingId) => {
  try {
    const response = await axiosInstance.get(
      `/api/bookings/booking_data/${bookingId}`
    );

    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("An error occurred while fetching booking data");
  }
};

// update a booking
// complete
export const bookingUpdate = async (bookingId, updatedData) => {
  try {
    const response = await axiosInstance.put(
      `/api/bookings/booking_update/${bookingId}`,
      updatedData
    );

    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("An error occurred while updating booking data");
  }
};

// booking status update
// comlete
export const bookingStatusUpdate = async (bookingId, status) => {
  try {
    const response = await axiosInstance.put(
      `/api/bookings/booking_status/${bookingId}`,
       status 
    );

    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("An error occurred while updating booking status");
  }
};

// delete a booking
// complete
export const deleteBooking = async (bookingId) => {
  try {
    const response = await axiosInstance.delete(
      `/api/bookings/booking_delete/${bookingId}`
    );

    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("An error occurred while deleting the booking");
  }
};
