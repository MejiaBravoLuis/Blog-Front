import { useState } from "react";
import axios from "axios";

const useComments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendComment = async (publicationId, commentText, username) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(
        `http://127.0.0.1:3000/LearningBlog/v1/comments/${publicationId}`,
        {
          comment: commentText,
          user: username || "Guest",
        }
      );
      return res.data.comment;
    } catch (err) {
      setError(err.response?.data?.message || "Error al enviar el comentario");
    } finally {
      setLoading(false);
    }
  };

  return {
    sendComment,
    loading,
    error,
  };
};

  export const deleteComment = async (commentId) => {
    try {
      const res = await axios.delete(`http://127.0.0.1:3000/LearningBlog/v1/comments/delete/${commentId}`);
      return res.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error al eliminar el comentario");
    }
};




export default useComments;
