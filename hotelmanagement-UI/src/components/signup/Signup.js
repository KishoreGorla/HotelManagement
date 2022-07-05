import React, { Component } from 'react';
import { signup, checkUsernameAvailability } from '../util/APIUtils';
import './Signup.css';
import { Link } from 'react-router-dom';
import { 
    NAME_MIN_LENGTH, NAME_MAX_LENGTH, 
    USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH,
    PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH
} from '../constants';

import { Form, Button} from 'react-bootstrap';
const FormItem = Form.Item;

class Signup extends Component {    
    constructor(props) {
        super(props);
        this.state = {
            name: {
                value: ''
            },
            username: {
                value: ''
            },
            password: {
                value: ''
            },
            role: {
                value: 'Staff'
            }
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateUsernameAvailability = this.validateUsernameAvailability.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
    }

    handleInputChange(event, validationFun) {
        const target = event.target;
        const inputName = target.name;        
        const inputValue = target.value;
        console.log(inputValue)
        this.setState({
            [inputName] : {
                value: inputValue,
                ...validationFun(inputValue)
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
    
        const signupRequest = {
            name: this.state.name.value,
            username: this.state.username.value,
            password: this.state.password.value,
            role: this.state.role.value
        };
        signup(signupRequest)
        .then(response => {
                   
            this.props.history.push("/login");
        }).catch(error => {
           
        });
    }

    isFormInvalid() {
        return !(this.state.name.isValid === 'success' &&
            this.state.username.isValid === 'success' &&
            this.state.password.isValid === 'success'
        );
    }

    render() {
        return (
            <div className="signup-container">
                <h1 className="page-title">Register</h1>
                <div className="signup-content">
                    <Form onSubmit={this.handleSubmit} className="signup-form">
                        
                        <Form.Group className="mb-3" controlId="signup-form.name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" isValid={this.state.name.isValid}
                            autoComplete="off" value={this.state.name.value} 
                            onChange={(event) => this.handleInputChange(event, this.validateName)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="signup-form.username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" name="username" isValid={this.state.username.isValid}
                            autoComplete="off" value={this.state.username.value} onBlur={this.validateUsernameAvailability}
                            onChange={(event) => this.handleInputChange(event, this.validateUsername)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="signup-form.password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" isValid={this.state.password.isValid}
                            autoComplete="off" value={this.state.password.value}
                            onChange={(event) => this.handleInputChange(event, this.validatePassword)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="signup-form.password">
                            <Form.Label>Role</Form.Label>
                            <Form.Control name='role' as="select" value={this.state.role.value} onChange={(event) => this.handleInputChange(event, this.validateRole)}  custom>
                                <option value="Staff">Staff</option>
                                <option value="Manager">Manager</option>
                                <option value="Admin">Admin</option>
                                <option value="User">User</option>
                                </Form.Control>                        
                            </Form.Group>

                        <Form.Group>
                            <Button type="primary" 
                                htmlType="submit" 
                                size="large" 
                                className="signup-form-button"
                                disabled={this.isFormInvalid()}>Register</Button>
                            Already registed? <Link to="/login" className='link'>SignIn now!</Link>
                        </Form.Group>
                    </Form>
                </div>
            </div>
        );
    }

    // Validation Functions

    validateName = (name) => {
        if(name.length < NAME_MIN_LENGTH) {
            return {
                isValid: 'error',
                errorMsg: `Name is too short (Minimum ${NAME_MIN_LENGTH} characters needed.)`
            }
        } else if (name.length > NAME_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Name is too long (Maximum ${NAME_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                isValid: 'success',
                errorMsg: null,
              };            
        }
    }


    validateUsername = (username) => {
        if(username.length < USERNAME_MIN_LENGTH) {
            return {
                isValid: 'error',
                errorMsg: `Username is too short (Minimum ${USERNAME_MIN_LENGTH} characters needed.)`
            }
        } else if (username.length > USERNAME_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Username is too long (Maximum ${USERNAME_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                isValid: null,
                errorMsg: null
            }
        }
    }

    validateUsernameAvailability() {
        // First check for client side errors in username
        const usernameValue = this.state.username.value;
        const usernameValidation = this.validateUsername(usernameValue);

        if(usernameValidation.isValid === 'error') {
            this.setState({
                username: {
                    value: usernameValue,
                    ...usernameValidation
                }
            });
            return;
        }

        this.setState({
            username: {
                value: usernameValue,
                isValid: 'validating',
                errorMsg: null
            }
        });

        checkUsernameAvailability(usernameValue)
        .then(response => {
            if(response.available) {
                this.setState({
                    username: {
                        value: usernameValue,
                        isValid: 'success',
                        errorMsg: null
                    }
                });
            } else {
                this.setState({
                    username: {
                        value: usernameValue,
                        isValid: 'error',
                        errorMsg: 'This username is already taken'
                    }
                });
            }
        }).catch(error => {
            // Marking isValid as success, Form will be recchecked at server
            this.setState({
                username: {
                    value: usernameValue,
                    isValid: 'success',
                    errorMsg: null
                }
            });
        });
    }


    validatePassword = (password) => {
        if(password.length < PASSWORD_MIN_LENGTH) {
            return {
                isValid: 'error',
                errorMsg: `Password is too short (Minimum ${PASSWORD_MIN_LENGTH} characters needed.)`
            }
        } else if (password.length > PASSWORD_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Password is too long (Maximum ${PASSWORD_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                isValid: 'success',
                errorMsg: null,
            };            
        }
    }

    
    validateRole = (password) => {
        if(password.length ==0) {
            return {
                isValid: 'error',
                errorMsg: 'Invalid Role'
            }
        } else {
            return {
                isValid: 'success',
                errorMsg: null,
            };            
        }
    }

}

export default Signup;