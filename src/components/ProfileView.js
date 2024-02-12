import {Container, Row, Col, Form} from 'react-bootstrap';

export default function ProfileView({userData}) {
	return(
		<>
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
								<h4 className='mt-5'>Address</h4>
								<hr/>
								<div className=' d-flex justify-content-start mt-3' style={{ maxWidth: '450px' }}>
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
							</div>
						</Container>
					</Col>
				</Row>
			</Container>
		</>
	);
}