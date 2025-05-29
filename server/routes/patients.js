import express from 'express';
import { check, validationResult } from 'express-validator';

// In a real app, we would import models from a database
// import Patient from '../models/Patient.js';

const router = express.Router();

// Mock patients for demo purposes
let mockPatients = [
  {
    id: '1',
    firstName: 'Emma',
    lastName: 'Johnson',
    dateOfBirth: '1980-05-15',
    gender: 'female',
    email: 'emma.johnson@example.com',
    phone: '(555) 123-4567',
    address: '123 Main St',
    city: 'Boston',
    state: 'MA',
    zip: '02108',
    emergencyContactName: 'John Johnson',
    emergencyContactPhone: '(555) 987-6543',
    status: 'active',
    bloodType: 'A+',
    allergies: 'Penicillin',
    medicalConditions: 'Hypertension, Asthma',
    currentMedications: 'Lisinopril 10mg, Albuterol inhaler',
    createdAt: '2025-01-15T08:30:00',
    updatedAt: '2025-05-10T14:45:00',
  },
  {
    id: '2',
    firstName: 'Robert',
    lastName: 'Smith',
    dateOfBirth: '1963-07-15',
    gender: 'male',
    email: 'robert.smith@example.com',
    phone: '(555) 123-4567',
    address: '456 Oak Ave',
    city: 'Springfield',
    state: 'IL',
    zip: '62704',
    emergencyContactName: 'Mary Smith',
    emergencyContactPhone: '(555) 987-6543',
    status: 'critical',
    bloodType: 'B+',
    allergies: 'Penicillin, Sulfa drugs',
    medicalConditions: 'Hypertension, Type 2 Diabetes',
    currentMedications: 'Lisinopril 10mg, Metformin 500mg',
    createdAt: '2025-02-20T10:15:00',
    updatedAt: '2025-05-12T09:30:00',
  },
  // More mock patients would be here...
];

// @route   GET api/patients
// @desc    Get all patients
// @access  Private
router.get('/', async (req, res) => {
  try {
    // In a real app, we would query the database
    // const patients = await Patient.find().sort({ updatedAt: -1 });
    
    // For demo purposes, we'll return mock data
    res.json(mockPatients);
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET api/patients/:id
// @desc    Get patient by ID
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    // In a real app, we would query the database
    // const patient = await Patient.findById(req.params.id);
    
    // For demo purposes, we'll find in mock data
    const patient = mockPatients.find(p => p.id === req.params.id);
    
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    
    res.json(patient);
  } catch (error) {
    console.error('Error fetching patient:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST api/patients
// @desc    Create a new patient
// @access  Private
router.post(
  '/',
  [
    check('firstName', 'First name is required').not().isEmpty(),
    check('lastName', 'Last name is required').not().isEmpty(),
    check('dateOfBirth', 'Date of birth is required').not().isEmpty(),
    check('gender', 'Gender is required').not().isEmpty(),
    check('phone', 'Phone number is required').not().isEmpty(),
  ],
  async (req, res) => {
    // Validate request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // In a real app, we would create a new patient in the database
      // const newPatient = new Patient(req.body);
      // await newPatient.save();
      
      // For demo purposes, we'll add to mock data
      const newPatient = {
        id: (mockPatients.length + 1).toString(),
        ...req.body,
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      mockPatients.push(newPatient);
      
      res.status(201).json(newPatient);
    } catch (error) {
      console.error('Error creating patient:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// @route   PUT api/patients/:id
// @desc    Update a patient
// @access  Private
router.put('/:id', async (req, res) => {
  try {
    // In a real app, we would update the patient in the database
    // const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    
    // For demo purposes, we'll update mock data
    const index = mockPatients.findIndex(p => p.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    
    mockPatients[index] = {
      ...mockPatients[index],
      ...req.body,
      updatedAt: new Date().toISOString()
    };
    
    res.json(mockPatients[index]);
  } catch (error) {
    console.error('Error updating patient:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE api/patients/:id
// @desc    Delete a patient
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    // In a real app, we would delete the patient from the database
    // await Patient.findByIdAndDelete(req.params.id);
    
    // For demo purposes, we'll remove from mock data
    const index = mockPatients.findIndex(p => p.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    
    mockPatients = mockPatients.filter(p => p.id !== req.params.id);
    
    res.json({ message: 'Patient deleted successfully' });
  } catch (error) {
    console.error('Error deleting patient:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;