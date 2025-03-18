const express = require("express");
const router = express.Router();
const Task = require("../models/Task"); // Import the Task model

// GET /api/tasks - Fetch all tasks from MongoDB
router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find(); // Fetch tasks from the database
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
