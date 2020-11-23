import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { TiTick, TiTimes } from 'react-icons/ti';
import WelcomeMessage from '../common/WelcomeMessage';
import { API_COURSES } from '../api/request';
import { Table } from 'react-bootstrap';

const Home = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const result = await axios.get(API_COURSES);
    setCourses(result.data);
  };

  const deleteCourse = async id => {
    await axios.delete(`${API_COURSES}/${id}`);
    fetchCourses();
  };

  return (
    <div className='container'>
      <WelcomeMessage />
      <div className='py-4'>
        <Table bordered>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Title</th>
              <th scope='col'>Bookable</th>
              <th scope='col'>Price</th>
              <th scope='col'>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr>
                <th scope='row'>{course.id}</th>
                <td>{course.title}</td>
                <td>
                  {course.open ? (
                    <TiTick size={22} style={{ fill: 'green' }} />
                  ) : (
                    <TiTimes size={22} style={{ fill: 'red' }} />
                  )}
                </td>
                <td>{course.price.normal}</td>
                <td>
                  {course.dates.start_date} - {course.dates.end_date}
                </td>
                <td>
                  <Link
                    className='btn btn-outline-info mr-2'
                    to={`/courses/${course.id}`}
                  >
                    View Details
                  </Link>
                  <Link
                    className='btn btn-outline-danger mr-2'
                    onClick={() => deleteCourse(course.id)}
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Home;
