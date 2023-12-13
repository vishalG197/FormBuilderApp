// components/CategoryQuestion.js
import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const CategoryQuestion = ({ updateQuestion }) => {
  const [question, setQuestion] = useState({
    description: '',
    categories: [],
  });

  // useEffect(() => {
  //   updateQuestion(question);
  // }, );

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const sourceCategoryIndex = parseInt(result.source.droppableId, 10);
    const destinationCategoryIndex = parseInt(result.destination.droppableId, 10);

    if (sourceCategoryIndex === destinationCategoryIndex) {
      // Item rearranged within the same category
      const newCategories = [...question.categories];
      const [reorderedItem] = newCategories[sourceCategoryIndex].items.splice(result.source.index, 1);
      newCategories[sourceCategoryIndex].items.splice(result.destination.index, 0, reorderedItem);

      setQuestion({
        ...question,
        categories: newCategories,
      });
    } else {
      // Item moved to a different category
      const newCategories = [...question.categories];
      const [movedItem] = newCategories[sourceCategoryIndex].items.splice(result.source.index, 1);
      newCategories[destinationCategoryIndex].items.splice(result.destination.index, 0, movedItem);

      setQuestion({
        ...question,
        categories: newCategories,
      });
    }
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
      categories: [
        ...question.categories,
        { category: `Category ${question.categories.length + 1}`, items: [] },
      ],
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

  const handleAddItem = (categoryIndex, newItem, selectedItemCategory) => {
    const newCategories = [...question.categories];
    newCategories[categoryIndex].items.push({ item: newItem, category: selectedItemCategory });
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
        {question.categories.map((category, categoryIndex) => (
          <Droppable key={categoryIndex} droppableId={categoryIndex.toString()}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-4"
              >
                <div className="bg-gray-200 p-4 rounded-md">
                  <label>Category:</label>
                  <input
                    type="text"
                    value={category.category}
                    onChange={(e) => {
                      const newCategories = [...question.categories];
                      newCategories[categoryIndex].category = e.target.value;
                      setQuestion({
                        ...question,
                        categories: newCategories,
                      });
                    }}
                  />
                  <button onClick={() => handleRemoveCategory(categoryIndex)} className="ml-2">
                    Remove Category
                  </button>
                </div>
                {category.items.map((item, itemIndex) => (
                  <Draggable
                    key={itemIndex}
                    draggableId={`${categoryIndex}-${itemIndex}`} // Use category and item index as draggableId
                    index={itemIndex}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bg-gray-200 p-4 rounded-md hover:bg-gray-300 transition duration-300"
                      >
                        <div>
                          <label>Item:</label>
                          <input
                            type="text"
                            value={item.item}
                            onChange={(e) => {
                              const newCategories = [...question.categories];
                              newCategories[categoryIndex].items[itemIndex].item = e.target.value;
                              setQuestion({
                                ...question,
                                categories: newCategories,
                              });
                            }}
                          />
                          <label>Category:</label>
                          <select
                            value={item.category}
                            onChange={(e) => {
                              const newCategories = [...question.categories];
                              newCategories[categoryIndex].items[itemIndex].category = e.target.value;
                              setQuestion({
                                ...question,
                                categories: newCategories,
                              });
                            }}
                          >
                            {question.categories.map((c, index) => (
                              <option key={index} value={c.category}>
                                {c.category}
                              </option>
                            ))}
                          </select>
                          <button onClick={() => handleRemoveItem(categoryIndex, itemIndex)} className="ml-2">
                            Remove Item
                          </button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                <div>
                  <label>Add Item:</label>
                  <input
                    type="text"
                    value=""
                    onChange={(e) => {
                      // Handle input change
                    }}
                  />
                  <select
                    value={category.category}
                    onChange={(e) => {
                      // Handle category selection for the new item
                    }}
                  >
                    {question.categories.map((c, index) => (
                      <option key={index} value={c.category}>
                        {c.category}
                      </option>
                    ))}
                  </select>
                  <button onClick={() => handleAddItem(categoryIndex, 'NewItem', category.category)} className="mt-2">
                    Add Item
                  </button>
                </div>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
      <button onClick={handleAddCategory} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Add Category
      </button>
    </div>
  );
};

export default CategoryQuestion;
