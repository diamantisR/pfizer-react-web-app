import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { API_COURSES } from '../api/request';

const EditCourse = () => {
  let history = useHistory();
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

  const { id } = useParams();
  const { normal, early_bird } = course.price;
  const { start_date, end_date } = course.dates;

  useEffect(() => {
    loadCourse();
  }, []);

  const loadCourse = async () => {
    const result = await axios.get(`${API_COURSES}/${id}`);
    setCourse(result.data);
  };

  const onSubmit = async e => {
    e.preventDefault();
    await axios.put(`${API_COURSES}/${id}`, course);
    history.push(`/courses/${id}`);
  };

  const onInputChange = e => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  return (
    <div className='container'>
      <Form onSubmit={e => onSubmit(e)}>
        {[
          {
            field: 'title',
            state: course.title,
            type: 'text',
            placeholder: 'Title',
          },
          {
            field: 'imagePath',
            state: course.imagePath,
            type: 'text',
            placeholder: 'Image Path',
          },
          {
            field: 'duration',
            state: course.duration,
            type: 'text',
            placeholder: 'Duration',
          },
          {
            field: 'description',
            state: course.description,
            type: 'text',
            placeholder: 'Description',
          },
          {
            field: 'normal',
            state: normal,
            type: 'number',
            placeholder: 'Normal',
          },
          {
            field: 'early_bird',
            state: early_bird,
            type: 'number',
            placeholder: 'Early bird',
          },
          {
            field: 'start_date',
            state: start_date,
            type: 'text',
            placeholder: 'Start Date',
          },
          {
            field: 'end_date',
            state: end_date,
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
        <Form.Group controlId='formBasicCheckbox'>
          <Form.Check
            type='checkbox'
            value={course.open}
            label='Bookable'
            onChange={e => onInputChange(e)}
          />
        </Form.Group>
        <Button className='float-right' variant='success' type='submit'>
          Edit Course
        </Button>
      </Form>
    </div>
  );
};

export default EditCourse;
