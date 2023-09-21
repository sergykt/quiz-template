import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import QuestionAdd from "../components/QuestionAdd";
import QuestionList from "../components/QuestionList";
import QuestionEdit from "../components/QuestionEdit";

import categoryService from "../api/services/categoryService";
import questionService from "../api/services/questionService";

const mapping = {
  adding: QuestionAdd,
  editing: QuestionEdit,
  main: QuestionList,
};

const QuestionManager = () => {
  const navigate = useNavigate();
  const [managerMenu, setManagerMenu] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [targetQuestionId, setTargetQuestionId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('fetch');
        const questionsResponse = await questionService.get();
        const categoriesResponse = await categoryService.get();
        setQuestions(questionsResponse);
        setCategories(categoriesResponse);
        setManagerMenu('main');
      } catch (err) {
        if (err.response?.status === 401 || err.response?.status === 403) {
          navigate('/');
          toast.error('Доступ запрещен');
        } else if (err.response?.status === 500) {
          toast.error('Внутренняя ошибка сервера');
        } else {
          toast.error('Что-то пошло не так, проверьте соединение');
        }
      }
    }

    fetchData();
  }, [navigate]);

  const ManagerForm = mapping[managerMenu];

  return (
    <div className="editor">
      {
        managerMenu && <ManagerForm
          questions={questions}
          setQuestions={setQuestions}
          categories={categories}
          setManagerMenu={setManagerMenu}
          targetQuestionId={targetQuestionId}
          setTargetQuestionId={setTargetQuestionId}
        />
      }
    </div>
  );
};

export default QuestionManager;
