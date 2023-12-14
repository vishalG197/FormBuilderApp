// ClozeQuestion.js

import React from "react";

const ClozeQuestion = ({ question, updateQuestion, error }) => {
  const blanks = question.data.blanks || [];

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("text/plain", id);
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData("text/plain");

    const updatedBlanks = blanks.map((blank, i) =>
      i === index ? itemId : blank
    );

    updateQuestion({ ...question, data: { blanks: updatedBlanks } });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="mt-4 p-4 border rounded shadow-md">
      <h3 className="text-lg font-bold mb-2">Cloze Question</h3>

      <div>
        {blanks.map((blank, index) => (
          <div
            key={index}
            onDrop={(e) => handleDrop(e, index)}
            onDragOver={handleDragOver}
            className="bg-gray-200 p-2 inline-block"
          >
            {blank}
          </div>
        ))}
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default ClozeQuestion;
