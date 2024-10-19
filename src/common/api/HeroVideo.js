import axiosInstance from "./HttpKit";

// Create HeroSec
export const createHeroSec = async (heroData) => {
    try {
      const response = await axiosInstance.post('/api/hero-sec/upload', heroData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('An error occurred while creating the HeroSec');
    }
  };
  
  // Get All HeroSecs
  export const getAllHeroSecs = async () => {
    try {
      const response = await axiosInstance.get('/api/hero-sec/all');
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('An error occurred while fetching all HeroSecs');
    }
  };
  
  // Get HeroSec By ID
  export const getHeroSecById = async (id) => {
    try {
      const response = await axiosInstance.get(`/api/hero-sec/video/${id}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('An error occurred while fetching the HeroSec');
    }
  };
  
  // Update HeroSec By ID
  export const updateHeroSec = async (id, heroData) => {
    try {
      const response = await axiosInstance.put(`/api/hero-sec/update/${id}`, heroData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('An error occurred while updating the HeroSec');
    }
  };
  
  // Delete HeroSec By ID
  export const deleteHeroSec = async (id) => {
    try {
      const response = await axiosInstance.delete(`/api/hero-sec/remove/${id}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('An error occurred while deleting the HeroSec');
    }
  };