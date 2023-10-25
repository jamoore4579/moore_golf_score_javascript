const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000; // Set your desired port number

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'your_mysql_servername',
  user: 'your_mysql_username',
  password: 'your_mysql_password',
  database: 'your_database_name',
});

// Connect to the MySQL database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});

// Use body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// Serve your HTML form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/scorecard.html');
});

// Handle form submission
app.post('/submit', (req, res) => {
  const holeNumber = req.body.holeNumber;
  const score = req.body.score;

  const sql = `INSERT INTO scorecard (hole_number, score) VALUES (?, ?)`;

  db.query(sql, [holeNumber, score], (err, result) => {
    if (err) {
      console.error('Error inserting data: ' + err.message);
      res.status(500).send('Internal server error');
      return;
    }
    console.log('Data inserted successfully');
    res.send('Data inserted successfully');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
