const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const mongoDB = require('./db');
const User = require('./models/User');
const path = require('path');

// --- Middleware ---
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', require("./Routes/uploadimage"));
console.log(__dirname)
app.get('/', (req, res) => {
  res.send('Hello World! Server is running.');
});

// --- Application Startup ---
// FIX 2: Use an async function to ensure the DB connects before the server starts.
// This prevents the "buffering timed out" error.
const startApp = async () => {
  try {
    // Wait for the database connection to complete
    await mongoDB();

    // Now that the DB is connected, start the server
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });

  } catch (error) {
    console.error("Failed to start the application:", error);
    process.exit(1);
  }
};

// Run the startup function
startApp();