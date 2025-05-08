import { useState, useEffect } from "react";
import axios from "axios";

const useCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:3000/LearningBlog/v1/course"); // Ajusta la URL si es necesario
        setCourses(response.data.cateories); // Asigna los cursos al estado
      } catch (err) {
        setError("Error fetching courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return { courses, loading, error };
};

export default useCourses;
