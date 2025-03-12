
// // pages/api/login.js
// import dbConnect from '@/db'; // adjust path if necessary
// import User from '@/models/User';
// import bcrypt from 'bcryptjs';

// export default async function handler(req, res) {
//   await dbConnect();

//   if (req.method === 'POST') {
//     const { email, password } = req.body;

//     // Validate email and password presence
//     if (!email || !password) {
//       return res.status(400).json({ error: 'Email and password are required.' });
//     }

//     try {
//       const user = await User.findOne({ email });
//       if (!user) {
//         return res.status(400).json({ error: 'User not found.' });
//       }

//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) {
//         return res.status(400).json({ error: 'Invalid credentials.' });
//       }

//       // Handle successful login (e.g., generate token, send user data)
//       res.status(200).json({ message: 'Login successful', user });
//     } catch (error) {
//       console.error('Login error:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   } else {
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }


const express = require('express');
const bcrypt = require('bcryptjs');
const dbConnect = require('../config/db'); // Adjust path as necessary
const User = require('../models/User');

const router = express.Router();

router.post('/', async (req, res) => {
  await dbConnect();

  const { email, password } = req.body;

  // Validate email and password presence
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials.' });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials.' });
    }

    // Send a success response with user data
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
