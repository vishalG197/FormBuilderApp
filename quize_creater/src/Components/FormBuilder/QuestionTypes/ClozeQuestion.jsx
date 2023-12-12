// components/ClozeQuestion.js
import React, { useState } from 'react';

const ClozeQuestion = () => {
  const [question, setQuestion] = useState({
    questionText: '',
    blanks: [],
  });

  const handleTextChange = (e) => {
    setQuestion({
      ...question,
      questionText: e.target.value,
    });
  };

  const handleUnderlineClick = (start, end) => {
    const text = question.questionText;
    const newBlank = text.substring(start, end);
    
    setQuestion({
      ...question,
      blanks: [...question.blanks, { word: newBlank }],
    });
  };

  return (
    <div>
      <div>
        <label htmlFor="questionText">Question Text:</label>
        <textarea
          id="questionText"
          value={question.questionText}
          onChange={handleTextChange}
          className="mt-1 p-2 w-full border rounded-md"
          rows="4"
        />
      </div>
      <div className="mt-4">
        <label>Fill-in-the-Blanks:</label>
        <p className="text-gray-700">{question.questionText}</p>
        <div className="flex flex-wrap">
          {question.blanks.map((blank, index) => (
            <span key={index} className="bg-yellow-200 p-1 rounded mx-1">
              {blank.word}
            </span>
          ))}
        </div>
        <p className="text-gray-700 mt-2">
          Click and drag to select a word in the text, then click the button to create a fill-in-the-blank.
        </p>
        <button onClick={() => handleUnderlineClick(5, 10)} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
          Create Blank
        </button>
      </div>
    </div>
  );
};

export default ClozeQuestion;
