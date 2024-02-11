import {Container, Row, Col, Button, Form, InputGroup, Dropdown, DropdownButton} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {Link} from 'react-router-dom';

import Swal from 'sweetalert2';

export default function EditProfile() {
	const {userId} = useParams();

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [firstNameView, setFirstNameView] = useState('');
	const [lastNameView, setLastNameView] = useState('');
	const [mobileNumber, setMobileNumber] = useState('');
	const [role, setRole] = useState('');
	const [blkLot, setBlkLot] = useState('');
	const [street, setStreet] = useState('');
	const [city, setCity] = useState('');
	const [province, setProvince] = useState('');
	const [country, setCountry] = useState('');
	const [zip, setZip] = useState('');
	const [createdOn, setCreatedOn] = useState('');

	const [isDisabled, setIsDisabled] = useState(true);

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
			setFirstNameView(data.firstName);
			setLastNameView(data.lastName);
			setMobileNumber(data.mobileNumber);
			setBlkLot(data.address.blkLot);
			setStreet(data.address.street);
			setCity(data.address.city);
			setProvince(data.address.province);
			setCountry(data.address.country);
			setZip(data.address.zipCode);
			setRole(data.role);

			const formattedDate = new Date(data.createdOn).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
			setCreatedOn(formattedDate);
		})
	}, [])

	useEffect(() => {
		if(firstName !== "" && lastName !== "" && mobileNumber !== "" && blkLot !== "" && city !== "" && street !== "" && province !== "" && country !== "" && zip !== "") {
			setIsDisabled(false);
		} else {
			setIsDisabled(true);
		}
	}, [firstName, lastName, mobileNumber, blkLot, city, street, province, country, zip]);

	const handleUpdate = () => {
		fetch(`${process.env.REACT_APP_API_URL}/users/update-profile`, {
		  method: 'PUT',
		  headers: {
		    'Content-Type': 'application/json',
		    Authorization: `Bearer ${localStorage.getItem('token')}`,
		  },
		  body: JSON.stringify({
		  	firstName: firstName,
		  	lastName: lastName,
		  	mobileNumber: mobileNumber,
		    blkLot: blkLot,
		    street: street,
		    city: city,
		    province: province,
		    zipCode: zip,
		    country: country,
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
			<Container fluid id='profile-header'>
				<Row>
					<Col>
						<Container className='py-5'>
							<div className='d-flex justify-content-between align-items-center'>
								<div className='d-flex align-items-center'>
									<div id='profile-default' className='rounded-circle me-3'>
									</div>
									<div className='d-flex flex-column'>
										<h2 id='profile-name' className='mb-2'>{firstNameView} {lastNameView}</h2>
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
									    <Dropdown.Item as = {Link} to = '/profile'>View Profile</Dropdown.Item>
									    <Dropdown.Item as = {Link} to = '/profile/change-password'>Change Password</Dropdown.Item>
									  </DropdownButton>
									</InputGroup>
								</div>
							</div>
						</Container>
					</Col>
				</Row>
			</Container>
			<Container fluid id='profile-view-container'>
				<Row>
					<Col>
						<Container>
							<div className='d-flex flex-column mt-5 pb-5'>
								<h4>Profile</h4>
								<hr/>
								<div className=' d-flex justify-content-start mt-3' style={{ maxWidth: '450px' }}>
									<Form.Group className='me-5'>
										<Form.Label>First Name</Form.Label>
										<Form.Control 
										type="text" 
										value = {firstName}
										required 
										onChange = {event => {
											setFirstName(event.target.value);
										}} 
										 />
									</Form.Group>
									<Form.Group>
										<Form.Label>Last Name</Form.Label>
										<Form.Control 
										type="text" 
										value = {lastName} 
										required 
										onChange = {event => {
											setLastName(event.target.value);
										}} 
										 />
									</Form.Group>
								</div>
								<div className='justify-content-start mt-4' style={{ maxWidth: '450px' }}>
									<Form.Group>
										<Form.Label>Mobile Number</Form.Label>
										<Form.Control 
										type="text" 
										value = {mobileNumber} 
										required 
										onChange = {event => {
											setMobileNumber(event.target.value);
										}} 
										 />
									</Form.Group>
								</div>
								
								<h4 className='mt-5'>Address</h4>
								<hr/>
								<div className=' d-flex justify-content-start mt-3' style={{ maxWidth: '450px' }}>
									<Form.Group className='me-5'>
										<Form.Label>Block and Lot</Form.Label>
										<Form.Control 
										type="text" 
										value = {blkLot} 
										required 
										onChange = {event => {
											setBlkLot(event.target.value);
										}} 
										 />
									</Form.Group>
									<Form.Group>
										<Form.Label>Street</Form.Label>
										<Form.Control 
										type="text" 
										value = {street} 
										required 
										onChange = {event => {
											setStreet(event.target.value);
										}} 
										 />
									</Form.Group>
								</div>
								<div className='justify-content-start mt-4' style={{ maxWidth: '450px' }}>
									<Form.Group>
										<Form.Label>City</Form.Label>
										<Form.Control 
										type="text" 
										value = {city} 
										required 
										onChange = {event => {
											setCity(event.target.value);
										}} 
										 />
									</Form.Group>
								</div>
								<div className='justify-content-start mt-4' style={{ maxWidth: '450px' }}>
									<Form.Group>
										<Form.Label>Province</Form.Label>
										<Form.Control 
										type="text" 
										value = {province} 
										required 
										onChange = {event => {
											setProvince(event.target.value);
										}} 
										 />
									</Form.Group>
								</div>
								<div className=' d-flex justify-content-start mt-4' style={{ maxWidth: '450px' }}>
									<Form.Group className='me-5'>
										<Form.Label>Country</Form.Label>
										<Form.Control 
										type="text" 
										value = {country} 
										required 
										onChange = {event => {
											setCountry(event.target.value);
										}} 
										 />
									</Form.Group>
									<Form.Group>
										<Form.Label>Zip</Form.Label>
										<Form.Control 
										type="text" 
										value = {zip} 
										required 
										onChange = {event => {
											setZip(event.target.value);
										}} 
										 />
									</Form.Group>
								</div>
								<div className='d-flex mt-5'>
									<Button onClick={handleUpdate} id='profile-button' style={{ width: '200px'}}>Update</Button>
								</div>
							</div>
						</Container>
					</Col>
				</Row>
			</Container>
		</>
	);
}