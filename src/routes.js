const apiPath = process.env.NODE_ENV === 'production' ? 'https://quiz-template-server.vercel.app/api' : '/api';

const routes = {
  dataPath: () => [apiPath, 'data'].join('/'),
  quizPath: () => [apiPath, 'quiz'].join('/'),
  questionsPath: (id) => [apiPath, 'questions', id].join('/'),
};

export default routes;
