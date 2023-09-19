import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Button from './Button';
import categoryService from '../api/services/categoryService';

const CategoryList = ({ categories, setManagerMenu, setTargetCategoryId, setCategories }) => {
  const navigate = useNavigate();
  const addActions = () => setManagerMenu('adding');

  const editAction = (id) => {
    setTargetCategoryId(id);
    setManagerMenu('editing');
  };

  const deleteAction = async (id) => {
    try {
      await categoryService.delete(id);
      setCategories(categories.filter((item) => item.id !== id));
      toast.success('Категория удалена');
    } catch (err) {
      if (err.response?.status === 401) {
        navigate('/');
        toast.error('Доступ запрещен');
      } else if (err.response?.status === 404) {
        toast.error('Данная категория не существует');
      } else if (err.response?.status === 409) {
        toast.error('Категорию нельзя удалить, поскольку с ней еще связаны вопросы');
      } else if (err.response?.status === 500) {
        toast.error('Внутренняя ошибка сервера');
      } else {
        toast.error('Что-то пошло не так, проверьте соединение');
      }
    }
  };

  return (
    <div className="container editor__container">
      <div className="questions-list__button-group">
        <Button className="questions-list__add-button" onClick={() => addActions()}>
          Добавить категорию
        </Button>
        <a href="/questions">
          <Button>Список вопросов</Button>
        </a>
      </div>
      <ol className="questions-list">
        {categories.map((item) => {
          const { name, id } = item;
          return (
            <li className="questions-list__item" key={id}>
              <div className="questions-list__item-container">
                <p className="questions-list__item-title">{name}</p>
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
    </div>
  );
};

export default CategoryList;
