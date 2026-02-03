const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

// serve frontend
app.use(express.static(path.join(__dirname, "frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "login.html"));
});

// API to send bus data
app.get("/api/buses", (req, res) => {
  const data = fs.readFileSync("buses.json", "utf-8");
  res.json(JSON.parse(data));
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});