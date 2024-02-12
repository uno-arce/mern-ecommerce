import {Container, Row, Col, Button, InputGroup} from 'react-bootstrap';
import {useState, useEffect, useContext} from 'react'
import { useParams } from 'react-router-dom';
import {Link} from 'react-router-dom';
import UserContext from '../UserContext.js';

import Swal from 'sweetalert2';

export default function ViewProduct() {
	const {productId} = useParams();
	const {user} = useContext(UserContext);

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [stocks, setStocks] = useState(0);
	const [price, setPrice] = useState(0);
	const [initialPrice, setInitialPrice] = useState(0);
	const [sold, setSold] = useState(0);
	const [quantity, setQuantity] = useState(1);
	const [stars, setStars] = useState([]);
	const [image, setImage] = useState(null);

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
		.then(result => result.json())
		.then(data => {
			setName(data.productName);
			setDescription(data.productDescription);
			setStocks(data.stocks);
			setPrice(data.price);
			setInitialPrice(data.price);
			setSold(data.sold);
			setImage(data.image);

			const totalRating = data.reviews.reduce((sum, review) => sum + data.review.rating, 0);
			const averageRating = totalRating / data.reviews.length;

			const starArray = [];
			const roundedRating = Math.round();

			for (let i = 1; i <= 5; i++) {
			  starArray.push(
			    <span
			      key={i}
			      className={`bi bi-star${i <= roundedRating ? '-fill' : ''}`}
			    ></span>
			  );
			}

			setStars(starArray);
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

	const onSubmit = () => {
		fetch(`${process.env.REACT_APP_API_URL}/users/${productId}/add-to-cart`, {
			method: 'POST',
			headers: {
				"Content-Type" : "application/json",
				Authorization: `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				quantity: quantity,
				image: image
			})
		})
		Swal.fire({
			title: "Added to Cart",
			icon: "success",
		})
	}

	return(
		<>
			<Container fluid id='view-product-container'>
				<Row>
					<Col>
						<Container>
							<div className='d-xl-flex justify-content-between py-5'>
								<div className='bg-body-tertiary d-flex' style={{ 
								height: '400px',
				    			width: '100%',
				    			maxWidth: '650px',
				    			backgroundImage: `url(${process.env.REACT_APP_API_URL}${image})`,
				    			backgroundSize: 'cover',
				    			backgroundPosition: 'center',
				    	 		}}>
								</div>
								<div className='d-flex flex-column mt-xl-0 mt-4'>
									<h2 id='view-text-bold'>{name}</h2>
									<div className='d-flex align-items-center'>
										<h6 id='view-text'>{stars} Rating</h6>
										<h6 id='view-text' className='mx-3'>{sold} Sold</h6>
									</div>
									<h4 id='view-text-bold' className='mt-5'>₱{price}</h4>
									<h6 id='view-text-bold' className='mt-5'>{description}</h6>
									<div className='d-flex'>
										<div>
											<InputGroup id='view-input-group' className='mt-5'>
												<InputGroup.Text id='view-input-group-icon' className="bi bi-cart">
												</InputGroup.Text>
												<Button id='view-input-group-button' className="bi bi-dash" onClick={handleSubtract}>
												</Button>
												<InputGroup.Text id='view-input-group-icon'>
												{quantity}
												</InputGroup.Text>
												<Button id='view-input-group-button' className="bi bi-plus" onClick={handleAdd}>
												</Button>
												<InputGroup.Text id='view-input-group-icon'>
												{stocks} stocks available
												</InputGroup.Text>
											</InputGroup>
										</div>
									</div>
									<div className='mt-auto'>
									  <div className='d-inline-flex'>
									    <InputGroup>
									      <InputGroup.Text id='view-input-group-icon' className="bi bi-cart-check"></InputGroup.Text>
									      <Button id='view-input-group-button' onClick = {(user.role === 'User') ? onSubmit : null} variant='dark'>
									        Add to Cart
									      </Button>
									    </InputGroup>
									  </div>
									  <div className='d-inline-flex mx-4 mt-xl-0 mt-4'>
									    <InputGroup>
									      <InputGroup.Text id='view-input-group-icon' className="bi bi-bag"></InputGroup.Text>
									      <Button id='view-input-group-button' as = {Link} 
									      to = {user.role === 'User' ? `/${productId}/${quantity}/checkout` : null} 
									      variant='dark'>
									        Checkout
									      </Button>
									    </InputGroup>
									  </div>
									</div>
								</div>
							</div>
						</Container>
					</Col>
				</Row>
			</Container>
		</>
	)
}