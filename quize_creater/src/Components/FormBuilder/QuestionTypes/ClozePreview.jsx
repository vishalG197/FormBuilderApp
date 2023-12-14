import React, { useState } from 'react';

const Blank = ({ text, onDrop }) => {
  return (
    <div
      onClick={onDrop}
      className="bg-blue-500 text-white p-2 m-1 rounded cursor-pointer"
    >
      {text}
    </div>
  );
};

const ClozeQuestion = ({ question }) => {
  const [blanks, setBlanks] = useState(question.data.blanks);

  const handleDrop = (index) => {
    return () => {
      // Handle the drop logic here, for example, update the state or perform other actions
      console.log(`Dropped at index ${index}`);
    };
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Q.{question.id}</h1>
      <div className="flex flex-wrap mb-4">
        {blanks.map((blank, index) => (
          <Blank key={index} text={`blank-${index + 1}`} onDrop={handleDrop(index)} />
        ))}
      </div>
      <div className="text-lg">
        {question.data.text.split('___').map((part, index) => (
          <React.Fragment key={index}>
            {part}
            {index < question.data.blanks.length - 1 && (
              <div className="inline-block">
                <button
                  disabled
                  className="bg-gray-300 text-gray-600 p-2 m-1 rounded cursor-not-allowed"
                >
                  {`blank-${index + 1}`}
                </button>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ClozeQuestion;
