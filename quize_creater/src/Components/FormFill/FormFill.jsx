
import React, { useState } from 'react';

const FormFill = ({ form }) => {
  const [responses, setResponses] = useState({});

  const handleInputChange = (questionId, value) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [questionId]: value,
    }));
  };

  const handleSubmit = () => {
    // Send responses to the backend or perform any desired action
    console.log('Form Responses:', responses);
  };

  return (
    <div>
      {/* Header Image */}
      {form.headerImage && <img src={form.headerImage} alt="Header" className="mb-4" />}

      {/* Form Questions Section */}
      {form.questions.map((question) => (
        <div key={question.id} className="mb-6">
          {/* Display question text */}
          <p className="text-lg font-bold">{question.text}</p>

          {/* Display question image if available */}
          {question.image && <img src={question.image} alt="Question" className="mb-2" />}

          {/* Input field based on question type */}
          {question.type === 'comprehension' ? (
            <textarea
              className="border rounded w-full py-2 px-3 mb-2"
              placeholder="Your answer here..."
              onChange={(e) => handleInputChange(question.id, e.target.value)}
            />
          ) : (
            <input
              type="text"
              className="border rounded w-full py-2 px-3 mb-2"
              placeholder="Your answer here..."
              onChange={(e) => handleInputChange(question.id, e.target.value)}
            />
          )}
        </div>
      ))}

      {/* Submit Button */}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default FormFill;
