require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  tls: true,
  tlsAllowInvalidCertificates: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB error:', err));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/alarms', require('./routes/alarms'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));