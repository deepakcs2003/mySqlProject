const express = require('express');
const app = express();
const db = require('./config/db'); // Import the db.js file for database connection
const cors = require('cors');
const dotenv = require('dotenv');
const route = require('./routes/router'); // Assuming this file exists and is configured properly

dotenv.config(); // Load environment variables

// Middleware
app.use(express.json()); // For parsing JSON request bodies
app.use(cors({
    credentials: true,
    origin: true // Allowing all origins; customize as needed
}));

// Route to fetch all users from the "user" table
app.get('/users', (req, res) => {
    const sql = "SELECT * FROM user"; // Ensure the "user" table exists in your database
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message }); // Return error message if query fails
        }
        res.json(results); // Send the query results as a JSON response
    });
});

// Add other routes
app.use("/api/v1", route); // Assuming this is where your API routes are handled

// Start the server
const port = process.env.PORT || 5000; // Use the port from environment variables or default to 3000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
