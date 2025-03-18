const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    FirstName: { type: String, required: true },
    Phone: { type: String, required: true },
    Notes: { type: String, required: false },
    assignedAgent: { type: String, required: false },
});

module.exports = mongoose.model("Task", taskSchema); // Maps to `tasks` collection
