import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch 
} from 'react-router-dom'; 

import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import CourseUpdate from './components/CourseUpdate';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp'; 
import UserSignOut from './components/UserSignOut';
import NotFound from './components/NotFound';



// Import Context
import withContext from './Context';
import PrivateRoute from './PrivateRoute'; 

const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCoursewithContext = withContext(CreateCourse);
const CourseUpdateWithContext = withContext(CourseUpdate);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp); 
const UserSignOutWithContext = withContext(UserSignOut);


export default () => (
  <Router>
    <div>
      <HeaderWithContext />

      <Switch>
        <Route exact path="/courses" component={CoursesWithContext}/> 
        <PrivateRoute exact path="/courses/create" component={CreateCoursewithContext} />
        <PrivateRoute path ="/courses/:id/update" component={CourseUpdateWithContext} />
        <Route path="/courses/:id" render={props => (
                                    <CourseDetailWithContext 
                                      {...props} 
                                      />
                                    )}
                                  />
        <Route path="/signin" component={UserSignInWithContext} /> 
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} />
        <Route component={NotFound} /> 
      </Switch>
    </div>
  </Router>
);
