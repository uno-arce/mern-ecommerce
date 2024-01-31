import {Button, Form, Container, Col, Row} from 'react-bootstrap';
import {useState, useEffect, useContext} from 'react';

import {Navigate} from "react-router-dom";

import UserContext from "../UserContext.js";

import Swal from 'sweetalert2';

export default function AddProduct() {

	const {user} = useContext(UserContext);

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);
	const [stocks, setStocks] = useState(0);

	const [isActive, setIsActive] = useState(true);

	useEffect(() => {
		if(name !== "" && description !== "" && price !== "" && stocks !== ""){
			setIsActive(false);
		}else{
			setIsActive(true);
		}
	}, [name, description, price ]);

	function createProduct(event) {
		event.preventDefault();

		fetch(`${process.env.REACT_APP_API_URL}/products/create-product`, {
			method: 'POST',
			headers: {
				"Content-Type" : "application/json",
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
					title: "Product Added",
					icon: "success",
			})
				setName('');
				setDescription('');
				setPrice('');				
			} else {
			Swal.fire({
				title: "Unsuccessful Product Creation",
				icon: "error",
				text: "Please try again!"
			})

			}
		})
	}

	return(
		(user.role !== 'Admin') ? <Navigate to = '/'/>
		:
		<Container>
			<Row>
				<h1 className = "text-center">Add Course</h1>
				<Col className = "col-4 mx-auto mb-3 bg-info">
					<Form  onSubmit = {event => createProduct(event)} className = "p-2">
						{/*Form Group for First Name*/}
						<Form.Group className="mb-3" controlId="name">
					       <Form.Label>Name</Form.Label>
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

					     {/*FormGroup for Last Name*/}
					     <Form.Group className="mb-3" controlId="description">
					       <Form.Label>Description</Form.Label>
					       <Form.Control 
					       		type="text" 
					       		placeholder="Enter Description" 
					       		required
					       		value = {description}
					       		onChange = {event => {
					       			setDescription(event.target.value);
					       		}}
					       		/>
					     </Form.Group>

					     {/*Form Group for email*/}
					     <Form.Group className="mb-3" controlId="price">
					       <Form.Label>Price</Form.Label>
					       <Form.Control 
					       		type="number" 
					       		placeholder="Enter Price" 
					       		required
					       		value = {price}
					       		onChange = {event => {
					       			setPrice(event.target.value);
					       		}}
					       		/>
					       
					     </Form.Group>
			 


					     <Button disabled = {isActive} variant="primary" type="submit">
					       Submit
					     </Button>




					   </Form>

				</Col>
			</Row>
		</Container>
	);
}