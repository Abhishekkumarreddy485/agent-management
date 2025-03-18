const express = require('express');
const router = express.Router();
const User = require('../models/User');  // Import user model

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Compare passwords directly (NOT SECURE)
        if (user.password !== password) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        res.json({ message: "Login successful", user });

    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

module.exports = router;
