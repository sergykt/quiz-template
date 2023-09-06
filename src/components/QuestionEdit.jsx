import { useFormik } from 'formik';
import axios from 'axios';

import routes from '../routes';

const QuestionEditForm = () => {
  const formik = useFormik({
    initialValues: {
      text: '',
      option1: '',
      option2: '',
      answer: '',
      recommendation: '',
    },
    onSubmit: async (values) => {
      console.log(values);
      const response = await axios.post(routes.dataPath(), values);
      console.log(response);
    },
  });

  return (
    <form className="form" onSubmit={formik.handleSubmit}>
      <p className="form__title">Добавить вопрос</p>
      <label htmlFor="text">Текст вопроса</label>
      <input
        name="text"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.text}
      />
      <label htmlFor="option1">Вариант 1</label>
      <input
        name="option1"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.options1}
      />
      <label htmlFor="option2">Вариант 2</label>
      <input
        name="option2"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.options2}
      />
      <label htmlFor="answer">Правильный ответ</label>
      <input
        name="answer"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.answer}
      />
      <label htmlFor="recommendation">Подсказка</label>
      <input
        name="recommendation"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.recommendation}
      />
      <button type="submit">Отправить</button>
    </form>
  );
};

export default QuestionEditForm;
