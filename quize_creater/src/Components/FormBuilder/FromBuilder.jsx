import React, { useState } from "react";
import CategorizeQuestion from "./QuestionTypes/CategorizeQuestion";
import ClozeQuestion from "./QuestionTypes/ClozeQuestion";
import ComprehensionQuestion from "./QuestionTypes/ComprehensionQuestion";
import FormPreview from "./QuestionTypes/QuestionPreview";

const FormBuilder = () => {
  const [form, setForm] = useState({
    headerImage: "",
    questions: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const validateForm = () => {
    const newErrors = {};

    if (form.headerImage && !form.headerImage.match(/^https?:\/\/.+$/)) {
      newErrors.headerImage = "Invalid URL";
    }

    form.questions.forEach((question) => {
      if (!question.data) {
        newErrors[question.id] = "Invalid question data";
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; 
  };

  const addQuestion = (type) => {
    const newQuestion = {
      id: form.questions.length + 1,
      type,
      data: {},
    };

    setForm((prevForm) => ({
      ...prevForm,
      questions: [...prevForm.questions, newQuestion],
    }));
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

  const onSubmit = async (formData) => {
    try {
      const response = await fetch("http://localhost:8080/forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Form data submitted successfully!");
       
        setSuccessMessage("Form submitted successfully!");
      } else {
        console.error("Failed to submit form data");
       
      }
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
  console.log(form);
  return (
    <div className="container mx-auto p-4">
     
      <div className="mb-8">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Header Image URL:
        </label>
        <input
          type="text"
          className={`border rounded w-full py-2 px-3 ${
            errors.headerImage ? "border-red-500" : ""
          }`}
          placeholder="Enter URL"
          value={form.headerImage}
          onChange={(e) => updateHeaderImage(e.target.value)}
        />
        {errors.headerImage && (
          <p className="text-red-500 text-sm mt-1">{errors.headerImage}</p>
        )}
      </div>

      
      <div>
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
      </div>

      
      <div className="mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => addQuestion("categorize")}
        >
          Add Categorize Question
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4"
          onClick={() => addQuestion("cloze")}
        >
          Add Cloze Question
        </button>
        <button
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded ml-4"
          onClick={() => addQuestion("comprehension")}
        >
          Add Comprehension Question
        </button>
      </div>

     
      {isLoading && <div className="text-blue-500 mt-2">Loading...</div>}

     
      {successMessage && (
        <div className="text-green-600 mt-2">{successMessage}</div>
      )}

      
      <div className="mt-4">
        <button
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSubmit}
        >
          Save Form
        </button>
      </div>
      {form.questions.length == 0 ? (
        <h3>Loading</h3>
      ) : (
        <FormPreview form={form} />
      )}
    </div>
  );
};

export default FormBuilder;
