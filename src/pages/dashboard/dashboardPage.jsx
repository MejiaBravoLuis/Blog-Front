import React, { useState } from "react";
import useCourses from "../../shared/hooks/useCourses.jsx";
import { Spinner, Row, Col, Form } from "react-bootstrap";
import { CourseCard } from "../../components/CourseCard.jsx";
import "./dashboardPage.css";
import { MdFilterAlt } from "react-icons/md";


export const DashboardPage = () => {
  const { courses, loading, error } = useCourses();
  const [selectedCourse, setSelectedCourse] = useState("");

  if (loading) {
    return (
      <div className="loading-container">
        <Spinner animation="border" /> Cargando cursos...
      </div>
    );
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  const filteredCourses = selectedCourse
    ? courses.filter((course) => course.name === selectedCourse)
    : courses;

  return (
    <div className="dashboard-page">
      <h1 className="page-title">Bienvenido al blog de aprendizaje para área técnica</h1>

      <div className="filter-container mb-4 d-flex align-items-center gap-2">
        <MdFilterAlt size={24} className="filter-icon" />
          <Form.Select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="filter-select"
          >
            <option value="">Mostrar todos los cursos</option>
            {courses.map((course) => (
              <option key={course._id} value={course.name}>
                {course.name}
              </option>
            ))}
          </Form.Select>
      </div>


      <Row className="g-4 dashboard-cards-container">
        {filteredCourses.map((course) => (
          <Col key={course._id} sm={12} md={4} lg={3}>
            <CourseCard course={course} />
          </Col>
        ))}
      </Row>
    </div>
  );
};
