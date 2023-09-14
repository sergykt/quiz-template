import { useFormik } from 'formik';
import { useRef, useEffect } from 'react';
import axios from 'axios';
import * as Yup from 'yup';

import routes from '../routes';

import Button from '../components/Button';

const validationSchema = Yup.object({
  username: Yup.string().trim().required('Это поле обязательно'),
  password: Yup.string().trim().required('Это поле обязательно'),
});

const LoginPage = () => {
  const inputEl = useRef(null);

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await axios.post(routes.loginPath(), values);
        console.log(response.status);
      } catch (err) {
        console.log(err);
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="login">
      <div className="container">
        <div className="login__body">
          <form className="form login__form" onSubmit={formik.handleSubmit}>
            <h2 className="form__title">Авторизация</h2>
            <div className="form__control form__control_floating">
              <input
                ref={inputEl}
                className="form__input"
                name="username"
                id="username"
                type="text"
                placeholder="Логин"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                disabled={formik.isSubmitting}
              />
              <label htmlFor="username" className="form__label">Логин</label>
            </div>
            <div className="form__control form__control_floating">
              <input
                className="form__input"
                name="password"
                id="password"
                type="password"
                placeholder="Пароль"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                disabled={formik.isSubmitting}
              />
              <label htmlFor="password" className="form__label">Пароль</label>
            </div>
            <Button type="submit" disabled={formik.isSubmitting}>Войти</Button>
          </form>
          <p className="login__signup">
            Нет аккаута? <a href="/signup">Регистрация</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
