const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

// Load environment variables from .env file
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const app = express();

// Create MySQL connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Enable all CORS Requests
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json())

// Define routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//TODO Later
//Look into week6 demo for creating separate functions for db endpoints using async and promise
// Endpoint to retrieve joke types from the database
app.get('/type', (req, res) => {
    // Query the database to fetch all joke types
    pool.query('SELECT type FROM joke_types', (error, results) => {
      if (error) {
        console.error('Error fetching joke types:', error);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      // Extract the types from the query results
      const types = results.map(result => result.type);
      // Send the types as a JSON response
      res.json(types);
    });
});

// Endpoint to retrieve jokes by type
app.get('/joke', (req, res) => {
  // Extract the type and count parameters from the request query
  const { type, count } = req.query;
  
  // Construct the SQL query based on the provided parameters
  let query = 'SELECT setup, punchline FROM jokes';
  const values = [];
  
  if (type) {
    query += ' JOIN joke_types ON jokes.type_id = joke_types.id WHERE joke_types.type = ?';
    values.push(type);
  }
  
  if (count) {
    if (type){
      query += ' ORDER BY RAND() LIMIT ?';
    } else {
      query += ' ORDER BY RAND() LIMIT 1';
    }
    values.push(parseInt(count));
  } else {
    query += ' ORDER BY RAND() LIMIT 1';
  }
  
    // Execute the query
  pool.query(query, values, (error, results) => {
      if (error) {
        console.error('Error fetching jokes:', error);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      // Send the jokes as a JSON response
      res.json(results);
  });
});

// start and listen the server
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));