import { useState, useEffect } from "react";
import axios from 'axios';

import routes from '../routes';

import QuestionAddForm from "../components/QuestionAdd";
import QuestionList from "../components/QuestionList";
import QuestionEditForm from "../components/QuestionEdit";

const mapping = {
  adding: QuestionAddForm,
  renaming: QuestionEditForm,
  main: QuestionList,
};

const QuestionManager = () => {
  const [managerMenu, setManagerMenu] = useState('main');
  const [questions, setQuestions] = useState([]);
  const [targetQuestionId, setTargetQuestionId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(routes.dataPath());
        setQuestions(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, []);

  const ManagerForm = mapping[managerMenu];

  return (
    <div className="editor">
      <ManagerForm questions={questions} setManagerMenu={setManagerMenu} />
    </div>
  );
};

export default QuestionManager;
