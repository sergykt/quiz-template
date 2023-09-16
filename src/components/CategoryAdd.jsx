import { useFormik } from 'formik';
import { useRef, useEffect } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import Button from './Button';

import routes from '../routes';

const validationSchema = Yup.object({
  name: Yup.string().trim().required('Это поле обязательно'),
});

const CategoryAdd = () => {
  const inputEl = useRef(null);

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        await axios.post(routes.categoriesPath(), values);
        toast.success('Категория добавлена');
        resetForm();
      } catch (err) {
        if (err.response.status === 409) {
          toast.error('Данная категория уже существует');
        } else if (err.response.status === 400) {
          toast.error('Невалидные данные');
        } else if (err.response.status === 500) {
          toast.error('Внутренняя ошибка сервера');
        } else {
          toast.error('Что-то пошло не так, проверьте соединение');
        }
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="container editor__container">
      <form className="form" onSubmit={formik.handleSubmit}>
        <h2 className="form__title">Добавить категорию</h2>
        <div className="form__control">
          <label htmlFor="name" className="form__label">Название категории</label>
          <input
            ref={inputEl}
            className="form__input"
            name="name"
            id="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            disabled={formik.isSubmitting}
            required
          />
        </div>
        {formik.touched.name && formik.errors.name && (
          <p className="invalid-tooltip">{formik.errors.name}</p>
        )}
        <Button className="form__button" type="submit" disabled={formik.isSubmitting}>Отправить</Button>
      </form>
      <a href="/categories">
        <Button>Вернуться</Button>
      </a>
    </div>
  );
};

export default CategoryAdd;
