// CategorizeQuestion.js
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const CategorizeQuestion = () => {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState([]);

  // useEffect to update order when items or categories change
  useEffect(() => {
    const newOrder = items.map((item, index) => index.toString());
    setOrder(newOrder);
  }, [items, categories]);

  // Function to handle drag-and-drop reordering
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const newOrder = Array.from(order);
    newOrder.splice(result.source.index, 1);
    newOrder.splice(result.destination.index, 0, result.draggableId);

    setOrder(newOrder);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-md shadow-lg">
      <div className="mb-4">
        <label htmlFor="categories" className="block text-gray-700 font-bold mb-2">
          Categories:
        </label>
        <input
          type="text"
          id="categories"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Enter categories separated by commas"
          value={categories.join(',')}
          onChange={(e) => setCategories(e.target.value.split(','))}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="items" className="block text-gray-700 font-bold mb-2">
          Items:
        </label>
        <textarea
          id="items"
          className="w-full p-2 border rounded-md h-32 focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Enter items, one per line"
          value={items.join('\n')}
          onChange={(e) => setItems(e.target.value.split('\n'))}
        />
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {order.map((itemId, index) => (
                <Draggable key={itemId} draggableId={itemId} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="bg-blue-100 p-4 rounded-md cursor-move hover:bg-blue-200 transition duration-300"
                    >
                      <span className="text-gray-800">{items[index]}</span>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default CategorizeQuestion;
