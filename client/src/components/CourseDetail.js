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
            console.log(courseId);
            try {
                await fetch(`http://localhost:5000/api/courses/${courseId}`)
                    .then(response => response.json())
                    .then(data => this.setState({course: data}))
            } catch (err) {
                console.log(err);
            }
        }

        render() {
            console.log(this.props.match.params.id);
            const {course } = this.state; 
            return (
                <div>
                    <div className="actions--bar">
                        <div className="bounds">
                            <div className="grid-100">
                                <React.Fragment>
                                    <span>
                                        <Link to={{pathname: `/courses/${course.id}/update`}} className="button">
                                            Update Course
                                        </Link>
                                        <Link to={{pathname: `/courses/${course.id}/delete`}} className="button">
                                            Delete Course
                                        </Link>
                                    </span>
                                        <Link to={{pathname: `/courses/`}} className="button button-secondary">
                                            Return to List
                                        </Link>
                                </React.Fragment>
                            </div>
                        </div>
                    </div>
                    <div className="bounds course--detail">
                        <div className="grid-66">
                            <div className="course--header">
                                <h4 className="course--label">Course</h4>
                                <h3 className="course--title">{course.title}</h3>
                                <p>By {course.author="HOLD"}</p>
                            </div>
                            <div className="course--description">
                                <p>{course.description}</p>
                            </div>
                        </div>
                        <div className="gird-25 grid-right">
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
                                                <li>{course.materialsNeeded}</li>
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
    }

export default CourseDetail;