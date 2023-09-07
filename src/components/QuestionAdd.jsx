import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';

import routes from '../routes';

const validationSchema = Yup.object({
  text: Yup.string().trim().required('Это поле обязательно'),
  answer: Yup.string().trim().required('Это поле обязательно'),
  wrongAnswer: Yup.string().trim()
    .required('Это поле обязательно')
    .notOneOf([Yup.ref('answer')], 'Ответы не могут быть одинаковыми'),
  recommendation: Yup.string().trim().required('Это поле обязательно'),
});

const QuestionAddForm = ({ categories, setManagerMenu }) => {
  const formik = useFormik({
    initialValues: {
      text: '',
      answer: '',
      wrongAnswer: '',
      recommendation: '',
      category: categories[0]?.text,
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post(routes.questionsPath(), values);
        console.log(response.status);
        resetForm();
      } catch (err) {
        if (err.response?.status === 400) {
          console.log(err);
        }
      }
    },
  });

  return (
    <div className="container">
      <form className="form" onSubmit={formik.handleSubmit}>
        <h2 className="form__title">Добавить вопрос</h2>
        <div className="form__control">
          <label htmlFor="category" className="form__label">Категория</label>
          <select
            className="form__select"
            name="category"
            id="category"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.category}
          >
            {categories.map((item) => (
              <option key={item.id}>{item.text}</option>)
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
          />
        </div>
        {formik.touched.recommendation && formik.errors.recommendation && (
          <p className="invalid-tooltip">{formik.errors.recommendation}</p>
        )}
        <button className="button form__button" type="submit">Отправить</button>
      </form>
      <button className="button" onClick={() => setManagerMenu('main')}>Вернуться</button>
    </div>
  );
};

export default QuestionAddForm;
