// components/ComprehensionQuestion.js
import React, { useState } from 'react';

const ComprehensionQuestion = () => {
  const [question, setQuestion] = useState({
    passage: '',
    questions: [{ questionText: '', answer: '' }],
  });

  const handlePassageChange = (e) => {
    setQuestion({
      ...question,
      passage: e.target.value,
    });
  };

  const handleQuestionChange = (index, field, e) => {
    const updatedQuestions = [...question.questions];
    updatedQuestions[index][field] = e.target.value;

    setQuestion({
      ...question,
      questions: updatedQuestions,
    });
  };

  const handleAddQuestion = () => {
    setQuestion({
      ...question,
      questions: [...question.questions, { questionText: '', answer: '' }],
    });
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = [...question.questions];
    updatedQuestions.splice(index, 1);

    setQuestion({
      ...question,
      questions: updatedQuestions,
    });
  };

  return (
    <div>
      <div>
        <label htmlFor="passage">Passage:</label>
        <textarea
          id="passage"
          value={question.passage}
          onChange={handlePassageChange}
          className="mt-1 p-2 w-full border rounded-md"
          rows="4"
        />
      </div>
      <div className="mt-4">
        <label>Questions:</label>
        {question.questions.map((q, index) => (
          <div key={index} className="mt-2">
            <div>
              <label htmlFor={`questionText${index}`}>Question Text:</label>
              <input
                type="text"
                id={`questionText${index}`}
                value={q.questionText}
                onChange={(e) => handleQuestionChange(index, 'questionText', e)}
                className="p-2 border rounded-md w-full"
              />
            </div>
            <div className="mt-2">
              <label htmlFor={`answer${index}`}>Answer:</label>
              <input
                type="text"
                id={`answer${index}`}
                value={q.answer}
                onChange={(e) => handleQuestionChange(index, 'answer', e)}
                className="p-2 border rounded-md w-full"
              />
            </div>
            <button onClick={() => handleRemoveQuestion(index)} className="mt-2 text-red-500">
              Remove
            </button>
          </div>
        ))}
        <button onClick={handleAddQuestion} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
          Add Question
        </button>
      </div>
    </div>
  );
};

export default ComprehensionQuestion;
