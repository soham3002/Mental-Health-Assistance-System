const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const therapistRoutes = require('./routes/therapistRoutes');
const moodRoutes = require('./routes/moodRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');

// Initialize dotenv for environment variables
dotenv.config();

// Create an Express app
const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// Connect to MongoDB using the environment variable for MongoDB URI
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/mental_health', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log('Error connecting to MongoDB: ', err));

// Use routes
app.use('/api/auth', authRoutes); // User authentication routes
app.use('/api/therapists', therapistRoutes); // Therapist directory routes
app.use('/api/mood', moodRoutes); // Mood tracking routes
app.use('/api/appointments', appointmentRoutes); // Appointment booking routes

// Basic Home Route
app.get('/', (req, res) => {
  res.send('Welcome to the Mental Health Assistance System');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
