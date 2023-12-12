// components/CategoryQuestion.js
import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const CategoryQuestion = () => {
  const [question, setQuestion] = useState({
    description: '',
    categories: [{ title: 'Category 1', items: [] }],
  });

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const newCategories = Array.from(question.categories);
    const [reorderedCategory] = newCategories.splice(result.source.index, 1);
    newCategories.splice(result.destination.index, 0, reorderedCategory);

    setQuestion({
      ...question,
      categories: newCategories,
    });
  };

  const handleRemoveCategory = (index) => {
    const newCategories = [...question.categories];
    newCategories.splice(index, 1);
    setQuestion({
      ...question,
      categories: newCategories,
    });
  };

  const handleAddCategory = () => {
    setQuestion({
      ...question,
      categories: [...question.categories, { title: `Category ${question.categories.length + 1}`, items: [] }],
    });
  };

  const handleRemoveItem = (categoryIndex, itemIndex) => {
    const newCategories = [...question.categories];
    newCategories[categoryIndex].items.splice(itemIndex, 1);
    setQuestion({
      ...question,
      categories: newCategories,
    });
  };

  const handleAddItem = (categoryIndex) => {
    const newCategories = [...question.categories];
    newCategories[categoryIndex].items.push(`Item ${newCategories[categoryIndex].items.length + 1}`);
    setQuestion({
      ...question,
      categories: newCategories,
    });
  };

  return (
    <div>
      <div>
        <label>Description:</label>
        <textarea
          value={question.description}
          onChange={(e) => setQuestion({ ...question, description: e.target.value })}
          className="mt-1 p-2 w-full border rounded-md"
          rows="4"
        />
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="categories">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {question.categories.map((category, categoryIndex) => (
                <Draggable key={category.title} draggableId={category.title} index={categoryIndex}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="bg-gray-200 p-4 rounded-md hover:bg-gray-300 transition duration-300"
                    >
                      <div {...provided.dragHandleProps} className="cursor-move">
                        {category.title}
                      </div>
                      <button onClick={() => handleRemoveCategory(categoryIndex)} className="ml-2">
                        Remove
                      </button>
                      <div>
                        <label>Items:</label>
                        {category.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-center mt-2">
                            {item}
                            <button onClick={() => handleRemoveItem(categoryIndex, itemIndex)} className="ml-2">
                              Remove
                            </button>
                          </div>
                        ))}
                        <button onClick={() => handleAddItem(categoryIndex)} className="mt-2">
                          Add Item
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <button onClick={handleAddCategory} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Add Category
      </button>
    </div>
  );
};

export default CategoryQuestion;


