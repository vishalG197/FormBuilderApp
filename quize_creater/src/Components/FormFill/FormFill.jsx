
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
let data={
  headerImage: 'https://tse2.mm.bing.net/th?id=OIP.JAQ4rlCwbALiX8vooija7QHaEK&pid=Api&P=0&h=220',
  questions: [
    {
      id: 1,
      type: 'categorize',
      data: {
        Description: 'Categorize Questions Example',
        Question: [
          { category: 'Category 1', items: ['Item 1', 'Item 2'] },
          { category: 'Category 2', items: ['Item 3', 'Item 4'] },
        ],
      },
    },
    {
      id: 2,
      type: 'cloze',
      data: {
        text: 'This is a cloze question example with ___ blanks. Fill in the blanks.',
        blanks: ['blank1', 'blank2'],
      },
    },
    {
      id: 3,
      type: 'comprehension',
      data: {
        passage: 'This is a comprehension passage.',
        Questions: [
          {
            question: 'What is the capital of Country X?',
            options: ['Option A', 'Option B', 'Option C'],
            correctOption: 'Option B',
          },
          // Add more MCQ questions as needed
        ],
      },
    },
  ],
};


const FormFill = () => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleAnswer = (questionId, answer) => {
    setAnswers((prevAnswers) => ({ ...prevAnswers, [questionId]: answer }));
  };

  const handleSubmit = () => {
    // Perform the post request with the answers here
    // For simplicity, let's just log the answers to the console
    console.log('Submitted Answers:', answers);

    // Display submission success message
    toast.success('Quiz submitted successfully!', {
      position: 'top-center',
      autoClose: 3000, // Auto close the toast after 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    // Set the submitted state to true
    setSubmitted(true);
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <img src={data.headerImage} alt="Header" className="mb-8 w-full align-middle ml-77 rounded-lg shadow-lg" />
<h1 className="text-3xl font-bold">Quiz-2.0</h1>
      {data.questions.map((question) => (
        <div key={question.id} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{question.data.Description}</h2>

          {question.type === 'categorize' && (
            <div>
              <p className="mb-4">Q.{question.data.Description}</p>
              {question.data.Question.map((category, index) => (
                <div key={index} className="mb-4">
                  <p className="font-semibold mb-2">{category.category}</p>
                  {/* Render items for each category */}
                  {category.items.map((item, i) => (
                    <label key={i} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        className="form-checkbox text-blue-500"
                        onChange={() => handleAnswer(question.id, item)}
                      />
                      <span className="ml-2">{item}</span>
                    </label>
                  ))}
                </div>
              ))}
            </div>
          )}

          {question.type === 'cloze' && (
            <div>
              <p className="mb-4">Q.{question.data.text}</p>
              {question.data.blanks.map((blank, index) => (
                <div key={index} className="mb-4">
                  <input
                    type="text"
                    placeholder={`Enter ${blank}`}
                    className="border rounded p-2 w-full"
                    onChange={(e) => handleAnswer(question.id, e.target.value)}
                  />
                </div>
              ))}
            </div>
          )}

          {question.type === 'comprehension' && (
            <div>
              <p className="mb-4">Passage:-{question.data.passage}</p>
              {question.data.Questions.map((mcq, index) => (
                <div key={index} className="mb-4">
                  <p className="font-semibold mb-2">{mcq.question}</p>
                  {mcq.options.map((option, i) => (
                    <label key={i} className="block mb-2">
                      <input
                        type="radio"
                        name={`question_${question.id}`}
                        className="form-radio text-blue-500"
                        onChange={() => handleAnswer(question.id, option)}
                      />
                      <span className="ml-2">{option}</span>
                    </label>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {!submitted && (
        <button onClick={handleSubmit} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Submit
        </button>
      )}

      <ToastContainer />

      {submitted && (
        <p className="mt-4 text-green-500 text-center">
          Thank you for submitting the quiz! 🎉
        </p>
      )}
    </div>
  );
};

export default FormFill;
