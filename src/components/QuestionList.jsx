import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Button from './Button';
import questionService from '../api/services/questionService';

const QuestionList = ({ questions, categories, setManagerMenu, setTargetQuestionId, setQuestions }) => {
  const navigate = useNavigate();
  const [currentCategory, setCurrentCategory] = useState('all');
  const addActions = () => setManagerMenu('adding');

  const editAction = (id) => {
    setTargetQuestionId(id);
    setManagerMenu('editing');
  };

  const deleteAction = async (id) => {
    try {
      await questionService.delete(id);
      setQuestions(questions.filter((item) => item.id !== id));
      toast.success('Вопрос удален');
    } catch (err) {
      if (err.response?.status === 401) {
        navigate('/');
        toast.error('Доступ запрещен');
      } else if (err.response?.status === 404) {
        toast.error('Данный вопрос не существует');
      } else if (err.response?.status === 500) {
        toast.error('Внутренняя ошибка сервера');
      } else {
        toast.error('Что-то пошло не так, проверьте соединение');
      }
    }
  };

  const renderQuestionsList = () => {
    const filteredQuestions = currentCategory === 'all' ? questions : questions.filter(({ category_id }) => category_id === currentCategory);

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
        <a href="/categories">
          <Button>Список категорий</Button>
        </a>
      </div>
      <div className="questions-list__select">
        <select className="form__select" name="categories" defaultValue="all" onChange={(e) => setCurrentCategory(e.target.value)}>
          <option value="all">Все категории</option>
          {categories.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
        </select>
      </div>
      {renderQuestionsList()}
    </div>
  );
};

export default QuestionList;
