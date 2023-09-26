import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header';
import Quiz from "./pages/Quiz";
import QuestionManager from './pages/QuestionManager';
import CategoryManager from './pages/CategoryManager';
import Starter from './pages/Starter';
import PageNotFound from './pages/PageNotFound';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';

import { useBurger } from './contexts/BurgerMenuContext';

const App = () => {
  const burger = useBurger();
  const { setMenuActive } = burger;

  return (
    <div className="wrapper" onClick={() => setMenuActive(false)}>
      <BrowserRouter>
        <Header />
        <main className="main">
          <Routes>
            <Route path="/*" element={<PageNotFound />} />
            <Route path="/" element={<Starter />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/questions" element={<QuestionManager />} />
            <Route path="/categories" element={<CategoryManager />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
};

export default App;
