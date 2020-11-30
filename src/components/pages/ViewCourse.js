import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { PulseLoader } from 'react-spinners';
import { API_COURSES, API_INSTRUCTORS, API_STATS } from '../api/request';
import { Alert, Spinner, Container, Row, Col, Card } from 'react-bootstrap';
import { TiTick, TiTimes } from 'react-icons/ti';

const ViewCourse = () => {
  let history = useHistory();
  let queryString = '?';
  const [total, setTotal] = useState({
    id: '',
    title: '',
    amount: 0,
  });

  const [course, setCourse] = useState({
    title: '',
    description: '',
    imagePath: '',
    open: false,
    price: {
      normal: 0,
      early_bird: 0,
    },
    dates: {
      start_date: '',
      end_date: '',
    },
    duration: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [instructorDetails, setInstructorDetails] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const fetchCourses = () => {
      setError(false);
      setIsLoading(true);

      axios
        .get(`${API_COURSES}/${id}`)
        .then(response => {
          setCourse(response.data);

          setTimeout(_ => {
            setIsLoading(false);
          }, 800);

          const { instructors } = response.data;
          instructors.forEach(id => {
            queryString += `id=${id}&`;
          });

          fetchInstructorsDetails(queryString.slice(0, -1));
        })
        .catch(error => {
          setError(error);
          setIsLoading(false);
        });
    };

    fetchCourses();
    loadStats();
  }, []);

  const loadStats = async () => {
    const res = await axios.get(`${API_STATS}/02`);
    setTotal(res.data);
  };

  const deleteCourse = async id => {
    await axios.delete(`${API_COURSES}/${id}`);
    await axios.put(`${API_STATS}/02`, {
      id: total.id,
      title: total.title,
      amount: total.amount - 1,
    });
    history.push('/');
  };

  const fetchInstructorsDetails = query => {
    if (query) {
      axios
        .get(`${API_INSTRUCTORS}/${query}`)
        .then(response => {
          setInstructorDetails(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  if (error) {
    return <Alert variant='warning'>{error.message}</Alert>;
  }

  if (isLoading) {
    return (
      <div className='default-spinner' style={{ marginTop: '60px' }}>
        <PulseLoader loading={isLoading} size={20} color='#007bff' />
        <h5>Loading course..</h5>
      </div>
    );
  }

  return (
    <Container>
      <Row>
        <Col xs={6} md={8}>
          <h3>{course.title}</h3>
          <img
            style={{ width: '92%' }}
            src={course.imagePath}
            alt={course.title}
          />
          <Row>
            <Col md={6}>
              {' '}
              <h5 style={{ fontSize: '1.05rem', fontWeight: 700 }}>
                Price: {course.price.normal}€
              </h5>
              <h6>
                Bookable:
                {course.open ? (
                  <TiTick size={23} style={{ fill: 'green' }} />
                ) : (
                  <TiTimes size={23} style={{ fill: 'red' }} />
                )}
              </h6>
            </Col>
            <Col md={6}>
              <h5 style={{ fontSize: '1.05rem', fontWeight: 700 }}>
                Duration {course.duration}
              </h5>
              <h6>
                Dates:{' '}
                {`${course.dates.start_date.replaceAll(
                  '-',
                  '/'
                )} - ${course.dates.end_date.replaceAll('-', '/')}`}
              </h6>
            </Col>
          </Row>

          <div dangerouslySetInnerHTML={{ __html: course.description }}></div>
        </Col>
        <Col xs={6} md={4} style={{ marginTop: '40px' }}>
          <p>
            {
              <Link
                to={`/courses/edit/${course.id}`}
                className='btn btn-outline-success btn-edit'
              >
                Edit
              </Link>
            }
            {
              <Link
                style={{ marginLeft: '10px' }}
                onClick={() => deleteCourse(course.id)}
                // to={`/courses/edit/${course.id}`}
                className='btn btn-danger'
              >
                Delete
              </Link>
            }
            <hr />
          </p>
          <h4>Instructors</h4>
          {instructorDetails.map(instructor => (
            <Card
              border='secondary'
              style={{ width: '24rem', marginBottom: '10px' }}
            >
              <Card.Body style={{ padding: '0.6rem' }}>
                <Card.Title>{`${instructor.name.first} ${instructor.name.last} (${instructor.dob})`}</Card.Title>
                <Card.Subtitle>Email: {instructor.email}</Card.Subtitle>
                <Card.Text style={{ marginTop: '10px' }}>
                  {instructor.bio}
                </Card.Text>
                <a href='#' target='_blank'>
                  Linkedin
                </a>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default ViewCourse;
