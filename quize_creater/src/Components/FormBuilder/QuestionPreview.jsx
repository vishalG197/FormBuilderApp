import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";

// const DraggableItem = ({ item, index, moveItem, categoryIndex }) => {
//   const [, drag] = useDrag({
//     type: "CATEGORIZE_ITEM",
//     item: { index, categoryIndex },
//   });

//   return (
//     <div
//       ref={drag}
//       className="cursor-pointer p-2 border border-gray-300 rounded-md m-1 bg-white"
//     >
//       {item}
//     </div>
//   );
// };

// const DroppableArea = ({ items, onDrop, categoryIndex }) => {
//   const [, drop] = useDrop({
//     accept: "CATEGORIZE_ITEM",
//     drop: (item) => onDrop(item, categoryIndex),
//   });

//   return (
//     <div ref={drop} className="border border-gray-300 rounded-md p-2 h-20">
//       {items}
//     </div>
//   );
// };

// const CategorizeQuestionPreview = ({ question }) => {
//   const [selectedItems, setSelectedItems] = React.useState(
//     Array(question.data.Question?.length).fill([])
//   );

//   const handleDrop = (item, categoryIndex) => {
//     const newSelectedItems = [...selectedItems];
//     newSelectedItems[categoryIndex] = [
//       ...newSelectedItems[categoryIndex],
//       item.index,
//     ];
//     setSelectedItems(newSelectedItems);
//   };

//   const handleRemoveItem = (categoryIndex, itemIndex) => {
//     const newSelectedItems = [...selectedItems];
//     newSelectedItems[categoryIndex] = newSelectedItems[categoryIndex].filter(
//       (index) => index !== itemIndex
//     );
//     setSelectedItems(newSelectedItems);
//   };

//   return (
//     <div>
//       <h1>Categorize Question</h1>
//       <p className="text-lg text-align-left font-bold mb-2">
//         Q.{question.data.Description}
//       </p>

//       <div className="flex">
//         {question.data.Question?.map((category, categoryIndex) => (
//           <div key={categoryIndex} className="flex flex-col items-center mr-8">
//             {category.items?.map((item, itemIndex) => (
//               <DraggableItem
//                 key={itemIndex}
//                 item={item}
//                 index={itemIndex}
//                 moveItem={() => {}}
//                 categoryIndex={categoryIndex}
//               />
//             ))}
//           </div>
//         ))}
//       </div>

//       <div className="mt-4 flex">
//         {question.data.Question?.map((category, categoryIndex) => (
//           <DroppableArea
//             key={categoryIndex}
//             items={selectedItems[categoryIndex]?.map((itemIndex) => (
//               <div
//                 key={itemIndex}
//                 className="p-2 border border-gray-300 rounded-md m-1 bg-blue-100 cursor-pointer"
//                 onClick={() => handleRemoveItem(categoryIndex, itemIndex)}
//               >
//                 <p className="font-bold mb-2">{category.category}</p>
//                 {category.items[itemIndex]}
//               </div>
//             ))}
//             onDrop={handleDrop}
//             categoryIndex={categoryIndex}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };


// const ClozeQuestionPreview = ({ question }) => (
//   <div>
//     <p className="text-lg font-bold">Cloze Question</p>
//     <h1>Q. {question.data.text}</h1>
//     <ul>
//       {question.data.blanks?.map((blank, index) => (
//         <li key={index}>Blank {index + 1}</li>
//       ))}
//     </ul>
//   </div>
// );


// const ComprehensionQuestionPreview = ({ question }) => (
//   <div>
//     <p className="text-lg font-bold">Comprehension Question</p>
//     <h3 className="text-purple-500">read passage carefully</h3>
//     <p>{question.data.passage}</p>
//     <ul>
//       {question.data.Questions?.map((mcq, index) => (
//         <li key={index}>
//           <p>Q.{mcq.question}</p>
//           <ul>
//             {mcq.options?.map((option, optionIndex) => (
//               <li key={optionIndex}>
//                 {optionIndex + 1}. {option}{" "}
//                 {mcq.correctOption === option && (
//                   <span className="text-green-500">*</span>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </li>
//       ))}
//     </ul>
//   </div>
// );

const FormPreview = ({ form }) => (
  <div className="container mx-auto p-4">
    
    {form.headerImage && (
      <img src={form.headerImage} alt="Header" className="mb-4" />
    )}

   
    {form.questions?.map((question, index) => (
      <div key={index} className="mb-8">
        {question.type === "categorize" && (
          <CategorizeQuestion question={question} />
        )}
        {question.type === "cloze" && (
          <ClozeQuestion question={question} />
        )}
        {question.type === "comprehension" && (
          <ComprehensionQuestion question={question} />
        )}
      </div>
    ))}
  </div>
);

export default FormPreview;





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




const ClozeQuestion = ({ question }) => {
  // Define function to handle word drag and drop
  let [update,setUpadate]=useState()
  const handleWordDrop = (word) => {
    // Remove the dropped word from the blanks array
    const updatedBlanks = question.data.blanks.filter((blank) => blank !== word);

    // Update the question data
    setUpadate({
      ...question,
      data: { blanks: updatedBlanks },
    });
  };

  return (
    <div className="my-4 p-4 border rounded shadow">
      <h4 className="text-lg font-bold mb-2">Cloze Question</h4>
    

      <div>
        {/* Display draggable words */}
        {question.blanks?.map((word) => (
          <div
            key={word}
            className="border p-2 rounded cursor-move inline-block mx-2"
            draggable
            onDragStart={(e) => e.dataTransfer.setData("text/plain", word)}
          >
            {word}
          </div>
        ))}
      </div>

      <div className="mt-4">
        {/* Display sentence with blank spaces */}
        {question.text?.map((part, index) =>
          question.data.blanks.includes(index) ? (
            <div
              key={index}
              className="border p-2 rounded bg-gray-200 inline-block mx-2"
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleWordDrop(index)}
            ></div>
          ) : (
            <span key={index}>{part} </span>
          )
        )}
      </div>
    </div>
  );
};






const ComprehensionQuestion = ({ question }) => {
   let [update,setUpadate]=useState()
  return (
    <div className="my-4 p-4 border rounded shadow">
      <h4 className="text-lg font-bold mb-2">Comprehension Question</h4>
     
      <p>{question.data.passage}</p>
     <ul>
       {question.data.Questions?.map((mcq, index) => (
        <li key={index}>
          <p>Q.{mcq.question}</p>
          <ul>
            {mcq.options?.map((option, optionIndex) => (
              <li key={optionIndex}>
                {optionIndex + 1}. {option}{" "}
                {mcq.correctOption === option && (
                  <span className="text-green-500">*</span>
                )}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
    </div>
  );
};


