// CategoryQuestions.js

import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";

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

export default CategoryQuestions;
