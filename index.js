const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db');

dotenv.config();
const app = express();

const corsOptions = {
    origin: "https://destination-log.onrender.com",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// Connect to MongoDB with error handling
connectDB().catch(err => {
    console.error("❌ MongoDB Connection Failed:", err.message);
    process.exit(1); // Exit if DB connection fails
});

app.get('/', (req, res) => {
    res.send("Itinerary Generator API is running...");
});

// Load Routes
const infoRoutes = require('./models/routes/infoRoutes');
app.use('/info', infoRoutes);

console.log("✅ Routes loaded: /info/create and /info/all");

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
