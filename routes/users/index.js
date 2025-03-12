const dbConnect = require('../../config/db');  // Path to your database connection
const User = require('../../models/User');    // Path to your User model
const bcrypt = require('bcryptjs');

const handler = async (req, res) => {
  const { method } = req;
  const { id } = req.query; // Get user ID from query parameter

  // Connect to the database
  await dbConnect();

  switch (method) {
    // Get all users
    case 'GET':
      try {
        const users = await User.find({});
        res.status(200).json({ success: true, data: users });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    // Create a new user
    case 'POST':
      try {
        const { username, email, password } = req.body;

        // Simple validation
        if (!username || !email || !password) {
          return res.status(400).json({
            success: false,
            message: 'Please provide all the required fields',
          });
        }

        // Check for duplicate email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({
            success: false,
            message: 'Email is already in use',
          });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user
        const newUser = new User({ ...req.body, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ success: true, data: newUser });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    // Delete a user by ID
    // DELETE route for user deletion
case 'DELETE':
  try {
    const { id } = req.params;  // Extract user ID from the URL path

    if (!id) {
      return res.status(400).json({ success: false, message: 'User ID is required' });
    }

    // Find and delete the user by ID
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: 'Invalid request or user ID' });
  }
  break;

  }
};

module.exports = handler;
