import React, { useState } from 'react';
import axios from 'axios';

const QuizPage = () => {
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Dummy news data
  const newsData = {
    headline: "AI Revolutionizes Healthcare",
    body: "AI is being used in diagnostics, treatment plans, and medical research, leading to faster and more accurate outcomes.",
  };

  const fetchQuiz = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND}/generate-quiz`, { newsData });
      setQuiz(response.data.quiz);
      console.log(response.data.quiz);
    } catch (err) {
      setError('Failed to fetch quiz. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>AI News Quiz</h1>
      <button onClick={fetchQuiz} disabled={loading}>
        {loading ? 'Loading...' : 'Generate Quiz'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {quiz.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          {quiz.map((q, index) => (
            <div key={index} style={{ marginBottom: '20px' }}>
              <h3>{`Question ${index + 1}: ${q.question}`}</h3>
              <ul>
                {q.options.map((option, i) => (
                  <li key={i}>{option}</li>
                ))}
              </ul>
              <p>
                <strong>Correct Option:</strong> {q.correctOption}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizPage;
