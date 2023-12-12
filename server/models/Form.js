// server/models/Form.js

const mongoose = require('mongoose');

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
      },
      text: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        default: '',
      },
    },
  ],
});

const Form = mongoose.model('Form', formSchema);

module.exports = Form;
