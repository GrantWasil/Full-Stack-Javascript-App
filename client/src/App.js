import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch 
} from 'react-router-dom'; 

import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';


// Import Context
import withContext from './Context';

const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);

export default () => (
  <Router>
    <div>
      <Header />

      <Switch>
        <Route exact path="/courses" component={CoursesWithContext}/> 
        <Route path="/courses/:id" render={props => (
                                    <CourseDetailWithContext 
                                      {...props} 
                                      />
                                    )}
                                  />
        <Route path="/signin" component={UserSignIn} /> 
        <Route component={CoursesWithContext} /> 
      </Switch>
    </div>
  </Router>
);
