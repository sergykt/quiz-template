import { axiosInstance } from '../axiosInstance';

const questionsPath = (id) => ['questions', id].join('/');
const quizPath = () => ['questions', 'quiz'].join('/');

class QuestionService {
  async get() {
    const response = await axiosInstance.get(questionsPath());
    return response.data;
  }

  async create(values) {
    await axiosInstance.post(questionsPath(), values);
  }

  async update(id, values) {
    await axiosInstance.put(questionsPath(id), values);
  }

  async delete(id) {
    await axiosInstance.delete(questionsPath(id));
  }

  async getQuiz() {
    const response = await axiosInstance.get(quizPath());
    return response.data;
  }
}

const questionService = new QuestionService();

export default questionService;
