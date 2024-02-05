import {Container, Row, Col, Button, Form} from 'react-bootstrap';

export default function ProfileView({userData}) {
	return(
		<>
			<Container fluid>
				<Row>
					<Col className='my-5 col-6'>
						<div className='d-flex'>
							<h4 className='mx-auto'>Profile</h4>
						</div>
					</Col>
					<Col className='my-5 col-6'>
						<div className=' d-flex justify-content-start mt-5' style={{ maxWidth: '450px' }}>
							<Form.Group className='me-5'>
								<Form.Label>First Name</Form.Label>
								<Form.Control 
								type="text" 
								value = {userData.firstName} 
								disabled
								 />
							</Form.Group>
							<Form.Group>
								<Form.Label>Last Name</Form.Label>
								<Form.Control 
								type="text" 
								value = {userData.lastName} 
								disabled
								 />
							</Form.Group>
						</div>
						<div className='justify-content-start mt-4' style={{ maxWidth: '450px' }}>
							<Form.Group>
								<Form.Label>Username</Form.Label>
								<Form.Control 
								type="text" 
								value = {userData.username} 
								disabled
								 />
							</Form.Group>
						</div>
						<div className='justify-content-start mt-4' style={{ maxWidth: '450px' }}>
							<Form.Group>
								<Form.Label>Email</Form.Label>
								<Form.Control 
								type="text" 
								value = {userData.email} 
								disabled
								 />
							</Form.Group>
						</div>
						<div className='justify-content-start mt-4' style={{ maxWidth: '450px' }}>
							<Form.Group>
								<Form.Label>Mobile Number</Form.Label>
								<Form.Control 
								type="text" 
								value = {userData.mobileNumber} 
								disabled
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
								value = {userData.address.blkLot} 
								disabled
								 />
							</Form.Group>
							<Form.Group>
								<Form.Label>Street</Form.Label>
								<Form.Control 
								type="text" 
								value = {userData.address.street} 
								disabled
								 />
							</Form.Group>
						</div>
						<div className='justify-content-start mt-4' style={{ maxWidth: '450px' }}>
							<Form.Group>
								<Form.Label>City</Form.Label>
								<Form.Control 
								type="text" 
								value = {userData.address.city} 
								disabled
								 />
							</Form.Group>
						</div>
						<div className='justify-content-start mt-4' style={{ maxWidth: '450px' }}>
							<Form.Group>
								<Form.Label>Province</Form.Label>
								<Form.Control 
								type="text" 
								value = {userData.address.province} 
								disabled
								 />
							</Form.Group>
						</div>
						<div className=' d-flex justify-content-start mt-4' style={{ maxWidth: '450px' }}>
							<Form.Group className='me-5'>
								<Form.Label>Country</Form.Label>
								<Form.Control 
								type="text" 
								value = {userData.address.country} 
								disabled
								 />
							</Form.Group>
							<Form.Group>
								<Form.Label>Zip</Form.Label>
								<Form.Control 
								type="text" 
								value = {userData.address.zipCode} 
								disabled
								 />
							</Form.Group>
						</div>
					</Col>
				</Row>
			</Container>
		</>
	);
}