import React, { Component } from 'react';
import { getGuestDetails,getCurrentUser,updateUser, updateGuest } from '../util/APIUtils';
import { Link, withRouter } from 'react-router-dom';
import { Form, Button, Table, Col, Row} from 'react-bootstrap';
import './Guest.css'

class GuestEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: {
                value: ''
            },name: {
                value: ''
            },
            email: {
                value:""
            },
            gender: {
                value: ''
            },
            address: {
                value:""
            },
            company:{
                value:""
            },
            phoneNumber:{
                value:""
            },
            staffs:{}
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleGenderChange = this.handleGenderChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleCompanyChange = this.handleCompanyChange.bind(this);
        this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
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

    
    validateEmail = (text) => {
        if(text.length === 0) {
            return {
                isValid: 'error',
                errorMsg: 'Please enter Email!'
            }
        } else {
            return {
                isValid: 'success',
                errorMsg: null
            }
        }
    }

    validateGender = (text) => {
        if(text.length === 0) {
            return {
                isValid: 'error',
                errorMsg: 'Please enter Password!'
            }
        } else {
            return {
                isValid: 'success',
                errorMsg: null
            }
        }
    }

    validateAddress = (text) => {
        if(text.length === 0) {
            return {
                isValid: 'error',
                errorMsg: 'Please enter Password!'
            }
        } else {
            return {
                isValid: 'success',
                errorMsg: null
            }
        }
    }

    validateCompany = (text) => {
        if(text.length === 0) {
            return {
                isValid: 'error',
                errorMsg: 'Please enter Password!'
            }
        } else {
            return {
                isValid: 'success',
                errorMsg: null
            }
        }
    }
    
    validatePhoneNumber = (text) => {
        if(text.length === 0) {
            return {
                isValid: 'error',
                errorMsg: 'Please enter Password!'
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

    handleEmailChange(event) {
        const value = event.target.value;
        this.setState({
            email: {
                value: value,
                ...this.validateEmail(value)
            }
        });
    }

    handleGenderChange(event) {
        const value = event.target.value;
        this.setState({
            gender: {
                value: value,
                ...this.validateGender(value)
            }
        });
    }
    
    handleAddressChange(event) {
        const value = event.target.value;
        this.setState({
            address: {
                value: value,
                ...this.validateAddress(value)
            }
        });
    }
    
    handlePhoneNumberChange(event) {
        const value = event.target.value;
        this.setState({
            phoneNumber: {
                value: value,
                ...this.validatePhoneNumber(value)
            }
        });
    }
    handleCompanyChange(event) {
        const value = event.target.value;
        this.setState({
            company: {
                value: value,
                ...this.validateCompany(value)
            }
        });
    }


    handleSubmit(event) {
        event.preventDefault();
        const id = this.props.match.params.id;
        const updateUserRequest = {
            id:id,
            name: this.state.name.value,
            email: this.state.email.value,
            gender: this.state.gender.value,
            address: this.state.address.value,
            company: this.state.company.value,
            phoneNumber: this.state.phoneNumber.value
        };
        updateGuest(updateUserRequest)
        .then(response => {
            if( null != response  && null!=response.id) {
                alert("Updated Guest Sucessfully. ");
                this.props.history.push("/guest");
            } else {
                alert("Failed to update Guest User. Please try again.");
            }
        }).catch(error => {
            alert("Failed to update Staff User. Please try again.");
        });
    }

    isFormInvalid() {
            return true;
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
  
  getGuestDetails(){
    const id = this.props.match.params.id;
    getGuestDetails(id)
    .then(response => {
        this.setState({
            name: {
                value: response.name
            }
        });
        this.setState({
            email: {
                value: response.email
            }
        });
        this.setState({
            gender: {
                value: response.gender
            }
        });
        this.setState({
            address: {
                value: response.address
            }
        });
        this.setState({
            company: {
                value: response.company
            }
        });
        this.setState({
            phoneNumber: {
                value: response.phoneNumber
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
    this.getGuestDetails();
  }


    render() {

        return (
            <div className="guest-container">
                <h3>Update guest</h3>
                <div className="create-guest-content">
                    <Form onSubmit={this.handleSubmit} className="create-guest-form">
                    <Form.Group  as={Row} className="mb-3" controlId="signup-form.name">
                            <Form.Label column sm="3">Name</Form.Label>
                            <Col sm="9">
                            <Form.Control type="text" name="name" isValid={this.state.name.isValid}
                            autoComplete="off" value={this.state.name.value} 
                            onChange={(event) => this.handleInputChange(event, this.validateName)} />
                            </Col>
                        </Form.Group>

                        <Form.Group  as={Row} className="mb-3" controlId="signup-form.email">
                            <Form.Label column sm="3">Email</Form.Label>
                            <Col sm="9">
                                <Form.Control type="text" name="email" isValid={this.state.email.isValid}
                            autoComplete="off" value={this.state.email.value}
                            onChange={(event) => this.handleInputChange(event, this.validateEmail)} />
                                </Col>
                        </Form.Group>

                        <Form.Group  as={Row} className="mb-3" controlId="signup-form.gender">
                            <Form.Label column sm="3">Gender</Form.Label>
                            <Col sm="9">
                                <Form.Control type="text" name="gender" isValid={this.state.gender.isValid}
                            autoComplete="off" value={this.state.gender.value}
                            onChange={(event) => this.handleInputChange(event, this.validateGender)} />
                                </Col>
                        </Form.Group>

                        <Form.Group  as={Row} className="mb-3" controlId="signup-form.address">
                            <Form.Label column sm="3">Address</Form.Label>
                            <Col sm="9">
                                <Form.Control type="text" name="address" isValid={this.state.address.isValid}
                            autoComplete="off" value={this.state.address.value} 
                            onChange={(event) => this.handleInputChange(event, this.validateAddress)} />
                                </Col>
                        </Form.Group>

                        <Form.Group  as={Row} className="mb-3" controlId="signup-form.company">
                            <Form.Label column sm="3">Company</Form.Label>
                            <Col sm="9">
                                <Form.Control type="text" name="company" isValid={this.state.company.isValid}
                            autoComplete="off" value={this.state.company.value} 
                            onChange={(event) => this.handleInputChange(event, this.validateCompany)} />
                                </Col>
                        </Form.Group>

                        <Form.Group  as={Row} className="mb-3" controlId="signup-form.phoneNumber">
                            <Form.Label column sm="3">Phone Number</Form.Label>
                            <Col sm="9">
                                <Form.Control type="text" name="phoneNumber" isValid={this.state.phoneNumber.isValid}
                            autoComplete="off" value={this.state.phoneNumber.value}
                            onChange={(event) => this.handleInputChange(event, this.validatePhoneNumber)} />
                                </Col>
                        </Form.Group>

                        <Form.Group className="guest-form-row">
                            <Button type="primary" 
                                htmlType="submit" 
                                size="large" 
                                className="create-guest-form-button">Update User</Button>
                        </Form.Group>
                    </Form>
                   
                </div> 
                  
            </div>
        );
    }
}

export default withRouter(GuestEdit);