const mongoose = require('mongoose');

const moodSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    mood: { type: String, enum: ['Happy', 'Sad', 'Anxious', 'Neutral'], required: true },
    notes: { type: String },
});

module.exports = mongoose.model('Mood', moodSchema);
