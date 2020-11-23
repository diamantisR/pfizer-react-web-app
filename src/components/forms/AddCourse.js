import React from 'react';

const AddCourse = () => {
  return (
    <div className='container'>
      <div className='py-4'>
        <form>
          <div class='form-group'>
            <label for='exampleInputEmail1'>Title:</label>
            <input
              type='email'
              class='form-control'
              id='exampleInputEmail1'
              aria-describedby='emailHelp'
            />
            <small id='emailHelp' class='form-text text-muted'>
              We'll never share your email with anyone else.
            </small>
          </div>
          <div class='form-group'>
            <label for='exampleInputPassword1'>Duration:</label>
            <input
              type='password'
              class='form-control'
              id='exampleInputPassword1'
            />
            <small id='emailHelp' class='form-text text-muted'>
              We'll never share your email with anyone else.
            </small>
          </div>
          <div class='form-group'>
            <label for='exampleInputEmail1'>Image Path:</label>
            <input
              type='email'
              class='form-control'
              id='exampleInputEmail1'
              aria-describedby='emailHelp'
            />
            <small id='emailHelp' class='form-text text-muted'>
              We'll never share your email with anyone else.
            </small>
          </div>
          <div class='form-group form-check'>
            <input
              type='checkbox'
              class='form-check-input'
              id='exampleCheck1'
            />
            <label class='form-check-label' for='exampleCheck1'>
              Bookable
            </label>
          </div>
          <hr />
          <div class='form-group'>
            <label for='exampleFormControlTextarea1'>Description</label>
            <textarea
              class='form-control'
              id='exampleFormControlTextarea1'
              rows='3'
            ></textarea>
            <hr />
          </div>
          <button type='submit' class='btn btn-primary'>
            Add Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
