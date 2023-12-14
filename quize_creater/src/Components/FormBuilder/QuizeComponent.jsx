import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import axios from "axios";

const QuizComponent = () => {
  const [quizData, setQuizData] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    // Fetch quiz data from the server
    const fetchData = async () => {
      try {
         const response = await fetch("https://quize-5b24.onrender.com/forms");
         const data = await response.json();
         console.log(data)
        setQuizData(data);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchData();
  }, []);

  const startQuiz = (quiz) => {
    setCurrentQuiz(quiz);
  };

  const submitResponse = (response) => {
    setResponses([...responses, response]);
    setCurrentQuiz(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Math Quiz</h1>
      {quizData?.map((quiz) => (
        <div key={quiz.id} className="bg-white p-4 rounded-md shadow-md mb-4">
          <img src={quiz.headerImage} alt="Quiz Header" className="mx-auto mb-8 w-full align-middle rounded-lg shadow-lg"  />
          <h2 className="text-lg font-bold mb-2">{quiz.topic}</h2>
          <p className="mb-4">{quiz.questions.length} Questions</p>
          <Link to={`/formfill/${quiz._id}`}>
      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Start Solving
      </button>
    </Link>
        </div>
      ))}

      {currentQuiz && (
        <div className="bg-white p-4 rounded-md shadow-md">
          <h2 className="text-lg font-bold mb-4">{currentQuiz.topic}</h2>
          {currentQuiz.questions.map((question) => (
            <div key={question.id} className="mb-4">
              {question.type === "categorize" && (
                // Render Categorize Question UI (you can reuse your existing components)
                <div>
                  <h3>{question.data.Description}</h3>
                  {/* Render the Categorize Question UI */}
                </div>
              )}

              {question.type === "cloze" && (
                // Render Cloze Question UI (you can reuse your existing components)
                <div>
                  <h3>{question.data.text}</h3>
                  {/* Render the Cloze Question UI */}
                </div>
              )}

              {question.type === "comprehension" && (
                // Render Comprehension Question UI (you can reuse your existing components)
                <div>
                  <h3>{question.data.passage}</h3>
                  {/* Render the Comprehension Question UI */}
                </div>
              )}
            </div>
          ))}
          <button
            onClick={() => submitResponse({ quizId: currentQuiz.id, responses })}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Submit Responses
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizComponent;
