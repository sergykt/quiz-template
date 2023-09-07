import { useState, useEffect } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

import routes from '../routes';

import QuestionAddForm from "../components/QuestionAdd";
import QuestionList from "../components/QuestionList";
import QuestionEditForm from "../components/QuestionEdit";

const mapping = {
  adding: QuestionAddForm,
  editing: QuestionEditForm,
  main: QuestionList,
};

const QuestionManager = () => {
  const [managerMenu, setManagerMenu] = useState('main');
  const [questions, setQuestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [targetQuestionId, setTargetQuestionId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('fetch');
        const response = await axios.get(routes.dataPath());
        const { data: { questions: newQuestions, categories: newCategories } } = response;
        setQuestions(newQuestions);
        setCategories(newCategories);
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

  const ManagerForm = mapping[managerMenu];

  return (
    <div className="editor">
      <ManagerForm 
        questions={questions}
        categories={categories}
        setManagerMenu={setManagerMenu}
        setTargetQuestionId={setTargetQuestionId}
        targetQuestionId={targetQuestionId}
        setQuestions={setQuestions}
      />
    </div>
  );
};

export default QuestionManager;
