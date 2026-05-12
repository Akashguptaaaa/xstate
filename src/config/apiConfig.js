const API_BASE_URL = 'https://location-selector.labs.crio.do';

export const API_ENDPOINTS = {
  GET_COUNTRIES: `${API_BASE_URL}/countries`,
  GET_STATES: (countryName) => `${API_BASE_URL}/country=${countryName}/states`,
  GET_CITIES: (countryName, stateName) => `${API_BASE_URL}/country=${countryName}/state=${stateName}/cities`,
};

export const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};