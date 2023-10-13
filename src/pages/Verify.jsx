import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import userService from "../api/services/userService";
import { useAuth } from "../contexts/AuthContext";

const VerifyPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      const searchParams = new URLSearchParams(window.location.search);
      const verifyToken = searchParams.get('verifyToken');
      try {
        const response = await userService.verify(verifyToken);
        auth.logIn(response);
        toast.success('Профиль активирован');
      } catch (err) {
        if (err.response?.status === 404) {
          toast.error('Ссылка недействительна');
        } else if (err.response?.status === 500) {
          toast.error('Внутренняя ошибка сервера');
        } else {
          toast.error('Что-то пошло не так, проверьте соединение');
        }
      } finally {
        navigate('/');
      }
    };

    verifyUser();
  }, [navigate, auth]);

  return (
    <div className="verify">
      <div className="container">
      </div>
    </div>
  );
};

export default VerifyPage;