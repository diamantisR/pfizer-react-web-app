import React from 'react';
import { Jumbotron } from 'react-bootstrap';

const WelcomeMessage = () => {
  return (
    <Jumbotron className='jumbo-welcome'>
      <h1 style={{ color: 'black' }}>Welcome to Code.Hub Dashboard!</h1>
      <h4 style={{ color: 'black' }}>Manage everything and have fun!</h4>
      <img src={'/sw-developer.png'} alt='afaf' className='img-fluid' />
    </Jumbotron>
  );
};

export default WelcomeMessage;
