import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <Link className='navbar-brand' exact to='/'>
          Pfizer React
        </Link>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item'>
              <NavLink className='nav-link' exact to='/'>
                Home
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' exact to='/courses'>
                Courses
              </NavLink>
            </li>
          </ul>
          <Link to='/courses/add' className='btn btn-outline-primary'>
            Add new course
          </Link>
        </div>
    </nav>
  );
};

export default NavigationBar;
