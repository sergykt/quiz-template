import { useEffect } from "react";
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';
import Button from "../components/Button";

const Starter = () => {
  const auth = useAuth();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const activationStatus = searchParams.get('activation');

    if (activationStatus === 'success') {
      const result = auth.activate();
      if (result) {
        toast.success('Ваш аккаунт успешно активирован');
      }
    }
  }, [auth]);

  return (
    <div className="starter">
      <div className="container">
        <h1 className="starter__title title">Добро пожаловать на онлайн квиз!</h1>
        <p className="starter__text">Вы готовы проверить свои знания в области HTML, CSS, JavaScript и других важных темах веб-разработки?
          Этот квиз предоставит вам возможность испытать себя и узнать, насколько хорошо вы ориентируетесь в этой области.</p>
        <p className="starter__text">Правила просты:</p>
        <ul className="starter__list">
          <li>Викторина состоит из 20 вопросов с двумя вариантами ответов: "Да" или "Нет".</li>
          <li>Ваша задача - выбирать правильный ответ на каждый вопрос.</li>
          <li>После того, как вы ответите на все вопросы, вы узнаете свой результат и получите рекомендацию о вашем уровне знаний.</li>
          <li>Не стесняйтесь приступить к тесту и попробовать свои силы. Удачи!</li>
        </ul>
        <a href="/quiz"><Button>Начать квиз</Button></a>
      </div>
    </div>
  )
};

export default Starter;
