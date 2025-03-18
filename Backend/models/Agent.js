const mongoose = require("mongoose");

const AgentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    password: { type: String, required: true }, // Storing plain text as per your requirement
}, { timestamps: true });

module.exports = mongoose.model("Agent", AgentSchema);
