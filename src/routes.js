const apiPath = process.env.NODE_ENV === 'production' ? 'https://quiz-template-server.vercel.app/api' : '/api';

const routes = {
  questionsPath: (id) => [apiPath, 'questions', id].join('/'),
  quizPath: () => [apiPath, 'questions', 'quiz'].join('/'),
  categoriesPath: (id) => [apiPath, 'categories', id].join('/'),
};

export default routes;
