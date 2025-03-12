
const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking.js'); // Adjust path as necessary
const dbConnect = require('../config/db.js'); // Import the database connection

// Middleware to ensure database connection
router.use(async (req, res, next) => {
    await dbConnect();
    next();
});

// POST: Create a new booking
router.post('/', async (req, res) => {
    try {
        const bookingData = req.body; // Get data from the request body
        const booking = new Booking(bookingData); // Create a new booking instance
        await booking.save(); // Save to the database
        res.status(201).json({ message: 'Booking confirmed!', booking }); // Return success message
    } catch (error) {
        console.error('Error saving booking:', error);
        res.status(500).json({ message: 'Error saving booking', error }); // Return error message
    }
});

// GET: Fetch all bookings
router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.find();  // Get all bookings
        res.status(200).json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ message: 'Error fetching bookings', error });
    }
});

// DELETE: Cancel a booking by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await Booking.findByIdAndDelete(id);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found!' });
        }

        res.status(200).json({ message: 'Booking canceled successfully!' });
    } catch (error) {
        console.error('Error deleting booking:', error);
        res.status(500).json({ message: 'Error deleting booking', error });
    }
});


module.exports = router;
