
import { useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { useAuth } from '../contexts/AuthContext';
import Button from '../components/Button';
import userService from '../api/services/userService';

const validationSchema = Yup.object({
  username: Yup.string().trim().required('Это поле обязательно'),
  password: Yup.string().trim().required('Это поле обязательно'),
});

const LoginPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();
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
        const response = await userService.login(values);
        auth.logIn(response);
        navigate('/');
        toast.success('Авторизация успешна');
      } catch (err) {
        if (err.response?.status === 401) {
          toast.error('Неверные имя пользователя или пароль');
        } else if (err.response?.status === 500) {
          toast.error('Внутренняя ошибка сервера');
        } else {
          toast.error('Что-то пошло не так, проверьте соединение');
        }
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
                required
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
                required
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
