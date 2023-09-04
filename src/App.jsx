import React, { useState } from "react";
import questions from "./questions";

const finalResults = {
  bad: 'Неудовлетворительно',
  average: 'Неплохо',
  good: 'Вы молодец!',
};

const App = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [wrongQuestions, setWrongQuestions] = useState([]);
  const [result, setResult] = useState(null);

  const handleAnswer = (answer) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.answer;

    setUserAnswers([...userAnswers, isCorrect]);
    if (!isCorrect) {
      const wrongAnswer = { ...currentQuestion, userAnswer: answer };
      setWrongQuestions([...wrongQuestions, wrongAnswer]);
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setResult(isCorrect ? 'Правильно!' : 'Неправильно!');
  };

  const renderOptions = (options) => options.map((item, index) => <button key={index} className='button' onClick={() => handleAnswer(item)}>{item}</button>);

  const renderRecommendations = (questions) => questions.map((item) => (
    <div key={item.id}>
      <p className='recommendation'>{item.id}. {item.text}</p>
      <p className='recommendation'>Ваш ответ: <span className="text-bold">{item.userAnswer}</span></p>
      <p className='recommendation'>Правильный ответ: <span className="text-bold">{item.answer}</span></p>
      <p className='recommendation'>{item.recommendation}</p>
    </div>
  ));

  const currentQuestion = questions[currentQuestionIndex];

  if (currentQuestionIndex >= questions.length) {
    const correctAnswers = userAnswers.filter((answer) => answer).length;
    const percentage = correctAnswers / questions.length * 100;
    let finalResult;
    if (percentage >= 75) {
      finalResult = finalResults.good;
    } else if (percentage >= 50) {
      finalResult = finalResults.average;
    } else {
      finalResult = finalResults.bad;
    }

    return (
      <div>
        <p className='question'>Вопросы закончились</p>
        <p className='result'>Правильных ответов: {correctAnswers}</p>
        <p className='result'>Результат: {finalResult}</p>
        {renderRecommendations(wrongQuestions)}
      </div>
    );
  }

  return (
    <div>
      <p className='question'>Вопрос №{currentQuestionIndex + 1}. {currentQuestion.text}</p>
      {renderOptions(currentQuestion.options)}
      {result && <p className='result'>{result}</p>}
    </div>
  );
};

export default App;
