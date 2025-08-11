const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
// Add School
// Add School (improved)
app.post('/addSchool', (req, res) => {
  try {
    // Debug: uncomment while testing
    // console.log("Received body:", req.body);

    const { name, address, latitude, longitude } = req.body || {};

    // required fields
    if (!name || !address || latitude === undefined || longitude === undefined) {
      return res.status(400).json({ error: 'All fields are required: name, address, latitude, longitude' });
    }

    // check numeric lat/lng
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
    if (!isFinite(lat) || !isFinite(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      return res.status(400).json({ error: 'latitude and longitude must be valid numbers (lat: -90..90, lng: -180..180)' });
    }

    const sql = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, address, lat, lng], (err, result) => {
      if (err) {
        console.error('DB insert error:', err);
        return res.status(500).json({ error: 'Database insert failed' });
      }
      res.status(201).json({ message: 'School added successfully', id: result.insertId });
    });
  } catch (e) {
    console.error('Unexpected error in /addSchool:', e);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
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
