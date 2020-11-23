import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_COURSES } from '../api/request';

const ViewCourse = () => {
  const [course, setCourse] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    loadCourse();
  }, []);

  const loadCourse = async () => {
    const result = await axios.get(`${API_COURSES}/${id}`);
    setCourse(result.data);
  };

  return (
    <div className='container'>
      <h1>Course {id} Details </h1>
      <h5>{course.title}</h5>
      <h5>Price: {course.price.normal}€</h5>
      {course.description}
    </div>
  );
};

export default ViewCourse;
