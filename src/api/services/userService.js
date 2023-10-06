import html2pdf from 'html2pdf.js';
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
    const pdfOptions = {
      margin: 10,
      filename: 'result.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    const pdf = await html2pdf()
      .from(htmlBody)
      .set(pdfOptions)
      .outputPdf('blob')
      .then((pdf) => {
        const formData = new FormData();
        formData.append('pdfFile', pdf, 'result.pdf');

        return formData;
      });

    await axiosInstance.post(sendResultsPath(), pdf, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
  }
}

const userService = new UserService();

export default userService;
