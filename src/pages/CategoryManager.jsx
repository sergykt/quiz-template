import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import CategoryList from "../components/CategoryList";
import CategoryAdd from "../components/CategoryAdd";
import CategoryEdit from "../components/CategoryEdit";

import categoryService from "../api/services/categoryService";

const mapping = {
  adding: CategoryAdd,
  editing: CategoryEdit,
  main: CategoryList,
};

const CategoryManager = () => {
  const navigate = useNavigate();
  const [managerMenu, setManagerMenu] = useState(null);
  const [categories, setCategories] = useState([]);
  const [targetCategoryId, setTargetCategoryId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log('fetch');
      try {
        const categoriesResponse = await categoryService.get();
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
          categories={categories}
          setCategories={setCategories}
          setManagerMenu={setManagerMenu}
          targetCategoryId={targetCategoryId}
          setTargetCategoryId={setTargetCategoryId}
        />
      }
    </div>
  );
};

export default CategoryManager;
