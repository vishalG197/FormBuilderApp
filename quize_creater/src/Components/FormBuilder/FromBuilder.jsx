import React, { useState } from "react";
import CategorizeQuestion from "./QuestionTypes/CategorizeQuestion";
import ClozeQuestion from "./QuestionTypes/ClozeQuestion";
import ComprehensionQuestion from "./QuestionTypes/ComprehensionQuestion";
import FormPreview from "./QuestionPreview";
import { useDropzone } from "react-dropzone";

const FormBuilder = () => {
  const [form, setForm] = useState({
    headerImage: "",
    topic: "",
    questions: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedQuestionType, setSelectedQuestionType] = useState("");
  const onDrop = (acceptedFiles) => {
    // Assuming only one file is accepted, you can modify accordingly
    const imageFile = acceptedFiles[0];
    const imageUrl = URL.createObjectURL(imageFile);
    updateHeaderImage(imageUrl);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const validateForm = () => {
    const newErrors = {};

    if (form.headerImage && !form.headerImage.match(/^https?:\/\/.+$/)) {
      newErrors.headerImage = "Invalid URL";
    }

    if (!form.topic.trim()) {
      newErrors.topic = "Topic cannot be empty";
    }

    form.questions.forEach((question) => {
      if (!question.data) {
        newErrors[question.id] = "Invalid question data";
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const addQuestion = () => {
    if (selectedQuestionType) {
      const newQuestion = {
        id: form.questions.length + 1,
        type: selectedQuestionType,
        data: {},
      };

      setForm((prevForm) => ({
        ...prevForm,
        questions: [...prevForm.questions, newQuestion],
      }));
      setSelectedQuestionType("");
    }
  };

  const updateQuestion = (questionId, updatedQuestion) => {
    setForm((prevForm) => ({
      ...prevForm,
      questions: prevForm.questions.map((question) =>
        question.id === questionId ? updatedQuestion : question
      ),
    }));
  };

  const updateHeaderImage = (url) => {
    setForm((prevForm) => ({
      ...prevForm,
      headerImage: url,
    }));
  };

  const onSubmit = async (form) => {
    try {
      // Your form submission logic here...
      const response = await fetch("https://quize-5b24.onrender.com/forms", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
         
        },
        
         body: JSON.stringify(form),
      });
  console.log(response.ok)
      setSuccessMessage("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const isValid = validateForm();

    if (isValid) {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      onSubmit(form);
    }
  };
console.log(form)
  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Topic:
        </label>
        <input
          type="text"
          className={`border rounded w-full py-2 px-3 ${
            errors.topic ? "border-red-500" : ""
          }`}
          placeholder="Enter Topic"
          value={form.topic}
          onChange={(e) => setForm({ ...form, topic: e.target.value })}
        />
        {errors.topic && (
          <p className="text-red-500 text-sm mt-1">{errors.topic}</p>
        )}
      </div>

      <div className="mb-8">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Header Image:
        </label>
        <div
          {...getRootProps()}
          className={`border rounded w-full py-2 px-3 text-center cursor-pointer ${
            isDragActive ? "border-blue-500" : ""
          }`}
        >
          <input {...getInputProps()} />
          {form.headerImage ? (
            <img
              src={form.headerImage}
              alt="Header"
              className="max-w-full max-h-40 object-cover"
            />
          ) : (
            <p>
              {isDragActive
                ? "Drop the image here"
                : "Drag 'n' drop an image here, or click to select one"}
            </p>
          )}
        </div>
        {errors.headerImage && (
          <p className="text-red-500 text-sm mt-1">{errors.headerImage}</p>
        )}
      </div>
      {form.questions.map((question) => {
        let QuestionComponent;

        switch (question.type) {
          case "categorize":
            QuestionComponent = CategorizeQuestion;
            break;
          case "cloze":
            QuestionComponent = ClozeQuestion;
            break;
          case "comprehension":
            QuestionComponent = ComprehensionQuestion;
            break;
          default:
            return null;
        }

        return (
          <QuestionComponent
            key={question.id}
            question={question}
            updateQuestion={(updatedQuestion) =>
              updateQuestion(question.id, updatedQuestion)
            }
            error={errors[question.id]}
          />
        );
      })}
      <div className="mb-8">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Select Question Type:
        </label>
        <select
          value={selectedQuestionType}
          onChange={(e) => setSelectedQuestionType(e.target.value)}
          className="border rounded w-full py-2 px-3"
        >
          <option value="" disabled>
            Select Question Type
          </option>
          <option value="categorize">Categorize</option>
          <option value="cloze">Cloze</option>
          <option value="comprehension">Comprehension</option>
        </select>
      </div>

      <div className="mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={addQuestion}
        >
          Add Question
        </button>
      </div>

     

      <div className="mt-4">
        <button
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSubmit}
        >
          Save Form
        </button>
      </div>

      {isLoading && <div className="text-blue-500 mt-2">Loading...</div>}

      {successMessage && (
        <div className="text-green-600 mt-2">{successMessage}</div>
      )}

      {form.questions.length === 0 ? (
        <h3>Loading</h3>
      ) : (
        <FormPreview form={form} />
      )}
    </div>
  );
};

export default FormBuilder;