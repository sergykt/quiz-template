import { useFormik } from 'formik';
import { useRef, useEffect } from 'react';
import axios from 'axios';
import * as Yup from 'yup';

import routes from '../routes';

import Button from '../components/Button';

const validationSchema = Yup.object({
  login: Yup.string().trim().required('Это поле обязательно'),
  password: Yup.string().trim().required('Это поле обязательно'),
  confirmPassword: Yup.string().trim().required('Это поле обязательно'),
});

const SignUpPage = () => {
  const inputEl = useRef(null);

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
    },
  });

  return (
    <div className="login">
      <div className="container">
        <div className="login__body">
          <form className="form login__form" onSubmit={formik.handleSubmit}>
            <h2 className="form__title">Регистрация</h2>
            <div className="form__control form__control_floating">
              <input
                ref={inputEl}
                className="form__input"
                name="name"
                id="name"
                type="text"
                placeholder="Логин"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                disabled={formik.isSubmitting}
              />
              <label htmlFor="name" className="form__label">Логин</label>
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
            <div className="form__control form__control_floating">
              <input
                className="form__input"
                name="confirmPassword"
                id="confirmPassword"
                type="password"
                placeholder="Пароль"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                disabled={formik.isSubmitting}
              />
              <label htmlFor="password" className="form__label">Повторите пароль</label>
            </div>
            <Button type="submit" disabled={formik.isSubmitting}>Отправить</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
