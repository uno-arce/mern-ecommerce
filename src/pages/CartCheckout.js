import {Container, Row, Col, Button, InputGroup, Form} from 'react-bootstrap';
import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom';
import AppFooter from '../components/AppFooter.js';
import ProductItems from '../components/ProductItems.js';

import Swal from 'sweetalert2';

export default function CartCheckout() {
	const [products, setProducts] = useState([]);
	const [totalAmount, setTotalAmount] = useState(0);
	const [blkLot, setBlkLot] = useState('');
	const [city, setCity] = useState('');
	const [street, setStreet] = useState('');
	const [province, setProvince] = useState('');
	const [country, setCountry] = useState('');
	const [zip, setZip] = useState('');
	const [paymentMethod, setPaymentMethod] = useState('');

	const [isActive, setIsActive] = useState(true);

	useEffect(() => {
		if(blkLot !== "" && city !== "" && street !== "" && province !== "" && country !== "" && zip !== "" && paymentMethod !== "") {
			setIsActive(false);
		} else {
			setIsActive(true);
		}
	}, [blkLot, city, street, province, country, zip,paymentMethod]);

	const fetchData = () => {
	  fetch(`${process.env.REACT_APP_API_URL}/users/my-cart`, {
	    headers: {
	      Authorization: `Bearer ${localStorage.getItem('token')}`,
	    },
	  })
	    .then((res) => res.json())
	    .then((data) => {
	      setProducts(data.products);
	      setTotalAmount(data.totalAmount);
	    });
	};

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

		fetchData();
	}, []);

	const updateTotalAmount = (productId, productPrice, newQuantity) => {
	    const updatedProducts = products.map((product) => {
	      if (product._id === productId) {
	        return {
	          ...product,
	          quantity: newQuantity,
	          subTotal: productPrice * newQuantity
	        };
	      }
	      return product;
	    });

	    setProducts(updatedProducts);

	    const newTotalAmount = updatedProducts.reduce((acc, product) => acc + product.subTotal, 0);

	    setTotalAmount(newTotalAmount);

	  };

	const removeFromCart = async (productId) => {
	    try {
	      fetch(`${process.env.REACT_APP_API_URL}/users/my-cart/remove/${productId}`, {
	        method: 'PUT',
	        headers: {
	          Authorization: `Bearer ${localStorage.getItem('token')}`,
	        },
	      })
	      .then(result => result.json())
	      .then(data => {
	        if (data) {
	          Swal.fire({
	            title: "Deleted Successfully",
	            icon: "success",
	          })
	          fetchData();
	        } else {
	          Swal.fire({
	            title: "Delete Failed",
	            icon: "error",
	          })
	        }
	      })
	    } catch (error) {
	      Swal.fire({
	        title: "Delete Failed",
	        icon: "error",
	      })
	    }
	  };

	const handleCartCheckout = async () => {
	  try {
	    // Prepare the request body
	    const requestBody = {
	    blkLot: blkLot,
	    city: city,
	    street: street,
	    province: province,
	    country: country,
	    zipCode: zip,
	    paymentMethod: paymentMethod,
	    products: products,
	    };

	    const response = await fetch(`${process.env.REACT_APP_API_URL}/users/checkoutCart`, {
	      method: 'POST',
	      headers: {
	        'Content-Type': 'application/json',
	        Authorization: `Bearer ${localStorage.getItem('token')}`,
	      },
	      body: JSON.stringify(requestBody),
	    });

	    const data = await response.json();

	    if (data.success) {
	      Swal.fire({
	        title: 'Checkout Successful',
	        icon: 'success',
	      });
	    } else {
	      Swal.fire({
	        title: 'Checkout Failed',
	        icon: 'error',
	      });
	    }
	  } catch (error) {
	    console.error('Checkout Error:', error);
	    Swal.fire({
	      title: 'Checkout Failed',
	      icon: 'error',
	    });
	  }
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
										{products.map((product) => (
										  <ProductItems
										    key={product._id}
										    productData={product}
										    updateTotalAmount={updateTotalAmount}
										    removeFromCart={removeFromCart}
										  />
										))}
										<div className='d-flex flex-column mt-auto'>
											<div className='d-flex justify-content-end'>
											  <div>
											    <InputGroup>
											      <InputGroup.Text>₱</InputGroup.Text>
											      <InputGroup.Text>{totalAmount}</InputGroup.Text>
											    </InputGroup>
											  </div>
											</div>
											<Button id='cart-input-group-button' disabled={isActive}
												onClick={handleCartCheckout}
												className='mt-3'
											>
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