import React, { useState } from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { API_COURSES } from '../api/request';

const AddCourse = ({ showModal, toggleModal, addContact }) => {
  let history = useHistory();

  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [duration, setDuration] = useState('');
  const [open, setOpen] = useState(false);
  const [instructors, setIntstructors] = useState([]);
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState({
    normal: '',
    early_bird: '',
  });
  const [dates, setDates] = useState({
    start_date: '',
    end_date: '',
  });

  const course = {
    title,
    image,
    duration,
    open,
    instructors: [],
    description,
    price,
    dates,
  };

  const onSubmit = async e => {
    e.preventDefault();
    await axios.post(API_COURSES, course);
    history.push('/');
  };

  const onInputChange = ({ target }, setState) => {
    const { name, value } = target;
    console.log(value);
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
    }
  };

  const { normal, early_bird } = price;
  const { start_date, end_date } = dates;

  return (
    <div className='container'>
      <Form onSubmit={e => onSubmit(e)}>
        {[
          {
            field: 'title',
            state: title,
            type: 'text',
            placeholder: 'Title',
            setState: setTitle,
          },
          {
            field: 'image',
            state: image,
            type: 'text',
            placeholder: 'Image Path',
            setState: setImage,
          },
          {
            field: 'duration',
            state: duration,
            type: 'text',
            placeholder: 'Duration',
            setState: setDuration,
          },
          {
            field: 'description',
            state: description,
            type: 'text',
            placeholder: 'description',
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
            placeholder: 'start_date',
            setState: setDates,
          },
          {
            field: 'end_date',
            state: end_date,
            type: 'text',
            placeholder: 'end_date',
            setState: setDates,
          },
          {
            field: 'open',
            state: open,
            type: 'checkbox',
            placeholder: 'Bookable',
            setState: setOpen,
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
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddCourse;
