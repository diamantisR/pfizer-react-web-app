import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import {
  FaChalkboardTeacher,
  FaSlideshare,
  FaUserFriends,
  FaBook,
} from 'react-icons/fa';

const WelcomeMessage = () => {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-3'>
          <div className='card-counter primary'>
            <FaUserFriends size={60} opacity={0.4} />
            <span className='count-numbers'>12</span>
            <span className='count-name'>students</span>
          </div>
        </div>
        <div className='col-md-3'>
          <div className='card-counter danger'>
            <FaBook size={60} opacity={0.4} />
            <span className='count-numbers'>599</span>
            <span className='count-name'>courses</span>
          </div>
        </div>

        <div className='col-md-3'>
          <div className='card-counter success'>
            <FaChalkboardTeacher size={60} opacity={0.4} />
            <span className='count-numbers'>6875</span>
            <span className='count-name'>instructors</span>
          </div>
        </div>

        <div className='col-md-3'>
          <div className='card-counter info'>
            <FaSlideshare size={60} opacity={0.4} />
            <span className='count-numbers'>35</span>
            <span className='count-name'>events</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;
