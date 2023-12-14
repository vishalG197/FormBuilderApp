// CategorizeQuestion.js

import React, { useState } from "react";

const CategorizeQuestion = ({ question, updateQuestion, error }) => {
  const [categories, setCategories] = useState(question.data.categories || []);
  const [items, setItems] = useState(question.data.items || []);

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("text/plain", id);
  };

  const handleDrop = (e, categoryId) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData("text/plain");

    const updatedItems = items.map((item) => {
      if (item.id === itemId) {
        return { ...item, category: categoryId };
      }
      return item;
    });

    setItems(updatedItems);
    updateQuestion({ ...question, data: { categories, items: updatedItems } });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="mt-4 p-4 border rounded shadow-md">
      <h3 className="text-lg font-bold mb-2">Categorize Question</h3>

      <div className="flex space-x-4">
        <div className="flex-1">
          <h4 className="text-md font-bold mb-2">Categories</h4>
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-gray-200 p-2 mb-2"
              onDrop={(e) => handleDrop(e, category.id)}
              onDragOver={handleDragOver}
            >
              {category.name}
            </div>
          ))}
        </div>

        <div className="flex-1">
          <h4 className="text-md font-bold mb-2">Items</h4>
          {items.map((item) => (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e, item.id)}
              className="bg-gray-100 p-2 mb-2"
            >
              {item.content}
            </div>
          ))}
        </div>
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default CategorizeQuestion;
