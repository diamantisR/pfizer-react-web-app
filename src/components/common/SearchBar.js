import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';

const SearchBar = ({ onSearch }) => (
  <div
    className='container'
    style={{ width: '20%', marginRight: '10px', marginTop: '15px' }}
  >
    <Form.Control
      type='search'
      aria-describedby='basic-addon2'
      placeholder='Search for a course..'
      onChange={onSearch}
    />
  </div>
);

export default SearchBar;
