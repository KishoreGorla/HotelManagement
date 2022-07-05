import React, { Component } from 'react';
import { getReservationDetails,getCurrentUser,generateBill } from '../util/APIUtils';
import { Link, withRouter } from 'react-router-dom';
import { Form, Button, Table, Col, Row} from 'react-bootstrap';
import './Billing.css'

class Billing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: {
                value: ''
            },roomNum: {
                value: ''
            },
            roomCost: {
                value:""
            },
            taxes: {
                value: '0'
            },
            services: {
                value:""
            },
            servicesCost:{
                value:"0"
            },
            totalCost:{
                value:""
            },
            staffs:{}
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleTaxesChange = this.handleTaxesChange.bind(this);
        this.handleServicesChange = this.handleServicesChange.bind(this);
        this.handleServicesCostChange = this.handleServicesCostChange.bind(this);
        this.handleTotalCostChange = this.handleTotalCostChange.bind(this);
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

    validateTaxes = (text) => {
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

    
    validateServices = (text) => {
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

    validateServicesCost = (text) => {
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

    validateTotalCost = (text) => {
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

    handleTaxesChange(event) {
        const value = event.target.value;
        this.setState({
            taxes: {
                value: value,
                ...this.validateTaxes(value)
            }
        });
    }

    handleServicesChange(event) {
        const value = event.target.value;
        this.setState({
            services: {
                value: value,
                ...this.validateServices(value)
            }
        });
    }

    handleServicesCostChange(event) {
        const value = event.target.value;
        this.setState({
            servicesCost: {
                value: value,
                ...this.validateServicesCost(value)
            }
        });
    }
    
    handleTotalCostChange(event) {
        const value = event.target.value;
        this.setState({
            totalCost: {
                value: value,
                ...this.validateTotalCost(value)
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const billRequest = {
            reservationId:this.props.match.params.id,
            roomNum: this.state.roomNum.value,
            roomCost: this.state.roomCost.value,
            taxes: this.state.taxes.value,
            services: this.state.services.value,
            servicesAmount: this.state.servicesCost.value,
            total: this.state.totalCost.value
        };
        generateBill(billRequest)
        .then(response => {
            if( null != response  && null!=response.id) {
                alert("Generated Bill Sucessfully. ");
                this.props.history.push("/payment/"+response.id);
            } else {
                alert("Failed to generate bill. Please try again.");
            }
        }).catch(error => {
            alert("Failed to generate bill. Please try again.");
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
  
  getReservationDetails(){
    const id = this.props.match.params.id;
    getReservationDetails(id)
    .then(response => {
        let totalRoomCost = parseFloat(response.roomCost)*parseInt(response.nights);
        this.setState({
            roomNum: {
                value: response.roomNum
            }
        });
        this.setState({
            roomCost: {
                value: totalRoomCost
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

  calculateTotal(event){
    event.preventDefault();

    let total = parseFloat(this.state.roomCost.value)+parseFloat(this.state.taxes.value)+parseFloat(this.state.servicesCost.value);
    this.setState({
        totalCost: {
            value: total
        }
    });
  }

  componentDidMount() {
    this.loadCurrentUser();
    this.getReservationDetails();
  }


    render() {

        return (
            <div className="guest-container">
                <h3>Update guest</h3>
                <div className="create-guest-content">
                    <Form onSubmit={this.handleSubmit} className="create-guest-form">
                    <Form.Group  as={Row} className="mb-3" controlId="signup-form.name">
                            <Form.Label column sm="3">Room Num</Form.Label>
                            <Col sm="9">
                            <Form.Control type="text" name="roomNum" readOnly
                            autoComplete="off" value={this.state.roomNum.value} />
                            </Col>
                        </Form.Group>

                        <Form.Group  as={Row} className="mb-3" controlId="signup-form.email">
                            <Form.Label column sm="3">Room Cost</Form.Label>
                            <Col sm="9">
                                <Form.Control type="text" name="roomCost" readOnly
                            autoComplete="off" value={this.state.roomCost.value} />
                                </Col>
                        </Form.Group>

                        <Form.Group  as={Row} className="mb-3" controlId="signup-form.gender">
                            <Form.Label column sm="3">Taxes</Form.Label>
                            <Col sm="9">
                                <Form.Control type="text" name="taxes" isValid={this.state.taxes.isValid}
                            autoComplete="off" value={this.state.taxes.value}
                            onChange={(event) => this.handleInputChange(event, this.validateTaxes)} />
                                </Col>
                        </Form.Group>

                        <Form.Group  as={Row} className="mb-3" controlId="signup-form.address">
                            <Form.Label column sm="3">Services</Form.Label>
                            <Col sm="9">
                                <Form.Control type="text" name="services" isValid={this.state.services.isValid}
                            autoComplete="off" value={this.state.services.value} 
                            onChange={(event) => this.handleInputChange(event, this.validateServices)} />
                                </Col>
                        </Form.Group>

                        <Form.Group  as={Row} className="mb-3" controlId="signup-form.company">
                            <Form.Label column sm="3">Services Amount</Form.Label>
                            <Col sm="9">
                                <Form.Control type="text" name="servicesCost" isValid={this.state.servicesCost.isValid}
                            autoComplete="off" value={this.state.servicesCost.value} 
                            onChange={(event) => this.handleInputChange(event, this.validateServicesCost)} />
                                </Col>
                        </Form.Group>

                        <Form.Group className="guest-form-row">
                            <Button type="primary" 
                                htmlType="button" onClick={(event) =>this.calculateTotal(event)}
                                size="large" 
                                className="create-guest-form-button">Calculate Total</Button>
                        </Form.Group>

                        <Form.Group  as={Row} className="mb-3" controlId="signup-form.phoneNumber">
                            <Form.Label column sm="3">Total Amount</Form.Label>
                            <Col sm="9">
                                <Form.Control type="text" name="totalCost" readOnly
                            autoComplete="off" value={this.state.totalCost.value}
                             />
                                </Col>
                        </Form.Group>

                        <Form.Group className="guest-form-row">
                            <Button type="primary" 
                                htmlType="submit" 
                                size="large" 
                                className="create-guest-form-button">Generate Bill</Button>
                        </Form.Group>
                    </Form>
                   
                </div> 
                  
            </div>
        );
    }
}

export default withRouter(Billing);