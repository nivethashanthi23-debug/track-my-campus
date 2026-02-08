const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

/* 🔥 API FIRST (VERY IMPORTANT) */
app.get("/api/buses", (req, res) => {
  try {
    const data = fs.readFileSync(
      path.join(__dirname, "buses.json"),
      "utf-8"
    );
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ error: "Failed to load bus data" });
  }
});

/* 🔥 THEN frontend */
app.use(express.static(path.join(__dirname, "frontend")));

/* fallback */
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});