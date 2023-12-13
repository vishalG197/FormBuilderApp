// server/models/Response.js
const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  formId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Form',
    required: true,
  },
  answers: [
    {
      questionId: {
        type: Number,
        required: true,
      },
      answer: {
        type: mongoose.Schema.Types.Mixed, 
        required: true,
      },
    },
  ],
});

const Response = mongoose.model('Response', responseSchema);

module.exports = Response;
