import {Container, Row, Col, Button} from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import ViewProduct from '../pages/ViewProduct';
import {Link} from 'react-router-dom';

export default function ShopView({productsData}) {
	const [products, setProducts] = useState([]);
	const [productRows, setProductRows] = useState([]);

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/products/`)
		.then(result => result.json())
		.then(data => {
			setProducts(data)
		})
	}, [])

	useEffect(() => {
		const productsArr = products.map(product => {
			return(
				<Col key={product._id} className='mt-5 col-md-3'>
				  <div className='product-card'>
				    <Row className='bg-body-tertiary mb-3' style={{ height: '300px' }}>
				    </Row>
				    <h6>{product.productName}</h6>
				    <p>₱{product.price}</p>
				    <div className='d-flex justify-content-end'>
				        <Button as = {Link} to = {`/view/${product._id}`} variant='secondary'><i class="bi bi-bag"></i></Button>
				    </div>
				  </div>
				</Col>
			)
		})
		setProductRows(productsArr);
	}, [products])

	return(
		<>
			<Container fluid className='bg-body-secondary'>
			        <Row>
			          <Col className='my-5 py-5' lg={{ span: 6, offset: 2 }} md={{ span: 8, offset: 2 }} sm={{ span: 10, offset: 1 }}>
			            <h1>Digibee</h1>
			            <h1 className='mb-5 mx-5 px-4'>Originals</h1>
			            <h6>Shot memories using the Digibees Originals Cameras</h6>
			          </Col>
			          <Col className='my-5 py-2 mt-auto'>
			          	<h6 className='mx-5 px-2'>Starts at</h6>
			          	<h4 className='mx-5 px-5'>₱989</h4>
			          </Col>
			        </Row>
			</Container>
			<Container fluid className='mb-5'>
				<Container>
					<Row className='gx-5 row-cols-md-4'>
						{productRows}
					</Row>
				</Container>
			</Container>
		</>
	);
}