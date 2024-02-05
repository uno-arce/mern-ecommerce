import {Container, Row, Col, Button, InputGroup, Form} from 'react-bootstrap';
import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import {Link} from 'react-router-dom';

import Swal from 'sweetalert2';

export default function Checkout() {
	const {productId, qty} = useParams();

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [stocks, setStocks] = useState(0);
	const [initialPrice, setInitialPrice] = useState(0);
	const [price, setPrice] = useState(0);
	const [quantity, setQuantity] = useState(Number(qty));
	const [blkLot, setBlkLot] = useState('');
	const [city, setCity] = useState('');
	const [street, setStreet] = useState('');
	const [province, setProvince] = useState('');
	const [country, setCountry] = useState('');
	const [zip, setZip] = useState('');
	const [paymentMethod, setPaymentMethod] = useState('');

	const [isActive, setIsActive] = useState(true);

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
			method: "POST",
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(result => result.json())
		.then(data => {
			setBlkLot(data.address.blkLot ?? '');
			setCity(data.address.city ?? '');
			setStreet(data.address.street ?? '');
			setProvince(data.address.province ?? '');
			setCountry(data.address.country ?? '');
			setZip(data.address.zipCode ?? '');
		})

		fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
		.then(result => result.json())
		.then(data => {
			setName(data.productName);
			setDescription(data.productDescription);
			setStocks(data.stocks);
			setInitialPrice(data.price);
			setPrice(data.price * quantity);
		})
	}, []);

	const handleAdd = () => {
	    if (quantity < stocks) {
	      setQuantity(quantity + 1);
	    }
	};

	const handleSubtract = () => {
	    if (quantity > 1) {
	      setQuantity(quantity - 1);
	    }
	};

	useEffect(() => {
		setPrice(initialPrice * quantity);
	}, [quantity])

	useEffect(() => {
		if(blkLot !== "" && city !== "" && street !== "" && province !== "" && country !== "" && zip !== "" && paymentMethod !== "") {
			setIsActive(false);
		} else {
			setIsActive(true);
		}
	}, [blkLot, city, street, province, country, zip,paymentMethod]);

	const handleConfirmOrder = () => {
	    fetch(`${process.env.REACT_APP_API_URL}/users/${productId}/checkout`, {
	      method: 'POST',
	      headers: {
	        'Content-Type': 'application/json',
	        Authorization: `Bearer ${localStorage.getItem('token')}`,
	      },
	      body: JSON.stringify({
	        blkLot: blkLot,
	        street: street,
	        city: city,
	        province: province,
	        zipCode: zip,
	        country: country,
	        quantity: quantity,
	        paymentMethod: paymentMethod,
	      }),
	    })
	      .then((result) => result.json())
	      .then((data) => {
	        if (data) {
	          Swal.fire({
	          	title: "Order Successful",
	          	icon: "success",
	          	text: "Happy Shopping!"
	          })
	        } else {
	          Swal.fire({
	          	title: "Order Failed",
	          	icon: "warning",
	          	text: "Please try Again"
	          })
	        }
	      })
	  };

	return(
		<>
			<Container>
				<Row>
					<Col className='col-7'>
					<h5 className='mt-5'>Billing Address</h5>
						<Container className='bg-body-tertiary'>
							<Row>
								<Col>
									<Form className='m-4'>
										<Row className='gy-4'>
											<Col className='col-6'>
												<Form.Group>
													<Form.Label>Block & Lot</Form.Label>
													<Form.Control 
													type="text" 
													placeholder="Enter Block & Lot"
													required
													value = {blkLot} 
													onChange = {event => {
														setBlkLot(event.target.value);
													}}
													 />
												</Form.Group>
											</Col>
											<Col className='col-6'>
												<Form.Group>
													<Form.Label>Street</Form.Label>
													<Form.Control 
													type="text"
													 placeholder="Enter Street"
													 required
													 value = {street} 
													 onChange = {event => {
													 	setStreet(event.target.value);
													 }} 
													 />
												</Form.Group>
											</Col>
											<Col className='col-6'>
												<Form.Group>
													<Form.Label>City</Form.Label>
													<Form.Control 
													type="text" 
													placeholder="Enter City"
													required
													value = {city} 
													onChange = {event => {
														setCity(event.target.value);
													}} 
													/>
												</Form.Group>
											</Col>
											<Col className='col-6'>
												<Form.Group>
													<Form.Label>Province</Form.Label>
													<Form.Control 
													type="text"
													placeholder="Enter Province"
													required
													value = {province} 
													onChange = {event => {
														setProvince(event.target.value);
													}}
													  />
												</Form.Group>
											</Col>
											<Col className='col-6'>
												<Form.Group>
													<Form.Label>Country</Form.Label>
													<Form.Control 
													type="text"
													placeholder="Enter Country"
													required
													value = {country} 
													onChange = {event => {
														setCountry(event.target.value);
													}}
													 />
												</Form.Group>
											</Col>
											<Col className='col-6'>
												<Form.Group>
													<Form.Label>Zip</Form.Label>
													<Form.Control 
													type="text"
													placeholder="Enter Zip"
													required
													value = {zip} 
													onChange = {event => {
														setZip(event.target.value);
													}}
													 />
												</Form.Group>
											</Col>
										</Row>
									</Form>
								</Col>
							</Row>
						</Container>

						<h5 className='mt-4'>Payment Method</h5>
						<Container className='bg-body-tertiary'>
							<Row className='p-4'>
								<Col>
									<InputGroup>
									  <InputGroup.Radio 
									  aria-label="Credit Card" 
									  name="paymentMethod"
									  value='Credit Card'
									  onChange={event => {
									  	setPaymentMethod(event.target.value);
									  }}
									   />
									  <InputGroup.Text>Credit Card</InputGroup.Text>
									</InputGroup>
								</Col>
								<Col>
									<InputGroup>
									  <InputGroup.Radio 
									  aria-label="PayPal" 
									  name="paymentMethod" 
									  value='Paypal'
									  onChange={event => {
									  	setPaymentMethod(event.target.value);
									  }}
									  />
									  <InputGroup.Text>PayPal</InputGroup.Text>
									</InputGroup>
								</Col>
								<Col>
									<InputGroup>
									  <InputGroup.Radio 
									  aria-label="Cash on Delivery" 
									  name="paymentMethod"
									  value='Cash on Delivery'
									  onChange={event => {
									  	setPaymentMethod(event.target.value);
									  }} 
									  />
									  <InputGroup.Text>Cash on Delivery</InputGroup.Text>
									</InputGroup>
								</Col>
							</Row>
						</Container>

						<Container className='bg-body-tertiary mt-4'>
							<Row className='p-5 d-flex justify-content-center'>
								<Col className='p-3'>
									<h2 className='text-center'>Thank you for ordering!</h2>
								</Col>
							</Row>
						</Container>
					</Col>
					<Col className='mt-5 d-flex flex-column col-4'>
						<h5>Order Summary</h5>
						<Container className='bg-body-tertiary d-flex flex-grow-1 justify-content-center'>
							<Row className='w-100'>
								<Col className='px-2 py-4 d-flex flex-column'>
									<Container>
										<Row className='d-flex gx-2'>
											<Col className='col-2'>
												<div className='bg-body-secondary'>img</div>
											</Col>
											<Col>
												<h6>{name}</h6>
												<h6>₱{price}</h6>
											</Col>
											<Col className='align-self-center'>
												<InputGroup className='mx-4'>
													<Button variant='secondary' className="bi bi-dash" onClick={handleSubtract}>
													</Button>
													<InputGroup.Text>
													{quantity}
													</InputGroup.Text>
													<Button variant='secondary' className="bi bi-plus" onClick={handleAdd}>
													</Button>
												</InputGroup>
											</Col>
										</Row>
									</Container>
									<Button onClick={handleConfirmOrder} disabled={isActive} variant='dark' className='w-100 mt-auto'>
									  Confirm Order
									</Button>
								</Col>
							</Row>
						</Container>
					</Col>
				</Row>
			</Container>
		</>
	)
}