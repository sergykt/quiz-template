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
      await axios.delete(routes.questionsPath(id));
      setQuestions(questions.filter((item) => item.id !== id));
      toast.success('Вопрос удален');
    } catch (err) {
      console.log(err);
      if (err.response.status === 400) {
        if (err.response.data.error === 'This Question Already Deleted') {
          toast.error('Данный вопрос не существует');
        } else {
          toast.error('Невалидные данные');
        }
      } else if (err.response.status === 500) {
        toast.error('Внутренняя ошибка сервера');
      } else {
        toast.error('Что-то пошло не так, проверьте соединение');
      }
    }
  };

  const addCategory = () => {
    setManagerMenu('category');
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
        Добавить вопрос
      </button>
      <button className="button questions-list__add-button" onClick={() => addCategory()}>
        Добавить категорию
      </button>
      {renderQuestionsList(questions)}
    </div>
  );
};

export default QuestionList;
