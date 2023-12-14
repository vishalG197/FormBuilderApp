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
      <h1 className="text-2xl font-bold mb-4"> Quiz</h1>
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

    </div>
  );
};

export default QuizComponent;
