import React from 'react';
import { Row, Col, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Header>{course.title}</Card.Header>
      <Card.Img variant='top' src={course.imagePath} />
      <Card.Body>
        <Card.Title>{course.title}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
      <ListGroup className='list-group-flush'>
        <ListGroupItem>Cras justo odio</ListGroupItem>
        <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
        <ListGroupItem>{}</ListGroupItem>
      </ListGroup>
      <Link to={`/courses/${course.id}`} className='btn btn-info btn-edit'>
        View
      </Link>
      <Card.Body>
        <Card.Link href='#'>Card Link</Card.Link>
        <Card.Link href='#'>Another Link</Card.Link>
      </Card.Body>
    </Card>
  );
};

export default CourseCard;
