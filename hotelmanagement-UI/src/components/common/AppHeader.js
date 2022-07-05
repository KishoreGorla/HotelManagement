import React, { Component } from 'react';
import {
    Link,
    withRouter
} from 'react-router-dom';
import './AppHeader.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
    
class AppHeader extends Component {
    constructor(props) {
        super(props);   
        this.handleMenuClick = this.handleMenuClick.bind(this);   
    }

    handleMenuClick(event,key) {
      event.preventDefault();
      if(key === "logout") {
        this.props.onLogout();
      }
    }

    render() {
      console.log(this.props.isAuthenticated);
      console.log(this.props.currentUser)
        let menuItems;
        if(this.props.currentUser) {
          let role = this.props.currentUser.role;
          if(role == "Staff"){
            menuItems = [
              <Nav.Link key="/searchrooms"><Link to={`/searchrooms`}>Search Rooms</Link></Nav.Link>,
              <Nav.Link key="/guest"><Link to={`/guest`}>Guests</Link></Nav.Link>,
              <Nav.Link key="/checkout"><Link to={`/checkout`}>Checkout</Link></Nav.Link>,
              <Nav.Link key="/logout" onClick={(event) => this.handleMenuClick(event,"logout")}>Logout</Nav.Link>
            ];
          } else if (role == "Manager"){
            menuItems = [
              <Nav.Link key="/searchrooms"><Link to={`/searchrooms`}>Search Rooms</Link></Nav.Link>,
              <Nav.Link key="/guest"><Link to={`/guest`}>Guests</Link></Nav.Link>,
              <Nav.Link key="/staff"><Link to={`/staff`}>Staff</Link></Nav.Link>,
              <Nav.Link key="/rooms"><Link to={`/rooms`}>Rooms</Link></Nav.Link>,
              <Nav.Link key="/checkout"><Link to={`/checkout`}>Checkout</Link></Nav.Link>,
              <Nav.Link key="/logout" onClick={(event) => this.handleMenuClick(event,"logout")}>Logout</Nav.Link>,
            ]; 
          } else{
            menuItems = [
              <Nav.Link key="/searchrooms"><Link to={`/searchrooms`}>Search Rooms</Link></Nav.Link>,
              <Nav.Link key="/guest"><Link to={`/guest`}>Guests</Link></Nav.Link>,
              <Nav.Link key="/staff"><Link to={`/staff`}>Staff</Link></Nav.Link>,
              <Nav.Link key="/rooms"><Link to={`/rooms`}>Rooms</Link></Nav.Link>,
              <Nav.Link key="/checkout"><Link to={`/checkout`}>Checkout</Link></Nav.Link>,
              <Nav.Link key="/logout" onClick={(event) => this.handleMenuClick(event,"logout")}>Logout</Nav.Link>,
            ]; 
          }
         
        } else {
          menuItems = [
            <Nav.Link key="/login">
              <Link to="/login">SignIn</Link>
            </Nav.Link>,
            <Nav.Link key="/signup">
              <Link to="/signup">Register</Link>
            </Nav.Link>                  
          ];
        }

        return (
            <Navbar className="app-header">
            <Container>
              <Navbar.Brand >
                <Link to="/">Hotel Management</Link>
              </Navbar.Brand>
              <Nav
                className="me-auto"
                mode="horizontal"
                selectedKeys={[this.props.location.pathname]}
                style={{ lineHeight: '50px' }} >
                {menuItems}
              </Nav>
            </Container>
          </Navbar>
        );
    }
}


export default withRouter(AppHeader);