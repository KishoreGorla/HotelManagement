import React, { Component } from 'react';
import { getAllRooms, createRoom ,deleteRoom,getCurrentUser } from '../util/APIUtils';
import { Link, withRouter } from 'react-router-dom';
import { Form, Button, Table, Col, Row} from 'react-bootstrap';
import './Rooms.css'

class Room extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomNum: {
                value: ''
            },
            availability: {
                value:""
            },
            guestsAllowed: {
                value: ''
            },
            initialPrice: {
                value:""
            },
            extensionPrice:{
                value:""
            },
            rooms:{}
        };
        this.handleInputChange = this.handleInputChange.bind(this);

        this.handleRoomNumChange = this.handleRoomNumChange.bind(this);
        this.handleAvailabilityChange = this.handleAvailabilityChange.bind(this);
        this.handleGuestsAllowedChange = this.handleGuestsAllowedChange.bind(this);
        this.handleInitialPriceChange = this.handleInitialPriceChange.bind(this);
        this.handleExtensionPriceChange = this.handleExtensionPriceChange.bind(this);
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

    validateRoomNum = (text) => {
        if(text.length === 0) { return { isValid: 'error', errorMsg: 'Please enter Room Num' }
        } else { return { isValid: 'success', errorMsg: null }  }
    }
    
    validateAvaliablility = (text) => {
        if(text.length === 0) { return { isValid: 'error', errorMsg: 'Please enter Avaliablility' }
        } else { return { isValid: 'success', errorMsg: null }  }
    }
    
    validateGuestsAllowed = (text) => {
        if(text.length === 0) { return { isValid: 'error', errorMsg: 'Please enter GuestsAllowed' }
        } else { return { isValid: 'success', errorMsg: null }  }
    }

    validateInitialPrice = (text) => {
        if(text.length === 0) { return { isValid: 'error', errorMsg: 'Please enter InitialPrice' }
        } else { return { isValid: 'success', errorMsg: null }  }
    }

    validateExtensionPrice = (text) => {
        if(text.length === 0) { return { isValid: 'error', errorMsg: 'Please enter ExtensionPrice' }
        } else { return { isValid: 'success', errorMsg: null }  }
    }
    

    handleRoomNumChange(event) {
        const value = event.target.value;
        this.setState({
            name: {
                value: value,
                ...this.validateRoomNum(value)
            }
        });
    }

    handleAvailabilityChange(event) {
        const value = event.target.value;
        this.setState({
            email: {
                value: value,
                ...this.validateAvaliablility(value)
            }
        });
    }

    handleGuestsAllowedChange(event) {
        const value = event.target.value;
        this.setState({
            gender: {
                value: value,
                ...this.validateGuestsAllowed(value)
            }
        });
    }
    
    handleInitialPriceChange(event) {
        const value = event.target.value;
        this.setState({
            address: {
                value: value,
                ...this.validateInitialPrice(value)
            }
        });
    }
    
    handleExtensionPriceChange(event) {
        const value = event.target.value;
        this.setState({
            phoneNumber: {
                value: value,
                ...this.validateExtensionPrice(value)
            }
        });
    }
    

    handleSubmit(event) {
        event.preventDefault();
    
        const createRoomRequest = {
            roomNum: this.state.roomNum.value,
            availability: this.state.availability.value,
            guestsAllowed: this.state.guestsAllowed.value,
            initialPrice: this.state.initialPrice.value,
            extensionPrice: this.state.extensionPrice.value,
        };
        createRoom(createRoomRequest)
        .then(response => {
            if( null != response  && null!= response.id) {
                alert("Created Room Sucessfully. ");
                this.loadAllRooms();
            } else {
                alert("Failed to create room. Please try again.");
            }
        }).catch(error => {
            alert("Failed to create room. Please try again.");
        });
    }

    deleteRoom(event,id) {
        event.preventDefault();
        deleteRoom(id)
        .then(response => {
            if(response) {
                alert("Deleted Room Sucessfully. ");
                this.loadAllRooms();
            } else {
                alert("Failed to delete Room. Please try again.");
            }
        }).catch(error => {
            alert("Failed to delete Room. Please try again.");
        });
    }

    isFormInvalid() {
        if(this.state.roomNum.isValid !== 'success') {
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
  
  
  loadAllRooms() {
    getAllRooms()
    .then(response => {
      this.setState({
        rooms: response,
      });
    }).catch(error => {
      this.setState({
        isLoading: false
      });  
    });
  }
  
  componentDidMount() {
    this.loadCurrentUser();
    this.loadAllRooms();
  }


    render() {
        return (
            <div className="room-container">
                <h3>Room List</h3>
                <div className="new-room-content">
                {this.state.rooms.length > 0 ? ( 
                        
                    <Table >
                        <thead><tr>
                                <td>Room Num</td>
                                <td>Avaliablity</td>
                                <td>Guests Allowed</td>
                                <td>Initial Price</td>
                                <td>Extension Price</td>
                                <td>Edit </td>
                                <td> Delete </td>
                            </tr></thead>
                        <tbody>
                        {this.state.rooms.map(item => (
                            <tr>
                                <td>{item.roomNum}</td>
                                <td>{item.availability}</td>
                                <td>{item.guestsAllowed}</td>
                                <td>{item.initialPrice}</td>
                                <td>{item.extensionPrice}</td>
                                <td> <Link className='link' to={{ pathname: "/roomedit/"+item.id,state: item.id}}>Edit room</Link> </td>
                                <td> <Button type="primary" 
                                htmlType="submit" 
                                size="large" onClick={(event) => this.deleteRoom(event,item.id)}
                                className="create-room-form-button">Delete Room</Button> </td>
                            </tr>
                          ))}
                        </tbody> 
                    </Table>  
                    ): null
                }
                {this.state.rooms.length === 0 ? (
                        <div className="no-room-found">
                            <span>No room found.</span>
                        </div>    
                    ): null
                }
                </div>
                <h3>Create New room</h3>
                <div className="create-room-content">
                    <Form onSubmit={this.handleSubmit} className="create-room-form">
                         
                        <Form.Group  as={Row} className="mb-3" controlId="signup-form.name">
                            <Form.Label column sm="3">Room Number</Form.Label>
                            <Col sm="9">
                            <Form.Control type="text" name="roomNum" isValid={this.state.roomNum.isValid}
                            autoComplete="off" value={this.state.roomNum.value} 
                            onChange={(event) => this.handleInputChange(event, this.validateRoomNum)} />
                            </Col>
                        </Form.Group>

                        <Form.Group  as={Row} className="mb-3" controlId="signup-form.availability">
                            <Form.Label column sm="3">Availability</Form.Label>
                            <Col sm="9">
                                <Form.Control type="text" name="availability" isValid={this.state.availability.isValid}
                            autoComplete="off" value={this.state.availability.value}
                            onChange={(event) => this.handleInputChange(event, this.validateAvaliablility)} />
                                </Col>
                        </Form.Group>

                        <Form.Group  as={Row} className="mb-3" controlId="signup-form.guestsAllowed">
                            <Form.Label column sm="3">GuestsAllowed</Form.Label>
                            <Col sm="9">
                                <Form.Control type="text" name="guestsAllowed" isValid={this.state.guestsAllowed.isValid}
                            autoComplete="off" value={this.state.guestsAllowed.value}
                            onChange={(event) => this.handleInputChange(event, this.validateGuestsAllowed)} />
                                </Col>
                        </Form.Group>

                        <Form.Group  as={Row} className="mb-3" controlId="signup-form.initialPrice">
                            <Form.Label column sm="3">InitialPrice</Form.Label>
                            <Col sm="9">
                                <Form.Control type="text" name="initialPrice" isValid={this.state.initialPrice.isValid}
                            autoComplete="off" value={this.state.initialPrice.value} 
                            onChange={(event) => this.handleInputChange(event, this.validateInitialPrice)} />
                                </Col>
                        </Form.Group>

                        <Form.Group  as={Row} className="mb-3" controlId="signup-form.company">
                            <Form.Label column sm="3">ExtensionPrice</Form.Label>
                            <Col sm="9">
                                <Form.Control type="text" name="extensionPrice" isValid={this.state.extensionPrice.isValid}
                            autoComplete="off" value={this.state.extensionPrice.value} 
                            onChange={(event) => this.handleInputChange(event, this.validateExtensionPrice)} />
                                </Col>
                        </Form.Group>

                        <Form.Group  as={Row} className="room-form-row">
                            <Button type="primary" 
                                htmlType="submit" 
                                size="large" 
                                disabled={this.isFormInvalid()}
                                className="create-room-form-button">Create Room</Button>
                        </Form.Group>
                    </Form>
                   
                </div> 
                  
            </div>
        );
    }
}

export default withRouter(Room);