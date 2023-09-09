import { useFormik } from 'formik';
import axios from 'axios';
//import * as Yup from 'yup';
import { toast } from 'react-toastify';

import routes from '../routes';

// const validationSchema = Yup.object({
//   text: Yup.string().trim().required('Это поле обязательно'),
//   answer: Yup.string().trim().required('Это поле обязательно'),
//   wrongAnswer: Yup.string().trim()
//     .required('Это поле обязательно')
//     .notOneOf([Yup.ref('answer')], 'Ответы не могут быть одинаковыми'),
//   recommendation: Yup.string().trim().required('Это поле обязательно'),
// });

const CategoryAdd = ({ questions, categories }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    //validationSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        await axios.post(routes.categoriesPath(), values);
        toast.success('Категория добавлена');
        resetForm();
      } catch (err) {
        console.log(err);
        setSubmitting(false);
        toast.error('Что-то пошло не так, проверьте соединение');
      }
    },
  });

  return (
    <div className="container">
      <form className="form" onSubmit={formik.handleSubmit}>
        <h2 className="form__title">Добавить категорию</h2>
        <div className="form__control">
          <label htmlFor="name" className="form__label">Название категории</label>
          <input
            className="form__input"
            name="name"
            id="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            disabled={formik.isSubmitting}
          />
        </div>
        {formik.touched.text && formik.errors.text && (
          <p className="invalid-tooltip">{formik.errors.text}</p>
        )}
        <button className="button form__button" type="submit" disabled={formik.isSubmitting}>Отправить</button>
      </form>
      <a href="/edit">
        <button className="button">Вернуться</button>
      </a>
    </div>
  );
};

export default CategoryAdd;
