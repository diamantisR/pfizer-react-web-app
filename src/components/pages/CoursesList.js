import React, { Fragment } from 'react';
import { ListGroup } from 'react-bootstrap';
import GetCourses from '../hooks/GetCourses';
import { API_COURSES } from '../api/request';

const CoursesList = () => {
  return (
    <div>
      <GetCourses />
    </div>
  );
};

export default CoursesList;
