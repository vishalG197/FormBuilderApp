

import React from 'react';

const FormPreview = ({ form }) => {
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
        </div>
      ))}
    </div>
  );
};

export default FormPreview;
