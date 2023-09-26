// api.js
import axios from 'axios';

const BASE_URL = 'https://rickandmortyapi.com/api';

export const fetchCharacters = async (page) => {
  try {
    const response = await axios.get(`${BASE_URL}/character/?page=${page}`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching characters:', error);
    throw error;
  }
};

export const fetchCharacterDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/character/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching character details:', error);
    throw error;
  }
};

export const fetchEpisodeInfo = async (episodeUrl) => {
  try {
    const response = await axios.get(episodeUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching episode info:', error);
    throw error;
  }
};
