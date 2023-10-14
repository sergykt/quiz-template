import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useBurger } from "../contexts/BurgerMenuContext";
import { toast } from 'react-toastify';

import Button from "./Button";
import userService from "../api/services/userService";

const Header = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const burger = useBurger();
  const { menuActive, setMenuActive } = burger;
  const [isPending, setPending] = useState(false);

  const toggleMenu = () => (e) => {
    e.stopPropagation();
    setMenuActive(!menuActive);
  };

  const logOutAction = async () => {
    try {
      setPending(true);
      await userService.logOut();
      auth.logOut();
      navigate('/');
      toast.info('Выполнен выход пользователя');
    } catch (err) {
      if (err.response?.status === 500) {
        toast.error('Внутренняя ошибка сервера');
      } else {
        toast.error('Что-то пошло не так, проверьте соединение');
      }
    } finally {
      setPending(false);
    }
  };

  const logInAction = () => {
    setMenuActive(false);
    navigate('/login');
  }

  const headerButton = auth.loggedIn ? <Button onClick={() => logOutAction()} disabled={isPending}>Выйти</Button> : <Button onClick={() => logInAction()}>Войти</Button>;

  return (
    <header className="header">
      <div className="container">
        <div className="header__body">
          <a href="/">
            <img className="logo" src="/img/quiz-logo.png" alt="logo" />
          </a>
          <div className={menuActive ? "header__menu active" : "header__menu"} onClick={(e) => e.stopPropagation()}>
            <nav className="navbar">
              <ul className="navbar__list">
                <li>
                  <a href="/quiz" className="navbar__link">Квиз</a>
                </li>
                <li>
                  <a href="/questions" className="navbar__link">Редактор вопросов</a>
                </li>
              </ul>
            </nav>
            <div className="header__button-group">
              {auth.loggedIn && <a href="/profile"><Button>Профиль</Button></a>}
              {headerButton}
            </div>
          </div>
          <div className={menuActive ? "header__burger active" : "header__burger"} onClick={toggleMenu()}>
            <span />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

