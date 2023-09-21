import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from 'react-toastify';

import Button from "./Button";
import userService from "../api/services/userService";

const Header = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const logOut = async () => {
    try {
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
    }
  };

  const headerButton = auth.loggedIn ? <Button onClick={() => logOut()}>Выйти</Button> : <Button onClick={() => navigate('/login')}>Войти</Button>;

  return (
    <header className="header">
      <div className="container">
        <nav className="navbar">
          <ul className="navbar__list">
            <li>
              <a href="/" className="navbar__link">
                <img className="logo" src="/img/quiz-logo.png" alt="logo" />
              </a>
            </li>
            <li>
              <a href="/quiz" className="navbar__link">Квиз</a>
            </li>
            <li>
              <a href="/questions" className="navbar__link">Редактор вопросов</a>
            </li>
          </ul>
          <div className="navbar__button-group">
            {auth.loggedIn && <a href="/profile"><Button>Профиль</Button></a>}
            {headerButton}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;

