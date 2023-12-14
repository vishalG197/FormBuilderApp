
const mongoose = require('mongoose');


const mcqQuestionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctOption: String,
});


const categorizeQuestionSchema = new mongoose.Schema({
   Description: String,
  Question: [{category: String, items: [String]}],
  
});


const clozeQuestionSchema = new mongoose.Schema({
  text: String,
  blanks: [String],
});


const comprehensionQuestionSchema = new mongoose.Schema({
  passage: String,
  Questions: [mcqQuestionSchema],
});


const formSchema = new mongoose.Schema({
  headerImage: {
    type: String,
    default: '',
  },
  topic:{
    type:String,
  },
  questions: [
    {
      id: {
        type: Number,
       
      },
      type: {
        type: String,
        
        enum: ['categorize', 'cloze', 'comprehension'],
      },
     
      data: {
        type: mongoose.Schema.Types.Mixed,
       
      },
    },
  ],
});

const Form = mongoose.model('Form', formSchema);

module.exports = Form;
