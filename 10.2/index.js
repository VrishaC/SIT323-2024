const express = require('express');
const connectDB = require('./config/database');
const authRoutes = require('./routes/auth');
const mongoose = require('mongoose');
const User = require('./models/user');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB()
  .then(() => {
    console.log('MongoDB connected');
    // Example usage of the User model
    const user = new User({
      username: 'exampleUser11',
      email: 'user11@example.com',
      password: 'password_123',
    });

    user.save()
      .then(() => {
        console.log('User saved successfully');
      })
      .catch((err) => {
        console.error(`Error saving user: ${err.message}`);
      });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the application if MongoDB connection fails
  });

app.use(bodyParser.json());
app.use('/api/auth', authRoutes);

// Define a route for the homepage
app.get('/', (req, res) => {
  res.send('Welcome to my website!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
