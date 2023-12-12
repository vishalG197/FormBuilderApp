// server/routes/responses.js

const express = require('express');
const router = express.Router();
const responsesController = require('../controllers/responsesController');

// Get all responses for a specific form
router.get('/:formId', responsesController.getResponsesForForm);

// Create a new response
router.post('/', responsesController.createResponse);

module.exports = router;
