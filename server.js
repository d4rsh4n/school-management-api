const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
app.use(express.json());

// Test route
app.get('/test', (req, res) => {
  res.send('Test route working!');
});

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) {
    console.error('MySQL connection failed:', err);
    process.exit(1);
  }
  console.log('MySQL Connected...');
});

// Add School
app.post('/addSchool', (req, res) => {
  const { name, address, latitude, longitude } = req.body;
  
  if (!name || !address || !latitude || !longitude) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const sql = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, address, latitude, longitude], (err, result) => {
    if (err) throw err;
    res.json({ message: 'School added successfully', id: result.insertId });
  });
});

// List Schools
app.get('/listSchools', (req, res) => {
  const { latitude, longitude } = req.query;
  
  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'Latitude and longitude are required' });
  }

  const sql = `
    SELECT *, 
      (6371 * ACOS(
        COS(RADIANS(?)) * COS(RADIANS(latitude)) * COS(RADIANS(longitude) - RADIANS(?)) 
        + SIN(RADIANS(?)) * SIN(RADIANS(latitude))
      )) AS distance
    FROM schools
    ORDER BY distance ASC
  `;
  db.query(sql, [latitude, longitude, latitude], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
