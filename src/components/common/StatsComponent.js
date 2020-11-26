import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FaChalkboardTeacher,
  FaSlideshare,
  FaUserFriends,
  FaBook,
} from 'react-icons/fa';
import { API_STATS } from '../api/request';

const StatsComponent = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const result = await axios.get(API_STATS);
    setStats(result.data);
  };

  const [students, courses, instructors, events] = stats;

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-3'>
          {students && (
            <div className='card-counter primary'>
              <FaUserFriends size={60} opacity={0.4} />
              <span className='count-numbers'>{students.amount}</span>
              <span className='count-name'>{students.title}</span>
            </div>
          )}
        </div>
        <div className='col-md-3'>
          {courses && (
            <div className='card-counter danger'>
              <FaBook size={60} opacity={0.4} />
              <span className='count-numbers'>{courses.amount}</span>
              <span className='count-name'>{courses.title}</span>
            </div>
          )}
        </div>

        <div className='col-md-3'>
          {instructors && (
            <div className='card-counter success'>
              <FaChalkboardTeacher size={60} opacity={0.4} />
              <span className='count-numbers'>{instructors.amount}</span>
              <span className='count-name'>{instructors.title}</span>
            </div>
          )}
        </div>

        <div className='col-md-3'>
          {events && (
            <div className='card-counter info'>
              <FaSlideshare size={60} opacity={0.4} />
              <span className='count-numbers'>{events.amount}</span>
              <span className='count-name'>{events.title}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsComponent;
