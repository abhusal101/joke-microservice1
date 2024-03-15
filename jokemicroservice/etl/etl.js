const express = require('express');
const consumer = require('./consumer');
const producer = require('./producer');

const app = express();

// Start the consumer and producer
consumer.startConsuming();
producer.produceJokes();

// Define a route for the Express application
app.get("/", (req, res) => {
  res.send(`ETL application is up`);
});

// Start the Express server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`ETL application listening on port ${PORT}`);
});
