import React from 'react';
import { TiTick, TiTimes } from 'react-icons/ti';
import { Row, Col, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  return (
    <Col xs={8}>
      <Card style={{ width: '22rem', marginBottom: '15px' }} key={course.id}>
        <Card.Header style={{ fontSize: '1.2rem' }}>{course.title}</Card.Header>
        <Card.Img variant='top' src={course.imagePath} />
        <Card.Body>
          <Card.Text>
            Price: {course.price.normal}€ - Bookable{' '}
            {course.open ? (
              <TiTick size={22} style={{ fill: 'green' }} />
            ) : (
              <TiTimes size={22} style={{ fill: 'red' }} />
            )}
          </Card.Text>
          <Card.Text>
            Duration:{' '}
            <span style={{ fontWeight: 'bold' }}>{course.duration}</span>
          </Card.Text>
          <Card.Text>
            Dates:{' '}
            <span style={{ fontWeight: 'bold' }}>
              {course.dates.start_date.replaceAll('-', '/')} -{' '}
              {course.dates.start_date.replaceAll('-', '/')}
            </span>
          </Card.Text>
          <Link
            to={`/courses/${course.id}`}
            className='btn btn-outline-info btn-edit'
            style={{ float: 'right' }}
          >
            View
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CourseCard;
