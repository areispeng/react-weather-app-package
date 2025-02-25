import axios from 'axios';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY || 'dab9606de3aa9013abdd5825820ccc3b';
const BASE_URL = process.env.REACT_APP_WEATHER_API_URL || 'https://api.openweathermap.org/data/2.5';

const weatherAPI = {
    getCurrentWeather: async (location) => {
        try {
            return await axios.get(`${BASE_URL}/weather`, {
                params: {
                    q: location,
                    appid: API_KEY,
                    units: 'metric',
                    lang: 'en'
                }
            });
        } catch (error) {
            console.error('Weather API Error:', error);
            throw error;
        }
    },

    getForecast: async (location) => {
        try {
            return await axios.get(`${BASE_URL}/forecast`, {
                params: {
                    q: location,
                    appid: API_KEY,
                    units: 'metric',
                    lang: 'en'
                }
            });
        } catch (error) {
            console.error('Forecast API Error:', error);
            throw error;
        }
    }
};

export { weatherAPI }; 