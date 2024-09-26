const express = require('express');
const cors = require('cors'); // Allow CORS for frontend requests
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();

// Use CORS middleware
app.use(cors());

// Set up bodyParser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Create MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Make sure this is the correct username
    password: '', // Default password for XAMPP's MySQL is empty
    database: 'flight_booking'
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error("Error connecting to the database", err);
        return;
    }
    console.log("Connected to the database");
});

// API route for login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check if all required fields are present
    if (!username || !password) {
        return res.status(400).json({ success: false, message: "Missing username or password" });
    }

    // Query to check credentials in the database
    const query = "SELECT * FROM `user_details` WHERE `userName` = ? AND `password` = ?";
    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error("Database query error:", err);
            return res.status(500).json({ success: false, message: "Database error occurred" });
        }

        if (results.length > 0) {
            // User found
            return res.json({ success: true, message: "Login successful!" });
        } else {
            // User not found
            return res.status(401).json({ success: false, message: "Invalid username or password" });
        }
    });
});


// API route for sign-up
app.post('/submit', (req, res) => {
    const { username, phone, email, password } = req.body;

    // Example: Validate the data and insert it into the database
    // You should validate and hash the password before storing it
    const query = "INSERT INTO `user_details` (userName, number, mail, password) VALUES (?, ?, ?, ?)";
    
    db.query(query, [username, phone, email, password], (err, results) => {
        if (err) {
            console.error("Error during the query", err);
            return res.status(500).json({ message: "Error saving user data" });
        }
        res.json({ success: true, message: "User registered successfully!" });
    });
});

// Start the server
const PORT = 5501;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
