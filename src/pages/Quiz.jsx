import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import questionService from "../api/services/questionService";
import userService from "../api/services/userService";
import Button from "../components/Button";

const finalResults = {
  bad: 'Неудовлетворительно',
  average: 'Неплохо',
  good: 'Вы молодец!',
};

const sendQuizResults = async (points) => {
  try {
    await userService.addResults(points);
    toast.success('Результаты отправлены на сервер');
  } catch (err) {
    if (err.response?.status === 500) {
      toast.error('Внутренняя ошибка сервера');
    } else {
      toast.error('Что-то пошло не так, проверьте соединение');
    }
  }
};

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await questionService.getQuiz();
        setQuestions(response);
      } catch (err) {
        if (err.response?.status === 500) {
          toast.error('Внутренняя ошибка сервера');
        } else {
          toast.error('Что-то пошло не так, проверьте соединение');
        }
      }
    }

    fetchData();
  }, []);

  const handleAnswer = (answer) => {
    if (answer === currentQuestion.answer) {
      setCorrectAnswersCount(correctAnswersCount + 1);
    } else {
      const wrongAnswer = { ...currentQuestion, userAnswer: answer, index: currentQuestionIndex };
      setWrongAnswers([...wrongAnswers, wrongAnswer]);
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const renderOptions = (options) => options.map((item, index) =>
    <Button key={index} className="quiz__button" onClick={() => handleAnswer(item)}>{item}</Button>);

  const renderRecommendations = (questions) => questions.map((item, index) => (
    <div key={item.index}>
      <p className="quiz__recommendation">{item.index + 1}. {item.text}</p>
      <p className="quiz__recommendation">Ваш ответ: <span className="text-bold">{item.userAnswer}</span></p>
      <p className="quiz__recommendation">Правильный ответ: <span className="text-bold">{item.answer}</span></p>
      <p className="quiz__recommendation">{item.recommendation}</p>
    </div>
  ));

  if (questions.length === 0) {
    return null;
  }

  const currentQuestion = questions[currentQuestionIndex];

  if (currentQuestionIndex >= questions.length) {
    const username = localStorage.getItem('username');
    if (username && !quizCompleted) {
      setQuizCompleted(true);
      sendQuizResults(correctAnswersCount);
    }
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
          <p className="quiz__question">Вопросы закончились</p>
          <p className="quiz__result">Правильных ответов: {correctAnswersCount}</p>
          <p className="quiz__result">Результат: {finalResult}</p>
          {renderRecommendations(wrongAnswers)}
          <a href="/quiz"><Button className="quiz__restart-button">Начать заново</Button></a>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz">
      <div className="container">
        <p className='quiz__question'>Вопрос №{currentQuestionIndex + 1}. {currentQuestion?.text}</p>
        <div className='quiz__button-group'>
          {renderOptions(currentQuestion?.options)}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
