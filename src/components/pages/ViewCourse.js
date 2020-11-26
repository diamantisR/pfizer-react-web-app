import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_COURSES, API_INSTRUCTORS } from '../api/request';
import { Alert, Spinner } from 'react-bootstrap';
import { TiTick, TiTimes } from 'react-icons/ti';

const ViewCourse = () => {
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
          setIsLoading(false);
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
  }, []);

  const fetchInstructorsDetails = query => {
    axios
      .get(`${API_INSTRUCTORS}/${query}`)
      .then(response => {
        setInstructorDetails(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    course && (
      <div className='container'>
        <h3>{course.title}</h3>
        <img src={course.imagePath} alt={course.title} className='img-fluid' />
        <h5>Price: {course.price.normal}€</h5>
        <h5>
          Bookable:
          {course.open ? (
            <TiTick size={23} style={{ fill: 'green' }} />
          ) : (
            <TiTimes size={23} style={{ fill: 'red' }} />
          )}
        </h5>
        <div dangerouslySetInnerHTML={{ __html: course.description }}></div>
        <p>
          {
            <Link
              to={`/courses/edit/${course.id}`}
              className='btn btn-success btn-edit'
            >
              Edit
            </Link>
          }
        </p>
        <h4>Instructors</h4>
        {instructorDetails.map(instructor => (
          <div>
            <p>{instructor.gender}</p>
          </div>
        ))}
        {instructorDetails && <h5>{instructorDetails.gender}</h5>}
      </div>
    )
  );
};

export default ViewCourse;
