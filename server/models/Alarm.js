const mongoose = require('mongoose');

const alarmSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  destination: {
    name: { type: String },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  radius: { type: Number, default: 500 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Alarm', alarmSchema);