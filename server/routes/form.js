// server/routes/forms.js

const express = require('express');
const router = express.Router();
const formsController = require('../controllers/formsController');

// Get all forms
router.get('/', formsController.getAllForms);

// Create a new form
router.post('/', formsController.createForm);

module.exports = router;
