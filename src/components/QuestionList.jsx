import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import routes from '../routes';

import Button from './Button';

const QuestionList = ({ questions, categories, setManagerMenu, setTargetQuestionId, setQuestions }) => {
  const [currentCategory, setCurrentCategory] = useState('all');
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

  const renderQuestionsList = () => {
    const filteredQuestions = currentCategory === 'all' ? questions : questions.filter(({ category_id}) => category_id === currentCategory);

    return (
      <ol className="questions-list">
        {filteredQuestions.map((item) => {
          const { text, id } = item;
          return (
            <li className="questions-list__item" key={id}>
              <div className="questions-list__item-container">
                <p className="questions-list__item-title">{text}</p>
                <div className="questions-list__button-group">
                  <Button className="questions-list__button" onClick={() => editAction(id)}>
                    Редактировать
                  </Button>
                  <Button className="questions-list__button" onClick={() => deleteAction(id)}>
                    Удалить
                  </Button>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    );
  };

  return (
    <div className="container editor__container">
      <div className="questions-list__button-group">
        <Button className="questions-list__add-button" onClick={() => addActions()}>
          Добавить вопрос
        </Button>
        <Button className="questions-list__add-button" onClick={() => addCategory()}>
          Добавить категорию
        </Button>
      </div>
      <div className="questions-list__select">
        <select className="form__select" defaultValue="all" onChange={(e) => setCurrentCategory(e.target.value)}>
          <option value="all">Все категории</option>
          {categories.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
        </select>
      </div>
      {renderQuestionsList()}
    </div>
  );
};

export default QuestionList;
