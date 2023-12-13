import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const FormFill = () => {
  const [form, setForm] = useState({});
  const [responses, setResponses] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const { formId } = useParams();

  useEffect(() => {
    const fetchFormDetails = async () => {
      try {
        const response = await fetch(`http://your-api-base-url/forms/${formId}`);
        if (response.ok) {
          const formData = await response.json();
          setForm(formData);
        } else {
          console.error('Failed to fetch form details');
        }
      } catch (error) {
        console.error('Error fetching form details:', error);
      }
    };

    fetchFormDetails();
  }, [formId]);

  const handleInputChange = (questionId, value) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [questionId]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://your-api-base-url/responses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formId: formId,
          answers: responses,
        }),
      });

      if (response.ok) {
        setSubmitSuccess(true);
      } else {
        console.error('Failed to submit responses');
      }
    } catch (error) {
      console.error('Error submitting responses:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded bg-white">
      {/* Header Image */}
      {form.headerImage && <img src={form.headerImage} alt="Header" className="mb-4 rounded" />}

      {/* Form Questions Section */}
      {form.questions.map((question) => (
        <div key={question.id} className="mb-6">
          {/* Display question text */}
          <p className="text-lg font-bold">{question.text}</p>

          {/* Display question image if available */}
          {question.image && <img src={question.image} alt="Question" className="mb-2 rounded" />}

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

      {/* Success Message */}
      {submitSuccess && (
        <p className="text-green-600 mt-4">Form submitted successfully! Thank you.</p>
      )}
    </div>
  );
};

export default FormFill;
