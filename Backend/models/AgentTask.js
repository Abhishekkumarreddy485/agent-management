const mongoose = require('mongoose');

const AgentTaskSchema = new mongoose.Schema({
    FirstName: { type: String, required: true },
    Phone: { type: Number, required: true },
    Notes: { type: String },
    assignedAgent: { type: String, required: true }
});

module.exports = mongoose.model('AgentTask', AgentTaskSchema);
