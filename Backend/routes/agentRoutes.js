const express = require("express");
const Agent = require("../models/Agent");

const router = express.Router();

// ✅ Create Agent
router.post("/create", async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body;

        // Check if agent already exists
        const existingAgent = await Agent.findOne({ email });
        if (existingAgent) return res.status(400).json({ message: "Agent already exists" });

        // Create a new agent
        const newAgent = new Agent({ name, email, mobile, password });
        await newAgent.save();
        res.status(201).json({ message: "Agent created successfully", agent: newAgent });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// ✅ Get All Agents
router.get("/", async (req, res) => {
    try {
        const agents = await Agent.find();
        res.json(agents);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// ✅ Delete an Agent
router.delete("/:id", async (req, res) => {
    try {
        await Agent.findByIdAndDelete(req.params.id);
        res.json({ message: "Agent deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
