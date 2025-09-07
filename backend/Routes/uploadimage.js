const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import the User model

// This route will be accessible at POST /api/uploadImage
router.post('/uploadImage', async (req, res) => {
    console.log("Entered the /uploadImage route");

    try {
        // Get the name and email from the request body
        const { name, email } = req.body;
        console.log("Received name:", name);
        console.log("Received email:", email);

        // Basic validation
        if (!name || !email) {
            return res.status(400).json({ message: 'Name and email are required.' });
        }

        // Create a new user document in the database
        await User.create({
            name: name,
            email: email
        });

        res.status(200).json({ success: true, message: 'User data saved successfully' });

    } catch (error) {
        console.error("Error in /uploadImage route:", error.message);
        // Handle potential duplicate email error
        if (error.code === 11000) {
            return res.status(409).json({ success: false, message: 'Email already exists.' });
        }
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// FIX: You must export the router for it to be used in index.js
module.exports = router;