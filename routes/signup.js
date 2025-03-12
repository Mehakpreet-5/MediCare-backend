// // pages/api/signup.js
// import dbConnect from '../../db'
// import User from '../../models/User';
// import bcrypt from 'bcryptjs';

// export default async function handler(req, res) {
//   await dbConnect();

//   if (req.method === 'POST') {
//     const { username, email, password } = req.body;

//     // Validate input
//     if (!username || !email || !password) {
//       return res.status(400).json({ error: 'All fields are required' });
//     }

//     try {
//       // Check if the email already exists
//       const existingUser = await User.findOne({ email });
//       if (existingUser) {
//         return res.status(409).json({ error: 'Email already in use' });
//       }

//       // Hash the password before saving
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const user = new User({
//         username,
//         email,
//         password: hashedPassword,
//       });

//       await user.save();
//       res.status(201).json({ success: true, user });
//     } catch (error) {
//       console.error('Error saving user:', error);
//       res.status(500).json({ error: 'Failed to save user' });
//     }
//   } else {
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }


const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const dbConnect = require('../config/db.js'); // Ensure this connects to your MongoDB

const router = express.Router();

// POST /signup
router.post('/', async (req, res) => {
  await dbConnect();

  const { username, email, password } = req.body;

  // Validate input
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already in use' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ success: true, user });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ error: 'Failed to save user' });
  }
});

module.exports = router;
