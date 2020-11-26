import React from 'react';
import { Jumbotron } from 'react-bootstrap';

const WelcomeMessage = () => {
  return (
    <Jumbotron>
      <h1 style={{ color: 'black' }}>Welcome to Code.Hub Dashboard!</h1>
      <h4 style={{ color: 'black' }}>Manage everything and have fun!</h4>
    </Jumbotron>
  );
};

export default WelcomeMessage;
