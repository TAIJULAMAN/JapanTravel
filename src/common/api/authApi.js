// sign up user 

import axiosInstance from "./HttpKit";

// User SignUpp
// complete
export const userSignUp = async (data) => {
    
    try {
      const response = await axiosInstance.post("/api/users/signup_user",data);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("An error occurred");
    }
  };

// user signin 
// complete
export const userSignIn = async (email, password) => {
    try {
      const response = await axiosInstance.post("/api/auth/signin", {
        email,
        password
      });

      if (response.status !== 200) {
        throw new Error("Failed to sign in");
      }
  
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("An error occurred");
    }
  };
  
// password update
// complete

export const userPasswordUpdate = async (email, currentPassword, newPassword) => {
    try {
      const response = await axiosInstance.post('/api/auth/change_password', {
        email,
        oldPassword: currentPassword,
        newPassword,
      });
      return response.data; 
    } catch (error) {
      console.error("API error response:", error.response);
      throw error.response ? error.response.data : new Error('An error occurred');
    }
  };

// export const userPasswordUpdate = async (email, password) => {
//     try {
      
//       const response = await axiosInstance.post('/api/auth/change_password', {
//         email,
//         password,
//       });
//       return response.data; 
//     } catch (error) {
      
//       throw error.response ? error.response.data : new Error('An error occurred');
//     }
//   };

//   user profile
export const userProfile = async () => {
    try {
      const token = localStorage.getItem("authToken"); // Get token from localStorage
      const response = await axiosInstance.get('/api/auth/profile', {
        headers: {
          Authorization: `Bearer ${token}` // Set token in headers
        }
      });
  
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('An error occurred while fetching user profile');
    }
  };
  