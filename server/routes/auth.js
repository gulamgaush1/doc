import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';

// In a real app, we would import models from a database
// import User from '../models/User.js';

const router = express.Router();

// Mock users for demo purposes
const mockUsers = [
  {
    _id: '1',
    name: 'Dr. John Smith',
    email: 'doctor@example.com',
    password: '$2b$10$BZDaC9I8j5vYNgqwuJR0ueVXVxBCQMeBJdg5WWwEX2B4h64ZOGHdm', // password123
    specialty: 'Cardiology',
    licenseNumber: 'MD12345',
    role: 'doctor'
  }
];

// @route   POST api/auth/register
// @desc    Register a doctor
// @access  Public
router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 8 or more characters').isLength({ min: 8 }),
    check('specialty', 'Specialty is required').not().isEmpty(),
    check('licenseNumber', 'License number is required').not().isEmpty()
  ],
  async (req, res) => {
    // Validate request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, specialty, licenseNumber } = req.body;

    try {
      // In a real app, we would check if user exists in the database
      const userExists = mockUsers.find(user => user.email === email);
      
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user (mock for demo)
      const newUser = {
        _id: (mockUsers.length + 1).toString(),
        name,
        email,
        password: hashedPassword,
        specialty,
        licenseNumber,
        role: 'doctor'
      };
      
      // In a real app, we would save the user to the database
      // In this demo, we'll just log the user
      console.log('New user registered:', { ...newUser, password: '[HIDDEN]' });
      
      // Add to mock users
      mockUsers.push(newUser);

      return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Registration error:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  }
);

// @route   POST api/auth/login
// @desc    Login a doctor
// @access  Public
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    // Validate request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // In a real app, we would find the user in the database
      const user = mockUsers.find(user => user.email === email);
      
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Create JWT token
      const payload = {
        user: {
          id: user._id,
          role: user.role
        }
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET || 'jwtsecrettoken',
        { expiresIn: '24h' },
        (err, token) => {
          if (err) throw err;
          res.json({ 
            token,
            user: {
              id: user._id,
              name: user.name,
              email: user.email,
              specialty: user.specialty,
              role: user.role
            }
          });
        }
      );
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  }
);

// @route   GET api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', async (req, res) => {
  try {
    // In a real app, we would get the user ID from the auth middleware
    // and find the user in the database
    
    // For demo purposes, we'll return a mock user
    const user = {
      id: '1',
      name: 'Dr. John Smith',
      email: 'doctor@example.com',
      specialty: 'Cardiology',
      role: 'doctor'
    };
    
    res.json({ user });
  } catch (error) {
    console.error('Auth error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router;