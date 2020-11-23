import React, { Fragment } from 'react';
import { Container, ListGroup, Row } from 'react-bootstrap';
import GetCourses from '../hooks/GetCourses';
import { API_COURSES } from '../api/request';

const Courses = ({ children }) => {
  return (
    <Fragment>
      <h1>Courses</h1>
      <Container>
        <Row>
          {children}
        </Row>
      </Container>
    </Fragment>
  );
};

export default Courses;
