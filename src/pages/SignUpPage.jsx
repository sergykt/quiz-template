import { useFormik } from 'formik';
import { useRef, useEffect } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import routes from '../routes';

import Button from '../components/Button';

const validationSchema = Yup.object({
  username: Yup.string().trim().required('Это поле обязательно').min(4).max(20),
  password: Yup.string().trim().required('Это поле обязательно').min(5).max(20),
  confirmPassword: Yup.string().trim().required('Это поле обязательно').oneOf([Yup.ref('password')], 'Пароли должны совпадать'),
});

const SignUpPage = () => {
  const inputEl = useRef(null);

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await axios.post(routes.usersPath(), values);
        toast.success('Регистрация успешна');
      } catch (err) {
        if (err.response.status === 409) {
          toast.error('Данное имя пользователя уже занято');
        } else if (err.response.status === 500) {
          toast.error('Не удалось зарегистрироваться');
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
            <h2 className="form__title">Регистрация</h2>
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
                value={formik.values.username}
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
              <label htmlFor="confirmPassword" className="form__label">Повторите пароль</label>
            </div>
            <Button type="submit" disabled={formik.isSubmitting}>Отправить</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
