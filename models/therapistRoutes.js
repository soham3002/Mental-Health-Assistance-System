const express = require('express');
const Therapist = require('../models/Therapist');
const router = express.Router();

router.get('/therapists', async (req, res) => {
    try {
        const therapists = await Therapist.find();
        res.json(therapists);
    } catch (err) {
        res.status(400).json({ message: 'Error fetching therapists', error: err.message });
    }
});

module.exports = router;
