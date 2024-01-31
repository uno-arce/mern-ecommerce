import {Button, Form, Container, Row, Col} from 'react-bootstrap';
import {useState, useEffect, useContext} from 'react';

import {Navigate, useNavigate} from 'react-router-dom';
import UserContext from '../UserContext.js';

import Swal from 'sweetalert2';

export default function Register() {
	const {user} = useContext(UserContext);
	const navigate = useNavigate();

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [username, setUsername] = useState("");
	const [mobileNumber, setMobileNumber] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [isActive, setIsActive] = useState(true);

	useEffect(() => {
		if(firstName !== "" && lastName !== "" && username !== "" && mobileNumber !== "" && email !== "" && password !== "" && confirmPassword !== "" && password === confirmPassword) {
			setIsActive(false);
		} else {
			setIsActive(true);
		}
	}, [firstName, lastName, username, mobileNumber, email, password, confirmPassword]);

	function registerUser(event) {
		event.preventDefault();

		fetch("http://ec2-3-16-181-70.us-east-2.compute.amazonaws.com/b2/users/register", {
			method: 'POST',
			headers: {
				"Content-Type" : "application/json"
			},
			body: JSON.stringify({
				firstName: firstName,
				lastName: lastName,
				username: username,
				mobileNumber: mobileNumber,
				email: email,
				password: password,
			})
		})
		.then(result => result.json())
		.then(data => {
			if(data) {
				Swal.fire({
					icon: "success",
					text: "You are now registered."
				})

				setFirstName('');
				setLastName('');
				setUsername('');
				setMobileNumber('');
				setEmail('');
				setPassword('');
				setConfirmPassword('');

				navigate('/login');
			} else {
				Swal.fire({
					icon: "error",
					text: "Email or Username was already taken."
				})
			}
		})
	}

	return(
		(user.id !== null) ? <Navigate to = '/courses'/>
		:
		<Container fluid>
			<Row>
				<Col className='col-3 p-4'>
					<h2 className='text-center'>Digibees</h2>
					<h2 className='text-center my-5'>Register an account</h2>
					<Form onSubmit={event => registerUser(event)}>
					  <Form.Group className="mb-3" controlId="firstName">
					    <Form.Label>First Name</Form.Label>
					    <Form.Control type="text" 
					    required
					    value = {firstName} 
					    onChange = {event => {
					    	setFirstName(event.target.value);
					    }}
					     />
					  </Form.Group>

					  <Form.Group className="mb-3" controlId="lastName">
					    <Form.Label>Last Name</Form.Label>
					    <Form.Control type="text"
					    required
					    value = {lastName} 
					    onChange = {event => {
					    	setLastName(event.target.value);
					    }}
					     />
					  </Form.Group>

					  <Form.Group className="mb-3" controlId="username">
					    <Form.Label>Username</Form.Label>
					    <Form.Control type="text"
					    required
					    value = {username} 
					    onChange = {event => {
					    	setUsername(event.target.value);
					    }}
					     />
					  </Form.Group>

					  <Form.Group className="mb-3" controlId="mobileNumber">
					    <Form.Label>Mobile Number</Form.Label>
					    <Form.Control type="text"
					    required
					    value = {mobileNumber} 
					    onChange = {event => {
					    	setMobileNumber(event.target.value);
					    }}
					     />
					  </Form.Group>

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

					  <Form.Group className="mb-3" controlId="confirmPassword">
					    <Form.Label>Confirm Password</Form.Label>
					    <Form.Control type="text"
					    required
					    value = {confirmPassword} 
					    onChange = {event => {
					    	setConfirmPassword(event.target.value);
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