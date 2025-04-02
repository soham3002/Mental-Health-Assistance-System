const express = require('express');
const Appointment = require('../models/Appointment');
const router = express.Router();

router.post('/book', async (req, res) => {
    const { userId, therapistId, date } = req.body;

    try {
        const appointment = new Appointment({ userId, therapistId, date });
        await appointment.save();
        res.status(201).json(appointment);
    } catch (err) {
        res.status(400).json({ message: 'Error booking appointment', error: err.message });
    }
});

router.get('/appointments/:userId', async (req, res) => {
    try {
        const appointments = await Appointment.find({ userId: req.params.userId });
        res.json(appointments);
    } catch (err) {
        res.status(400).json({ message: 'Error fetching appointments', error: err.message });
    }
});

module.exports = router;
