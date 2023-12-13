// server/models/Form.js
const mongoose = require('mongoose');

// Define schema for MCQ question type
const mcqQuestionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctOption: String,
});

// Define schema for Categorize question type
const categorizeQuestionSchema = new mongoose.Schema({
   Description: String,
  Question: [{category: String, items: [String]}],
  
});

// Define schema for Cloze question type
const clozeQuestionSchema = new mongoose.Schema({
  text: String,
  blanks: [String],
});

// Define schema for Comprehension question type
const comprehensionQuestionSchema = new mongoose.Schema({
  passage: String,
  mcqQuestions: [mcqQuestionSchema],
});

// Define the main form schema
const formSchema = new mongoose.Schema({
  headerImage: {
    type: String,
    default: '',
  },
  questions: [
    {
      id: {
        type: Number,
        required: true,
      },
      type: {
        type: String,
        required: true,
        enum: ['categorize', 'cloze', 'comprehension'],
      },
     
      data: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
      },
    },
  ],
});

const Form = mongoose.model('Form', formSchema);

module.exports = Form;
