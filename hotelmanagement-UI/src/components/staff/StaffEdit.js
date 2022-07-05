import React, { Component } from 'react';
import { getAllStaff, signup,getUserDetails,getCurrentUser,updateUser } from '../util/APIUtils';
import { Link, withRouter } from 'react-router-dom';
import { Form, Button, Table, Col, Row} from 'react-bootstrap';
import './Staff.css'

class StaffEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: {
                value: ''
            },name: {
                value: ''
            },
            username: {
                value:""
            },
            staffs:{}
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event, validationFun) {
        const target = event.target;
        const inputName = target.name;        
        const inputValue = target.value;

        this.setState({
            [inputName] : {
                value: inputValue,
                ...validationFun(inputValue)
            }
        });
    }

    validateName = (text) => {
        if(text.length === 0) {
            return {
                isValid: 'error',
                errorMsg: 'Please enter Name'
            }
        } else {
            return {
                isValid: 'success',
                errorMsg: null
            }
        }
    }

    
    validateUsername = (text) => {
        if(text.length === 0) {
            return {
                isValid: 'error',
                errorMsg: 'Please enter UserName!'
            }
        } else {
            return {
                isValid: 'success',
                errorMsg: null
            }
        }
    }

    handleNameChange(event) {
        const value = event.target.value;
        this.setState({
            name: {
                value: value,
                ...this.validateName(value)
            }
        });
    }

    handleUsernameChange(event) {
        const value = event.target.value;
        this.setState({
            username: {
                value: value,
                ...this.validateUsername(value)
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const id = this.props.match.params.id;
        const updateUserRequest = {
            id:id,
            name: this.state.name.value,
            username: this.state.username.value,
        };
        updateUser(updateUserRequest)
        .then(response => {
            if( null != response  && response.message =="success") {
                alert("Updated Staff Sucessfully. ");
                this.props.history.push("/staff");
            } else {
                alert("Failed to update Staff User. Please try again.");
            }
        }).catch(error => {
            alert("Failed to update Staff User. Please try again.");
        });
    }

    isFormInvalid() {
        if(this.state.name.isValid !== 'success') {
            return true;
        }
    }

    
loadCurrentUser() {
    getCurrentUser()
    .then(response => {
      this.setState({
        currentUser: response
      });
    }).catch(error => {
      this.setState({
        isLoading: false
      });  
    });
  }
  
  getUserDetails(){
    const id = this.props.match.params.id;
    getUserDetails(id)
    .then(response => {
        this.setState({
            name: {
                value: response.name
            }
        });
        this.setState({
            username: {
                value: response.username
            }
        });
        this.setState({
            id: {
                value: response.id
            }
        });
        
      }).catch(error => {
        this.setState({
          isLoading: false
        });  
      });
  }

  componentDidMount() {
    this.loadCurrentUser();
    this.getUserDetails();
  }


    render() {

        return (
            <div className="staff-container">
                <h3>Update Staff</h3>
                <div className="create-staff-content">
                    <Form onSubmit={this.handleSubmit} className="create-staff-form">
                        <Form.Group className="mb-3" controlId="signup-form.name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" isValid={this.state.name.isValid}
                            autoComplete="off" value={this.state.name.value} 
                            onChange={(event) => this.handleInputChange(event, this.validateName)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="signup-form.username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" name="username" isValid={this.state.username.isValid}
                            autoComplete="off" value={this.state.username.value}
                            onChange={(event) => this.handleInputChange(event, this.validateUsername)} />
                        </Form.Group>

                        <Form.Group className="staff-form-row">
                            <Button type="primary" 
                                htmlType="submit" 
                                size="large" 
                                disabled={this.isFormInvalid()}
                                className="create-staff-form-button">Update User</Button>
                        </Form.Group>
                    </Form>
                   
                </div> 
                  
            </div>
        );
    }
}

export default withRouter(StaffEdit);