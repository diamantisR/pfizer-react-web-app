import React from 'react';
import { TiTick, TiTimes } from 'react-icons/ti';
import { Row, Col, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  return (
    <>
      <Card
        style={{ width: '21rem', marginBottom: '10px' }}
        key={course }
      >
        <Card.Header style={{ fontSize: '1.3rem' }}>{course.title}</Card.Header>
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
          <Card.Text>Duration: {course.duration}</Card.Text>
          <Card.Text>
            Dates: {course.dates.start_date} - {course.dates.start_date}
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
    </>
  );
};

export default CourseCard;
