import ArchiveProduct from './ArchiveProduct.js';
import {Container, Row, Col, Button, Table, ButtonGroup, InputGroup, Accordion} from 'react-bootstrap';

import { useState, useEffect, useContext } from 'react';
import {Link} from 'react-router-dom';
import UserContext from '../UserContext';


export default function AdminView() {
	const {user} = useContext(UserContext);
	const [products, setProducts] = useState([]);
	const [productRows, setProductRows] = useState([]);

	const fetchData = () => {
		fetch(`${process.env.REACT_APP_API_URL}/products/all`, {
			headers: {
				Authorization : `Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(res => res.json())
		.then(data => {
		    setProducts(data);
		 });
	}

	useEffect(()=>{
		if(user.role === 'Admin') {
			fetchData()
		}
	}, [user.role])

	useEffect(() => {
	  const productsArr = products.map((product, index) => {
	    return (
	     	<Accordion className='mt-2'>
	          	<Accordion.Item eventKey={product._id}>
	          		<Accordion.Header>
	          			<div className='me-4'>{index + 1}</div>
	          			<div className='d-flex flex-column'>
	          				<div id='dashboard-product' className='mb-2'>{product.productName}</div>
	          				<div className='d-flex'>
	          					<i className={`bi bi-circle-fill me-2 ${product.isActive ? 'text-success' : 'text-danger'}`}></i>  
		          				<div className={product.isActive ? 'text-success' : 'text-danger'}>
		          					{product.isActive ? 'Available' : 'Unavailable'}
		          				</div>
	          				</div>
	          			</div>
	          		</Accordion.Header>
	          		<Accordion.Body id='dashboard-product-body'>
	          			<div className='mb-3'>{product.productDescription}</div> 
	          			<h6 id='dashboard-product-body'>Stats</h6>
	          			<div className='d-flex mb-3'>
	          				<div className='me-1'>
	          					<InputGroup>
	          						<InputGroup.Text id='view-input-group-icon'>
	          						₱
	          						</InputGroup.Text>
	          						<InputGroup.Text id='view-input-group-icon'>
	          							{product.price}
	          						</InputGroup.Text>
	          					</InputGroup>
	          				</div>
	          				<div className='me-1'>
	          					<InputGroup>
	          						<InputGroup.Text id='view-input-group-icon' className="bi bi-bag-check">
	          						</InputGroup.Text>
	          						<InputGroup.Text id='view-input-group-icon'>
	          							{product.sold} sold
	          						</InputGroup.Text>
	          					</InputGroup>
	          				</div>
	          				<div>
	          					<InputGroup>
	          						<InputGroup.Text id='view-input-group-icon' className="bi bi-cart">
	          						</InputGroup.Text>
	          						<InputGroup.Text id='view-input-group-icon'>
	          							{product.stocks} left
	          						</InputGroup.Text>
	          					</InputGroup>
	          				</div>
	          			</div>
	          			<h6 id='dashboard-product-body'>Actions</h6>
	          			<div className='d-flex'>
	          				<div className='me-1'>
	          					<InputGroup>
	          						<InputGroup.Text id='view-input-group-icon' className="bi bi-pencil">
	          						</InputGroup.Text>
	          						<Button id='dashboard-button' as = {Link} to = {`/editProduct/${product._id}`} variant='secondary'>Edit</Button>
	          					</InputGroup>
	          				</div>
	          				<div>
	          					<InputGroup>
	          						<InputGroup.Text id='view-input-group-icon' className="bi bi-archive">
	          						</InputGroup.Text>
	          						<ArchiveProduct productId = {product._id} isActive = {product.isActive} fetchData = {fetchData}/>
	          					</InputGroup>
	          				</div>
	          			</div>
	          		</Accordion.Body>
	          	</Accordion.Item>
	        </Accordion>
	    );
	  });

	  setProductRows(productsArr);
	}, [products]);

	return(
		<>
		<Container fluid id='dashboard-header' className='py-4'>
			<Row>
				<Col>
					<Container>
						<div className='pt-4'>
							<h2 id='dashboard-title'>Welcome back,</h2>
							<div className='d-flex justify-content-between align-items-center mt-5'>
								<h4>Products</h4>
								<div>
									<InputGroup>
										<InputGroup.Text id='view-input-group-icon' className="bi bi-patch-plus">
										</InputGroup.Text>
										<Button id='dashboard-button' as = {Link} to = '/addProduct'>Create</Button>
									</InputGroup>
								</div>
							</div>
						</div>
					</Container>
				</Col>
			</Row>
		</Container>
		<Container fluid id='dashboard-container'>
			<Row>
				<Col>
					<Container className='pb-5'>
						{productRows}
					</Container>
				</Col>
			</Row>
		</Container>
		</>
	)
}