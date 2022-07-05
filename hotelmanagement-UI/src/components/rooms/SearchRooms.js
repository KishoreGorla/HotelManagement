import React, { Component } from 'react';
import { searchRoomDetails } from '../util/APIUtils';
import { Link, withRouter } from 'react-router-dom';
import { Form, Button, Table, Col, Row} from 'react-bootstrap';
import './Rooms.css';

class SearchRooms extends Component {
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
            rooms: {}
        };
        this.handleInputChange = this.handleInputChange.bind(this);

        this.handleCheckinDateChange = this.handleCheckinDateChange.bind(this);
        this.handleCheckoutDateChange = this.handleCheckoutDateChange.bind(this);
        this.handleGuestsChange = this.handleGuestsChange.bind(this);

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

    validateCheckinDate = (text) => {
        if(text.length === 0) { return { isValid: 'error', errorMsg: 'Please enter checkin Date' }
        } else { return { isValid: 'success', errorMsg: null }  }
    }
    
    validateCheckoutDate= (text) => {
        if(text.length === 0) { return { isValid: 'error', errorMsg: 'Please enter Checkoutdate' }
        } else { return { isValid: 'success', errorMsg: null }  }
    }
    
    validateGuests = (text) => {
        if(text.length === 0) { return { isValid: 'error', errorMsg: 'Please enter Guests' }
        } else { return { isValid: 'success', errorMsg: null }  }
    }

    handleCheckinDateChange(event) {
        const value = event.target.value;
        this.setState({
            destination: {
                value: value,
                ...this.validateCheckinDate(value)
            }
        });
    }

    handleCheckoutDateChange(event) {
        const value = event.target.value;
        this.setState({
            source: {
                value: value,
                ...this.validateCheckoutDate(value)
            }
        });
    }

    handleGuestsChange(event) {
        const value = event.target.value;
        this.setState({
            travelDate: {
                value: value,
                ...this.validateGuests(value)
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();  
        console.log(this.state.checkinDate.value,this.state.checkoutDate.value,this.state.guests.value);
        searchRoomDetails(this.state.checkinDate.value,this.state.checkoutDate.value,this.state.guests.value)
        .then(response => {
            console.log(response);
            if( Array.isArray(response) && response.length ) {
                console.log(response);
                this.setState({
                    rooms: response
                });
            } else {
                this.setState({
                    rooms: response
                });
            }
        }).catch(error => {
            alert("Failed to get room details. Please Try again");
        });
        
    }

    isFormInvalid() {
        if(this.state.guests.isValid !== 'success') {
            return true;
        }
    }

    render() {
      
        return (
            <div className="search-container">
                <h3>Rooms Search</h3>

                    <Form onSubmit={this.handleSubmit} className="searchform">
                <Row>
                        <Col sm="3">
                        <Form.Group className="mb-3" column sm="3" controlId="signup-form.checkinDate">
                            <Form.Label >CheckIn Date</Form.Label>
                            <Form.Control type="date" name="checkinDate" isValid={this.state.checkinDate.isValid}
                            autoComplete="off" value={this.state.checkinDate.value}
                            onChange={(event) => this.handleInputChange(event, this.validateCheckinDate)} />
                        </Form.Group>
                            </Col>
                            <Col sm="3">
                        <Form.Group className="mb-4" column sm="3" controlId="signup-form.checkoutDate">
                            <Form.Label >Checkout date</Form.Label>
                            <Form.Control  type="date" name="checkoutDate" isValid={this.state.checkoutDate.isValid}
                            autoComplete="off" value={this.state.checkoutDate.value}
                            onChange={(event) => this.handleInputChange(event, this.validateCheckoutDate)} />
                        </Form.Group>
                            </Col>
                            <Col sm="3">
                        <Form.Group className="mb-4" column sm="3" controlId="signup-form.guests">
                            <Form.Label>Guests</Form.Label>
                            <Form.Control type="text" name="guests" isValid={this.state.guests.isValid}
                            autoComplete="off" value={this.state.guests.value}
                            onChange={(event) => this.handleInputChange(event, this.validateGuests)} />
                        </Form.Group>
                            </Col>
                            <Col sm="3">
                        <Form.Group className="mb-3" column sm="3" >
                            <Button  type="primary" 
                                htmlType="submit" 
                                size="lg"
                                disabled={this.isFormInvalid()}
                                className="create-room-form-button">Search</Button>
                        </Form.Group>
                        </Col>
                                </Row>
                    </Form>

                    {this.state.rooms.length > 0 ? ( 
                        
                        <Table >
                            <thead><tr>
                                <td>Room Num</td>
                                <td>Max Guests Allowed</td>
                                <td>Initial Price</td>
                                <td>Book </td>
                            </tr></thead>
                        
                        <tbody>
                        {this.state.rooms.map(item => (
                            <tr>
                                <td>{item.roomNum}</td>
                                <td>{item.guestsAllowed}</td>
                                <td>{item.initialPrice}</td>
                                <td> <Link className='link' to={{ pathname: "/reservation/"+item.id+"/"+this.state.checkinDate.value+"/"+this.state.checkoutDate.value+"/"+this.state.guests.value,state: item.id}}>Book Room</Link> </td>
                            </tr>
                          ))}
                        </tbody> 
                    </Table>  
                    ): null
                }
                {this.state.rooms.length === 0 ? (
                        <div className="no-rooms-found">
                            <span>No Rooms Available.</span>
                        </div>    
                    ): null
                }
                </div> 
                  
        );
    }
}

export default withRouter(SearchRooms);