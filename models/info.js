const mongoose = require("mongoose");

const InfoSchema = new mongoose.Schema({
    destination: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    activities: [
        {
            name: String,
            location: String,
        }
    ],
    weather: {
        temperature: String,
        description: String
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Info", InfoSchema);
