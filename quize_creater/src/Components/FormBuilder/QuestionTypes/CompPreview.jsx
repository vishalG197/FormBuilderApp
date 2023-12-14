// ComprehensionQuestion.js

import React from "react";

const ComprehensionQuestion = ({ question, updateQuestion, error }) => {
  const content = question.data.content || "";

  return (
    <div className="mt-4 p-4 border rounded shadow-md">
      <h3 className="text-lg font-bold mb-2">Comprehension Question</h3>

      <div className="p-4 bg-white rounded shadow-md">
        <p>{content}</p>
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default ComprehensionQuestion;
