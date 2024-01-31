import {Button, Form, Container, Row, Col} from 'react-bootstrap';
import {useState, useEffect, useContext} from 'react';

import UserContext from '../UserContext.js';
import {useNavigate, Navigate} from 'react-router-dom';

import Swal from 'sweetalert2';

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [isActive, setIsActive] = useState(true);

	const {user, setUser} = useContext(UserContext);
	const navigate = useNavigate();

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
			// console.log(data);

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
				navigate('/');
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
				isAdmin: data.isAdmin
			})
		})
	}

	return(
		(user.id !== null) ? <Navigate to = '/'/>
		:
		<Container fluid>
			<Row>
				<Col className='col-3 p-4'>
					<h2 className='text-center'>Digibees</h2>
					<h2 className='text-center my-5'>Login your account</h2>
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
					    <Form.Control type="text"
					    required
					    value = {password} 
					    onChange = {event => {
					    	setPassword(event.target.value);
					    }}
					     />
					  </Form.Group>
					  <Button disabled={isActive} variant="primary" type="submit">
					    Submit
					  </Button>
					</Form>
				</Col>
				<Col>
				</Col>
			</Row>
		</Container>
	);
}