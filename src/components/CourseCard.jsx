import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import usePublications from "../shared/hooks/usePublications.jsx";
import { Card, Button, ListGroup } from "react-bootstrap";
import './styles/courseCard.css';
import { DiTechcrunch } from "react-icons/di";
import { GrTechnology } from "react-icons/gr";
import { SiKingstontechnology } from "react-icons/si";

export const CourseCard = ({ course }) => {
  const { publications, fetchPublicationsByCourse } = usePublications();
  const [active, setActive] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    if (active) {
      setActive(false);
    } else {
      fetchPublicationsByCourse(course.name);
      setActive(true);
    }
  };

  const handleNavigate = (id) => {
    navigate(`/publications/${id}`);
  };

  return (
    <div className="course-card-wrapper">
      <Card className="dashboard-card">
        <Card.Body>
          <DiTechcrunch size={24} className="filter-icon" />
          <GrTechnology size={24} className="filter-icon" />
          <SiKingstontechnology size={24} className="filter-icon" />
          <Card.Title className="course-title">{course.name}</Card.Title>
          <Card.Text className="course-info">Impartido por: Elmer Santos</Card.Text>
          <Button className="view-button" variant="outline-dark" onClick={handleClick}>
            {active ? "Ocultar publicaciones" : "Ver publicaciones"}
          </Button>
        </Card.Body>
      </Card>

      {active && (
        <div className="publications-container mt-3">
          {publications.length > 0 ? (
            <ListGroup>
              {publications.map(pub => (
                <ListGroup.Item
                  action
                  key={pub._id}
                  onClick={() => handleNavigate(pub._id)}
                >
                  {pub.title}
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p>No hay publicaciones para este curso.</p>
          )}
        </div>
      )}
    </div>
  );
};
