import axios from 'axios';
import { apiPath, axiosInstance } from '../axiosInstance';

const usersPath = () => 'users';
const loginPath = () => [apiPath, 'users', 'login'].join('/');
const logOutPath = () => ['users', 'logout'].join('/');
const resultsPath = () => ['users', 'results'].join('/');
const sendResultsPath = () => ['users', 'sendresults'].join('/');

class UserService {
  async create(values) {
    const response = await axiosInstance.post(usersPath(), values);
    return response.data;
  }

  async login(values) {
    const response = await axios.post(loginPath(), values, { withCredentials: true, timeout: 5000 });
    return response.data;
  }

  async logOut() {
    try {
      await axiosInstance.post(logOutPath());
    } catch (err) {
      if (err.response?.status !== 404) {
        throw err;
      }
    }
  }

  async getResults() {
    return await axiosInstance.get(resultsPath());
  }

  async addResults(points) {
    await axiosInstance.post(resultsPath(), { points });
  }

  async sendResults(htmlBody) {
    console.log(htmlBody);
    await axiosInstance.post(sendResultsPath(), { htmlBody }, { timeout: 10000 });
  }
}

const userService = new UserService();

export default userService;
