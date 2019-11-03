import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Form from './Form'; 

export default class CreateCourse extends Component {

    state = {
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        userId: '', 
        errors: []
    }

    componentDidMount(){
        const {context} = this.props; 
        const authUser = context.authenticatedUser;
        this.setState({
            userId: authUser,
        })
    }

    render() {
        const {context} = this.props;
        const {
            title,
            description,
            estimatedTime, 
            materialsNeeded,
            userId,
            errors,
        } = this.state;
        return (
            <div className="bounds course--detail">
                <h1>Sign Up</h1>
                <Form 
                    cancel={this.cancel}
                    errors={errors}
                    submit={this.submit} 
                    submitButtonText="Create Course"
                    elements={() => (
                        <React.Fragment>
                            <div className="grid-66">
                                <div className="course--header">
                                    <h4 className="course--label">Course</h4>
                                    <div>
                                        <input 
                                            id="title"
                                            name="title"
                                            type="text"
                                            className="input-title course--title--imput"
                                            value={title}
                                            onChange={this.change}
                                            placeholder="Course Title..."
                                        />
                                    </div>
                                   <p>By {userId.firstName} {userId.lastName}</p>
                                </div>
                                <div className="course-description">
                                    <div>
                                        <textarea
                                            id="description"
                                            name="description"
                                            value={description}
                                            onChange={this.change}
                                            placeholder="Course description..."
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="grid-25 grid-right">
                                <div className="course--stats">
                                    <ul className="course--stats--list">
                                        <li className="course--stats--list--item">
                                            <h4>Estimated Time</h4>
                                            <div>
                                                <input 
                                                    id="estimatedTime"
                                                    name="estimatedTime"
                                                    type="text"
                                                    className="course--time--input"
                                                    value={estimatedTime}
                                                    onChange={this.change}
                                                    placeholder="Hours"
                                                />
                                            </div>
                                        </li>
                                        <li className="course--stats--list--item">
                                            <h4>Materials Needed</h4>
                                            <div>
                                                <textarea
                                                    id="materialsNeeded"
                                                    name="materialsNeeded"
                                                    value={materialsNeeded}
                                                    onChange={this.change}
                                                    placeholder="List materials..."
                                                />
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            
                        </React.Fragment>
                    )} />
            </div>
        );
    }

    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(() => {
            return {
                [name]: value
            };
        });
    }

    submit = () => {
        const {context} = this.props;
        const authUser = context.authenticatedUser;
        const authUserPassword = context.authenticatedUserPassword;
        const userId = authUser.userId;
        const {
            title,
            description,
            estimatedTime, 
            materialsNeeded,
        } = this.state; 
        // New course payload
        const course = { 
            title,
            description,
            estimatedTime, 
            materialsNeeded,
            userId,
        };
    context.data.createCourse(course, authUser.email, authUserPassword)
        .then( errors => {
            if (errors.length) {
                this.setState({errors}); 
            } else {
               this.props.history.push('/courses');
            }
        })
        .catch(err => {
            console.log(err); 
            this.props.history.push('/error'); //push to history stack 
        })
     }
    
    cancel = () => {
        this.props.history.push('/courses');
    }
}