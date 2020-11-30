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
  const [instructorCheckoxes, setInstructorCheckoxes] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    loadCourse();
    fetchInstructors();
  }, []);

  const loadCourse = async () => {
    const result = await axios.get(`${API_COURSES}/${id}`);
    setCourse(result.data);
  };

  const fetchInstructors = async () => {
    const result = await axios.get(API_INSTRUCTORS);
    setInstructorCheckoxes(result.data);
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
    switch (e.target.name) {
      case 'normal':
      case 'early_bird':
        setCourse(course => ({
          ...course,
          price: { ...course.price, [e.target.name]: e.target.value },
        }));
        break;
      case 'start_date':
      case 'end_date':
        setCourse(course => ({
          ...course,
          dates: {
            ...course.dates,
            [e.target.name]: e.target.value.replaceAll('-', '/'),
          },
        }));
        break;
      default:
        setCourse(course => ({
          ...course,
          [e.target.name]: e.target.value,
        }));
        break;
    }
  };

  const onOpenChange = e => {
    setCourse(course => ({
      ...course,
      open: e.target.checked,
    }));
  };

  const onCheckedChanged = e => {
    const value = e.target.value;
    if (instructors.includes(value)) {
      setCourse(course => ({
        ...course,
        instructors: instructors.filter(instructors => instructors !== value),
      }));
    } else {
      setCourse(course => ({
        ...course,
        instructors: [...instructors, value],
      }));
    }
  };

  return (
    <div className='container' style={{ marginTop: '15px' }}>
      <div className='card border-1 shadow'>
        <div className='card-header'>Edit Course</div>
        <div className='card-body'>
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
                  checked={open}
                  value={open}
                  name={open}
                  label='Bookable'
                  onChange={e => onOpenChange(e)}
                />
              </Form.Group>
            }
            <h4>Instructors</h4>
            {instructorCheckoxes.map(instructor => (
              <label style={{ marginRight: '5px' }}>
                <input
                  type='checkbox'
                  name={instructor.id}
                  value={instructor.id}
                  checked={instructors.includes(instructor.id)}
                  onChange={onCheckedChanged}
                />{' '}
                {instructor.name.first + ' ' + instructor.name.last}
              </label>
            ))}
            {/* <hr /> */}
            <Form.Group key='description' controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='textarea'
                placeholder='Description'
                value={description}
                rows={2}
                as='textarea'
                name='description'
                onChange={e => {
                  setCourse(course => ({
                    ...course,
                    description: e.target.value,
                  }));
                }}
              />
            </Form.Group>
            {[
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
              Update Course
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EditCourse;
