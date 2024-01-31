import {Container, Row, Col, Button, Table} from 'react-bootstrap';

import { useState, useEffect } from 'react';

export default function AdminView({productsData, fetchData}) {

	const [products, setProducts] = useState([]);

	useEffect(() => {
		const productsArr = productsData.map((product, index) => {
			return (
				<tr key={product._id}>
				  <td>{index + 1}</td>
				  <td>{product.productName}</td>
				  <td>{product.productDescription}</td>
				  <td>{product.price}</td>
				  <td>{product.stocks}</td>
				  <td>{product.sold}</td>
				  <td className={product.isActive ? "text-success" : "text-danger"}>{product.isActive ? 'Available' : 'Unavailable'}</td>
				</tr>
			)
		})

		setProducts(productsArr);
	}, [productsData]) 

	return(
		<Container fluid>
			<h2 className='mt-lg-5 mx-lg-5 px-lg-5 mt-4'>Welcome back,</h2>
			<div className='d-flex justify-content-between align-items-center mb-4'>
				<h3 className='mt-lg-5 mx-lg-5 px-lg-5 mt-4'>Products</h3>
				<Button className='mt-lg-5 mx-lg-5 px-lg-5 mt-4' variant="primary">Create</Button>
			</div>
			<Row>
				<Col className="mx-lg-5 px-lg-5">
					<Table hover responsive>
					  <thead>
					    <tr>
					      <th>No.</th>
					      <th>Name</th>
					      <th>Description</th>
					      <th>Price</th>
					      <th>Stocks</th>
					      <th>Sold</th>
					      <th>Availability</th>
					    </tr>
					  </thead>
					  <tbody>
					  	{products}
					  </tbody>
					</Table>
				</Col>
			</Row>
		</Container>
	)
}