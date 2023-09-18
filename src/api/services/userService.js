import { axiosInstance } from '../axiosInstance';
import { refreshPath } from '../axiosInstance';
import axios from 'axios';

const usersPath = () => 'users';
const loginPath = () => ['users', 'login'].join('/');
const logOutPath = () => ['users', 'logout'].join('/');

class UserService {
  async create(values) {
    const response = await axiosInstance.post(usersPath(), values);
    const { accessToken, username } = response.data;
    console.log(accessToken);
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('username', username);
    return response.data;
  }

  async login(values) {
    const response = await axiosInstance.post(loginPath(), values);
    const { accessToken, username } = response.data;
    console.log(accessToken);
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('username', username);
    return response.data;
  }

  async logOut() {
    await axiosInstance.post(logOutPath());
    localStorage.removeItem('accessToken');
    localStorage.removeItem('username');
  }

  async refresh() {
    const response = await axios.get(refreshPath(), { withCredentials: true, timeout: 5000 });
    const { accessToken, username } = response.data;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('username', username);
    return true;
  }
}

const userService = new UserService();

export default userService;
