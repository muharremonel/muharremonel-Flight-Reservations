const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 5001;
const bodyParser = require("body-parser");
const cors = require("cors");

// Route'lar
const flightRoute = require("./routes/flights.js");

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB bağlantısı
const connect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://muharremonel0:nOCQ4ssy6gBLxmPu@flight.rktlh.mongodb.net/?retryWrites=true&w=majority&appName=Flight"
    );
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

// Route'ları tanımlama
app.use("/back/flights", flightRoute); // Uçuş verileri için route

// Başlatma
app.listen(port, () => {
  connect();
  console.log(`Back listening on port ${port}`);
});