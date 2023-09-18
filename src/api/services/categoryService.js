import { axiosInstance } from '../axiosInstance';

const categoriesPath = (id) => ['categories', id].join('/');

class CategoryService {
  async get() {
    const response = await axiosInstance.get(categoriesPath());
    return response.data;
  }

  async create(values) {
    await axiosInstance.post(categoriesPath(), values);
  }

  async update(id, values) {
    await axiosInstance.put(categoriesPath(id), values);
  }

  async delete(id) {
    await axiosInstance.delete(categoriesPath(id));
  }
}

const categoryService = new CategoryService();

export default categoryService;
