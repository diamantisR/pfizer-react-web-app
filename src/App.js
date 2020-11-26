import React from 'react';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavigationBar from './components/nav/NavigationBar';
import Home from './components/pages/Home';
import AddCourse from './components/forms/AddCourse';
import EditCourse from './components/forms/EditCourse';
import ViewCourse from './components/pages/ViewCourse';
import CoursesList from './components/pages/CoursesList';
import NotFound from './components/common/NotFound';

const App = () => { 
  return (
    <Router>
      <div className='App'>
        <NavigationBar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/courses' component={CoursesList} />
          <Route exact path='/courses/add' component={AddCourse} />
          <Route exact path='/courses/edit/:id' component={EditCourse} />
          <Route exact path='/courses/:id' component={ViewCourse} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
