import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { API_COURSES, API_INSTRUCTORS } from '../api/request';

const AddCourse = () => {
  let history = useHistory();
  const [options, setOptions] = useState([]);
  const [title, setTitle] = useState('');
  const [imagePath, setImagePath] = useState('');
  const [duration, setDuration] = useState('');
  const [open, setOpen] = useState(false);
  const [instructors, setInstructors] = useState([]);
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState({
    normal: 0,
    early_bird: 0,
  });
  const [dates, setDates] = useState({
    start_date: '',
    end_date: '',
  });

  useEffect(() => {
    fetchInstructors();
  }, []);

  const fetchInstructors = async () => {
    const result = await axios.get(API_INSTRUCTORS);
    setOptions(result.data);
  };

  const onSubmit = async e => {
    e.preventDefault();
    await axios.post(API_COURSES, {
      title,
      imagePath,
      duration,
      open,
      instructors,
      description,
      price,
      dates,
    });
    history.push('/');
  };

  const onInputChange = ({ target }, setState) => {
    const { name, value } = target;
    if (
      name === 'normal' ||
      name === 'early_bird' ||
      name === 'start_date' ||
      name === 'end_date' ||
      name === 'open'
    ) {
      setState(address => ({
        ...address,
        [name]: value,
      }));
    } else {
      setState(value);
    }
  };

  const onCheckedChanged = e => {
    const value = e.target.value;
    if (instructors.includes(value)) {
      setInstructors(instructors.filter(instructors => instructors !== value));
    } else {
      setInstructors([...instructors, value]);
    }

    console.log(instructors);
  };

  const { normal, early_bird } = price;
  const { start_date, end_date } = dates;

  return (
    <div className='container'>
      <Form
        style={{ background: '#fff', padding: '10px' }}
        onSubmit={e => onSubmit(e)}
      >
        {[
          {
            field: 'title',
            state: title,
            type: 'text',
            placeholder: 'Title',
            setState: setTitle,
          },
          {
            field: 'duration',
            state: duration,
            type: 'text',
            placeholder: 'Duration',
            setState: setDuration,
          },
          {
            field: 'imagePath',
            state: imagePath,
            type: 'text',
            placeholder: 'Image Path',
            setState: setImagePath,
          },
        ].map(({ field, state, type, placeholder, setState }) => (
          <Form.Group key={field} controlId={field}>
            <Form.Label>{placeholder}</Form.Label>
            <Form.Control
              type={type}
              placeholder={placeholder}
              value={state}
              name={field}
              onChange={e => onInputChange(e, setState)}
            />
          </Form.Group>
        ))}
        {
          <Form.Group controlId='formBasicCheckbox'>
            <Form.Check
              type='checkbox'
              value={open}
              name={open}
              label='Bookable'
              onChange={e => setOpen(e.target.checked)}
            />
          </Form.Group>
        }
        <h4>Instructors</h4>
        {options.map(i => (
            <label style={{marginRight: '5px'}}>
            <input
                type='checkbox'
                name={i.id}
                value={i.id}
                checked={instructors.includes(i.id)}
                onChange={onCheckedChanged}
              />{' '}
              {i.name.first + ' ' + i.name.last}
            </label>
          
        ))}
        <hr />
        {[
          {
            field: 'description',
            state: description,
            type: 'text',
            placeholder: 'Description',
            setState: setDescription,
          },
          {
            field: 'normal',
            state: normal,
            type: 'number',
            placeholder: 'Normal',
            setState: setPrice,
          },
          {
            field: 'early_bird',
            state: early_bird,
            type: 'number',
            placeholder: 'Early bird',
            setState: setPrice,
          },
          {
            field: 'start_date',
            state: start_date,
            type: 'text',
            placeholder: 'Start date',
            setState: setDates,
          },
          {
            field: 'end_date',
            state: end_date,
            type: 'text',
            placeholder: 'End Date',
            setState: setDates,
          },
        ].map(({ field, state, type, placeholder, setState }) => (
          <Form.Group key={field} controlId={field}>
            <Form.Label>{placeholder}</Form.Label>
            <Form.Control
              type={type}
              placeholder={placeholder}
              value={state}
              name={field}
              onChange={e => onInputChange(e, setState)}
            />
          </Form.Group>
        ))}
        <Button className='float-right' variant='primary' type='submit'>
          Add Course
        </Button>
      </Form>
    </div>
  );
};

export default AddCourse;
