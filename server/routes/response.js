// server/routes/responses.js

const express = require('express');
const router = express.Router();
const responsesController = require('../controllers/responsesController');

// Get all responses for a specific form
router.get('/:formId', responsesController.getResponsesForForm);

// Create a new response
router.post('/', responsesController.createResponse);

// Get response by ID
router.get('/:id', responsesController.getResponseById);

// Update response by ID
router.put('/:id', responsesController.updateResponseById);

// Delete response by ID
router.delete('/:id', responsesController.deleteResponseById);

module.exports = router;
