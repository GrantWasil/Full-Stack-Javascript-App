import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Courses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
        };
    }

        componentDidMount() {
            this.getAllCourses();
        }

        async getAllCourses() {
            try {
                await fetch('http://localhost:5000/api/courses')
                    .then(response => response.json())
                    .then(data => data.courses)
                    .then(data => this.setState({courses: data}))
            } catch (err) {
                console.log(err);
            }
        }

        render() {
            const {courses } = this.state; 
            return (
                <div className="bounds">
                        <React.Fragment>
                            {courses.map(course =>
                                <div className="grid-33">
                                    <Link to={{ pathname: `/courses/${course.id}`}} className="course--module course--link">
                                            <h4 className="course--label">Course</h4>
                                            <h3 className="course--title">{course.title}</h3>
                                    </Link>
                                </div> 
                                )}
                                <div className="grid-33">
                            <Link to="/courses/create" className="course--module course--add--module">
                                <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                                </svg>New Course</h3>
                                </Link>
                        </div>
                        </React.Fragment>
                </div>
            );
        }
    }

export default Courses;