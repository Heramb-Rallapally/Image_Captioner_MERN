const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://heramb3112:heramb41@cluster0.dtnu3ss.mongodb.net/image_captioner?retryWrites=true&w=majority&appName=Cluster0';

const mongoDB = async () => {
  try {
    console.log("Attempting to connect to MongoDB...");
    await mongoose.connect(mongoURI);
    console.log("LOG: Connected to MongoDB successfully!");
  } catch (error) {
    console.error("LOG: Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = mongoDB;