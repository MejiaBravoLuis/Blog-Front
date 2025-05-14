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

  const deleteComment = async (commentId) => {
    try {
      const res = await axios.delete(`http://127.0.0.1:3000/LearningBlog/v1/comments/delete/${commentId}`);
      return res.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error al eliminar el comentario");
    }
  };

  const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment, user } = req.body;

    const commentToUpdate = await Comment.findById(id);
    if (!commentToUpdate) {
      return res.status(404).json({
        success: false,
        message: "Comentario no encontrado",
      });
    }

    commentToUpdate.comment = comment || commentToUpdate.comment;
    commentToUpdate.user = user || commentToUpdate.user;

    await commentToUpdate.save(); 

    res.json({
      success: true,
      message: "Comentario actualizado con éxito",
      comment: commentToUpdate,  
    });
  } catch (error) {
    console.error("Error en backend:", error);
    res.status(500).json({
      success: false,
      message: "Hubo un problema al actualizar el comentario",
      error: error.message,
    });
  }
};

  return {
    sendComment,
    deleteComment,
    updateComment,
    loading,
    error,
  };
};

export default useComments;
