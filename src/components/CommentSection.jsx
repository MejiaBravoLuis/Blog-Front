import { useState } from 'react';
import { addComment } from '../services/api';
import { Button, Form } from 'react-bootstrap';
import './styles/CommentSection.css'

const CommentSection = ({ publicationId, comments }) => {
  const [commentText, setCommentText] = useState('');
  const [userName, setUserName] = useState('');
  const [commentList, setCommentList] = useState(comments);
  const [showForm, setShowForm] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (commentText.trim() === "") {
      return alert("El comentario no puede estar vacío");
    }

    if (userName.trim() === "") {
      return alert("El nombre de usuario es requerido");
    }

    const response = await addComment(publicationId, commentText, userName);

    if (!response.error) {
      setCommentList([...commentList, { comment: commentText, user: userName }]);
      setCommentText('');
      setUserName('');
      setShowForm(false);
    } else {
      alert("Hubo un error al agregar el comentario");
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div>
      <h4>Comentarios</h4>
      <div className="comments-list">
        {commentList.length > 0 ? (
          commentList.map((comment, index) => (
            <div key={index} className="comment-item">
              <strong>{comment.user || 'Anonimo'}:</strong> {comment.comment || 'Sin comentario'}
            </div>
          ))
        ) : (
          <div>No hay comentarios aún.</div> // Mensaje si no hay comentarios
        )}
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

          <Button type="submit" variant="primary">
            Enviar comentario
          </Button>
        </Form>
      )}
    </div>
  );
};

export default CommentSection;
