import axios from 'axios';

const apiPath = process.env.NODE_ENV === 'production' ? 'https://quiz-template-server.vercel.app/api' : '/api';
const refreshPath = () => [apiPath, 'users', 'refresh'].join('/');

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: apiPath,
  timeout: 5000,
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

axiosInstance.interceptors.response.use((config) => {
  return config;
}, async (err) => {
  try {
    const originalRequest = err.config;
    if (err.response.status === 401) {
      const response = await axios.get(refreshPath(), { withCredentials: true, timeout: 5000 });
      const { accessToken, username } = response.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('username', username);
      return axiosInstance.request(originalRequest);
    }
  } catch (err) {
    throw err;
  }

});

export { refreshPath, axiosInstance };
