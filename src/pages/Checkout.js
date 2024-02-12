import {Container, Row, Col, Button, InputGroup, Form} from 'react-bootstrap';
import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import {Link} from 'react-router-dom';
import AppFooter from '../components/AppFooter.js';

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
	const [image, setImage] =useState(null);

	const [isActive, setIsActive] = useState(true);

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
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

		fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}`)
		.then(result => result.json())
		.then(data => {
			setName(data.productName);
			setDescription(data.productDescription);
			setStocks(data.stocks);
			setInitialPrice(data.price);
			setPrice(data.price * quantity);
		})
	}, []);

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}`)
		.then(result => result.json())
		.then(data => {
			setImage(data.image);
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
	    fetch(`${process.env.REACT_APP_API_BASE_URL}/users/${productId}/checkout`, {
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
			<Container fluid id='checkout-container'>
				<Row>
					<Col>
						<Container className='mt-5'>
							<div className='d-lg-flex'>
								<div className='d-flex flex-column'>
									<h4 id='checkout-header'>Delivery Information</h4>
									<Form id='form-text'>
										<div id='form-container' className='d-flex flex-column p-5'>
											<div className='d-flex'>
												<Form.Group className='me-5'>
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
											</div>
											<div className='d-flex mt-4'>
												<Form.Group className='me-5'>
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
											</div> 
											<div className='d-flex mt-4'>
												<Form.Group className='me-5'>
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
											</div> 
										</div>
									</Form>
									<h4 id='checkout-header' className='mt-4'>Payment Method</h4>
									<div id='form-container' className='d-md-flex py-3 px-2'>
										<InputGroup>
										  <InputGroup.Radio
										  id='input-group-radio-box' 
										  aria-label="Credit Card" 
										  name="paymentMethod"
										  value='Credit Card'
										  onChange={event => {
										  	setPaymentMethod(event.target.value);
										  }}
										   />
										  <InputGroup.Text>Credit Card</InputGroup.Text>
										</InputGroup>
										<InputGroup>
										  <InputGroup.Radio 
										  id='input-group-radio-box'
										  aria-label="PayPal" 
										  name="paymentMethod" 
										  value='Paypal'
										  onChange={event => {
										  	setPaymentMethod(event.target.value);
										  }}
										  />
										  <InputGroup.Text>PayPal</InputGroup.Text>
										</InputGroup>
										<InputGroup>
										  <InputGroup.Radio 
										  id='input-group-radio-box'
										  aria-label="Cash on Delivery" 
										  name="paymentMethod"
										  value='Cash on Delivery'
										  onChange={event => {
										  	setPaymentMethod(event.target.value);
										  }} 
										  />
										  <InputGroup.Text>Cash on Delivery</InputGroup.Text>
										</InputGroup>
									</div>
									<div id='sparkle-container' className='mt-4 d-flex flex-column justify-content-center align-items-center'>
										<h3>Thank you for ordering</h3>
									</div>
								</div>
								<div className='d-flex flex-column flex-grow-1 ms-4 mb-5'>
									<h4 id='checkout-header'>Your Cart</h4>
									<div id='form-container' className='d-flex flex-column flex-grow-1 px-5 pt-5 pb-3'>
										<div className="d-flex justify-content-between align-items-center">
										  <div className='d-flex'>
										    <div className='me-3' style={{ 
										            height: '70px',
										            width: '70px',
										            backgroundImage: `url(${process.env.REACT_APP_API_BASE_URL}${image})`,
										            backgroundSize: 'cover',
										            backgroundPosition: 'center',
										            borderRadius: '8px'
										             }}>
										    </div>
										    <div>
										      <h6>{name}</h6>
										      <InputGroup className="me-3">
										        <Button id='cart-input-group-button'className="bi bi-dash" onClick={handleSubtract}>
										        </Button>
										        <InputGroup.Text id='cart-items'>
										          {quantity}
										        </InputGroup.Text>
										        <Button id='cart-input-group-button' className="bi bi-plus" onClick={handleAdd}>
										        </Button>
										      </InputGroup>
										    </div>
										  </div>
										  <div>
										    <p className='me-2'>₱{price}</p>
										  </div>
										</div>
										<hr/>
										<div className='d-flex flex-column mt-auto'>
										  <div className='d-flex justify-content-end'>
										    <div>
										      <InputGroup>
										        <InputGroup.Text>₱</InputGroup.Text>
										        <InputGroup.Text>{price}</InputGroup.Text>
										      </InputGroup>
										    </div>
										  </div>
										  <Button id='cart-input-group-button' onClick={handleConfirmOrder} disabled={isActive} className='w-100 mt-3'>
										    Confirm Order
										  </Button>
										</div>
									</div>
								</div>
							</div>
						</Container>
					</Col>
				</Row>
			</Container>
			<Container fluid id='footer'>
				<Row>
					<Col>
						<AppFooter/>
					</Col>
				</Row>
			</Container>
		</>
	)
}