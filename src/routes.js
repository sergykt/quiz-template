const apiPath = process.env.NODE_ENV === 'production' ? 'https://quiz-template-server.vercel.app/api' : '/api';

const routes = {
  questionsPath: (id) => [apiPath, 'questions', id].join('/'),
  quizPath: () => [apiPath, 'questions', 'quiz'].join('/'),
  categoriesPath: (id) => [apiPath, 'categories', id].join('/'),
  usersPath: (id) => [apiPath, 'users', id].join('/'),
  loginPath: () => [apiPath, 'users', 'login'].join('/'),
};

export default routes;
