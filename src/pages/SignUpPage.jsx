import { useRef, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { useAuth } from '../contexts/AuthContext';
import Button from '../components/Button';
import userService from '../api/services/userService';

const validationSchema = Yup.object({
  username: Yup.string().trim().required('Это поле обязательно').min(4, 'От 4 до 20 символов').max(20),
  email: Yup.string().trim().required('Это поле обязательно').email('Невалидный email'),
  password: Yup.string().trim().required('Это поле обязательно').min(5, 'От 5 до 20 символов').max(20),
  confirmPassword: Yup.string().trim().required('Это поле обязательно').oneOf([Yup.ref('password')], 'Пароли должны совпадать'),
});

const SignUpPage = () => {
  const auth = useAuth();
  const inputEl = useRef(null);
  const [isCompleted, setCompleted] = useState(false);

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await userService.create(values);
        auth.logIn(response);
        setCompleted(true);
        toast.success('Регистрация успешна');
      } catch (err) {
        if (err.response?.status === 409) {
          toast.error('Имя пользователя или E-mail уже заняты');
        } else if (err.response?.status === 500) {
          toast.error('Внутренняя ошибка сервера');
        } else if (err.response?.status === 400) {
          toast.error('Невалидные данные');
        } else {
          toast.error('Что-то пошло не так, проверьте соединение');
        }
        setSubmitting(false);
      }
    },
  });

  if (isCompleted) {
    return (
      <div className="login">
        <div className="container">
          <div className="login__success">
            <h2 className="login__success-title">Регистрация успешно завершена!</h2>
            <p className="login__success-subtile">
              Мы отправили вам электронное письмо с инструкциями по активации аккаунта.
            </p>
            <p className="login__success-subtile">
              Пожалуйста, проверьте свою почту и следуйте указанным в письме инструкциям.
              Если письмо не пришло, проверьте папку "Спам".
            </p>
          </div>
        </div>
      </div>
    );
  }

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
                required
              />
              <label htmlFor="username" className="form__label">Логин</label>
            </div>
            {formik.touched.username && formik.errors.username && (
              <p className="invalid-tooltip">{formik.errors.username}</p>
            )}

            <div className="form__control form__control_floating">
              <input
                ref={inputEl}
                className="form__input"
                name="email"
                id="email"
                type="email"
                placeholder="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                disabled={formik.isSubmitting}
                required
              />
              <label htmlFor="email" className="form__label">E-mail</label>
            </div>
            {formik.touched.email && formik.errors.email && (
              <p className="invalid-tooltip">{formik.errors.email}</p>
            )}

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
            {formik.touched.password && formik.errors.password && (
              <p className="invalid-tooltip">{formik.errors.password}</p>
            )}
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
                required
              />
              <label htmlFor="confirmPassword" className="form__label">Повторите пароль</label>
            </div>
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <p className="invalid-tooltip">{formik.errors.confirmPassword}</p>
            )}
            <Button type="submit" disabled={formik.isSubmitting}>Отправить</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
