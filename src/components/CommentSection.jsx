import { useState } from 'react';
import { addComment, deleteComment, updateComment } from '../services/api'; 
import { FaRegTrashAlt, FaEdit } from 'react-icons/fa'; 
import { Button, Form, Modal } from 'react-bootstrap';
import './styles/CommentSection.css';

const CommentSection = ({ publicationId, comments }) => {
  const [commentText, setCommentText] = useState('');
  const [userName, setUserName] = useState('');
  const [commentList, setCommentList] = useState(comments);
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false); 
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [commentToEdit, setCommentToEdit] = useState(null); 

const handleSubmit = async (e) => {
  e.preventDefault();

  if (commentText.trim() === "") {
    return alert("El comentario no puede estar vacío");
  }

  if (userName.trim() === "") {
    return alert("El nombre de usuario es requerido");
  }

  try {
    if (commentToEdit) {
      const response = await updateComment(commentToEdit, commentText, userName);

      if (response && !response.error) {
        const updatedComments = commentList.map(comment => 
          comment._id === commentToEdit ? { ...comment, comment: commentText, user: userName } : comment
        );
        setCommentList(updatedComments);

        setShowForm(false);
        setCommentToEdit(null);
        setCommentText('');
        setUserName('');
      } else {
        alert("Hubo un error al editar el comentario");
      }
    } else {
      const response = await addComment(publicationId, commentText, userName);

      if (response && !response.error) {
        const newComment = {
          _id: response.data._id,
          comment: commentText,
          user: userName,
          createdAt: new Date().toISOString(),
        };
        setCommentList([newComment, ...commentList]);
        setUserName('');
        setShowForm(false);
      } else {
        alert("Hubo un error al agregar el comentario");
      }
    }
  } catch (err) {
    console.error("Error al enviar la solicitud:", err);
    alert(err.message || "Error desconocido");
  }
};


  const toggleForm = () => {
    setShowForm(!showForm);
    setCommentToEdit(null); 
  };

  const handleOpenModal = (commentId) => {
    setCommentToDelete(commentId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCommentToDelete(null);
  };

  const handleDelete = async () => {
    const response = await deleteComment(commentToDelete);
    if (response.success) {
      setCommentList(commentList.filter((comment) => comment._id !== commentToDelete));
      setShowModal(false); 
    } else {
      alert("Hubo un error al eliminar el comentario");
    }
    setCommentToDelete(null); 
  };

  const handleEdit = (comment) => {
    setCommentToEdit(comment._id);
    setCommentText(comment.comment);
    setUserName(comment.user);
    setShowForm(true); 
  };

  return (
    <div>
      <h4>Comentarios</h4>
      <div className="comments-list">
        {[...commentList].reverse().map((comment, index) => (
          <div key={index} className="comment-item">
            <strong>{comment.user || 'Anónimo'}:</strong> {comment.comment || 'Sin comentario'}
            {comment.createdAt && (
              <div className="comment-date">
                <small>{new Date(comment.createdAt).toLocaleString()}</small>
              </div>
            )}

            <FaRegTrashAlt
              style={{ cursor: 'pointer', color: 'ligth', marginLeft: '10px' }}
              onClick={() => handleOpenModal(comment._id)}
            />

            <FaEdit
              style={{ cursor: 'pointer', color: 'ligth', marginLeft: '10px' }}
              onClick={() => handleEdit(comment)} 
            />
          </div>
        ))}
        {commentList.length === 0 && <div>No hay comentarios aún.</div>}
      </div>

      <Button variant="link" onClick={toggleForm}>
        {showForm ? "Cancelar" : "Comentar"}
      </Button>

      {showForm && (
        <Form onSubmit={handleSubmit} className="mt-3">
          <Form.Group controlId="userName">
            <Form.Label>Tu nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa tu nombre"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="commentText">
            <Form.Label>Comentario</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Escribe tu comentario"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" variant="light">
            {commentToEdit ? "Actualizar comentario" : "Enviar comentario"}
          </Button>
        </Form>
      )}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Estás seguro de que deseas eliminar este comentario?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button className="btn-delete" onClick={handleDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CommentSection;
