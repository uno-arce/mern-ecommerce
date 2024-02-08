import {Container, Row, Col, Button, InputGroup, Dropdown, DropdownButton} from 'react-bootstrap';
import {useState, useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';

import ProfileView from '../components/ProfileView.js';

export default function Profile() {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [role, setRole] = useState('');
	const [createdOn, setCreatedOn] = useState('');
	const [data, setData] = useState({});
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

			setData(data);

			setProfileView(<ProfileView userData={data} />);
		})
	}, [])

	return(
		<>
		<Container fluid id='profile-header'>
		      <Row className='align-items-end pb-3'>

		        <Col xs={3}>
		          <div className='d-flex align-items-end justify-content-end' style={{ height: '180px' }}>
		            <div id='profile-default' className='rounded-circle'>
		            </div>
		          </div>
		        </Col>

		        <Col xs={6}>
		          <h2 id='profile-name' className='mb-3'>{firstName} {lastName}</h2>
		          <div className='d-flex'>
		          	<h6 id='profile-description' className='me-2'>{role}</h6>
		          	<h6 id='profile-description' className='me-2'>•</h6>
		          	<h6 id='profile-description'>Since {createdOn}</h6>
		          </div>
		        </Col>

		        <Col xs={3}>
		          <InputGroup className='mb-4'>
		            <InputGroup.Text id='view-input-group-icon' className='bi bi-pencil'>
		            </InputGroup.Text>
		            <DropdownButton
		              id='product-button'
		              title="Edit"
		            >
		              <Dropdown.Item as = {Link} to = '/profile/edit'>Edit Profile</Dropdown.Item>
		              <Dropdown.Item as = {Link} to = '/profile/change-password'>Change Password</Dropdown.Item>
		            </DropdownButton>
		          </InputGroup>
		        </Col>
		      </Row>
		    </Container>
		{profileView}
		</>
	);
}