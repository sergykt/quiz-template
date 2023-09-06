import { useFormik } from 'formik';
import axios from 'axios';

import routes from '../routes';

const QuestionAddForm = ({ questions, setManagerMenu }) => {
  const formik = useFormik({
    initialValues: {
      text: '',
      option1: '',
      option2: '',
      answer: '',
      recommendation: '',
    },
    onSubmit: async (values) => {
      const response = await axios.post(routes.dataPath(), values);
      console.log(response.data);
    },
  });

  return (
    <div className="container">
      <form className="form" onSubmit={formik.handleSubmit}>
        <h2 className="form__title">Добавить вопрос</h2>
        <div className="form__control">
          <label htmlFor="text" className="form__label">Текст вопроса</label>
          <input
            className="form__input"
            name="text"
            id="text"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.text}
          />
        </div>
        <div className="form__control">
          <label htmlFor="option1" className="form__label">Вариант 1</label>
          <input
            className="form__input"
            name="option1"
            id="option1"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.options1}
          />
        </div>
        <div className="form__control">
          <label htmlFor="option2" className="form__label">Вариант 2</label>
          <input
            className="form__input"
            name="option2"
            id="option2"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.options2}
          />
        </div>
        <div className="form__control">
          <label htmlFor="answer" className="form__label">Правильный ответ</label>
          <input
            className="form__input"
            name="answer"
            id="answer"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.answer}
          />
        </div>
        <div className="form__control">
          <label htmlFor="recommendation" className="form__label">Подсказка</label>
          <input
            className="form__input"
            name="recommendation"
            id="recommendation"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.recommendation}
          />
        </div>
        <button className="button form__button" type="submit">Отправить</button>
      </form>
    </div>
  );
};

export default QuestionAddForm;
