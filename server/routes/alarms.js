const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Alarm = require('../models/Alarm');

// Get all alarms
router.get('/', auth, async (req, res) => {
  try {
    const alarms = await Alarm.find({ user: req.user.id });
    res.json(alarms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create alarm
router.post('/', auth, async (req, res) => {
  try {
    const alarm = new Alarm({ ...req.body, user: req.user.id });
    await alarm.save();
    res.status(201).json(alarm);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update alarm
router.put('/:id', auth, async (req, res) => {
  try {
    const alarm = await Alarm.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    res.json(alarm);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete alarm
router.delete('/:id', auth, async (req, res) => {
  try {
    await Alarm.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    res.json({ message: 'Alarm deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;