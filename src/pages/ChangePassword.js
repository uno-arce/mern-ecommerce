import {Container, Row, Col, Button, Form, InputGroup} from 'react-bootstrap';
import {useState, useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';

import Swal from 'sweetalert2';

export default function ChangePassword() {
	const [newPassword, setNewPassword] = useState('');
	const [confirmNewPassword, setConfirmNewPassword] = useState('');
	const [isDisabled, setIsDisabled] = useState(true);

	useEffect(() => {
		if(newPassword !== "" && confirmNewPassword !== "") {
			setIsDisabled(false);
		} else {
			setIsDisabled(true);
		}
	}, [newPassword, confirmNewPassword]);

	const handleUpdate = () => {
		fetch(`${process.env.REACT_APP_API_URL}/users/reset-password`, {
		  method: 'PUT',
		  headers: {
		    'Content-Type': 'application/json',
		    Authorization: `Bearer ${localStorage.getItem('token')}`,
		  },
		  body: JSON.stringify({
		  	newPassword: newPassword,
		  	confirmNewPassword: confirmNewPassword,
		  }),
		})
		.then((result) => result.json())
		.then((data) => {
		  if (data) {
		    Swal.fire({
		    	title: "Update Successful",
		    	icon: "success",
		    })
		  } else {
		    Swal.fire({
		    	title: "Update Failed",
		    	icon: "warning",
		    	text: "Please try Again"
		    })
		  }
		})
	}

	return(
		<>
			<Container fluid>
				<Row className='d-flex justify-content-center'>
					<Col className='mt-5 col-3'>
						<h1>Change Password</h1>
						<Form.Group className='mt-5'>
							<Form.Label>New Password</Form.Label>
							<Form.Control 
							type="password"
							placeholder='Enter new password'
							value = {newPassword} 
							required 
							onChange = {event => {
								setNewPassword(event.target.value);
							}} 
							 />
						</Form.Group>
						<Form.Group className='mt-4'>
							<Form.Label>Confirm New Password</Form.Label>
							<Form.Control 
							type="password" 
							placeholder='Enter new password'
							value = {confirmNewPassword} 
							required 
							onChange = {event => {
								setConfirmNewPassword(event.target.value);
							}} 
							 />
						</Form.Group>
						<div className='d-flex justify-content-start mt-5' style={{ maxWidth: '450px' }}>
							<Button as = {Link} to = '/profile' variant="secondary" className='flex-fill me-2'>Cancel</Button>
							<Button onClick={handleUpdate} disabled={isDisabled} className='flex-fill'>Update</Button>
						</div>
					</Col>
				</Row>
			</Container>
		</>
	);
}