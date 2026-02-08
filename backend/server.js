const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 5000;

// Serve frontend
app.use(express.static(path.join(__dirname, "../frontend"))); // Note: "../frontend" if backend in separate folder

// API to send bus data
app.get("/api/buses", (req, res) => {
  try {
    const data = fs.readFileSync(path.join(__dirname, "buses.json"), "utf-8");
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ error: "Failed to load bus data" });
  }
});

app.listen(PORT, () => {
  console.log("server running on port"+ PORT);
});