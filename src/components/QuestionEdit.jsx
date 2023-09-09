import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import routes from '../routes';

const validationSchema = Yup.object({
  text: Yup.string().trim().required('Это поле обязательно'),
  answer: Yup.string().trim().required('Это поле обязательно'),
  wrongAnswer: Yup.string().trim()
    .required('Это поле обязательно')
    .notOneOf([Yup.ref('answer')], 'Ответы не могут быть одинаковыми'),
  recommendation: Yup.string().trim().required('Это поле обязательно'),
});

const QuestionEditForm = ({ questions, categories, targetQuestionId }) => {
  const currentQuestion = questions.find((item) => item.id === targetQuestionId);
  const wrongAnswer = currentQuestion.options.find((item) => item !== currentQuestion.answer);

  const formik = useFormik({
    initialValues: {
      text: currentQuestion.text,
      answer: currentQuestion.answer,
      wrongAnswer: wrongAnswer,
      recommendation: currentQuestion.recommendation,
      category_id: currentQuestion.category_id,
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await axios.put(routes.questionsPath(targetQuestionId), values);
        toast.success('Вопрос изменен');
      } catch (err) {
        console.log(err);
        setSubmitting(false);
        if (err.response.status === 400) {
          if (err.response.data.error === 'This Question Already Exists') {
            toast.error('Данный вопрос уже существует');
          } else {
            toast.error('Невалидные данные');
          }
        } else if (err.response.status === 500) {
          toast.error('Внутренняя ошибка сервера');
        } else {
          toast.error('Что-то пошло не так, проверьте соединение');
        }
      }
    },
  });

  return (
    <div className="container">
      <form className="form" onSubmit={formik.handleSubmit}>
        <h2 className="form__title">Редактировать вопрос</h2>
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
            className="form__input"
            name="text"
            id="text"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.text}
            disabled={formik.isSubmitting}
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
          />
        </div>
        {formik.touched.recommendation && formik.errors.recommendation && (
          <p className="invalid-tooltip">{formik.errors.recommendation}</p>
        )}
        <button className="button form__button" type="submit" disabled={formik.isSubmitting}>Отправить</button>
      </form>
      <a href="/edit">
        <button className="button">Вернуться</button>
      </a>
    </div>
  );
};

export default QuestionEditForm;
