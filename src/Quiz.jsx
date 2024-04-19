import { useState, useEffect } from 'react';
import axios from 'axios';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await axios.get('https://quiz-task-be.onrender.com/api/questions');
      setQuestions(response.data);
    };
    fetchQuestions();
  }, []);

  const handleAnswerSelect = (questionId, optionIndex) => {
    setSelectedAnswers(prevState => ({
      ...prevState,
      [questionId]: optionIndex
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('https://quiz-task-be.onrender.com/api/questions/submit', selectedAnswers);
      setScore(response.data.score);
    } catch (error) {
      console.error('Error submitting answers:', error);
    }
  };

  return (
    <div>
      <h2>Quiz</h2>
      {questions.map(question => (
        <div key={question._id}>
          <h3>{question.question}</h3>
          <div>
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(question._id, index)}
                style={{
                  marginRight: '10px',
                  backgroundColor: selectedAnswers[question._id] === index ? 'lightblue' : 'white'
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ))}
      <br/>
      <br/>
      <button onClick={handleSubmit}>Submit Answers</button>
      <br/>
      <br/>
      {score !== null && <div>Your score: {score}</div>}
    </div>
  );
};

export default Quiz;
