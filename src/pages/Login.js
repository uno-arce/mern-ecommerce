import {Button, Form, Container, Row, Col} from 'react-bootstrap';
import {useState, useEffect, useContext} from 'react';
import AppFooter from '../components/AppFooter.js';
import UserContext from '../UserContext.js';
import {Navigate} from 'react-router-dom';

import Swal from 'sweetalert2';

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [isActive, setIsActive] = useState(true);

	const {user, setUser} = useContext(UserContext);

	useEffect(() => {
		if(email !== "" && password !== "" ) {
			setIsActive(false);
		} else {
			setIsActive(true);
		}
	}, [email, password]);

	function loginUser(event) {
		event.preventDefault();

		fetch("http://ec2-3-16-181-70.us-east-2.compute.amazonaws.com/b2/users/login", {
			method: 'POST',
			headers: {
				"Content-Type" : "application/json"
			},
			body: JSON.stringify({
				email: email,
				password: password,
			})
		})
		.then(result => result.json())
		.then(data => {

			if(data.accessToken) {
				// console.log(data.accessToken);
				localStorage.setItem('token', data.accessToken);
				retrieveUserDetails(data.accessToken);
				Swal.fire({
					title: "Login Successfull",
					icon: "success",
					text: "Happy Shopping!"
				})
				setEmail('');
				setPassword('');
			} else {
				Swal.fire({
					title: "Authentication Failed",
					icon: 'error',
					text: "Check your credentials"
				})
				setEmail('');
				setPassword('');
			}
		})
	}

	const retrieveUserDetails = (token) => {
		fetch('http://ec2-3-16-181-70.us-east-2.compute.amazonaws.com/b2/users/details', {
			method: "POST",
			headers: {
				'Authorization': `Bearer ${token}`
			}
		})
		.then(result => result.json())
		.then(data => {
			setUser({
				id: data._id,
				role: data.role
			})
		})
	}

	return(
		(user.id !== null) ? <Navigate to = {user.role !== 'Admin' ? '/' : '/dashboard'}/>
		:
		<>
		<Container fluid id='login-container'>
			<Row>
				<Col>
					<Container>
						<div className='d-flex justify-content-center mb-5'>
							<div className='d-flex flex-column'>
								<h2 id='login-title' className='my-5'>Login your account</h2>
								<Form onSubmit={event => loginUser(event)}>
								  <Form.Group className="mb-3" controlId="email">
								    <Form.Label>Email</Form.Label>
								    <Form.Control type="text"
								    required
								    value = {email} 
								    onChange = {event => {
								    	setEmail(event.target.value);
								    }}
								     />
								  </Form.Group>

								  <Form.Group className="mb-3" controlId="password">
								    <Form.Label>Password</Form.Label>
								    <Form.Control type="password"
								    required
								    value = {password} 
								    onChange = {event => {
								    	setPassword(event.target.value);
								    }}
								     />
								  </Form.Group>
								  <Button id='view-input-group-button' className='w-100' disabled={isActive} variant="primary" type="submit">
								    Login
								  </Button>
								</Form>
							</div>
						</div>
					</Container>
				</Col>
			</Row>
		</Container>
		<Container fluid id='login-callout'>
		</Container>
		<Container fluid id='footer'>
			<AppFooter/>
		</Container>
		</>
	);
}