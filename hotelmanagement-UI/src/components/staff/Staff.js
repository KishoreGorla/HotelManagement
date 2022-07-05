import React, { Component } from 'react';
import { getAllStaff, signup,deleteUser,getCurrentUser } from '../util/APIUtils';
import { Link, withRouter } from 'react-router-dom';
import { Form, Button, Table, Col, Row} from 'react-bootstrap';
import './Staff.css'

class Staff extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
                value: ''
            },
            username: {
                value:""
            },
            password:{
                value:""
            },
            
            staffs:{}
        };
        this.handleInputChange = this.handleInputChange.bind(this);

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
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

    
    validatePassword = (text) => {
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

    handleUsernameChange(event) {
        const value = event.target.value;
        this.setState({
            username: {
                value: value,
                ...this.validateUsername(value)
            }
        });
    }

    handlePasswordChange(event) {
        const value = event.target.value;
        this.setState({
            password: {
                value: value,
                ...this.validatePassword(value)
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
    
        const signupRequest = {
            name: this.state.name.value,
            username: this.state.username.value,
            password: this.state.password.value,
            role: "Staff"
        };
        signup(signupRequest)
        .then(response => {
            if( null != response  && response.message =="success") {
                alert("Created Staff Sucessfully. ");
                this.props.history.push("/staff");
            } else {
                alert("Failed to create Staff User. Please try again.");
            }
        }).catch(error => {
            alert("Failed to create Staff User. Please try again.");
        });
    }

    deleteUser(event,id) {
        event.preventDefault();

        deleteUser(id)
        .then(response => {
            if(response) {
                alert("Deleted Staff Sucessfully. ");
                this.props.history.push("/staff");
            } else {
                alert("Failed to delete Staff User. Please try again.");
            }
        }).catch(error => {
            alert("Failed to delete Staff User. Please try again.");
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
  
  
  loadAllStaff() {
    getAllStaff()
    .then(response => {
      this.setState({
        staffs: response,
      });
    }).catch(error => {
      this.setState({
        isLoading: false
      });  
    });
  }
  
  componentDidMount() {
    this.loadCurrentUser();
    this.loadAllStaff();
  }


    render() {

        return (
            <div className="staff-container">
                <h3>Staff List</h3>
                <div className="new-staff-content">
                {this.state.staffs.length > 0 ? ( 
                        
                    <Table >
                        <tbody>
                        {this.state.staffs.map(item => (
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.username}</td>
                                <td> <Link className='link' to={{ pathname: "/staffedit/"+item.id,state: item.id}}>Edit Staff</Link> </td>
                                <td> <Button type="primary" 
                                htmlType="submit" 
                                size="large" onClick={(event) => this.deleteUser(event,item.id)}
                                className="create-staff-form-button">Delete User</Button> </td>
                            </tr>
                          ))}
                        </tbody> 
                    </Table>  
                    ): null
                }
                {this.state.staffs.length === 0 ? (
                        <div className="no-staff-found">
                            <span>No Staff found.</span>
                        </div>    
                    ): null
                }
                </div>
                <h3>Create New Staff</h3>
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
                            autoComplete="off" value={this.state.username.value} onBlur={this.validateUsernameAvailability}
                            onChange={(event) => this.handleInputChange(event, this.validateUsername)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="signup-form.password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" isValid={this.state.password.isValid}
                            autoComplete="off" value={this.state.password.value}

                            onChange={(event) => this.handleInputChange(event, this.validatePassword)} />
                        </Form.Group>

                        <Form.Group className="staff-form-row">
                            <Button type="primary" 
                                htmlType="submit" 
                                size="large" 
                                disabled={this.isFormInvalid()}
                                className="create-staff-form-button">Create User</Button>
                        </Form.Group>
                    </Form>
                   
                </div> 
                  
            </div>
        );
    }
}

export default withRouter(Staff);