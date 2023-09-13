import { useState, useEffect } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

import routes from '../routes';

import QuestionAddForm from "../components/QuestionAdd";
import QuestionList from "../components/QuestionList";
import QuestionEditForm from "../components/QuestionEdit";
import CategoryAdd from "../components/CategoryAdd";

const mapping = {
  adding: QuestionAddForm,
  editing: QuestionEditForm,
  main: QuestionList,
  category: CategoryAdd,
};

const QuestionManager = () => {
  const [managerMenu, setManagerMenu] = useState('main');
  const [questions, setQuestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [targetQuestionId, setTargetQuestionId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log('fetch');
      try {
        const questionsResponse = await axios.get(routes.questionsPath());
        const categoriesResponse = await axios.get(routes.categoriesPath());
        setQuestions(questionsResponse.data);
        setCategories(categoriesResponse.data);
      } catch (err) {
        console.log(err);
        if (err.response.status === 500) {
          toast.error('Внутренняя ошибка сервера');
        } else {
          toast.error('Что-то пошло не так, проверьте соединение');
        }
      }
    }

    fetchData();
  }, []);

  const ManagerForm = mapping[managerMenu];

  return (
    <div className="editor">
      <ManagerForm 
        questions={questions}
        setQuestions={setQuestions}
        categories={categories}
        setManagerMenu={setManagerMenu}
        targetQuestionId={targetQuestionId}
        setTargetQuestionId={setTargetQuestionId}
      />
    </div>
  );
};

export default QuestionManager;
