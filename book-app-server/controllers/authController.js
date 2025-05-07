const jwt = require('jsonwebtoken')
const User = require('../models/User')
const bcrypt = require('bcryptjs');


// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  })
}

// Register user
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already in use' })
    }

    const user = new User({ email, password }) // plain password here
    await user.save() // password will be hashed by model

    const token = generateToken(user._id)

    res.status(201).json({
      success: true,
      token,
      user: { id: user._id, email: user.email }
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}


// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    
    // Check if user exists
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' })
    }

    // Check password
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' })
    }

    // Generate token
    const token = generateToken(user._id)

    res.json({
      success: true,
      token,
      user: { id: user._id, email: user.email }
    })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

// Get current user
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password')
    res.json({ success: true, user })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' })
  }
}