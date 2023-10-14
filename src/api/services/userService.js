import html2pdf from 'html2pdf.js';
import axios from 'axios';
import { apiPath, axiosInstance } from '../axiosInstance';

const usersPath = () => 'users';
const loginPath = () => [apiPath, 'users', 'login'].join('/');
const logOutPath = () => ['users', 'logout'].join('/');
const resultsPath = () => ['users', 'results'].join('/');
const sendResultsPath = () => ['users', 'sendresults'].join('/');
const verifyPath = () => ['users', 'verify'].join('/');
const sendLinkPath = () => ['users', 'sendlink'].join('/');

class UserService {
  async create(values) {
    const response = await axiosInstance.post(usersPath(), values, { timeout: 10000 });
    return response.data?.id;
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

  async verify(verifyToken) {
    try {
      const response = await axiosInstance.post(verifyPath(), { verifyToken });
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  async sendLink(id) {
    try {
      await axiosInstance.post(sendLinkPath(), { id }, { timeout: 10000 });
    } catch (err) {
      throw err;
    }
  }

  async getResults() {
    return await axiosInstance.get(resultsPath());
  }

  async addResults(points) {
    await axiosInstance.post(resultsPath(), { points });
  }

  async sendResults(htmlBody) {
    const pdfOptions = {
      margin: 10,
      image: { type: 'jpeg', quality: 0.95 },
      html2canvas: { scale: 2, windowWidth: 1440 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    const pdf = await html2pdf()
      .from(htmlBody)
      .set(pdfOptions)
      .output('arraybuffer');

    await axiosInstance.post(sendResultsPath(), pdf, {
      headers: {
        'Content-Type': 'application/octet-stream',
      },
      timeout: 10000,
    });
  }
}

const userService = new UserService();

export default userService;
