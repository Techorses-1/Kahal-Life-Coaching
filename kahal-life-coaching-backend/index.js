const express = require("express");
const cors = require("cors");
const connectDB = require("./config/mongodb");
require("dotenv").config();

const app = express();

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());

// Import routes
const formRoutes = require("./routes/formRoutes");

// Use routes - FIXED: remove /contact from here
app.use("/contact", formRoutes);

// Test route
app.get("/", (req, res) => {
    res.send("Kahal Backend is Running OK ON 5555!");
});

const PORT = process.env.PORT || 5555;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});