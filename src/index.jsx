import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './normalize.css';
import './index.css';
import { AuthProvider } from './contexts/AuthContext';
import { BurgerProvider } from './contexts/BurgerMenuContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <BurgerProvider>
      <App />
    </BurgerProvider>
  </AuthProvider>
);
