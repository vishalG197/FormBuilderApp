// server/routes/forms.js

const express = require('express');
const router = express.Router();
const formsController = require('../controllers/formsController');

// Get all forms
router.get('/', formsController.getAllForms);

// Create a new form
router.post('/', formsController.createForm);

// Get form by ID
router.get('/:id', formsController.getFormById);

// Update form by ID
router.put('/:id', formsController.updateFormById);

// Delete form by ID
router.delete('/:id', formsController.deleteFormById);

module.exports = router;
