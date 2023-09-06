import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';

import Header from './components/Header';
import Quiz from "./pages/Quiz";
import QuestionManager from './pages/QuestionManager';
import Starter from './pages/Starter';

const App = () => (
  <BrowserRouter>
    <Header />
    <main className="main">
      <Routes>
        <Route path="/" element={<Starter />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/edit" element={<QuestionManager />} />
      </Routes>
    </main>
  </BrowserRouter>

);

export default App;
