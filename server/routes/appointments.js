import express from 'express';
import { check, validationResult } from 'express-validator';

// In a real app, we would import models from a database
// import Appointment from '../models/Appointment.js';

const router = express.Router();

// Mock appointments for demo purposes
let mockAppointments = [
  {
    id: '1',
    patientId: '1',
    patientName: 'Emma Johnson',
    date: '2025-05-15T10:30:00',
    endTime: '2025-05-15T11:00:00',
    type: 'Follow-up',
    status: 'scheduled',
    notes: '',
    createdAt: '2025-05-01T09:15:00',
    updatedAt: '2025-05-01T09:15:00'
  },
  {
    id: '2',
    patientId: '5',
    patientName: 'Michael Davis',
    date: '2025-05-15T11:45:00',
    endTime: '2025-05-15T12:15:00',
    type: 'Consultation',
    status: 'scheduled',
    notes: 'New patient consultation for chronic back pain',
    createdAt: '2025-05-02T14:30:00',
    updatedAt: '2025-05-02T14:30:00'
  },
  {
    id: '3',
    patientId: '2',
    patientName: 'Robert Smith',
    date: '2025-05-15T14:00:00',
    endTime: '2025-05-15T15:00:00',
    type: 'Emergency',
    status: 'scheduled',
    notes: 'Patient reporting severe chest pain and shortness of breath',
    createdAt: '2025-05-15T08:45:00',
    updatedAt: '2025-05-15T08:45:00'
  },
  // More mock appointments would be here...
];

// @route   GET api/appointments
// @desc    Get all appointments
// @access  Private
router.get('/', async (req, res) => {
  try {
    // In a real app, we would query the database
    // const appointments = await Appointment.find().sort({ date: 1 });
    
    // For demo purposes, we'll return mock data
    res.json(mockAppointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET api/appointments/:id
// @desc    Get appointment by ID
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    // In a real app, we would query the database
    // const appointment = await Appointment.findById(req.params.id);
    
    // For demo purposes, we'll find in mock data
    const appointment = mockAppointments.find(a => a.id === req.params.id);
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    res.json(appointment);
  } catch (error) {
    console.error('Error fetching appointment:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST api/appointments
// @desc    Create a new appointment
// @access  Private
router.post(
  '/',
  [
    check('patientId', 'Patient ID is required').not().isEmpty(),
    check('patientName', 'Patient name is required').not().isEmpty(),
    check('date', 'Appointment date is required').not().isEmpty(),
    check('type', 'Appointment type is required').not().isEmpty(),
  ],
  async (req, res) => {
    // Validate request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // In a real app, we would create a new appointment in the database
      // const newAppointment = new Appointment(req.body);
      // await newAppointment.save();
      
      // For demo purposes, we'll add to mock data
      const newAppointment = {
        id: (mockAppointments.length + 1).toString(),
        ...req.body,
        status: 'scheduled',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      mockAppointments.push(newAppointment);
      
      res.status(201).json(newAppointment);
    } catch (error) {
      console.error('Error creating appointment:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// @route   PUT api/appointments/:id
// @desc    Update an appointment
// @access  Private
router.put('/:id', async (req, res) => {
  try {
    // In a real app, we would update the appointment in the database
    // const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    
    // For demo purposes, we'll update mock data
    const index = mockAppointments.findIndex(a => a.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    mockAppointments[index] = {
      ...mockAppointments[index],
      ...req.body,
      updatedAt: new Date().toISOString()
    };
    
    res.json(mockAppointments[index]);
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE api/appointments/:id
// @desc    Delete an appointment
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    // In a real app, we would delete the appointment from the database
    // await Appointment.findByIdAndDelete(req.params.id);
    
    // For demo purposes, we'll remove from mock data
    const index = mockAppointments.findIndex(a => a.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    mockAppointments = mockAppointments.filter(a => a.id !== req.params.id);
    
    res.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;