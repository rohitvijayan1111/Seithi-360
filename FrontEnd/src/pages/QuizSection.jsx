import React, { useState, useEffect } from "react";
import axios from "axios";

const QuizSection = ({ isOpen, onClose }) => {
  const [quiz, setQuiz] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const newsData = [
    {
      headline: "AI Revolutionizes Healthcare",
      body: "AI is being used in diagnostics, treatment plans, and medical research, leading to faster and more accurate outcomes.",
    },
    {
      headline: "AI Transforms Education",
      body: "AI tools are improving personalized learning and automating administrative tasks for teachers.",
    },
    {
      headline: "AI Enhances Environmental Protection",
      body: "AI technologies are used to predict climate change and assist in conservation efforts.",
    },
    {
      headline: "AI in Finance",
      body: "AI is revolutionizing the finance industry by automating tasks such as fraud detection and customer service.",
    },
    {
      headline: "AI in Transportation",
      body: "AI is helping to develop autonomous vehicles, improving road safety and traffic management.",
    }
  ];

  // Fetch quiz data from backend
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND}/generate-quiz`, { newsData });
        setQuiz(response.data.quiz);
      } catch (error) {
        console.error("Error fetching quiz:", error);
      }
    };
    fetchQuiz();
  }, []);

  // Handle user selecting an option
  const handleOptionChange = (questionIndex, option) => {
    setUserAnswers({ ...userAnswers, [questionIndex]: option });
  };

  // Submit quiz and evaluate results
  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (!isOpen) return null; // Don't render if modal is not open

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full sm:w-[90%] md:w-[70%] lg:w-[50%] max-w-lg mx-4 sm:mx-8 p-6 relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          &times;
        </button>

        <h3 className="text-lg font-bold mb-4 text-center">Quiz</h3>
        
        <div className="max-h-[80vh] overflow-y-auto">
  {quiz && quiz.length === 0 ? (
    <p className="text-gray-600">Loading quiz...</p>
  ) : (
    quiz && quiz.length > 0 ? (
      quiz.map((q, index) => (
        <div key={index} className="mb-4">
          <p className="font-semibold">{q.question}</p>
          {q.options.map((option, i) => {
            const trimmedOption = option.slice(3).trim();
            const isCorrect = q.correctOption.slice(1, 2) === option.slice(1, 2);
            const isSelected = userAnswers[index] === option;

            let optionStyle = "text-gray-600";
            if (submitted) {
              if (isCorrect) {
                optionStyle = "text-green-600 font-bold";
              } else if (isSelected && !isCorrect) {
                optionStyle = "text-red-600 font-bold";
              }
            }

            return (
              <label key={i} className="block text-sm">
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={option}
                  checked={isSelected}
                  onChange={() => handleOptionChange(index, option)}
                  disabled={submitted}
                  className="mr-2"
                />
                <span className={optionStyle}>{option}</span>
              </label>
            );
          })}
        </div>
      ))
    ) : (
      <p className="text-gray-600">No quiz data available.</p>
    )
  )}
</div>

        {!submitted ? (
          <button
            onClick={handleSubmit}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded w-full"
          >
            Submit
          </button>
        ) : (
          <p className="mt-4 text-lg font-bold text-gray-800 text-center">
            Quiz submitted! Review your answers above.
          </p>
        )}
      </div>
    </div>
  );
};

export default QuizSection;
