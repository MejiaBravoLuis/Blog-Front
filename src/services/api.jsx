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

export const addComment = async (publicationId, comment, user) => {
  try {
    const response = await apiClient.post(`/comment/${publicationId}`, {
      comment,
      user
    });
    return response.data;
  } catch (e) {
    return {
      error: true,
      e
    }
  }
}

export const deleteComment = async (commentId, publicationId) => {
  try {
    const response = await apiClient.delete(`/comment/${commentId}`, {
      data: { publicationId }
    });
    return response.data;
  } catch (e) {
    return {
      error: true,
      e
    }
  }
}

export const updateComment = async (commentId, commentText, userName) => {
  try {
    const response = await apiClient.put(`/comment/${commentId}`, {
      comment: commentText, 
      user: userName,
    });
    return response.data; 
  } catch (e) {
    console.error("Error al actualizar el comentario:", e);
    return {
      error: true,
      message: e.message,
    };
  }
};

export const getPublicationById = async (id) => {
  try {
    const response = await apiClient.get(`/publications/${id}`);
    return response.data; // { publication: { ... } }
  } catch (e) {
    return {
      error: true,
      message: e.message,
    };
  }
};


export default apiClient
