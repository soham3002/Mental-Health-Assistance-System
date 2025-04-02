const express = require('express');
const Mood = require('../models/Mood');
const router = express.Router();

router.post('/track', async (req, res) => {
    const { userId, mood, notes } = req.body;

    try {
        const newMood = new Mood({ userId, date: new Date(), mood, notes });
        await newMood.save();
        res.status(201).json(newMood);
    } catch (err) {
        res.status(400).json({ message: 'Error tracking mood', error: err.message });
    }
});

router.get('/history/:userId', async (req, res) => {
    try {
        const moods = await Mood.find({ userId: req.params.userId });
        res.json(moods);
    } catch (err) {
        res.status(400).json({ message: 'Error fetching mood history', error: err.message });
    }
});

module.exports = router;
