import React, { useState } from "react";

const ClozeQuestionForm = ({ updateQuestion }) => {
  const [text, setText] = useState("");
  const [blanks, setBlanks] = useState([]);
  const [newBlank, setNewBlank] = useState("");

  const handleAddBlank = () => {
    if (newBlank.trim() !== "") {
      setBlanks([...blanks, newBlank.trim()]);
      setNewBlank("");
    }
  };

  const handleRemoveBlank = (index) => {
    const updatedBlanks = [...blanks];
    updatedBlanks.splice(index, 1);
    setBlanks(updatedBlanks);
  };

  const handleSubmit = () => {
    if (text.trim() !== "" && blanks.length > 0) {
      const formData = {
        text: text.trim(),
        blanks: blanks,
      };
      updateQuestion(formData);
      // You may want to reset the form fields after submitting
      setText("");
      setBlanks([]);
      setNewBlank("");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cloze Question Form</h1>

      <div className="mb-4">
        <label className="block mb-2">Cloze Text:</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border rounded p-2 w-full"
          rows="4"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Blanks to Fill:</label>
        <div className="flex items-center">
          <input
            type="text"
            value={newBlank}
            onChange={(e) => setNewBlank(e.target.value)}
            className="border rounded p-2 mr-2"
          />
          <button
            onClick={handleAddBlank}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Blank
          </button>
        </div>

        <ul className="mt-2">
          {blanks.map((blank, index) => (
            <li key={index} className="flex items-center mb-1">
              <span>{blank}</span>
              <button
                onClick={() => handleRemoveBlank(index)}
                className="bg-red-500 text-white px-2 py-1 rounded ml-2"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Cloze Question
        </button>
      </div>
    </div>
  );
};

export default ClozeQuestionForm;
