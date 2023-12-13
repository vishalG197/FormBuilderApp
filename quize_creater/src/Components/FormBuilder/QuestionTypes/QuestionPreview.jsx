
import React from "react";
import { useDrag, useDrop } from "react-dnd";

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

const DroppableArea = ({ items, onDrop, categoryIndex }) => {
  const [, drop] = useDrop({
    accept: "CATEGORIZE_ITEM",
    drop: (item) => onDrop(item, categoryIndex),
  });

  return (
    <div ref={drop} className="border border-gray-300 rounded-md p-2 h-20">
      {items}
    </div>
  );
};

const CategorizeQuestionPreview = ({ question }) => {
  const [selectedItems, setSelectedItems] = React.useState(
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


const ClozeQuestionPreview = ({ question }) => (
  <div>
    <p className="text-lg font-bold">Cloze Question</p>
    <h1>Q. {question.data.text}</h1>
    <ul>
      {question.data.blanks?.map((blank, index) => (
        <li key={index}>Blank {index + 1}</li>
      ))}
    </ul>
  </div>
);


const ComprehensionQuestionPreview = ({ question }) => (
  <div>
    <p className="text-lg font-bold">Comprehension Question</p>
    <h3 className="text-purple-500">read passage carefully</h3>
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

const FormPreview = ({ form }) => (
  <div className="container mx-auto p-4">
    
    {form.headerImage && (
      <img src={form.headerImage} alt="Header" className="mb-4" />
    )}

   
    {form.questions?.map((question, index) => (
      <div key={index} className="mb-8">
        {question.type === "categorize" && (
          <CategorizeQuestionPreview question={question} />
        )}
        {question.type === "cloze" && (
          <ClozeQuestionPreview question={question} />
        )}
        {question.type === "comprehension" && (
          <ComprehensionQuestionPreview question={question} />
        )}
      </div>
    ))}
  </div>
);

export default FormPreview;
