import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Button, Table, Col, Row} from 'react-bootstrap';
import { getCurrentUser ,getRoomDetails,reserveRoom} from '../util/APIUtils';
import './Reservation.css'

class Reservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkinDate: {
                value: ''
            },
            checkoutDate: {
                value:""
            },
            guests:{
                value:""
            },
            roomNum: {
                value: ''
            },
            guestsAllowed: {
                value: ''
            },
            initialPrice: {
                value:""
            },
            children: {
                value: ''
            },
            nights: {
                value:""
            },
            rooms:{}
        };
        this.handleInputChange = this.handleInputChange.bind(this);

        this.handleChildrenChange = this.handleChildrenChange.bind(this);
        this.handleNightsChange = this.handleNightsChange.bind(this);

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

    validateChildren = (text) => {
        if(text.length === 0) {
            return {
                isValid: 'error',
                errorMsg: 'Please enter children'
            }
        } else {
            return {
                isValid: 'success',
                errorMsg: null
            }
        }
    }

    
    validateNights = (text) => {
        if(text.length === 0) {
            return {
                isValid: 'error',
                errorMsg: 'Please enter number of nights!'
            }
        } else {
            return {
                isValid: 'success',
                errorMsg: null
            }
        }
    }

    handleChildrenChange(event) {
        const value = event.target.value;
        this.setState({
            firstname: {
                value: value,
                ...this.validateChildren(value)
            }
        });
    }

    handleNightsChange(event) {
        const value = event.target.value;
        this.setState({
            lastname: {
                value: value,
                ...this.validateNights(value)
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault(); 
       let bookingRequest  ={
            roomNum:this.state.roomNum.value,
            children:this.state.children.value,
            adults:this.state.guests.value,
            checkin : this.state.checkinDate.value,
            checkout : this.state.checkoutDate.value,
            nights:this.state.nights.value,
            roomCost:this.state.initialPrice.value
        }
        reserveRoom(bookingRequest)
        .then(response => {
            console.log(response);
            if( null != response ) {
                alert("Your booking is confirmed. Reference ID is : "+response.id);
                this.props.history.push("/searchrooms");
            } else {
                alert("Failed to book. Please try again.");
                this.props.history.push("/searchrooms");
            }
        }).catch(error => {
            alert("Failed to book. Please try again.");
                this.props.history.push("/searchrooms");
        });
        
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
  
  loadRoomDetails() {
    this.setState({
        checkinDate: {
            value: this.props.match.params.checkinDate,
        }
    });
    this.setState({
        checkoutDate: {
            value: this.props.match.params.checkoutDate,
        }
    });
    this.setState({
        guests: {
            value: this.props.match.params.guests,
        }
    });
    const id = this.props.match.params.id;
    getRoomDetails(id)
    .then(response => {
        this.setState({
            roomNum: {
                value: response.roomNum,
            }
        });
        this.setState({
            initialPrice: {
                value: response.initialPrice,
            }
        });
        this.setState({
            guestsAllowed: {
                value: response.guestsAllowed,
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
    this.loadRoomDetails();
  }

    render() {
        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
          };
          const tailLayout = {
            wrapperCol: { offset: 8, span: 16 },
          };

        return (
            <div className="reservation-container">
                <h3>Confirm Booking</h3>
                <div className="new-appointment-content">
                    <Table>
                        <tbody>
                            <tr>
                                <td>{this.props.match.params.checkinDate}</td>
                                <td>{this.props.match.params.checkoutDate}</td>
                                <td>{this.props.match.params.guests}</td>
                            </tr>
                        </tbody> 
                    </Table>
                    <Form {...layout} onSubmit={this.handleSubmit} className="create-appointment-form">
                        <Form.Group  as={Row} className="mb-3" controlId="signup-form.name">
                            <Form.Label column sm="3">Checkin Date</Form.Label>
                            <Col sm="9">
                                <Form.Control type="text" name="checkinDate" readOnly value={this.state.checkinDate.value} />
                            </Col>
                        </Form.Group>

                        <Form.Group  as={Row} className="mb-3" controlId="signup-form.guestsAllowed">
                            <Form.Label column sm="3">Checkout Date</Form.Label>
                            <Col sm="9">
                                <Form.Control type="text" name="checkoutDate" readOnly value={this.state.checkoutDate.value} />
                            </Col>
                        </Form.Group>

                        <Form.Group  as={Row} className="mb-3" controlId="signup-form.initialPrice">
                            <Form.Label column sm="3">Guests</Form.Label>
                            <Col sm="9">
                                <Form.Control readOnly type="text" name="guests" value={this.state.guests.value} />
                            </Col>
                        </Form.Group>
                        <Form.Group  as={Row} className="mb-3" controlId="signup-form.name">
                            <Form.Label column sm="3">Room Number</Form.Label>
                            <Col sm="9">
                                <Form.Control type="text" name="roomNum" readOnly value={this.state.roomNum.value} />
                            </Col>
                        </Form.Group>

                        <Form.Group  as={Row} className="mb-3" controlId="signup-form.guestsAllowed">
                            <Form.Label column sm="3">Max GuestsAllowed</Form.Label>
                            <Col sm="9">
                                <Form.Control type="text" name="guestsAllowed" readOnly value={this.state.guestsAllowed.value} />
                            </Col>
                        </Form.Group>

                        <Form.Group  as={Row} className="mb-3" controlId="signup-form.initialPrice">
                            <Form.Label column sm="3">InitialPrice</Form.Label>
                            <Col sm="9">
                                <Form.Control readOnly type="text" name="initialPrice" value={this.state.initialPrice.value} />
                            </Col>
                        </Form.Group>

                        <Form.Group  as={Row} className="mb-3" controlId="signup-form.initialPrice">
                            <Form.Label column sm="3">Children</Form.Label>
                            <Col sm="9">
                                <Form.Control type="text" name="children" value={this.state.children.value} onChange={(event) => this.handleInputChange(event, this.validateChildren)} />
                            </Col>
                        </Form.Group>
                        
                        <Form.Group  as={Row} className="mb-3" controlId="signup-form.initialPrice">
                            <Form.Label column sm="3">Nights</Form.Label>
                            <Col sm="9">
                                <Form.Control type="text" name="nights" value={this.state.nights.value} onChange={(event) => this.handleInputChange(event, this.validateNights)} />
                            </Col>
                        </Form.Group>

                        <Form.Group {...tailLayout}  className="appointment-form-row">
                            <Button type="primary" 
                                htmlType="submit" 
                                size="large" 
                                className="create-appointment-form-button">Confirm</Button>
                        </Form.Group>
                    </Form>
                   
                </div> 
                  
            </div>
        );
    }
}

export default withRouter(Reservation);