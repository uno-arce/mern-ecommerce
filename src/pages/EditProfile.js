import {Container, Row, Col, Button, Form, InputGroup} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {Link} from 'react-router-dom';

import Swal from 'sweetalert2';

export default function EditProfile() {
	const {userId} = useParams();

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [mobileNumber, setMobileNumber] = useState('');
	const [blkLot, setBlkLot] = useState('');
	const [street, setStreet] = useState('');
	const [city, setCity] = useState('');
	const [province, setProvince] = useState('');
	const [country, setCountry] = useState('');
	const [zip, setZip] = useState('');

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
			setMobileNumber(data.mobileNumber);
			setBlkLot(data.address.blkLot);
			setStreet(data.address.street);
			setCity(data.address.city);
			setProvince(data.address.province);
			setCountry(data.address.country);
			setZip(data.address.zipCode);
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
			<Container fluid>
				<Row>
					<Col className='my-5 col-6'>
						<div className='d-flex'>
							<h4 className='mx-auto'>Profile</h4>
						</div>
					</Col>
					<Col className='mt-5 col-6'>
						<div className=' d-flex justify-content-start mt-5' style={{ maxWidth: '450px' }}>
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
					</Col>
				</Row>
			</Container>

			<Container fluid>
				<Row>
					<Col className='my-5 col-6'>
						<div className='d-flex flex-column'>
							<h4 className='mx-auto'>Address</h4>
						</div>
					</Col>
					<Col className='my-5 col-6'>
						<div className=' d-flex justify-content-start mt-5' style={{ maxWidth: '450px' }}>
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
						<div className='d-flex justify-content-start mt-4' style={{ maxWidth: '450px' }}>
							<Button as = {Link} to = '/profile' variant="secondary" className='flex-fill me-2'>Cancel</Button>
							<Button onClick={handleUpdate} disabled={isDisabled} className='flex-fill'>Update</Button>
						</div>
					</Col>
				</Row>
			</Container>
		</>
	);
}