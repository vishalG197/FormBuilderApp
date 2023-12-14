
import React, { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
let dummy={
  headerImage: 'https://tse2.mm.bing.net/th?id=OIP.JAQ4rlCwbALiX8vooija7QHaEK&pid=Api&P=0&h=220',
  questions: [
    {
      id: 1,
      type: 'categorize',
      data: {
        Description: 'Categorize Questions Example',
        Question: [
          { category: 'Category 1', items: ['Item 1', 'Item 2'] },
          { category: 'Category 2', items: ['Item 3', 'Item 4'] },
        ],
      },
    },
    {
      id: 2,
      type: 'cloze',
      data: {
        text: 'This is a cloze question example with ___ blanks. Fill in the blanks.',
        blanks: ['blank1', 'blank2'],
      },
    },
    {
      id: 3,
      type: 'comprehension',
      data: {
        passage: 'This is a comprehension passage.',
        Questions: [
          {
            question: 'What is the capital of Country X?',
            options: ['Option A', 'Option B', 'Option C'],
            correctOption: 'Option B',
          },
          // Add more MCQ questions as needed
        ],
      },
    },
  ],
};


const FormFill = () => {
  const { id } = useParams();
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState(dummy)
  const handleAnswer = (questionId, answer) => {
    setAnswers((prevAnswers) => ({ ...prevAnswers, [questionId]: answer }));
  };
  useEffect(() => {
    // Fetch data based on the id when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch(`https://quize-5b24.onrender.com/forms/${id}`);
        if (!response.ok) {
          throw new Error(`Error fetching quiz data: ${response.status}`);
        }
        const data = await response.json();
        setData(data);
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

  return (
    <div className="container mx-auto mt-8 p-4">
      <img src={data.headerImage} alt="Header" className="mb-8 w-full align-middle ml-77 rounded-lg shadow-lg" />
<h1 className="text-3xl font-bold">Quiz-2.0</h1>
      {data.questions.map((question) => (
        <div key={question.id} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{question.data.Description}</h2>

          {question.type === 'categorize' && (
            <CategorizeQuestion question={question}/>
              )}

          {question.type === 'cloze' && (
            <div>
              <p className="mb-4">Q.{question.data.text}</p>
              {question.data.blanks.map((blank, index) => (
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
              {question.data.Questions.map((mcq, index) => (
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




const DraggableItem = ({ item, index, moveItem, categoryIndex }) => {
  const [, drag] = useDrag({
    type: "CATEGORIZE_ITEM",
    item: { index, categoryIndex },
  });

  return (
    <div
      ref={drag}
      className="cursor-pointer p-2 border border-gray-300 rounded-md m-1 bg-white"
    >
      {item}
    </div>
  );
};

const DroppableArea = ({ items, onDrop, categoryIndex, categoryName }) => {
   const [, drop] = useDrop({
     accept: "CATEGORIZE_ITEM",
     drop: (item) => onDrop(item, categoryIndex),
   });
 
   return (
     <div ref={drop} className="border border-gray-300 rounded-md p-2 h-20">
       {items?.length === 0 ? (
         <div className="text-center text-gray-500">
           <p className="font-bold">{categoryName}</p>
           (Drag items here)
         </div>
       ) : (
         items
       )}
     </div>
   );
 };
 

const CategorizeQuestion = ({ question }) => {
  const [selectedItems, setSelectedItems] = useState(
    Array(question.data.Question?.length).fill([])
  );

  const handleDrop = (item, categoryIndex) => {
    const newSelectedItems = [...selectedItems];
    newSelectedItems[categoryIndex] = [
      ...newSelectedItems[categoryIndex],
      item.index,
    ];
    setSelectedItems(newSelectedItems);
  };

  const handleRemoveItem = (categoryIndex, itemIndex) => {
    const newSelectedItems = [...selectedItems];
    newSelectedItems[categoryIndex] = newSelectedItems[categoryIndex].filter(
      (index) => index !== itemIndex
    );
    setSelectedItems(newSelectedItems);
  };

  return (
    <div>
      <h1>Categorize Question</h1>
      <p className="text-lg text-align-left font-bold mb-2">
        Q.{question.data.Description}
      </p>

      <div className="flex">
        {question.data.Question?.map((category, categoryIndex) => (
          <div key={categoryIndex} className="flex flex-col items-center mr-8">
            {category.items?.map((item, itemIndex) => (
              <DraggableItem
                key={itemIndex}
                item={item}
                index={itemIndex}
                moveItem={() => {}}
                categoryIndex={categoryIndex}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="mt-4 flex">
        {question.data.Question?.map((category, categoryIndex) => (
          <DroppableArea
            key={categoryIndex}
            items={selectedItems[categoryIndex]?.map((itemIndex) => (
              <div
                key={itemIndex}
                className="p-2 border border-gray-300 rounded-md m-1 bg-blue-100 cursor-pointer"
                onClick={() => handleRemoveItem(categoryIndex, itemIndex)}
              >
                <p className="font-bold mb-2">{category.category}</p>
                {category.items[itemIndex]}
              </div>
            ))}
            onDrop={handleDrop}
            categoryIndex={categoryIndex}
          />
        ))}
      </div>
    </div>
  );
};
