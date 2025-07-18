// Load environment variables
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample route for testing
app.get('/api/posts', (req, res) => {
  res.status(200).json({ message: 'Posts route is working!' });
});

// Connect to MongoDB and start server
if (process.env.NODE_ENV !== 'test') {
  mongoose
    .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/testing_db')
    .then(() => {
      console.log('Connected to MongoDB');
      app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
      });
    })
    .catch((err) => {
      console.error('MongoDB connection failed:', err.message);
    });
}

module.exports = app; // Export for testing
