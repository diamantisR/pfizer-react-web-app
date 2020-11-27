import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner, Alert, Col } from 'react-bootstrap';
import { API_COURSES } from '../api/request';
import Courses from '../pages/Courses';
import CourseCard from '../common/CourseCard';
import { BounceLoader } from 'react-spinners';

const GetCourses = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = () => {
      setError(false);
      setIsLoading(true);

      axios
        .get(API_COURSES)
        .then(response => {
          setCourses(response.data);
          setIsLoading(false);
        })
        .catch(error => {
          setError(error);
          setIsLoading(false);
        });
    };

    fetchCourses();
  }, []);

  if (error) {
    return <Alert variant='warning'>{error.message}</Alert>;
  }

  if (isLoading) {
    return (
      <div className='default-spinner'>
        <BounceLoader loading={isLoading} size={60} color='maroon' />
      </div>
    );
  }

  return (
    <Courses>
      {courses.map(course => (
        <Col sm='4'>
          <CourseCard course={course} />
        </Col>
      ))}
    </Courses>
  );
};

export default GetCourses;
