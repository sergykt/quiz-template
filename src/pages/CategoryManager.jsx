import { useState, useEffect } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

import CategoryList from "../components/CategoryList";
import CategoryAdd from "../components/CategoryAdd";
import CategoryEdit from "../components/CategoryEdit";

import routes from '../routes';

const mapping = {
  adding: CategoryAdd,
  editing: CategoryEdit,
  main: CategoryList,
};

const CategoryManager = () => {
  const [managerMenu, setManagerMenu] = useState('main');
  const [categories, setCategories] = useState([]);
  const [targetCategoryId, setTargetCategoryId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log('fetch');
      try {
        const categoriesResponse = await axios.get(routes.categoriesPath());
        setCategories(categoriesResponse.data);
      } catch (err) {
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
        categories={categories}
        setCategories={setCategories}
        setManagerMenu={setManagerMenu}
        targetCategoryId={targetCategoryId}
        setTargetCategoryId={setTargetCategoryId}
      />
    </div>
  );
};

export default CategoryManager;
