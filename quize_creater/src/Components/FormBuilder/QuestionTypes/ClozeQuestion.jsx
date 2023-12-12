

import React from 'react';

const ClozeQuestion = ({ question, updateQuestion }) => {
  return (
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2">Cloze Question:</label>
      <input
        type="text"
        className="border rounded w-full py-2 px-3 mb-2"
        placeholder="Enter your cloze question"
        value={question.text}
        onChange={(e) => updateQuestion({ ...question, text: e.target.value })}
      />

      <label className="block text-gray-700 text-sm font-bold mb-2">Image URL:</label>
      <input
        type="text"
        className="border rounded w-full py-2 px-3 mb-2"
        placeholder="Enter image URL"
        value={question.image}
        onChange={(e) => updateQuestion({ ...question, image: e.target.value })}
      />
    </div>
  );
};

export default ClozeQuestion;
