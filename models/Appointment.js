const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    therapistId: { type: mongoose.Schema.Types.ObjectId, ref: 'Therapist', required: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ['Scheduled', 'Completed', 'Cancelled'], default: 'Scheduled' },
});

module.exports = mongoose.model('Appointment', appointmentSchema);
