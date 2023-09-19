import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import Button from './Button';
import questionService from '../api/services/questionService';

const validationSchema = Yup.object({
  text: Yup.string().trim().required('Это поле обязательно'),
  answer: Yup.string().trim().required('Это поле обязательно'),
  wrongAnswer: Yup.string().trim()
    .required('Это поле обязательно')
    .notOneOf([Yup.ref('answer')], 'Ответы не могут быть одинаковыми'),
  recommendation: Yup.string().trim().required('Это поле обязательно'),
});

const QuestionAdd = ({ categories }) => {
  const navigate = useNavigate();
  const inputEl = useRef(null);

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      text: '',
      answer: '',
      wrongAnswer: '',
      recommendation: '',
      category_id: categories[0]?.id,
    },
    validationSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        await questionService.create(values);
        toast.success('Вопрос добавлен');
        resetForm();
      } catch (err) {
        setSubmitting(false);
        if (err.response?.status === 401) {
          navigate('/');
          toast.error('Доступ запрещен');
        } else if (err.response?.status === 409) {
          toast.error('Данный вопрос уже существует');
        } else if (err.response?.status === 400) {
          toast.error('Невалидные данные');
        } else if (err.response?.status === 500) {
          toast.error('Внутренняя ошибка сервера');
        } else {
          toast.error('Что-то пошло не так, проверьте соединение');
        }
      }
    },
  });

  return (
    <div className="container editor__container">
      <form className="form" name="question" onSubmit={formik.handleSubmit}>
        <h2 className="form__title">Добавить вопрос</h2>
        <div className="form__control">
          <label htmlFor="category_id" className="form__label">Категория</label>
          <select
            className="form__select"
            name="category_id"
            id="category_id"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.category_id}
            disabled={formik.isSubmitting}
          >
            {categories.map((item) => (
              <option key={item.id} value={item.id}>{item.name}</option>)
            )}
          </select>
        </div>
        <div className="form__control">
          <label htmlFor="text" className="form__label">Текст вопроса</label>
          <input
            ref={inputEl}
            className="form__input"
            name="text"
            id="text"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.text}
            disabled={formik.isSubmitting}
            required
          />
        </div>
        {formik.touched.text && formik.errors.text && (
          <p className="invalid-tooltip">{formik.errors.text}</p>
        )}
        <div className="form__control">
          <label htmlFor="answer" className="form__label">Правильный ответ</label>
          <input
            className="form__input"
            name="answer"
            id="answer"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.answer}
            disabled={formik.isSubmitting}
            required
          />
        </div>
        {formik.touched.answer && formik.errors.answer && (
          <p className="invalid-tooltip">{formik.errors.answer}</p>
        )}
        <div className="form__control">
          <label htmlFor="wrongAnswer" className="form__label">Неправильный ответ</label>
          <input
            className="form__input"
            name="wrongAnswer"
            id="wrongAnswer"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.wrongAnswer}
            disabled={formik.isSubmitting}
            required
          />
        </div>
        {formik.touched.wrongAnswer && formik.errors.wrongAnswer && (
          <p className="invalid-tooltip">{formik.errors.wrongAnswer}</p>
        )}
        <div className="form__control">
          <label htmlFor="recommendation" className="form__label">Подсказка</label>
          <input
            className="form__input"
            name="recommendation"
            id="recommendation"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.recommendation}
            disabled={formik.isSubmitting}
            required
          />
        </div>
        {formik.touched.recommendation && formik.errors.recommendation && (
          <p className="invalid-tooltip">{formik.errors.recommendation}</p>
        )}
        <Button className="form__button" type="submit" disabled={formik.isSubmitting}>Отправить</Button>
      </form>
      <a href="/questions">
        <Button>Вернуться</Button>
      </a>
    </div>
  );
};

export default QuestionAdd;
