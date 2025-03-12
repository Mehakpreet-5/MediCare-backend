const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    message: { type: String },
    meetingID: { type: String, required: true }, // Add meetingID here
    doctor: {
        name: { type: String, required: true },
        specialization: { type: String, required: true },
        experience: { type: Number, required: true },
        availability: { type: String, required: true },
        
    },

});

// Check for existing model and export
const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);
module.exports = Booking;
