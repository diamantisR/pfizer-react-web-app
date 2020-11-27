import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { API_COURSES, API_INSTRUCTORS } from '../api/request';

const EditCourse = () => {
  let history = useHistory();
  const [course, setCourse] = useState({
    title: '',
    imagePath: '',
    duration: '',
    open: false,
    instructors: [],
    description: '',
    price: {
      normal: 0,
      early_bird: 0,
    },
    dates: {
      start_date: '',
      end_date: '',
    },
  });
  const [options, setOptions] = useState([]);
  // const [title, setTitle] = useState('');
  // const [imagePath, setImagePath] = useState('');
  // const [duration, setDuration] = useState('');
  // const [open, setOpen] = useState(false);
  // const [instructors, setInstructors] = useState([]);
  // const [description, setDescription] = useState('');
  // const [price, setPrice] = useState({
  //   normal: 0,
  //   early_bird: 0,
  // });
  // const [dates, setDates] = useState({
  //   start_date: '',
  //   end_date: '',
  // });

  const { id } = useParams();

  useEffect(() => {
    loadCourse();
    fetchInstructors();
  }, []);

  const loadCourse = async () => {
    const result = await axios.get(`${API_COURSES}/${id}`);
    setCourse(result.data);
  };

  // const onSubmit = async e => {
  //   e.preventDefault();
  //   await axios.put(`${API_COURSES}/${id}`, course);
  //   history.push(`/courses/${id}`);
  // };

  // useEffect(() => {
  //   fetchInstructors();
  // }, []);

  const fetchInstructors = async () => {
    const result = await axios.get(API_INSTRUCTORS);
    setOptions(result.data);
  };

  const {
    title,
    imagePath,
    duration,
    open,
    instructors,
    description,
    price,
    dates,
  } = course;

  const onSubmit = async e => {
    e.preventDefault();
    await axios.put(`${API_COURSES}/${id}`, {
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

  const onInputChange = e => {
    console.log(e.target.checked);
    if (
      e.target.name === 'normal' ||
      e.target.name === 'early_bird' ||
      e.target.name === 'start_date' ||
      e.target.name === 'end_date'
    ) {
      setCourse(course => ({
        ...course,
        [e.target.name]: {
          ...e.target.value,
        },
      }));
    } else if (e.target.name === 'open') {
      setCourse(course => ({
        ...course,
        [e.target.name]: e.target.checked,
      }));
    } else {
      setCourse(course => ({
        ...course,
        [e.target.name]: e.target.value,
      }));
    }
  };

  /*   const onInputChange = ({ target }, setState) => {
    const { name, value } = target;
    if (
      name === 'normal' ||
      name === 'early_bird' ||
      name === 'start_date' ||
      name === 'end_date'
    ) {
      setState(address => ({
        ...address,
        [name]: value,
      }));
    } else {
      setState(value);
      console.log(value);
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
  }; */

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
          },
          {
            field: 'duration',
            state: duration,
            type: 'text',
            placeholder: 'Duration',
          },
          {
            field: 'imagePath',
            state: imagePath,
            type: 'text',
            placeholder: 'Image Path',
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
              onChange={e => onInputChange(e)}
              // onChange={e => setCourse(e.target.checked)}
            />
          </Form.Group>
        }
        <h4>Instructors</h4>
        {/* {options.map(i => (
          <label style={{ marginRight: '5px' }}>
            <input
              type='checkbox'
              name={i.id}
              value={i.id}
              checked={instructors.includes(i.id)}
              onChange={onCheckedChanged}
            />{' '}
            {i.name.first + ' ' + i.name.last}
          </label>
        ))} */}
        <hr />
        {[
          {
            field: 'description',
            state: description,
            type: 'text',
            placeholder: 'Description',
          },
          {
            field: 'normal',
            state: price.normal,
            type: 'number',
            placeholder: 'Normal',
          },
          {
            field: 'early_bird',
            state: price.early_bird,
            type: 'number',
            placeholder: 'Early bird',
          },
          {
            field: 'start_date',
            state: dates.start_date,
            type: 'text',
            placeholder: 'Start date',
          },
          {
            field: 'end_date',
            state: dates.end_date,
            type: 'text',
            placeholder: 'End Date',
          },
        ].map(({ field, state, type, placeholder }) => (
          <Form.Group key={field} controlId={field}>
            <Form.Label>{placeholder}</Form.Label>
            <Form.Control
              type={type}
              placeholder={placeholder}
              value={state}
              name={field}
              onChange={e => onInputChange(e)}
            />
          </Form.Group>
        ))}
        <Button className='float-right' variant='success' type='submit'>
          Edit Course
        </Button>
      </Form>
    </div>
  );
};

export default EditCourse;
