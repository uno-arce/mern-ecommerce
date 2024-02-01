import {Button, Container, Row, Col, Form, InputGroup} from 'react-bootstrap';
import {useState, useContext, useEffect} from 'react'
import UserContext from '../UserContext.js';

import Swal from 'sweetalert2';

export default function EditProduct() {
	const {entity} = useContext(UserContext);

	console.log(entity);

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [stocks, setStocks] = useState(0);
	const [price, setPrice] = useState(0);

	const [isActive, setIsActive] = useState(true);

	useEffect(() => {
		if(name !== "" && description !== "" && price !== "" && stocks !== ""){
			setIsActive(false);
		}else{
			setIsActive(true);
		}
	}, [name, description, price, stocks]);

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/products/${entity.id}`)
		.then(result => result.json())
		.then(data => {
			setName(data.productName);
			setDescription(data.productDescription);
			setStocks(data.stocks);
			setPrice(data.price);
		})
	}, [])

	const editProduct = (event) => {
		event.preventDefault();

		fetch(`${process.env.REACT_APP_API_URL}/products/${entity.id}/update`, {
			method: "PUT",
			headers: {
				"Content-Type": 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				productName: name,
				productDescription: description,
				stocks: stocks,
				price: price
			})
		})
		.then(result => result.json())
		.then(data => {
			
			if(data) {
				Swal.fire({
					title: 'Product Updated!',
					icon: 'success',
				})
			} else {
				Swal.fire({
					title: 'Update Error',
					icon: 'Error',
					text: 'Please try Again!'
				})
			}
		})
	}

	return(
		<>
		<Container>
			<Row>
				<Col className = "col-4 mx-auto m-5">
				<h1 className = "text-center mb-5">Edit Product</h1>
					<Form  onSubmit = {event => editProduct(event)} className = "p-2">
						{/*Form Group for First Name*/}
						<Form.Group className="mb-3" controlId="name">
					       <Form.Label>Product Name</Form.Label>
					       <Form.Control 
					       		type="text" 
					       		placeholder="Enter Name"
					       		required
					       		value = {name}
					       		onChange = {event => {
					       			//console.log(event);
					       			setName(event.target.value);
					       			//console.log(name)

					       		}}
					       		/>
					     </Form.Group>

					     <Form.Group className="mb-3" controlId="description">
					       <Form.Label>Product Description</Form.Label>
					       <Form.Control 
					       		as="textarea" 
					       		placeholder="Enter Description" 
					       		required
					       		value = {description}
					       		onChange = {event => {
					       			setDescription(event.target.value);
					       		}}
					       		/>
					     </Form.Group>

					     <Form.Group className="mb-3" controlId="price">
					       <Form.Label>Price</Form.Label>
					       <InputGroup className="mb-3">
					         <InputGroup.Text id="price-addon">&#8369;</InputGroup.Text>
					         <Form.Control
					           type="number"
					           placeholder="Enter Price"
					           aria-label="Price"
					           aria-describedby="price-addon"
					           required
					           value={price}
					           onChange={(event) => setPrice(event.target.value)}
					         />
					       </InputGroup>
					     </Form.Group>

					     <Form.Group className="mb-3" controlId="stocks">
					       <Form.Label>Stocks</Form.Label>
					       <InputGroup className="mb-3">
					         <InputGroup.Text id="stocks-addon">
					           #
					         </InputGroup.Text>
					         <Form.Control
					           type="number"
					           placeholder="Enter Stocks"
					           aria-label="Stocks"
					           aria-describedby="stocks-addon"
					           required
					           value={stocks}
					           onChange={(event) => setStocks(event.target.value)}
					         />
					       </InputGroup>
					     </Form.Group>

					     <Button disabled = {isActive} variant="primary" type="submit">
					       Submit
					     </Button>




					   </Form>

				</Col>
			</Row>
		</Container>
		</>
	)
}