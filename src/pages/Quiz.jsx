import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

import routes from "../routes";

const finalResults = {
  bad: 'Неудовлетворительно',
  average: 'Неплохо',
  good: 'Вы молодец!',
};

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(routes.quizPath());
        setQuestions(response.data);
      } catch (err) {
        console.log(err);
        if (err.response.status === 500) {
          toast.error('Ошибка подключения');
        } else {
          toast.error('Что-то пошло не так');
        }
      }
    }

    fetchData();
  }, []);

  const handleAnswer = (answer) => {
    if (answer === currentQuestion.answer) {
      setCorrectAnswersCount(correctAnswersCount + 1);
      setResult('Правильно!');
    } else {
      const wrongAnswer = { ...currentQuestion, userAnswer: answer, index: currentQuestionIndex };
      setWrongAnswers([...wrongAnswers, wrongAnswer]);
      setResult('Неправильно!');
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const renderOptions = (options) => options.map((item, index) =>
    <button key={index} className="button quiz__button" onClick={() => handleAnswer(item)}>{item}</button>);

  const renderRecommendations = (questions) => questions.map((item) => (
    <div key={item.index}>
      <p className="recommendation">{item.index + 1}. {item.text}</p>
      <p className="recommendation">Ваш ответ: <span className="text-bold">{item.userAnswer}</span></p>
      <p className="recommendation">Правильный ответ: <span className="text-bold">{item.answer}</span></p>
      <p className="recommendation">{item.recommendation}</p>
    </div>
  ));

  if (questions.length === 0) {
    return null;
  }

  const currentQuestion = questions[currentQuestionIndex];

  if (currentQuestionIndex >= questions.length) {
    const percentage = correctAnswersCount / questions.length * 100;
    let finalResult;

    if (percentage >= 75) {
      finalResult = finalResults.good;
    } else if (percentage >= 50) {
      finalResult = finalResults.average;
    } else {
      finalResult = finalResults.bad;
    }

    return (
      <div className="quiz">
        <div className="container">
          <p className="question">Вопросы закончились</p>
          <p className="result">Правильных ответов: {correctAnswersCount}</p>
          <p className="result">Результат: {finalResult}</p>
          {renderRecommendations(wrongAnswers)}
        </div>
      </div>
    );
  }

  return (
    <div className="quiz">
      <div className="container">
        <p className='question'>Вопрос №{currentQuestionIndex + 1}. {currentQuestion?.text}</p>
        {renderOptions(currentQuestion?.options)}
        {result && <p className="result">{result}</p>}
      </div>
    </div>
  );
};

export default Quiz;
