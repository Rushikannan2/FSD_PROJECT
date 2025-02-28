require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const workoutRoutes = require('./routes/workouts');

// Middleware
app.use(express.json());

// Logger Middleware
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.path}`);
  next();
});

// Root Route
app.get('/', (req, res) => {
  res.json({ msg: 'Welcome to the app!' });
});

// Routes for Workouts
app.use('/api/workouts', workoutRoutes);

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONG_URI)
  .then(() => {
    app.listen(process.env.PORT || 4000, () => {
      console.log(`Server listening on port ${process.env.PORT || 4000}`);
      console.log(`Access the app at: http://localhost:${process.env.PORT || 4000}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });
