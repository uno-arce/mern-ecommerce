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
		<Container fluid className='bg-body-secondary'>
		      <Row className='align-items-end pb-3'>

		        <Col xs={3}>
		          <div className='d-flex align-items-end justify-content-end' style={{ height: '180px' }}>
		            <div className='bg-secondary text-white rounded-circle p-3 d-flex align-items-center justify-content-center'  style={{ width: '100px', height: '100px' }}>
		            	<i className='bi bi-person' style={{ fontSize: '4rem' }}> </i>
		            </div>
		          </div>
		        </Col>

		        <Col xs={6}>
		          <div className=' d-flex flex-column'>
		            <h2 className='mb-4'>{firstName} {lastName}</h2>
		            <div className='d-flex'>
		            	<h6 className='me-2'>{role}</h6>
		            	<h6 className='me-2'>•</h6>
		            	<h6>Since {createdOn}</h6>
		            </div>
		          </div>
		        </Col>

		        <Col xs={3}>
		          <InputGroup className='mb-4'>
		            <InputGroup.Text>
		              <i className='bi bi-pencil'></i>
		            </InputGroup.Text>
		            <DropdownButton
		              variant="secondary"
		              title="Edit"
		              id="input-group-dropdown-1"
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