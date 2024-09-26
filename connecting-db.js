var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '', 
    database: 'flight_booking'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database as ID', connection.threadId);
});

connection.query('SELECT * FROM user_details', (err, results, fields) => {
    if (err) throw err;
    console.log('user_details:', results);
});

connection.end();

