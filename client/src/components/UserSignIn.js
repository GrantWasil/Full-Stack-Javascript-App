import React, {Component} from 'react';
import {Link} from 'react-router-dom'; 
import Form from './Form';

export default class UserSignIn extends Component {
    state = {
        email: '', 
        password: '',
        errors: [], 
    }

    render () {
        const {
            email, 
            password,
            errors
        } = this.state; 

        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign In</h1>
                    <Form
                        cancel={this.cancel}
                        errors={errors}
                        submit={this.submit}
                        submitButtonText="Sign In"
                        elements={() => (
                            <React.Fragment>
                                <input 
                                    id="emailAddress"
                                    name="emailAddress"
                                    type="text"
                                    value={email}
                                    onChange={this.change}
                                    placeholder="Email Address" />
                                <input 
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={this.change}
                                    placeholder="Password"
                                     />
                            </React.Fragment>
                        )} 
                    />
                    <p>&nbsp;</p>
                    <p>
                        Don't have a user account? <Link to="/signup">Click here</Link> to sign up!
                    </p>
                </div>
            </div>
        )
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

    sumbit = () => {
        const {context} = this.props; 
        const {from} = this.props.location.state || {from:{pathname: '/courses'}};
        const {email, password} = this.state; 
        context.actions.signIn(email, password)
    }

}