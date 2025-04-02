const mongoose = require('mongoose');

const therapistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    specialization: { type: String, required: true },
    availability: [{ day: String, time: String }],
});

module.exports = mongoose.model('Therapist', therapistSchema);
