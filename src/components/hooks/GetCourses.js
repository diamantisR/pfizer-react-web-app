import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Spinner, Alert, Col } from 'react-bootstrap';
import { API_COURSES } from '../api/request';
import Courses from '../pages/Courses';
import CourseCard from '../common/CourseCard';
import { PulseLoader } from 'react-spinners';
import SearchBar from '../common/SearchBar';

const GetCourses = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchCourses, setSearchCourses] = useState([]);

  const searchCourse = ({ title, description }, searchText) =>
    title.toLowerCase().search(searchText.toLowerCase()) !== -1 ||
    description.toLowerCase().search(searchText.toLowerCase()) !== -1;

  useEffect(() => {
    const fetchCourses = () => {
      setError(false);
      setIsLoading(true);

      axios
        .get(API_COURSES)
        .then(response => {
          setCourses(response.data);
          setSearchCourses(response.data);
          setTimeout(_ => {
            setIsLoading(false);
          }, 800);
        })
        .catch(error => {
          setError(error);
          setIsLoading(false);
        });
    };

    fetchCourses();
  }, []);

  const handleSearch = e => {
    const searchText = e.target.value;
    setSearchCourses(
      courses.filter(course => searchCourse(course, searchText))
    );
  };

  if (error) {
    return <Alert variant='warning'>{error.message}</Alert>;
  }

  if (isLoading) {
    return (
      <div className='default-spinner' style={{ marginTop: '60px' }}>
        <PulseLoader loading={isLoading} size={20} color='#007bff' />
        <h5>Loading courses..</h5>
      </div>
    );
  }

  return (
    <Fragment>
      <SearchBar onSearch={handleSearch} />
      {searchCourses.length > 0 ? (
        <Courses>
          {searchCourses.map(course => (
            <Col sm='4'>
              <CourseCard course={course} />
            </Col>
          ))}
        </Courses>
      ) : (
        <div className='container'>
          <h5>No course found..</h5>
        </div>
      )}
    </Fragment>
  );
};

export default GetCourses;
