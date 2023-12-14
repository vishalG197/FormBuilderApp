import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const Blank = ({ id, text, onDrop }) => {
  const [, drag] = useDrag({
    item: { type: 'BLANK', id },
  });

  return (
    <button ref={drag} onClick={() => onDrop(id)}>
      {text}
    </button>
  );
};
const question = {
          id: 2,
          type: 'cloze',
         data: {
           text: 'This is a  question example with blanks. Fill in the blanks.',
           blanks: ['cloze', 'Fill'],
         },
       }
const FillInTheBlank = () => {
  const [blanks, setBlanks] = useState(question.data.blanks);

  const handleDrop = (index) => {
    return (item) => {
      const newBlanks = [...blanks];
      newBlanks.splice(index, 0, item.id);
      setBlanks(newBlanks);
    };
  };

  const [, drop] = useDrop({ accept: 'BLANK' });

  return (
    <div>
      <h1>Q.{question.id}</h1>
      <div>
        {blanks.map((blank, index) => (
          <Blank key={index} id={blank} text={`blank-${index + 1}`} onDrop={handleDrop(index)} />
        ))}
      </div>
      <div ref={drop}>
        {question.data.text.split('___').map((part, index) => (
          <span key={index}>
            {part}
            {index < question.data.blanks.length - 1 && (
              <button disabled style={{ cursor: 'not-allowed' }}>
                {`blank-${index + 1}`}
              </button>
            )}
          </span>
        ))}
      </div>
    </div>
  );
};

export default FillInTheBlank;
