import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import userService from "../api/services/userService";
import { toast } from "react-toastify";

import Stats from "../components/Stats";
import Button from "../components/Button";

const sendResults = async () => {
  try {
    const htmlBody = document.querySelector('.profile');
    const htmlBodyClone = htmlBody.cloneNode(true);
    const button = htmlBodyClone.querySelector('button');
    button.remove();
    await userService.sendResults(htmlBodyClone);
    toast.success('Результаты отправлены на почту');
  } catch (err) {
    if (err.response?.status === 500) {
      toast.error('Внутренняя ошибка сервера');
    } else {
      console.log(err);
      toast.error('Что-то пошло не так, проверьте соединение');
    }
  }
};

const ProfilePage = () => {
  const [results, setResults] = useState([]);
  const [isCompleted, setCompleted] = useState(false);
  const auth = useAuth();
  const username = auth.username;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('fetch');
        const response = await userService.getResults();
        setResults(response.data);
        setCompleted(true);
      } catch (err) {
        if (err.response?.status === 401) {
          navigate('/');
          toast.error('Доступ запрещен');
        } else if (err.response?.status === 500) {
          toast.error('Внутренняя ошибка сервера');
        } else {
          toast.error('Что-то пошло не так, проверьте соединение');
        }
      }
    }

    fetchData();
  }, [navigate]);

  return (
    <div className="profile">
      {isCompleted &&
        <div className="container">
          <h2 className="title profile__title">Пользователь {username}</h2>
          {!auth.isActive && <p className="profile__warn">Необходимо подтвердить профиль, проверьте почту</p>}
          <div className="profile__stats">
            <h3 className="profile__subtitle">Ваша статистика</h3>
            <Stats results={results} />
            {results.length > 0 && <Button onClick={() => sendResults()}>Отправить на почту</Button>}
          </div>
        </div>
      }
    </div>
  );
};

export default ProfilePage;
