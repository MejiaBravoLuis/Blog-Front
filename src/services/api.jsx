import axios from "axios"

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:3000/LearningBlog/v1/',
    timeout: 5000
})

apiClient.interceptors.request.use(config => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const { token } = JSON.parse(stored);
      if (token) {
        config.headers['x-token'] = token;
      }
    }
    return config;
});

export const getPublications = async (data) => {
  try {
      return await apiClient.get('/publications')
  } catch (e) {
      return{
        error: true,
        e
      }
  }
}

export default apiClient
