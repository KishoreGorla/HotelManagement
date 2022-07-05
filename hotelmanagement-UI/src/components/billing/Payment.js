import React, { Component } from 'react';
import { getBillingDetails,getCurrentUser,generateBill, makepayment } from '../util/APIUtils';
import { Link, withRouter } from 'react-router-dom';
import { Form, Button, Table, Col, Row} from 'react-bootstrap';
import './Billing.css'

class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: {
                value: ''
            },billingId: {
                value: ''
            },
            totalCost: {
                value:""
            },
            cardNumber: {
                value: ''
            },
            cardHolderName: {
                value:""
            }
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCardNumberChange = this.handleCardNumberChange.bind(this);
        this.handleCardHolderNameChange = this.handleCardHolderNameChange.bind(this);
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

    validateCardNumber = (text) => {
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

    
    validateCardHolderName = (text) => {
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

    handleCardNumberChange(event) {
        const value = event.target.value;
        this.setState({
            taxes: {
                value: value,
                ...this.validateTaxes(value)
            }
        });
    }

    handleCardHolderNameChange(event) {
        const value = event.target.value;
        this.setState({
            services: {
                value: value,
                ...this.validateServices(value)
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const id = this.props.match.params.id;
        const paymentRequest = {
            billingId: id,
            total: this.state.totalCost.value,
            cardNumber: this.state.cardNumber.value,
            cardHolderName: this.state.cardHolderName.value,
        };
        makepayment(paymentRequest)
        .then(response => {
            if( null != response  && null!=response.id) {
                alert("Payment made Sucessfully. ");
                this.props.history.push("/searchrooms");
            } else {
                alert("Failed to make payment. Please try again.");
            }
        }).catch(error => {
            alert("Failed to make payment. Please try again.");
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
  
  getBillingDetails(){
    const id = this.props.match.params.id;
    getBillingDetails(id)
    .then(response => {
        this.setState({
            id: {
                value: response.id
            }
        });
        this.setState({
            totalCost: {
                value: response.total
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
    this.getBillingDetails();
  }


    render() {

        return (
            <div className="guest-container">
                <h3>Update guest</h3>
                <div className="create-guest-content">
                    <Form onSubmit={this.handleSubmit} className="create-guest-form">
                    <Form.Group  as={Row} className="mb-3" controlId="signup-form.name">
                            <Form.Label column sm="3">Billing Reference</Form.Label>
                            <Col sm="9">
                            <Form.Control type="text" name="id" readOnly
                            autoComplete="off" value={this.state.id.value} />
                            </Col>
                        </Form.Group>

                        <Form.Group  as={Row} className="mb-3" controlId="signup-form.email">
                            <Form.Label column sm="3">Total Cost</Form.Label>
                            <Col sm="9">
                                <Form.Control type="text" name="totalCost" readOnly
                            autoComplete="off" value={this.state.totalCost.value} />
                                </Col>
                        </Form.Group>

                        <Form.Group  as={Row} className="mb-3" controlId="signup-form.gender">
                            <Form.Label column sm="3">Card Number</Form.Label>
                            <Col sm="9">
                                <Form.Control type="text" name="cardNumber" isValid={this.state.cardNumber.isValid}
                            autoComplete="off" value={this.state.cardNumber.value}
                            onChange={(event) => this.handleInputChange(event, this.validateCardNumber)} />
                                </Col>
                        </Form.Group>

                        <Form.Group  as={Row} className="mb-3" controlId="signup-form.address">
                            <Form.Label column sm="3">Card Holder Name</Form.Label>
                            <Col sm="9">
                                <Form.Control type="text" name="cardHolderName" isValid={this.state.cardHolderName.isValid}
                            autoComplete="off" value={this.state.cardHolderName.value} 
                            onChange={(event) => this.handleInputChange(event, this.validateCardHolderName)} />
                                </Col>
                        </Form.Group>

                        <Form.Group className="guest-form-row">
                            <Button type="primary" 
                                htmlType="submit" 
                                size="large" 
                                className="create-guest-form-button">Make Payment</Button>
                        </Form.Group>
                    </Form>
                   
                </div> 
                  
            </div>
        );
    }
}

export default withRouter(Payment);