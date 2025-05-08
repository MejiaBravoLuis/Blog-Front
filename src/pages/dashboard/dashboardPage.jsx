import React, { useState } from "react";
import useCourses from "../../shared/hooks/useCourses.jsx";
import usePublications from "../../shared/hooks/usePublications.jsx";
import { Card, Row, Col, Spinner, Accordion, Button } from "react-bootstrap";
import './dashboardPage.css';

export const DashboardPage = () => {
  const { courses, loading, error } = useCourses();
  const { publications, fetchPublicationsByCourse } = usePublications();
  const [activeCourse, setActiveCourse] = useState(null);

  const handleCourseClick = (courseName) => {
    if (activeCourse === courseName) {
      setActiveCourse(null);
    } else {
      setActiveCourse(courseName);
      fetchPublicationsByCourse(courseName);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Spinner animation="border" /> Loading...
      </div>
    );
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="dashboard-page">
      <h1 className="page-title">Dashboard</h1>
      <Row className="g-4 dashboard-cards-container">
        {courses.map((course) => (
          <Col key={course._id} sm={12} md={4} lg={3}>
            <Card className="dashboard-card">
              <Card.Body>
                <Card.Title className="course-title">{course.name}</Card.Title>
                <Card.Text className="course-info">Impartido por: Elmer Santos</Card.Text>
                <Button
                  className="view-button"
                  onClick={() => handleCourseClick(course.name)}
                >
                  {activeCourse === course.name
                    ? "Ocultar publicaciones"
                    : "Ver publicaciones"}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {activeCourse && publications.length > 0 && (
        <div className="publications-container mt-4">
          <h3>Publicaciones del curso: {activeCourse}</h3>
          <Accordion defaultActiveKey="0">
            {publications.map((pub, index) => (
              <Accordion.Item eventKey={index.toString()} key={pub._id}>
                <Accordion.Header>{pub.title}</Accordion.Header>
                <Accordion.Body>{pub.ppalText}</Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
      )}
    </div>
  );
};
