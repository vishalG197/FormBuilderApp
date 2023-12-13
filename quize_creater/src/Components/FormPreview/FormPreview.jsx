import React, { useState } from 'react';

const CategorizeQuestion = ({ question }) => {
  const [categories, setCategories] = useState(question.categories || []);
  const [items, setItems] = useState(question.items || []);

  const handleAddCategory = () => {
    setCategories([...categories, 'New Category']);
  };

  const handleRemoveCategory = (index) => {
    const updatedCategories = [...categories];
    updatedCategories.splice(index, 1);
    setCategories(updatedCategories);
  };

  const handleAddItem = () => {
    setItems([...items, { text: 'New Item', category: '' }]);
  };

  const handleRemoveItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const updatedItems = [...items];
    const [reorderedItem] = updatedItems.splice(result.source.index, 1);
    updatedItems.splice(result.destination.index, 0, reorderedItem);

    setItems(updatedItems);
  };

  return (
    <div>
      {/* Description Box (Optional) */}
      {question.description && <p className="mb-2">{question.description}</p>}

      {/* Category Inputs */}
      <div className="mb-4">
        {categories.map((category, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              value={category}
              onChange={(e) => {
                const updatedCategories = [...categories];
                updatedCategories[index] = e.target.value;
                setCategories(updatedCategories);
              }}
              className="border rounded py-2 px-3 mr-2"
              placeholder="Category"
            />
            <button
              onClick={() => handleRemoveCategory(index)}
              className="bg-red-500 text-white rounded px-2"
            >
              X
            </button>
          </div>
        ))}
        <button onClick={handleAddCategory} className="bg-blue-500 text-white rounded px-3 py-1">
          Add Category
        </button>
      </div>

      {/* Item Inputs with Drag-and-Drop */}
      <div>
        {items.map((item, index) => (
          <div key={index} className="mb-2" draggable onDragEnd={() => handleDragEnd(index)}>
            <div className="flex items-center">
              <input
                type="text"
                value={item.text}
                onChange={(e) => {
                  const updatedItems = [...items];
                  updatedItems[index].text = e.target.value;
                  setItems(updatedItems);
                }}
                className="border rounded py-2 px-3 mr-2"
                placeholder="Item"
              />
              <select
                value={item.category}
                onChange={(e) => {
                  const updatedItems = [...items];
                  updatedItems[index].category = e.target.value;
                  setItems(updatedItems);
                }}
                className="border rounded py-2 px-3 mr-2"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <button
                onClick={() => handleRemoveItem(index)}
                className="bg-red-500 text-white rounded px-2"
              >
                X
              </button>
            </div>
          </div>
        ))}
        <button onClick={handleAddItem} className="bg-blue-500 text-white rounded px-3 py-1">
          Add Item
        </button>
      </div>
    </div>
  );
};

export default CategorizeQuestion;
