require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      ssl: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.log('MongoDB error:', err.message);
    setTimeout(connectDB, 5000);
  }
};

connectDB();

app.use('/api/auth', require('./routes/auth'));
app.use('/api/alarms', require('./routes/alarms'));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  setInterval(() => {
    const https = require('https');
    https.get('https://journeybell.onrender.com/api/health', (res) => {
      console.log('Keep alive ping:', res.statusCode);
    }).on('error', () => {});
  }, 14 * 60 * 1000);
});