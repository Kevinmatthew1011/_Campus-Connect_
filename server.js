const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// ✅ Allow frontend to talk to backend
app.use(cors());

// ✅ Parse JSON bodies
app.use(express.json());

// In-memory events store
let events = [];

// Test route
app.get("/", (req, res) => {
    res.send("CampusConnect API is running 🚀");
});

// Get all events
app.get("/api/events", (req, res) => {
    res.json(events);
});

// Create new event
app.post("/api/events", (req, res) => {
    const { title, desc, organizer } = req.body;

    if (!title || !organizer) {
        return res.status(400).json({ message: "Missing title or organizer" });
    }

    const newEvent = {
        id: Date.now(),
        title,
        desc,
        organizer,
    };

    events.push(newEvent);

    console.log("✅ New event added:", newEvent);

    res.json({ message: "Success!", event: newEvent });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
