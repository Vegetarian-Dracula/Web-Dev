const express = require('express');
const cors = require('cors'); 
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path'); // Required for static file handling

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '',
    database: 'flight_booking'
});

db.connect((err) => {
    if (err) {
        console.error("Error connecting to the database", err);
        return;
    }
    console.log("Connected to the database");
});

// API routes
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ success: false, message: "Missing username or password" });
    }
    const query = "SELECT * FROM `user_details` WHERE `userName` = ? AND `password` = ?";
    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error("Database query error:", err);
            return res.status(500).json({ success: false, message: "Database error occurred" });
        }

        if (results.length > 0) {
            return res.json({ success: true, message: "Login successful!" });
        } else {
            return res.status(401).json({ success: false, message: "Invalid username or password" });
        }
    });
});

app.post('/submit', (req, res) => {
    const { username, phone, email, password } = req.body;
    const query = "INSERT INTO `user_details` (userName, number, mail, password) VALUES (?, ?, ?, ?)";
    
    db.query(query, [username, phone, email, password], (err, results) => {
        if (err) {
            console.error("Error during the query", err);
            return res.status(500).json({ message: "Error saving user data" });
        }
        res.json({ success: true, message: "User registered successfully!" });
    });
});

// Static file routes (for serving HTML, CSS, etc.)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'homepage.html')); // Serve the homepage
});

// Start the server
const PORT = process.env.PORT || 5501;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
