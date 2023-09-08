import axios from 'axios';
import { toast } from 'react-toastify';

import routes from '../routes';

const QuestionList = ({ questions, setManagerMenu, setTargetQuestionId, setQuestions }) => {
  const addActions = () => setManagerMenu('adding');

  const editAction = (id) => {
    setTargetQuestionId(id);
    setManagerMenu('editing');
  };

  const deleteAction = async (id) => {
    try {
      const response = await axios.delete(routes.questionsPath(id));
      console.log(response.status);
      setQuestions(questions.filter((item) => item.id !== id));
      toast.success('Вопрос удален');
    } catch (err) {
      console.log(err);
      toast.error('Что-то пошло не так');
    }
  };

  const renderQuestionsList = () => (
    <ol className="questions-list">
      {questions.map((item) => {
        const { text, id } = item;
        return (
          <li className="questions-list__item" key={id}>
            <div className="questions-list__item-container">
              <p className="questions-list__item-title">{text}</p>
              <div className="questions-list__button-group">
                <button className="questions-list__button button" onClick={() => editAction(id)}>
                  Редактировать
                </button>
                <button className="questions-list__button button" onClick={() => deleteAction(id)}>
                  Удалить
                </button>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );

  return (
    <div className="container">
      <button className="button questions-list__add-button" onClick={() => addActions()}>
        Добавить
      </button>
      {renderQuestionsList(questions)}
    </div>
  );
};

export default QuestionList;
