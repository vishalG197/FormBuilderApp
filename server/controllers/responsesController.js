// server/controllers/responsesController.js

const Response = require('../models/Response');

// Get all responses for a specific form
const getResponsesForForm = async (req, res) => {
  const formId = req.params.formId;

  try {
    const responses = await Response.find({ formId });
    res.json(responses);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new response
const createResponse = async (req, res) => {
  const { formId, answers } = req.body;

  try {
    const newResponse = new Response({
      formId,
      answers,
    });

    const savedResponse = await newResponse.save();
    res.json(savedResponse);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getResponsesForForm,
  createResponse,
};
