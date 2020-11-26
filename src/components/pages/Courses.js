import React, { Fragment } from 'react';
import { Container, Row } from 'react-bootstrap';
const Courses = ({ children }) => {
  return (
    <Fragment>
      <Container style={{ marginTop: '30px' }}>
        <Row>{children}</Row>
      </Container>
    </Fragment>
  );
};

export default Courses;
