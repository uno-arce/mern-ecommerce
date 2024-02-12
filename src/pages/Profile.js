import {Container, Row, Col, InputGroup, Dropdown, DropdownButton} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import ProfileView from '../components/ProfileView.js';

export default function Profile() {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [role, setRole] = useState('');
	const [createdOn, setCreatedOn] = useState('');
	const [profileView, setProfileView] = useState(null);

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
			method: "POST",
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(result => result.json())
		.then(data => {
			setFirstName(data.firstName);
			setLastName(data.lastName);
			setRole(data.role);

			const formattedDate = new Date(data.createdOn).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
			setCreatedOn(formattedDate);

			setProfileView(<ProfileView userData={data} />);
		})
	}, [])

	return(
		<>
		<Container fluid id='profile-header'>
			<Row>
				<Col>
					<Container className='py-5'>
						<div className='d-flex justify-content-between align-items-center'>
							<div className='d-flex align-items-center'>
								<div id='profile-default' className='rounded-circle me-3'>
								</div>
								<div className='d-flex flex-column'>
									<h2 id='profile-name' className='mb-2'>{firstName} {lastName}</h2>
									<div className='d-flex'>
										<h6 id='profile-description' className='me-2'>{role}</h6>
										<div className='d-md-flex d-none'>
											<h6 id='profile-description' className='me-2'>•</h6>
											<h6 id='profile-description'>Since {createdOn}</h6>
										</div>
									</div>
								</div>
							</div>
							<div>
								<InputGroup className='mb-4'>
								  <InputGroup.Text id='view-input-group-icon' className='bi bi-pencil'>
								  </InputGroup.Text>
								  <DropdownButton
								    id='product-button'
								    title=''
								  >
								    <Dropdown.Item as = {Link} to = '/profile/edit'>Edit Profile</Dropdown.Item>
								    <Dropdown.Item as = {Link} to = '/profile/change-password'>Change Password</Dropdown.Item>
								    <hr/>
								    <Dropdown.Item as = {Link} to = '/my-orders'>Order History</Dropdown.Item>
								  </DropdownButton>
								</InputGroup>
							</div>
						</div>
					</Container>
				</Col>
			</Row>
		</Container>
		{profileView}
		</>
	);
}