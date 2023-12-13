

const Response = require('../models/Response');


const getResponsesForForm = async (req, res) => {
  const formId = req.params.formId;

  try {
    const responses = await Response.find({ formId });
    res.json(responses);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


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


const getResponseById = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await Response.findById(id);
    if (!response) {
      return res.status(404).json({ error: 'Response not found' });
    }

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const updateResponseById = async (req, res) => {
  const { id } = req.params;
  const { formId, answers } = req.body;

  try {
    const response = await Response.findById(id);
    if (!response) {
      return res.status(404).json({ error: 'Response not found' });
    }

    response.formId = formId;
    response.answers = answers;

    const updatedResponse = await response.save();
    res.json(updatedResponse);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const deleteResponseById = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await Response.findById(id);
    if (!response) {
      return res.status(404).json({ error: 'Response not found' });
    }

    await response.remove();
    res.json({ message: 'Response deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getResponsesForForm,
  createResponse,
  getResponseById,
  updateResponseById,
  deleteResponseById,
};
