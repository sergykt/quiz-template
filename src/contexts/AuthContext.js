import { createContext, useContext, useState, useEffect } from 'react';
import userService from '../api/services/userService';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const accessToken = localStorage.getItem('accessToken');
  const initialState = !!accessToken;

  const [loggedIn, setLoggedIn] = useState(initialState);

  const logIn = () => {
    setLoggedIn(true);
  };

  const logOut = () => {
    setLoggedIn(false);
  };

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       const accessToken = localStorage.getItem('accessToken');
  //       if (accessToken) {
  //         await userService.refresh();
  //         logIn();
  //       }
  //     } catch (err) {
  //       console.log('Пользователь не авторизован');
  //     }
  //   };

  //   checkAuth();
  // }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};