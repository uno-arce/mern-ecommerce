import {Container, Row, Col, Button, InputGroup} from 'react-bootstrap';
import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import {Link} from 'react-router-dom';

export default function ViewProduct() {
	const {productId} = useParams();

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [stocks, setStocks] = useState(0);
	const [price, setPrice] = useState(0);
	const [initialPrice, setInitialPrice] = useState(0);
	const [sold, setSold] = useState(0);
	const [quantity, setQuantity] = useState(1);
	const [stars, setStars] = useState([]);

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
				quantity: quantity
			})
		})
	}

	return(
		<>
			<Container fluid className='bg-body-secondary'>
				<Row className='justify-content-center'>
					<Col className='col-4 my-5'>
						<Row className='bg-body-tertiary' style={{ height: '400px' }}>
						</Row>
					</Col>
					<Col className='col-4 my-5 mx-5 d-flex flex-column'>
						<h2>{name}</h2>
						<div className='d-inline-flex'>
							<h6>{stars} Rating</h6>
							<h6 className='mx-3'>{sold} Sold</h6>
						</div>
						<h4 className='mt-5'>₱{price}</h4>
						<h6 className='mt-5'>{description}</h6>
						<InputGroup className='mt-5'>
							<InputGroup.Text className="bi bi-cart">
							</InputGroup.Text>
							<Button variant='secondary' className="bi bi-dash" onClick={handleSubtract}>
							</Button>
							<InputGroup.Text>
							{quantity}
							</InputGroup.Text>
							<Button variant='secondary' className="bi bi-plus" onClick={handleAdd}>
							</Button>
							<InputGroup.Text>
							{stocks} stocks available
							</InputGroup.Text>
						</InputGroup>
						<div className='mt-auto'>
						  <div className='d-inline-flex'>
						    <InputGroup>
						      <InputGroup.Text className="bi bi-cart-check"></InputGroup.Text>
						      <Button onClick = {onSubmit} variant='dark'>
						        Add to Cart
						      </Button>
						    </InputGroup>
						  </div>
						  <div className='d-inline-flex mx-4'>
						    <InputGroup>
						      <InputGroup.Text className="bi bi-bag"></InputGroup.Text>
						      <Button as = {Link} to = {`/${productId}/${quantity}/checkout`} variant='dark'>
						        Checkout
						      </Button>
						    </InputGroup>
						  </div>
						</div>

					</Col>
				</Row>
			</Container>
		</>
	)
}