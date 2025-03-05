const express = require('express');
const Info = require('../info'); 
const { getAttractions } = require('../../api/apiHelpers');  
const { getWeather } = require('../../api/weatherApi'); 

const router = express.Router();

router.post('/create', async (req, res) => {
    try {
        const { destination, startDate, endDate, activities } = req.body;

        console.log(`Locating attractions and weather for: ${destination}...`);
        const attractions = await getAttractions(destination);
        
        const weather = await getWeather(destination);

        const itinerary = new Info({
            destination,
            startDate,
            endDate,
            activities: [...activities, ...attractions],
            weather
        });

        await itinerary.save();
        console.log("✅ Itinerary saved successfully!");
        res.status(201).json(itinerary);
    } catch (error) {
        console.error("❌ Error creating itinerary:", error);
        res.status(500).json({ error: "Failed to create itinerary" });
    }
});

router.get('/all', async (req, res) => {
    try {
        const itineraries = await Info.find();
        res.json(itineraries);
    } catch (error) {
        console.error("❌ Error fetching itineraries:", error);
        res.status(500).json({ error: "Failed to fetch itineraries" });
    }
});

module.exports = router;
