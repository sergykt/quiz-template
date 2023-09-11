const apiPath = process.env.NODE_ENV === 'production' ? process.env.API_PATH : '/api';

const routes = {
  dataPath: () => [apiPath, 'data'].join('/'),
  quizPath: () => [apiPath, 'quiz'].join('/'),
  questionsPath: (id) => [apiPath, 'questions', id].join('/'),
  categoriesPath: (id) => [apiPath, 'categories', id].join('/'),
};

export default routes;
