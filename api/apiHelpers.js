const axios = require('axios');
require('dotenv').config();
async function getAttractions(destination) {
    try {
        const apiKey = process.env.GOOGLE_PLACES_API_KEY;
        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json`, {
            params: {
                query: `top attractions in ${destination}`,
                key: apiKey
            }
        });
        return response.data.results.slice(0, 5).map(place => ({
            name: place.name,
            location: place.formatted_address || "Unknown",
            rating: place.rating || "No rating"
        }));
    } catch (error) {
        console.error("Error fetching attractions:", error.message);
        return [];
    }
}
module.exports = { getAttractions };
