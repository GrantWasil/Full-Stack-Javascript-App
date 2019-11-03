import React, {Component} from 'react';
import {Link} from 'react-router-dom';


class CourseDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            course: [],
        };
    }

        componentDidMount() {
            this.getAllCourses();
        }

        async getAllCourses() {
            const courseId = this.props.match.params.id;
            try {
                await fetch(`http://localhost:5000/api/courses/${courseId}`)
                    .then(response => response.json())
                    .then(data => this.setState({course: data}))
            } catch (err) {
                console.log(err);
            }
        }

        render() {
            const {context} = this.props;
            const {course } = this.state;
            const authUser = context.authenticatedUser;
            let user = []
            let match; 
            if (course.User) {
                user = (course.User);
            }
            if (authUser && user){
                match = authUser.userId == course.userId ? true : false
            }
            console.log(match)
            let splitMaterials = []
            // If the course requires materials and has feteched them. Split them into an array
            if (course.materialsNeeded) {
                splitMaterials = (course.materialsNeeded.split('*'));
                splitMaterials.shift();
            }
            
            return (
                <div>
                    <div className="actions--bar">
                        <div className="bounds">
                            <div className="grid-100">
                                {match ?  
                                <React.Fragment>
                                    <span>
                                        <Link to={{pathname: `/courses/${course.id}/update`}} className="button">
                                            Update Course
                                        </Link>
                                        <Link to={{pathname: `/courses/`}} className="button" onClick={this.delete}>
                                            Delete Course
                                        </Link>
                                    </span>
                                        <Link to={{pathname: `/courses/`}} className="button button-secondary">
                                            Return to List
                                        </Link>
                                </React.Fragment>
                                : 
                                <React.Fragment>
                                        <Link to={{pathname: `/courses/`}} className="button button-secondary">
                                            Return to List
                                        </Link>
                                </React.Fragment>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="bounds course--detail">
                        <div className="grid-66">
                            <div className="course--header">
                                <h4 className="course--label">Course</h4>
                                <h3 className="course--title">{course.title}</h3>
                                <p>By {user.firstName} {user.lastName}</p>
                            </div>
                            <div className="course--description">
                                <p>{course.description}</p>
                            </div>
                        </div>
                        <div className="grid-25 grid-right">
                            <div className="course--stats">
                                <ul className="course--stats--list">
                                    <li className="course--stats--list--item">
                                        <h4>Estimated Time</h4>
                                        <h3>{course.estimatedTime}</h3>
                                    </li>
                                    <li className="course--stats--list--item">
                                        <h4>Materials Needed</h4>
                                        <ul>
                                            <React.Fragment>
                                                {splitMaterials.map(material => 
                                                  <li>{material}</li>
                                                )}
                                            </React.Fragment>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div> 

            );
        }

        delete = () => {
            const {context} = this.props; 
            const authUser = context.authenticatedUser;
            const authUserPassword = context.authenticatedUserPassword; 
            const courseId = this.props.match.params.id;

            console.log(courseId);
            context.data.deleteCourse(courseId, authUser.email, authUserPassword)
                .then( errors => {
                    if(errors.length){
                        this.setState({errors})
                    } else {
                        this.props.history.push('/courses'); 
                    }
                })
                .catch(err => {
                    console.log(err);
                    this.props.history.push('/error');
                });
        }

    }

export default CourseDetail;