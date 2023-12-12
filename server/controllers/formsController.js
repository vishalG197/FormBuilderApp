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

module.exports = {
  getAllForms,
  createForm,
};
