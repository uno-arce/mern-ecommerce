import {Container, Row, Col, Button} from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import ViewProduct from '../pages/ViewProduct';
import {Link} from 'react-router-dom';

export default function ShopView() {
	const [products, setProducts] = useState([]);
	const [productRows, setProductRows] = useState([]);

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_BASE_URL}/products/`)
		.then(result => result.json())
		.then(data => {
			setProducts(data)
		})
	}, [])

	useEffect(() => {
		const productsArr = products.map(product => {
			return(
				<Col key={product._id} className='mt-5 col-md-3'>
				  <div className='d-flex flex-column'>
				    <div className='bg-body-tertiary mb-3' style={{ 
				    	height: '300px',
				    	backgroundImage: `url(${process.env.REACT_APP_API_BASE_URL}${product.image})`,
				    	backgroundSize: 'cover',
				    	backgroundPosition: 'center',
				    	 }}>
				    </div>
				    <h6 id='header-text-dark'>{product.productName}</h6>
				    <p id='header-text-dark'>₱{product.price}</p>
				    <div className='d-flex justify-content-end'>
				        <Button id='product-button' as = {Link} to = {`/view/${product._id}`}><i className="bi bi-bag"></i></Button>
				    </div>
				  </div>
				</Col>
			)
		})
		setProductRows(productsArr);
	}, [products])

	return(
		<>
			<Container fluid id='shop-header'>
			        <Row>
			          <Col>
			            <Container>
			            	<div className='d-flex justify-content-between p-5'>
			            		<div className='d-flex flex-column'>
			            			<h1><span id='header-title1'>Digi</span><span id='header-title2'>bee</span></h1>
			            			<h2 id='header-title3' className='mb-5 mx-5 px-4'>Originals</h2>
			            			<h6 id='header-text'>Shot memories using the Digibees Originals Cameras</h6>
			            		</div>
			            		<div className='d-flex flex-column justify-content-end'>
			            			<h6 className='mx-lg-5' id='header-text'>Starts at</h6>
			            			<h4 id='header-text'>₱989</h4>
			            		</div>
			            	</div>
			            </Container>
			          </Col>
			        </Row>
			</Container>
			<Container fluid id='shop-products' className='pb-5'>
				<Row>
					<Col>
						<Container id='shop-products'>
							<h6 id='header-text-dark' className='mt-4'>Products</h6>
							<hr/>
							<Row xs={1} sm={2} md={2} lg={3}>
								{productRows}
							</Row>
						</Container>
					</Col>
				</Row>
			</Container>
		</>
	);
}