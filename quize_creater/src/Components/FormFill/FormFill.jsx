
import React, { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
// import CategoryQuestions from "./CategoryQuestion"
import "react-toastify/dist/ReactToastify.css";
// import ClozeQuestion from "../FormBuilder/QuestionTypes/ClozePreview";
// let dummy={
//   headerImage: 'https://tse2.mm.bing.net/th?id=OIP.JAQ4rlCwbALiX8vooija7QHaEK&pid=Api&P=0&h=220',
//   questions: [
//     {
//       id: 1,
//       type: 'categorize',
//       data: {
//         Description: 'Categorize Questions Example',
//         Question: [
//           { category: 'Category 1', items: ['Item 1', 'Item 2'] },
//           { category: 'Category 2', items: ['Item 3', 'Item 4'] },
//         ],
//       },
//     },
//     {
//       id: 2,
//       type: 'cloze',
//       data: {
//         text: 'This is a cloze question example with ___ blanks. Fill in the blanks.',
//         blanks: ['blank1', 'blank2'],
//       },
//     },
//     {
//       id: 3,
//       type: 'comprehension',
//       data: {
//         passage: 'This is a comprehension passage.',
//         Questions: [
//           {
//             question: 'What is the capital of Country X?',
//             options: ['Option A', 'Option B', 'Option C'],
//             correctOption: 'Option B',
//           },
//           // Add more MCQ questions as needed
//         ],
//       },
//     },
//   ],
// };


const FormFill = () => {
  const { id } = useParams();
  const [answers, setAnswers] = useState({});
  const [loading,setloading] = useState(false)
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState([])
  const handleAnswer = (questionId, answer) => {
    setAnswers((prevAnswers) => ({ ...prevAnswers, [questionId]: answer }));
  };
  useEffect(() => {
    // Fetch data based on the id when the component mounts
    const fetchData = async () => {
      try {
        setloading(true)
        const response = await fetch(`https://quize-5b24.onrender.com/forms/${id}`);
        if (!response.ok) {
          throw new Error(`Error fetching quiz data: ${response.status}`);
        }
        const data = await response.json();
        setData(data);
        setloading(false);
      } catch (error) {
        console.error("Error fetching quiz data:", error.message);
      }
    };

    fetchData();
  }, [id]); 
  const handleSubmit = async () => {
    try {
      // Construct the payload for the POST request
      const payload = {
        formId: id, // Assuming id is the formId
        answers: Object.entries(answers).map(([questionId, answer]) => ({
          questionId: parseInt(questionId),
          answer,
        })),
      };

      // Perform the POST request to submit the responses
      const response = await fetch("https://quize-5b24.onrender.com/responses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Error submitting quiz responses: ${response.status}`);
      }

      // Display submission success message
      toast.success("Quiz submitted successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Set the submitted state to true
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting quiz responses:", error.message);
      // Display an error message if submission fails
      toast.error("Error submitting quiz responses. Please try again.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };
if(loading){
  return <h1>Loading....</h1>
}
console.log(answers);

  return (
    <div className="container mx-auto mt-8 p-4">
      <img src={data.headerImage} alt="Header" className="mb-8 w-full align-middle ml-77 rounded-lg shadow-lg" />
<h1 className="text-3xl font-bold">Quiz-2.0</h1>
      {data.questions?.map((question) => (
        <div key={question.id} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{question.data.Description}</h2>

          {question.type === 'categorize' && (
            <CategoryQuestions question={question.data}/>
              )}

          {question.type === 'cloze' && (
            <div>
              <p className="mb-4">Q.{question.data.text}</p>
              {question.data.blanks?.map((blank, index) => (
                <div key={index} className="mb-4">
                  <input
                    type="text"
                    placeholder={`Enter ${blank}`}
                    className="border rounded p-2 w-full"
                    onChange={(e) => handleAnswer(question.id, e.target.value)}
                  />
                </div>
              ))}
              {/* <ClozeQuestion question={question}/> */}
            </div>
          )}

          {question.type === 'comprehension' && (
            <div>
              <p className="mb-4">Passage:-{question.data.passage}</p>
              {question.data.Questions?.map((mcq, index) => (
                <div key={index} className="mb-4">
                  <p className="font-semibold mb-2">{mcq.question}</p>
                  {mcq.options.map((option, i) => (
                    <label key={i} className="block mb-2">
                      <input
                        type="radio"
                        name={`question_${question.id}`}
                        className="form-radio text-blue-500"
                        onChange={() => handleAnswer(question.id, option)}
                      />
                      <span className="ml-2">{option}</span>
                    </label>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {!submitted && (
        <button onClick={handleSubmit} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Submit
        </button>
      )}

      <ToastContainer />

      {submitted && (
        <p className="mt-4 text-green-500 text-center">
          Thank you for submitting the quiz! 🎉
        </p>
      )}
    </div>
  );
};

export default FormFill;



const ItemTypes = {
  DRAGGABLE_BUTTON: "draggableButton",
};

const DraggableButton = ({ text }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.DRAGGABLE_BUTTON,
    item: { text },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <button
      ref={drag}
      className={`bg-blue-500 text-white p-2 m-2 cursor-pointer ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      {text}
    </button>
  );
};
const CategoryQuestions = ({ question }) => {
  const [categories, setCategories] = useState({
    category1: [],
    category2: [],
  });
  console.log(categories);
  const initialItems = question.Question?.map((q) => q.items).flat();
  const [availableButtons, setAvailableButtons] = useState(initialItems);

  const moveButton = (buttonText, toCategory) => {
    // Ensure the category array exists
    const categoryArray = categories[toCategory] || [];

    // Check if the button is already in the category
    if (!categoryArray.includes(buttonText)) {
      const updatedCategories = {
        ...categories,
        [toCategory]: [...categoryArray, buttonText],
      };

      setCategories(updatedCategories);

      // Remove the button from the available buttons list
      const updatedButtons = availableButtons.filter(
        (button) => button !== buttonText
      );
      setAvailableButtons(updatedButtons);
    } else {
      // Handle the case where the button couldn't be dropped
      console.log(`Button "${buttonText}" already in category "${toCategory}"`);
      // You can update the state or display a message as needed
    }
  };
  const [, div1Drop] = useDrop({
    accept: ItemTypes.DRAGGABLE_BUTTON,
    drop: (item) => moveButton(item.text, "category1"),
  });

  const [, div2Drop] = useDrop({
    accept: ItemTypes.DRAGGABLE_BUTTON,
    drop: (item) => moveButton(item.text, "category2"),
  });

  return (
    <div>
      <h2>Q.{question.Description}</h2>
      <div>
        {availableButtons?.map((buttonText) => (
          <DraggableButton key={buttonText} text={buttonText} />
        ))}
      </div>
      <div className="flex">
      <div id="div-1" className="m-4 p-4 border flex-1"  style={{ height: "300px" }} ref={div1Drop}>
              <h1>{question.Question[0].category}</h1>
              {categories.category1.map((buttonText, index) => (
                <div key={index}>{buttonText}</div>
              ))}
            </div>
            <div id="div-2" className="m-4 p-4 border flex-1"  style={{ height: "300px" }} ref={div2Drop}>
              <h1>{question.Question[1].category}</h1>
              {categories.category2.map((buttonText, index) => (
                <div key={index}>{buttonText}</div>
              ))}
            </div>
        {/* {question.Question?.map((category, index) => (
          <div
            key={index}
            className={`m-4 p-4 border flex-1`}
            style={{ height: "300px" }}
            ref={index === 0 ? div1Drop : div2Drop}
          >
            
          </div>
        ))} */}
      </div>
    </div>
  );
};