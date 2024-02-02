import {Container, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import {Link, NavLink} from 'react-router-dom';

import {useState, useContext} from 'react';

import UserContext from '../UserContext.js';

export default function AppNavbar() {
	const {user} = useContext(UserContext);

	return(
	<Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand as = {NavLink} to = "/" className="mx-4">Db</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-start">
          <Nav className="me-auto">
            <Nav.Link as = {NavLink} to = "/" className="mx-3">Home</Nav.Link>
            <Nav.Link as = {NavLink} to = "/shop" className="mx-3">Shop</Nav.Link>
          </Nav>
          {
          	(user.id !== null) ?
          	<>
          	{
          		(user.role !== 'Admin') ?
          		<>
          		<Nav className="ms-auto mx-4">
          		  <Nav.Link as = {NavLink} to = "/profile" className="mx-3">Profile</Nav.Link>
          		  <Nav.Link as = {NavLink} to = "/logout" className="mx-3">Logout</Nav.Link>
          		</Nav>
          		</>	 

          		:
              <>
          		<Nav className="ms-auto mx-4">
          		  <Nav.Link as = {NavLink} to = "/dashboard" className="mx-3">Dashboard</Nav.Link> 
          		  <Nav.Link as = {NavLink} to = "/profile" className="mx-3">Profile</Nav.Link>
          		  <Nav.Link as = {NavLink} to = "/logout" className="mx-3">Logout</Nav.Link>
          		</Nav>
              </>
          	}
          	</>

          	:

          	<>
          		<Nav className="ms-auto mx-4">
          		  <Nav.Link as = {NavLink} to = '/register' className="mx-3">Register</Nav.Link>
          		  <Nav.Link as = {NavLink} to = '/login' className="mx-3">Login</Nav.Link>
          		</Nav>
          	</>
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
	);
}