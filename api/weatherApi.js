const axios = require('axios');
require('dotenv').config();
async function getWeather(destination) {
    try {
        const apiKey = process.env.OPENWEATHER_API_KEY;
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: {
                q: destination,
                appid: apiKey,  
                units: "metric" 
            }
        });
        return {
            temperature: response.data.main.temp + "°C",
            description: response.data.weather[0].description,
            humidity: response.data.main.humidity + "%",
            windSpeed: response.data.wind.speed + " m/s"
        };
    } catch (error) {
        console.error("Error fetching weather:", error.response?.data || error.message);
        return null;
    }
}
module.exports = { getWeather };
