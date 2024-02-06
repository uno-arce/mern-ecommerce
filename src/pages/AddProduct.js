import {Button, Form, Container, Col, Row, InputGroup} from 'react-bootstrap';
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
  const [image, setImage] = useState(null);

	const [isActive, setIsActive] = useState(true);

	useEffect(() => {
		if(name !== "" && description !== "" && price !== "" && stocks !== ""){
			setIsActive(false);
		}else{
			setIsActive(true);
		}
	}, [name, description, price, stocks]);

	function createProduct(event) {
		event.preventDefault();

    const formData = new FormData();
        formData.append('productName', name);
        formData.append('productDescription', description);
        formData.append('price', price.toString());
        formData.append('stocks', stocks.toString());
        formData.append('image', image);

		fetch(`${process.env.REACT_APP_API_URL}/products/create-product`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			},
			body: formData
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
				setPrice(0);	
				setStocks(0);
        setImage(null);			
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
				<Col className = "col-4 mx-auto m-5">
				<h1 className = "text-center mb-5">Create Product</h1>
					<Form  onSubmit = {event => createProduct(event)} className = "p-2">
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

               <Form.Group className="mb-3" controlId="image">
                  <Form.Label>Product Image</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={(event) => setImage(event.target.files[0])} // Set the selected image file
                      required />
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