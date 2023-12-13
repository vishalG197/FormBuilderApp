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
        type: mongoose.Schema.Types.Mixed, // You can adjust the type based on the nature of the answers
        required: true,
      },
    },
  ],
});

const Response = mongoose.model('Response', responseSchema);

module.exports = Response;
