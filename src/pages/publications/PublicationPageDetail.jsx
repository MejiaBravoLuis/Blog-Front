import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { getPublicationById } from '../../services/api';
import { Card, Spinner, Alert, Container, Button } from 'react-bootstrap';
import { AiOutlineRollback } from 'react-icons/ai';
import CommentSection from '../../components/CommentSection';
import './PublicationPageDetails.css'; 

export const PublicationDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [publication, setPublication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPublication = async () => {
      const result = await getPublicationById(id);
      if (result.error) {
        setError(result.message);
      } else {
        setPublication(result.publication);
      }
      setLoading(false);
    };

    fetchPublication();
  }, [id]);

  const handleGoBack = () => {
    navigate('/dashboard'); 
  };

  if (loading) return <Spinner animation="border" variant="primary" className="m-4" />;
  if (error) return <Alert variant="danger" className="m-4">{error}</Alert>;
  if (!publication) return <Alert variant="warning" className="m-4">Publicación no encontrada.</Alert>;

  return (
    <div className="publications">
    <Container className=" my-4">
      <Card>
        <Card.Body>
        <Button variant="link" onClick={handleGoBack}>
            <AiOutlineRollback /> Regresar al Dashboard
          </Button>
          <Card.Title>{publication.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            <strong>Publicado por:</strong> {publication.user?.username || 'Desconocido'} | 
            <strong>Curso:</strong> {publication.course?.name || 'Curso no especificado'}<br />
            <strong>Fecha:</strong> {new Date(publication.createdAt).toLocaleString()}
          </Card.Subtitle>
          <Card.Text>{publication.ppalText}</Card.Text>
          <hr />
          <CommentSection
            publicationId={publication._id}
            comments={publication.comments}
          />
        </Card.Body>
      </Card>
    </Container>

    </div>
  );
};
