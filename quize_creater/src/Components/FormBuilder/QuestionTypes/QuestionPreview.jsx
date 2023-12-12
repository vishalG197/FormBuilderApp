// FormBuilder.js
import React, { useState } from 'react';
import CategorizeQuestion from './QuestionTypes/CategorizeQuestion';
import ClozeQuestion from './QuestionTypes/ClozeQuestion';
import ComprehensionQuestion from './QuestionTypes/ComprehensionQuestion';
import QuestionPreview from './QuestionTypes/QuestionPreview';

const FormBuilder = () => {
  const [selectedQuestionType, setSelectedQuestionType] = useState('categorize');
  const [selectedQuestionData, setSelectedQuestionData] = useState({
    categories: ['Category 1', 'Category 2'],
    items: ['Item 1', 'Item 2', 'Item 3'],
    // Add additional data properties for other question types
  });

  const handleQuestionTypeChange = (questionType) => {
    // Handle the change in question type
    // Fetch or set data based on the selected question type
    // For simplicity, let's set default data for the Categorize question
    setSelectedQuestionData({
      categories: ['Category 1', 'Category 2'],
      items: ['Item 1', 'Item 2', 'Item 3'],
    });
    setSelectedQuestionType(questionType);
  };

  return (
    <div className="flex">
      <div className="w-1/2 pr-4">
        {/* Question creation components */}
        {selectedQuestionType === 'categorize' && <CategorizeQuestion />}
        {selectedQuestionType === 'cloze' && <ClozeQuestion />}
        {selectedQuestionType === 'comprehension' && <ComprehensionQuestion />}
      </div>
      <div className="w-1/2">
        {/* Question type selector */}
        <div className="mb-4">
          <label htmlFor="questionType" className="block text-sm font-medium text-gray-700">
            Select Question Type:
          </label>
          <select
            id="questionType"
            value={selectedQuestionType}
            onChange={(e) => handleQuestionTypeChange(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          >
            <option value="categorize">Categorize</option>
            <option value="cloze">Cloze</option>
            <option value="comprehension">Comprehension</option>
            {/* Add options for other question types if needed */}
          </select>
        </div>

        {/* Question preview */}
        <QuestionPreview
          questionType={selectedQuestionType}
          data={selectedQuestionData}
        />
      </div>
    </div>
  );
};

export default FormBuilder;
