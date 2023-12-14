import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const CategoryQuestion = ({ updateQuestion }) => {
  const [question, setQuestion] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleCategoryAdd = () => {
    setCategories([...categories, { category: "", items: [] }]);
  };

  const handleCategoryDelete = (index) => {
    const updatedCategories = [...categories];
    updatedCategories.splice(index, 1);
    setCategories(updatedCategories);
  };

  const handleCategoryChange = (index, category) => {
    const updatedCategories = [...categories];
    updatedCategories[index].category = category;
    setCategories(updatedCategories);
  };

  const handleItemAdd = () => {
    setItems([...items, { name: "", category: "" }]);
  };

  const handleItemDelete = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const handleItemChange = (index, name) => {
    const updatedItems = [...items];
    updatedItems[index].name = name;
    setItems(updatedItems);
  };

  const handleCategorySelect = (index, category) => {
    const updatedItems = [...items];
    updatedItems[index].category = category;
    setItems(updatedItems);
  };

  const handleSubmit = () => {
    const formData = {
      Description: description,
      Question: categories.map((category) => ({
        category: category.category,
        items: items
          .filter((item) => item.category === category.category)
          .map((item) => item.name),
      })),
    };
    updateQuestion({ type: "categorize", data: formData });
    console.log(formData);
  };

  const handleCategoryOrderChange = (dragIndex, hoverIndex) => {
    const updatedCategories = [...categories];
    const draggedCategory = updatedCategories[dragIndex];
    updatedCategories[dragIndex] = updatedCategories[hoverIndex];
    updatedCategories[hoverIndex] = draggedCategory;
    setCategories(updatedCategories);
  };

  const handleItemOrderChange = (dragIndex, hoverIndex) => {
    const updatedItems = [...items];
    const draggedItem = updatedItems[dragIndex];
    updatedItems[dragIndex] = updatedItems[hoverIndex];
    updatedItems[hoverIndex] = draggedItem;
    setItems(updatedItems);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col  p-4">
        <h1 className="text-2xl font-bold mb-4">Categorized Question</h1>

        <div className="flex-grow flex flex-col overflow-y-auto">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Description:
            </label>
            <input
              type="text"
              placeholder="description of the category and item relation...."
              value={description}
              onChange={handleDescriptionChange}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-bold mb-2">Step 2: Categories</h3>

            {categories.map((category, index) => (
              <Category
                key={index}
                index={index}
                category={category}
                onCategoryChange={handleCategoryChange}
                onCategoryDelete={handleCategoryDelete}
                onCategoryOrderChange={handleCategoryOrderChange}
                updateQuestion={updateQuestion}
              />
            ))}
            <button
              onClick={handleCategoryAdd}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
            >
              Add Category
            </button>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-bold mb-2">Step 3: Items</h3>

            {items.map((item, index) => (
              <Item
                key={index}
                index={index}
                item={item}
                categories={categories}
                onItemChange={handleItemChange}
                onItemDelete={handleItemDelete}
                onCategorySelect={handleCategorySelect}
                onItemOrderChange={handleItemOrderChange}
                updateQuestion={updateQuestion}
              />
            ))}
            <button
              onClick={handleItemAdd}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
            >
              Add Item
            </button>
          </div>
        </div>

        <div>
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </DndProvider>
  );
};

const Category = ({
  index,
  category,
  onCategoryChange,
  onCategoryDelete,
  onCategoryOrderChange,
  updateQuestion,
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: "CATEGORY",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "CATEGORY",
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        onCategoryOrderChange(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="flex items-center justify-between mb-2"
    >
      <input
        type="text"
        placeholder="add category"
        value={category.category}
        onChange={(e) => onCategoryChange(index, e.target.value)}
        className="p-2 border rounded-md flex-grow mr-2 w-1/2"
      />
      <button
        onClick={() => onCategoryDelete(index)}
        className="bg-red-500 text-white px-2 py-1 rounded"
      >
        X
      </button>
    </div>
  );
};

const Item = ({
  index,
  item,
  categories,
  onItemChange,
  onItemDelete,
  onCategorySelect,
  onItemOrderChange,
  updateQuestion,
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: "ITEM",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "ITEM",
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        onItemOrderChange(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="flex items-center justify-between mb-2"
    >
      <input
        type="text"
        value={item.name}
        placeholder="add Items"
        onChange={(e) => onItemChange(index, e.target.value)}
        className="p-2 border rounded-md flex-grow mr-2"
      />
      <select
        value={item.category}
        onChange={(e) => onCategorySelect(index, e.target.value)}
        className="p-2 border rounded-md"
      >
        <option value="">select category</option>
        {categories.map((category, index) => (
          <option key={index} value={category.category}>
            {category.category}
          </option>
        ))}
      </select>
      <button
        onClick={() => onItemDelete(index)}
        className="bg-red-500 text-white px-2 py-1 rounded"
      >
        X
      </button>
    </div>
  );
};

export default CategoryQuestion;
