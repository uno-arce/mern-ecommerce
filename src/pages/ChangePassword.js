import {Container, Row, Col, Button, Form, InputGroup, Dropdown, DropdownButton} from 'react-bootstrap';
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
		fetch(`${process.env.REACT_APP_API_BASE_URL}/users/reset-password`, {
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
			<Container fluid id='change-profile-header'>
				<Row>
					<Col className='py-5'>
						<Container className='d-flex justify-content-between'>
							<h2 id='profile-name'>Change Password</h2>
							<div>
								<InputGroup className='mb-4'>
								  <InputGroup.Text id='view-input-group-icon' className='bi bi-pencil'>
								  </InputGroup.Text>
								  <DropdownButton
								    id='product-button'
								    title=''
								  >
								    <Dropdown.Item as = {Link} to = '/profile'>View Profile</Dropdown.Item>
								    <Dropdown.Item as = {Link} to = '/profile/change-password'>Change Password</Dropdown.Item>
								  </DropdownButton>
								</InputGroup>
							</div>
						</Container>
						<Container>
							<div className='d-flex flex-column' style={{ maxWidth: '450px' }}>
								<div>
									<Form.Group className='mt-3'>
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
								</div>
								<div>
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
								</div>
							</div>
							<div className='d-flex justify-content-start mt-5' style={{ maxWidth: '450px' }}>
								<Button id='profile-button' onClick={handleUpdate} disabled={isDisabled} className='flex-fill'>Update</Button>
							</div>
						</Container>
					</Col>
				</Row>
			</Container>
		</>
	);
}