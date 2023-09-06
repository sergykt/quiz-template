import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';

import Quiz from "./pages/Quiz";
import QuestionManager from './pages/QuestionManager';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Quiz />} />
      <Route path="/manager" element={<QuestionManager/>} />
    </Routes>
  </BrowserRouter>
);

export default App;
