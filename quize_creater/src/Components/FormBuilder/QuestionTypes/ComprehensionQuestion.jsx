
import React, { useState } from "react";

const ComprehensionQuestion = ({ updateQuestion }) => {
  const [comprehension, setComprehension] = useState("");
  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const addQuestion = () => {
   
    setQuestions([...questions, ""]);
    setOptions([...options, ["", "", "", ""]]);
    setCorrectAnswers([...correctAnswers, ""]);
  };

  const handleQuestionChange = (index, value) => {
   
    const updatedQuestions = [...questions];
    updatedQuestions[index] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
   
    const updatedOptions = [...options];
    updatedOptions[questionIndex][optionIndex] = value;
    setOptions(updatedOptions);
  };

  const handleCorrectAnswerChange = (questionIndex, value) => {
    
    const updatedCorrectAnswers = [...correctAnswers];
    updatedCorrectAnswers[questionIndex] = value;
    setCorrectAnswers(updatedCorrectAnswers);
  };

  const handleSubmit = async () => {
   
    const postData = {
      comprehension,
      questions: questions.map((question, index) => ({
        text: question,
        options: options[index],
        correctAnswer: correctAnswers[index],
      })),
    };

    try {
    if (questions) {
       
        console.log("Submitted Details:", postData);
        updateQuestion({
          type: "comprehension",
          data: {
            passage: comprehension,
            Questions: questions.map((question, index) => ({
              question: question,
              options: options[index],
              correctOption: correctAnswers[index],
            })),
          },
        });
        setSubmitted(true);
      } else {
        console.error("Failed to save data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Quiz Builder</h1>
        <div className="mb-4">
          <label className="block">
            Comprehension:
            <input
              type="text"
              value={comprehension}
              onChange={(e) => setComprehension(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </label>
        </div>
        <div>
          {questions.map((question, questionIndex) => (
            <div key={questionIndex} className="mb-4">
              <label className="block">
                Question {questionIndex + 1}:
                <input
                  type="text"
                  value={question}
                  onChange={(e) =>
                    handleQuestionChange(questionIndex, e.target.value)
                  }
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </label>
              <br />
              {options[questionIndex].map((option, optionIndex) => (
                <label key={optionIndex} className="block">
                  <input
                    type="radio"
                    name={`question${questionIndex}`}
                    value={option}
                    checked={correctAnswers[questionIndex] === option}
                    onChange={() =>
                      handleCorrectAnswerChange(questionIndex, option)
                    }
                    className="mr-2"
                  />
                  Option {optionIndex + 1}:
                  <input
                    type="text"
                    value={option}
                    onChange={(e) =>
                      handleOptionChange(
                        questionIndex,
                        optionIndex,
                        e.target.value
                      )
                    }
                    className="mt-1 p-2 border rounded-md"
                  />
                </label>
              ))}
              <br />
            </div>
          ))}
        </div>
        <div className="mb-4">
          <button
            onClick={addQuestion}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Question
          </button>
        </div>
        <div>
          <button
            onClick={handleSubmit}
            disabled={submitted}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
      </div>
      {submitted && <p>Your details are submitted.</p>}
    </div>
  );
};

export default ComprehensionQuestion;
