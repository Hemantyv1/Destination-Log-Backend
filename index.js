const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db');
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
connectDB();
app.get('/', (req, res) => {
    res.send("Itinerary Generator API is running...");
});
const infoRoutes = require('./models/routes/infoRoutes');
app.use('/info', infoRoutes);
const PORT = process.env.PORT || 3000;
console.log(" Routes loaded: /info/create and /info/all");
app.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
});
