import React from "react";
import useCourses from "../../shared/hooks/useCourses.jsx";
import { Spinner, Row, Col } from "react-bootstrap";
import { CourseCard } from "../../components/CourseCard.jsx";
import './dashboardPage.css';

export const DashboardPage = () => {
  const { courses, loading, error } = useCourses();

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
      <h1 className="page-title">Bienvenido al blog de aprendizaje para área técnica</h1>
      <Row className="g-4 dashboard-cards-container">
        {courses.map((course) => (
          <Col key={course._id} sm={12} md={4} lg={3}>
            <CourseCard course={course} />
          </Col>
        ))}
      </Row>
    </div>
  );
};
