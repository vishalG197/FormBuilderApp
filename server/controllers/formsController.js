// server/controllers/formsController.js

const Form = require('../models/Form');

// Get all forms
const getAllForms = async (req, res) => {
  try {
    const forms = await Form.find();
    res.json(forms);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new form
const createForm = async (req, res) => {
  const { headerImage, questions } = req.body;

  try {
    const newForm = new Form({
      headerImage,
      questions,
    });

    const savedForm = await newForm.save();
    res.json(savedForm);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get form by ID
const getFormById = async (req, res) => {
  const { id } = req.params;

  try {
    const form = await Form.findById(id);
    if (!form) {
      return res.status(404).json({ error: 'Form not found' });
    }

    res.json(form);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update form by ID
const updateFormById = async (req, res) => {
  const { id } = req.params;
  const { headerImage, questions } = req.body;

  try {
    const form = await Form.findById(id);
    if (!form) {
      return res.status(404).json({ error: 'Form not found' });
    }

    form.headerImage = headerImage;
    form.questions = questions;

    const updatedForm = await form.save();
    res.json(updatedForm);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete form by ID
const deleteFormById = async (req, res) => {
  const { id } = req.params;

  try {
    const form = await Form.findById(id);
    if (!form) {
      return res.status(404).json({ error: 'Form not found' });
    }

    await form.remove();
    res.json({ message: 'Form deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllForms,
  createForm,
  getFormById,
  updateFormById,
  deleteFormById,
};
