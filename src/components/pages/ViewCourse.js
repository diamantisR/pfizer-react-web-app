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
    instructors: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [instructorDetails, setInstructorDetails] = useState([]);

  const { id } = useParams();
  const { instructors } = course;

  useEffect(() => {
    const fetchCourses = () => {
      setError(false);
      setIsLoading(true);

      axios
        .get(`${API_COURSES}/${id}`)
        .then(response => {
          setCourse(response.data);
          setIsLoading(false);
        })
        .catch(error => {
          setError(error);
          setIsLoading(false);
        });
    };

    fetchCourses();
    fetchInstructorsDetails();
  }, []);

  const fetchInstructorsDetails = () => {
    instructors.forEach(instructor => {
      axios
        .get(`${API_INSTRUCTORS}/${instructor}`)
        .then(response => {
          setInstructorDetails([...instructorDetails, response.data]);
          console.log(instructorDetails);
        })
        .catch(error => {
          console.log(error);
        });
    });
  };

  return (
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
      {instructorDetails.map((instructor, index) => (
        <p key={instructor.id}>{instructor.id}</p>
      ))}
    </div>
  );
};

export default ViewCourse;
