import React, { Component } from 'react';
import { getAllGuests, createGuest,deleteGuest,getCurrentUser } from '../util/APIUtils';
import { Link, withRouter } from 'react-router-dom';
import { Form, Button, Table, Col, Row} from 'react-bootstrap';
import './Guest.css'

class Guest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
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
            guests:{}
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
    
        const createGuestRequest = {
            name: this.state.name.value,
            email: this.state.email.value,
            gender: this.state.gender.value,
            address: this.state.address.value,
            company: this.state.company.value,
            phoneNumber: this.state.phoneNumber.value,
        };
        createGuest(createGuestRequest)
        .then(response => {
            if( null != response  && null!= response.id) {
                alert("Created Guest Sucessfully. ");
                this.loadAllGuests();
            } else {
                alert("Failed to create guest. Please try again.");
            }
        }).catch(error => {
            alert("Failed to create guest. Please try again.");
        });
    }

    deleteGuest(event,id) {
        event.preventDefault();
        deleteGuest(id)
        .then(response => {
            if(response) {
                alert("Deleted Guest Sucessfully. ");
                this.loadAllGuests();
            } else {
                alert("Failed to delete Guest. Please try again.");
            }
        }).catch(error => {
            alert("Failed to delete Guest. Please try again.");
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
  
  
  loadAllGuests() {
    getAllGuests()
    .then(response => {
      this.setState({
        guests: response,
      });
    }).catch(error => {
      this.setState({
        isLoading: false
      });  
    });
  }
  
  componentDidMount() {
    this.loadCurrentUser();
    this.loadAllGuests();
  }


    render() {
        return (
            <div className="guest-container">
                <h3>Guest List</h3>
                <div className="new-guest-content">
                {this.state.guests.length > 0 ? ( 
                        
                    <Table >
                        <thead><tr>
                                <td>Name</td>
                                <td>Email</td>
                                <td>Gender</td>
                                <td>Address</td>
                                <td>Company</td>
                                <td>PhoneNumber</td>
                                <td>Edit </td>
                                <td> Delete </td>
                            </tr></thead>
                        <tbody>
                        {this.state.guests.map(item => (
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.gender}</td>
                                <td>{item.address}</td>
                                <td>{item.company}</td>
                                <td>{item.phoneNumber}</td>
                                <td> <Link className='link' to={{ pathname: "/guestedit/"+item.id,state: item.id}}>Edit guest</Link> </td>
                                <td> <Button type="primary" 
                                htmlType="submit" 
                                size="large" onClick={(event) => this.deleteGuest(event,item.id)}
                                className="create-guest-form-button">Delete Guest</Button> </td>
                            </tr>
                          ))}
                        </tbody> 
                    </Table>  
                    ): null
                }
                {this.state.guests.length === 0 ? (
                        <div className="no-guest-found">
                            <span>No guest found.</span>
                        </div>    
                    ): null
                }
                </div>
                <h3>Create New guest</h3>
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

                        <Form.Group  as={Row} className="guest-form-row">
                            <Button type="primary" 
                                htmlType="submit" 
                                size="large" 
                                disabled={this.isFormInvalid()}
                                className="create-guest-form-button">Create Guest</Button>
                        </Form.Group>
                    </Form>
                   
                </div> 
                  
            </div>
        );
    }
}

export default withRouter(Guest);