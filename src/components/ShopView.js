import {Container, Row, Col} from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';

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
				<Col key={product._id} className='mt-5'>
				  <div className='product-card'>
				    <div className='bg-body-secondary flex-grow-1' style={{ height: '300px' }}>
				    </div>
				    <h6>{product.productName}</h6>
				    <p>₱{product.price}</p>
				    <button>Details</button>
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
			            <h6>Shot memories using the Digibees Originals cameras</h6>
			          </Col>
			          <Col className='my-5 py-2 mt-auto'>
			          	<h6 className='mx-5 px-2'>Starts at</h6>
			          	<h4 className='mx-5 px-5'>₱989</h4>
			          </Col>
			        </Row>
			</Container>
			<Container fluid>
				<Container>
					<Row>
						{productRows}
					</Row>
				</Container>
			</Container>
		</>
	);
}