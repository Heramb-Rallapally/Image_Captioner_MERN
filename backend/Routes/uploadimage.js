const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const User = require('../models/User'); 

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // store images in backend/uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  }
});

// File filter (accept only images)
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed!"), false);
    }
    cb(null, true);
  }
});

// Simple test route
router.get("/test", (req, res) => {
  res.json({ message: "Test route working!" });
});

// Upload route
router.post('/uploadImageWithFile', upload.single('image'), async (req, res) => {
  console.log("Entered /uploadImageWithFile route");

  try {
    const { name, email } = req.body;
    console.log("Received name:", name);
    console.log("Received email:", email);
    console.log("Uploaded file:", req.file);

    if (!name || !email || !req.file) {
      return res.status(400).json({ message: 'Name, email, and image are required.' });
    }

    // Store user in DB
    const newUser = await User.create({
      name,
      email,
      imagePath: req.file.path, // backend path
      imageUrl: `/uploads/${req.file.filename}` // frontend URL
    });

    res.status(200).json({
      success: true,
      message: 'User with image saved successfully',
      user: newUser,
      imageUrl: `/uploads/${req.file.filename}` // send URL to frontend
    });

  } catch (error) {
    console.error("Error in /uploadImageWithFile route:", error.message);
    if (error.code === 11000) {
      return res.status(409).json({ success: false, message: 'Email already exists.' });
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
