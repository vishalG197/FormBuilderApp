
import React, { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import CategoryQuestions from "../../Routes/TestComponent"
import "react-toastify/dist/ReactToastify.css";
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
  const handleSubmit = () => {
    // Perform the post request with the answers here
    // For simplicity, let's just log the answers to the console
    console.log('Submitted Answers:', answers);

    // Display submission success message
    toast.success('Quiz submitted successfully!', {
      position: 'top-center',
      autoClose: 3000, // Auto close the toast after 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    // Set the submitted state to true
    setSubmitted(true);
  };
if(loading){
  return <h1>Loading....</h1>
}
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


// CategoryQuestions.js



// const ItemTypes = {
//   DRAGGABLE_BUTTON: 'draggableButton',
// };

// const DraggableButton = ({ text }) => {
//   const [{ isDragging }, drag] = useDrag({
//     type: ItemTypes.DRAGGABLE_BUTTON,
//     item: { text },
//     collect: (monitor) => ({
//       isDragging: !!monitor.isDragging(),
//     }),
//   });

//   return (
//     <button
//       ref={drag}
//       className={`bg-blue-500 text-white p-2 m-2 cursor-pointer ${
//         isDragging ? 'opacity-50' : ''
//       }`}
//     >
//       {text}
//     </button>
//   );
// };

// const Category = ({ category, items, onDrop }) => {
//   const [, drop] = useDrop({
//     accept: ItemTypes.DRAGGABLE_BUTTON,
//     drop: (item) => onDrop(item.text, category),
//   });

//   return (
//     <div className="m-4">
//       <h2 className="text-lg font-bold mb-2">{category}</h2>
//       <div ref={drop} className="flex space-x-4" style={{ minHeight: '200px' }}>
//         {items?.map((item, index) => (
//           <div key={index}>{item}</div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const CategoryQuestions = ({ question }) => {
//   const [categories, setCategories] = useState({
//     category1: [],
//     category2: [],
//   });

//   const { data } = question;
//   const initialButtons = data.Question ? data.Question.reduce((acc, category) => acc.concat(category.items), []) : [];
//   const [availableButtons, setAvailableButtons] = useState(initialButtons);

//   const moveButton = (buttonText, toCategory) => {
//     const updatedCategories = {
//       ...categories,
//       [toCategory]: [...categories[toCategory], buttonText],
//     };

//     setCategories(updatedCategories);

//     // Remove the button from the available buttons list
//     const updatedButtons = availableButtons.filter((button) => button !== buttonText);
//     setAvailableButtons(updatedButtons);
//   };

//   const [, div1Drop] = useDrop({
//     accept: ItemTypes.DRAGGABLE_BUTTON,
//     drop: (item) => moveButton(item.text, 'category1'),
//   });

//   const [, div2Drop] = useDrop({
//     accept: ItemTypes.DRAGGABLE_BUTTON,
//     drop: (item) => moveButton(item.text, 'category2'),
//   });

//   return (
//     <div>
//       <h2>Q.{data.QuestionDescription}</h2>
//       <div>
//         {availableButtons.map((buttonText) => (
//           <DraggableButton key={buttonText} text={buttonText} />
//         ))}
//       </div>
//       <div className="flex">
//         {data.Question?.map((category) => (
//           <Category
//             key={category.category}
//             category={category.category}
//             items={categories[category.category]}
//             onDrop={moveButton}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };