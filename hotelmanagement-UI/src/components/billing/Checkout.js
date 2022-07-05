import React, { Component } from 'react';
import { signup,deleteUser,getCurrentUser,getAllReservations } from '../util/APIUtils';
import { Link, withRouter } from 'react-router-dom';
import { Form, Button, Table, Col, Row} from 'react-bootstrap';
import './Billing.css'

class Checkout extends Component {
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
            reservations:{}
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
  
  
  loadBookings() {
    getAllReservations()
    .then(response => {
      this.setState({
        reservations: response,
      });
    }).catch(error => {
      this.setState({
        isLoading: false
      });  
    });
  }
  
  componentDidMount() {
    this.loadCurrentUser();
    this.loadBookings();
  }


    render() {

        return (
            <div className="staff-container">
                <h3>Reservations</h3>
                <div className="new-staff-content">
                {this.state.reservations.length > 0 ? ( 
                        
                    <Table >
                        <thead><tr>
                                <td>Room Num</td>
                                <td>Check In Date</td>
                                <td>Check Out Date</td>
                                <td> Generate Bill </td>
                            </tr></thead>
                        <tbody>
                        {this.state.reservations.map(item => (
                            <tr>
                                <td>{item.roomNum}</td>
                                <td>{item.checkin}</td>
                                <td>{item.checkout}</td>
                                <td> <Link className='link' to={{ pathname: "/generatebill/"+item.id,state: item.id}}>Checkout and Bill</Link> </td>
                                
                            </tr>
                          ))}
                        </tbody> 
                    </Table>  
                    ): null
                }
                {this.state.reservations.length === 0 ? (
                        <div className="no-staff-found">
                            <span>No reservations found.</span>
                        </div>    
                    ): null
                }
                </div>
                
            </div>
        );
    }
}

export default withRouter(Checkout);